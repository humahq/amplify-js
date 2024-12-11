import { ResourcesConfig } from '@aws-amplify/core';
import { NextServer } from '../types';
export declare const createRunWithAmplifyServerContext: ({ config: resourcesConfig, }: {
    config: ResourcesConfig;
}) => NextServer.RunOperationWithContext;
