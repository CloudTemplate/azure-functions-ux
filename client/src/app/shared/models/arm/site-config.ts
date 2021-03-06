import { VirtualApplication } from './virtual-application';
import { HandlerMapping } from './handler-mapping';
import { RoutingRule } from './routing-rule';
import { ConnectionStrings } from './connection-strings';
import { ApplicationSettings } from './application-settings';
import { ProviderType } from '../../../site/deployment-center/Models/deployment-enums';

export interface SiteConfig {
    scmType: ProviderType;
    alwaysOn: boolean;
    cors: {
        allowedOrigins: string[]
    },
    apiDefinition: {
        url: string
    },
    netFrameworkVersion: string;
    phpVersion: string;
    javaVersion: string;
    javaContainer: string;
    javaContainerVersion: string;
    pythonVersion: string;
    use32BitWorkerProcess: boolean;
    webSocketsEnabled: boolean;
    managedPipelineMode: string;
    remoteDebuggingEnabled: boolean;
    remoteDebuggingVersion: string;
    defaultDocuments: string[];
    handlerMappings: HandlerMapping[];
    linuxFxVersion: string;
    appCommandLine: string;
    virtualApplications: VirtualApplication[];
    autoSwapSlotName: string;
    experiments: {
        rampUpRules: RoutingRule[];
    };
    siteAuthEnabled: boolean;
    appSettings?: ApplicationSettings;
    connectionStrings?: ConnectionStrings;
    ftpsState?: string;
    http20Enabled: boolean;
}
