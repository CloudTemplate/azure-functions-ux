import { ScenarioCheckInput, ScenarioResult } from './scenario.models';
import { ScenarioIds } from './../../models/constants';
import { Environment } from 'app/shared/services/scenario/scenario.models';
import { QuotaService } from '../quota.service';
import { ArmResourceDescriptor } from 'app/shared/resourceDescriptors';
import { QuotaNames, QuotaScope } from 'app/shared/models/arm/quotaSettings';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { PortalResources } from './../../../shared/models/portal-resources';

export class OnPremEnvironment extends Environment {
    name = 'OnPrem';
    private _quotaService: QuotaService;
    private _translateService: TranslateService;

    constructor(injector: Injector) {
        super();
        this._quotaService = injector.get(QuotaService);
        this._translateService = injector.get(TranslateService);
        this.scenarioChecks[ScenarioIds.addSiteFeaturesTab] = {
            id: ScenarioIds.addSiteFeaturesTab,
            runCheck: () => {
                return { status: 'enabled' };
            }
        };

        this.scenarioChecks[ScenarioIds.openOldWebhostingPlanBlade] = {
            id: ScenarioIds.openOldWebhostingPlanBlade,
            runCheck: () => {
                return { status: 'enabled' };
            }
        };

        this.scenarioChecks[ScenarioIds.appInsightsConfigurable] = {
            id: ScenarioIds.appInsightsConfigurable,
            runCheckAsync: (input: ScenarioCheckInput) => {
                return Observable.of<ScenarioResult>({
                    status: 'disabled',
                    data: null
                });
            }
        };

        this.scenarioChecks[ScenarioIds.enableRemoteDebugging] = {
            id: ScenarioIds.enableRemoteDebugging,
            runCheck: () => {
                return { status: 'disabled' };
            }
        };

        this.scenarioChecks[ScenarioIds.enableAlwaysOn] = {
            id: ScenarioIds.enableAlwaysOn,
            runCheckAsync: (input: ScenarioCheckInput) => {
                const armResourceDescriptor = new ArmResourceDescriptor(input.site.id);
                return this._quotaService.getQuotaLimit(
                    armResourceDescriptor.subscription,
                    QuotaNames.alwaysOnEnabled,
                    input.site.properties.sku,
                    input.site.properties.computeMode,
                    QuotaScope.Site
                ).map(limit => {
                    return <ScenarioResult> {
                        // limit is infinity when it is -1
                        status: limit !== 0 ? 'enabled' : 'disabled',
                        data: this._translateService.instant(PortalResources.upgradeUpsell)
                    };
                });
            }
        };

        this.scenarioChecks[ScenarioIds.enableAutoSwap] = {
            id: ScenarioIds.enableAutoSwap,
            runCheckAsync: (input: ScenarioCheckInput) => {
                const armResourceDescriptor = new ArmResourceDescriptor(input.site.id);
                return this._quotaService.getQuotaLimit(
                    armResourceDescriptor.subscription,
                    QuotaNames.numberOfSlotsPerSite,
                    input.site.properties.sku,
                    input.site.properties.computeMode
                ).map(limit => {
                    return <ScenarioResult> {
                        status: limit > 1 ? 'enabled' : 'disabled',
                        data: this._translateService.instant(PortalResources.upgradeUpsell)
                    };
                });
            }
        };

        this.scenarioChecks[ScenarioIds.enablePlatform64] = {
            id: ScenarioIds.enablePlatform64,
            runCheckAsync: (input: ScenarioCheckInput) => {
                const armResourceDescriptor = new ArmResourceDescriptor(input.site.id);
                return this._quotaService.getQuotaLimit(
                    armResourceDescriptor.subscription,
                    QuotaNames.workerProcess64BitEnabled,
                    input.site.properties.sku,
                    input.site.properties.computeMode
                ).map(limit => {
                    return <ScenarioResult> {
                        status: limit !== 0 ? 'enabled' : 'disabled',
                        data: this._translateService.instant(PortalResources.upgradeUpsell)
                    };
                });
            }
        };

        this.scenarioChecks[ScenarioIds.webSocketsEnabled] = {
            id: ScenarioIds.webSocketsEnabled,
            runCheckAsync: (input: ScenarioCheckInput) => {
                const armResourceDescriptor = new ArmResourceDescriptor(input.site.id);
                return this._quotaService.getQuotaLimit(
                    armResourceDescriptor.subscription,
                    QuotaNames.webSocketsEnabled,
                    input.site.properties.sku,
                    input.site.properties.computeMode
                ).map(limit => {
                    return <ScenarioResult> {
                        status: limit !== 0 ? 'enabled' : 'disabled',
                        data: this._translateService.instant(PortalResources.upgradeUpsell)
                    };
                });
            }
        };
    }

    public isCurrentEnvironment(input?: ScenarioCheckInput): boolean {
        return window.appsvc.env.runtimeType === 'OnPrem';
    }

}
