export namespace errorIds {
    export namespace preconditionsErrors {
        export const appIsStopped = '/errors/preconditions/appIsStopped';
        export const clientCertEnabled = '/errors/preconditions/clientCertEnabled';
        export const errorAccessingArm = '/errors/preconditions/errorAccessingArm';
        export const unreachableInternalLoadBalancer = '/errors/preconditions/unreachableInternalLoadBalancer';
        export const runtimeIsNotAvailable = '/errors/preconditions/runtimeIsNotAvailable';
        export const runtimeHttpNotAvailable = '/errors/preconditions/runtimeHttpNotAvailable';
        export const noFunctionAppContext = '/errors/preconditions/noFunctionAppContext';
    }

    export namespace armErrors {
        export const noAccess = '/errors/arm/noaccess';
        export const scopeLocked = '/errors/arm/scopelocked';
    }

    export const unknown = 'errors/unknown-error';
    export const functionNotFound = '/errors/functionNotFound';
    export const unableToRetrieveFileContent = '/errors/UnableToRetrieveFileContent';
    export const deserializingKudusFunctionList = '/errors/deserializingKudusFunctionList';
    export const unableToRetrieveFunctionsList = '/errors/unableToRetrieveFunctionsList';
    export const unableToSaveFileContent = '/errors/unableToSaveFileContent';
    export const unableToDeleteFile = '/errors/unableToDeleteFile';
    export const unableToCreateFunction = '/errors/unableToCreateFunction';
    export const unableToDeleteFunction = '/errors/unableToDeleteFunction';
    export const unableToRetrieveSecretsFileFromKudu = '/errors/unableToRetrieveSecretsFileFromKudu';
    export const unableToRetrieveRuntimeConfig = '/errors/unableToRetrieveRuntimeConfig';
    export const unableToUpdateRuntimeConfig = '/errors/unableToUpdateRuntimeConfig';
    export const unableToUpdateFunction = '/errors/unableToUpdateFunction';
    export const unableToRetrieveFunction = '/errors/unableToRetrieveFunction';
    export const unableToRetrieveDirectoryContent = '/errors/unableToRetrieveDirectoryContent';
    export const unableToSyncTriggers = '/errors/unableToSyncTriggers';
    export const unableToCallDiagnoseApi = '/errors/unableToCallDiagnoseApi';
    export const functionRuntimeIsUnableToStart = '/errors/functionRuntimeIsUnableToStart';
    export const unableToCreateFunctionKey = '/errors/unableToCreateFunctionKey';
    export const unableToCreateSwaggerKey = '/errors/unableToCreateSwaggerKey';
    export const unableToDeleteFunctionKey = '/errors/unableToDeleteFunctionKey';
    export const unableToRenewFunctionKey = '/errors/unableToRenewFunctionKey';
    export const errorParsingConfig = '/errors/errorParsingConfig';
    export const generalFunctionErrorFromHost = '/errors/generalFunctionErrorFromHost';
    export const generalHostErrorFromHost = '/errors/generalHostErrorFromHost';
    export const tryAppServiceError = '/errors/tryAppServiceError';
    export const corsNotConfigured = '/errors/corsNotConfigured';
    export const errorCallingDiagnoseApi = '/errors/errorCallingDiagnoseApi';
    export const userDoesntHaveAccess = '/errors/userDoesntHaveAccess';
    export const unauthorizedTalkingToRuntime = '/errors/unauthorizedTalkingToRuntime';
    export const applicationOffline = '/errors/applicationOffline';
    export const failedToQueryArmResource = '/errors/failedToQueryArmResource';
    export const unableToUpdateSwaggerData = '/errors/unableToUpdateSwaggerData';
    export const unableToDeleteSwaggerData = '/errors/unableToDeleteSwaggerData';
    export const unableToloadGeneratedAPIDefinition = '/errors/unableToloadGeneratedAPIDefinition';
    export const failedToCreateApp = '/errors/unableToCreateApp';
    export const failedToCreateSlot = '/errors/unableToCreateSlot';
    export const malformedAPIDefinition = '/errors/malformedAPIDefinition';
    export const passThroughApiError = '/errors/passThroughApiError';
    export const unableToUpdateFunctionAppEditMode = '/errors/unableToUpdateFunctionAppEditMode';
    export const unableToPopulateSlotsList = '/errors/unableToPopulateSlotsList';
    export const failedToSwitchEnabledFunction = '/errors/failedToSwitchEnabledFunction';
    export const failedAadRegistration = '/errors/failedAadRegistration';
    export const failedToGetFunctionRuntimeExtensions = '/errors/failedToGetFunctionRuntimeExtensions';
    export const failedToInstallFunctionRuntimeExtension = '/errors/failedToInstallFunctionRuntimeExtension';
    export const failedToGetExtensionInstallStatus = '/errors/failedToGetExtensionInstallStatus';
    export const failedToUnInstallFunctionRuntimeExtension = '/errors/failedToUnInstallFunctionRuntimeExtension';
    export const timeoutInstallingFunctionRuntimeExtension = '/errors/timeoutInstallingFunctionRuntimeExtension';
    export const extensionAlreadyInstalledWithDifferentVersion = '/errors/extensionAlreadyInstalledWithDifferentVersion';
    export const proxyWithSameNameAlreadyExists = '/errors/proxyWithSameNameAlreadyExists';
    export const proxySchemaValidationFails = '/errors/proxySchemaValidationFails';
    export const proxyJsonNotFound = '/errors/proxyJsonNotFound';
    export const proxyJsonNotValid = '/errors/proxyJsonNotValid';
    export const proxySchemaNotValid = '/errors/proxySchemaNotValid';
    export const embeddedEditorLoadError = '/errors/embedded/editor-load';
    export const embeddedEditorSaveError = '/errors/embedded/editor-save';
    export const embeddedDeleteError = '/errors/embedded/delete';
    export const embeddedGetEntities = '/errors/embedded/get-entities';
    export const embeddedCreateError = '/errors/embedded/create';
    export const applicationInsightsInstrumentationKeyMismatch = 'errors/appInsights/instrumentationKey/mismatch';
    export const applicationInsightsConfigure = 'errors/appInsights/configure';
}
