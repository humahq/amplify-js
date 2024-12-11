import { CookieStorage } from '@aws-amplify/core/internals/adapter-core';
import { NextServer } from '../types';
export declare const DATE_IN_THE_PAST: Date;
export declare const createCookieStorageAdapterFromNextServerContext: (context: NextServer.Context) => CookieStorage.Adapter;
