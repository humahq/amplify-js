export interface KeyValueStorageInterface {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
export type SameSite = 'strict' | 'lax' | 'none';
export interface CookieStorageData {
    domain?: string;
    path?: string;
    /**
     * Expiration in days
     */
    expires?: number;
    secure?: boolean;
    sameSite?: SameSite;
}
