import { ResourcesConfig } from '@aws-amplify/core';
import { NextServer } from '../types';
export declare const createServerRunnerForAPI: ({ config, }: NextServer.CreateServerRunnerInput) => NextServer.CreateServerRunnerOutput & {
    resourcesConfig: ResourcesConfig;
};
