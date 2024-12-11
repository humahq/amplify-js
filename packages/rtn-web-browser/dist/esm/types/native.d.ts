import { NativeModule } from 'react-native';
export interface WebBrowserNativeModule extends NativeModule {
    openAuthSessionAsync(url: string, redirectUrl?: string, prefersEphemeralSession?: boolean): Promise<string | null>;
}
