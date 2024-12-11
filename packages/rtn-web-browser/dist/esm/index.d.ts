declare const module: {
    openAuthSessionAsync: (url: string, redirectUrls: string[], prefersEphemeralSession?: boolean | undefined) => Promise<string | null | undefined>;
};
export type WebBrowserModule = typeof module;
export { module };
