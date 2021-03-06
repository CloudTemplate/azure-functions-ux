import { Component } from '@angular/core';
import { DropDownElement } from 'app/shared/models/drop-down-element';
import { DeploymentCenterStateManager } from 'app/site/deployment-center/deployment-center-setup/wizard-logic/deployment-center-state-manager';
import { CacheService } from 'app/shared/services/cache.service';
import { Observable } from 'rxjs/Observable';
import uniqBy from 'lodash-es/uniqBy';
import { Subject } from 'rxjs/Subject';
import { VSORepo, VSOAccount } from 'app/site/deployment-center/Models/vso-repo';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { LogService } from 'app/shared/services/log.service';
import { LogCategories } from 'app/shared/models/constants';
import { RequiredValidator } from '../../../../../shared/validators/requiredValidator';
import { TranslateService } from '@ngx-translate/core';
import { VstsValidators } from '../../validators/vsts-validators';


@Component({
    selector: 'app-configure-vsts-source',
    templateUrl: './configure-vsts-source.component.html',
    styleUrls: ['./configure-vsts-source.component.scss', '../step-configure.component.scss', '../../deployment-center-setup.component.scss']
})
export class ConfigureVstsSourceComponent implements OnDestroy {

    chosenBuildFramework: string;
    public accountList: DropDownElement<string>[];
    public projectList: DropDownElement<string>[];
    public repositoryList: DropDownElement<string>[];
    public branchList: DropDownElement<string>[];
    private _ngUnsubscribe$ = new Subject();

    private _vstsRepositories: VSORepo[];

    // Subscriptions
    private _memberIdSubscription = new Subject();
    private _branchSubscription = new Subject<string>();

    public selectedAccount = '';
    public selectedProject = '';
    public selectedRepo = '';
    public selectedBranch = '';
    public accountListLoading = false;
    public branchesLoading = false;
    constructor(public wizard: DeploymentCenterStateManager,
        private _cacheService: CacheService,
        private _logService: LogService,
        private _translateService: TranslateService) {

        this.setupSubscriptions();
        this.populate();
        this.wizard.wizardForm.controls.buildProvider.valueChanges.distinctUntilChanged().takeUntil(this._ngUnsubscribe$).subscribe(r => {
            this.populate();
        });
        this.updateFormValidation();
    }

    private populate() {
        this._memberIdSubscription.next();
    }

    updateFormValidation() {
        if (this.wizard.wizardValues.buildProvider === 'vsts') {
            this.wizard.buildSettings.get('vstsProject').setAsyncValidators(VstsValidators.createProjectPermissionsValidator(this.wizard, this._translateService, this._cacheService, this.wizard.buildSettings.get('vstsAccount')).bind(this));
            this.wizard.buildSettings.get('vstsProject').updateValueAndValidity();
        }
        const required = new RequiredValidator(this._translateService, false);
        this.wizard.sourceSettings.get('repoUrl').setValidators(required.validate.bind(required));
        this.wizard.sourceSettings.get('branch').setValidators(required.validate.bind(required));
        this.wizard.sourceSettings.get('repoUrl').updateValueAndValidity();
        this.wizard.sourceSettings.get('branch').updateValueAndValidity();

    }

    setupSubscriptions() {
        this._memberIdSubscription
            .takeUntil(this._ngUnsubscribe$)
            .do(() => this.accountListLoading = true)
            .switchMap(() => this._cacheService.get('https://app.vssps.visualstudio.com/_apis/profile/profiles/me'))
            .map(r => r.json())
            .switchMap(r => this.fetchAccounts(r.id))
            .switchMap(r => {
                const projectCalls: Observable<VSORepo[]>[] = [];
                r.forEach(account => {
                    projectCalls.push(
                        this._cacheService
                            .get(`https://${account.accountName}.visualstudio.com/_apis/git/repositories?api-version=1.0`, true, this.wizard.getVstsDirectHeaders())
                            .map(res => res.json().value)
                    );
                });
                return forkJoin(projectCalls);
            })
            .do(() => this.accountListLoading = false)
            .subscribe(
                r => {
                    this._vstsRepositories = [];
                    r.forEach(repoList => {
                        repoList.forEach(repo => {
                            this._vstsRepositories.push({
                                name: repo.name,
                                remoteUrl: repo.remoteUrl,
                                account: repo.remoteUrl.split('.')[0].replace('https://', ''),
                                project: repo.project,
                                id: repo.id
                            });
                        });
                    });
                    this.accountList = uniqBy(
                        this._vstsRepositories.map(repo => {
                            return {
                                displayLabel: repo.account,
                                value: repo.account
                            };
                        }),
                        'value'
                    );
                },
                err => {
                    this._logService.error(LogCategories.cicd, '/fetch-vso-profile-repo-data', err);
                }
            );

        this._branchSubscription
            .takeUntil(this._ngUnsubscribe$)
            .do(() => this.branchesLoading = true)
            .switchMap(repoUri => {
                if (repoUri) {
                    const repoObj = this._vstsRepositories.find(x => x.remoteUrl === repoUri);
                    const repoId = repoObj.id;
                    const account = repoObj.account;
                    return this._cacheService.get(
                        `https://${account}.visualstudio.com/DefaultCollection/_apis/git/repositories/${repoId}/refs/heads?api-version=1.0`,
                        true,
                        this.wizard.getVstsDirectHeaders()
                    );
                } else {
                    return Observable.of(null);
                }
            })
            .do(() => this.branchesLoading = false)
            .subscribe(
                r => {
                    if (r) {
                        const branchList = r.json().value;
                        this.branchList = branchList.map(x => {
                            const item: DropDownElement<string> = {
                                displayLabel: x.name.replace('refs/heads/', ''),
                                value: x.name.replace('refs/heads/', '')
                            };
                            return item;
                        });
                    } else {
                        this.branchList = [];
                    }
                },
                err => {
                    this.branchList = [];
                    this._logService.error(LogCategories.cicd, '/fetch-vso-branches', err);
                }
            );
    }

    private fetchAccounts(memberId: string): Observable<VSOAccount[]> {
        const accountsUrl = `https://app.vssps.visualstudio.com/_apis/Commerce/Subscription?memberId=${memberId}&includeMSAAccounts=true&queryOnlyOwnerAccounts=false&inlcudeDisabledAccounts=false&includeMSAAccounts=true&providerNamespaceId=VisualStudioOnline`;
        return this._cacheService.get(accountsUrl, true, this.wizard.getVstsDirectHeaders()).switchMap(r => {
            const accounts = r.json().value as VSOAccount[];
            if (this.wizard.wizardForm.controls.buildProvider.value === 'kudu') {
                return Observable.of(accounts.filter(x => x.isAccountOwner));
            } else {
                return Observable.of(accounts);
            }
        });
    }

    accountChanged(accountName: DropDownElement<string>) {
        this.projectList = uniqBy(
            this._vstsRepositories.filter(r => r.account === accountName.value).map(repo => {
                return {
                    displayLabel: repo.project.name,
                    value: repo.project.name
                };
            }),
            'value'
        );
        this.selectedProject = '';
        this.selectedRepo = '';
        this.branchList = [];
        this.selectedBranch = '';
    }

    projectChanged(projectName: DropDownElement<string>) {
        this.repositoryList = uniqBy(
            this._vstsRepositories.filter(r => r.project.name === projectName.value).map(repo => {
                return {
                    displayLabel: repo.name,
                    value: repo.remoteUrl
                };
            }),
            'value'
        );
        this.selectedRepo = '';
        this.branchList = [];
        this.selectedBranch = '';
    }

    repoChanged(repoUri: DropDownElement<string>) {
        const repoObj = this._vstsRepositories.find(x => x.remoteUrl === repoUri.value);
        this.wizard.selectedVstsRepoId = repoObj.id;
        this._branchSubscription.next(repoUri.value);
        this.selectedBranch = '';
    }

    ngOnDestroy(): void {
        this._ngUnsubscribe$.next();
        this.wizard.buildSettings.setAsyncValidators([]);
        this.wizard.buildSettings.updateValueAndValidity();
    }
}
