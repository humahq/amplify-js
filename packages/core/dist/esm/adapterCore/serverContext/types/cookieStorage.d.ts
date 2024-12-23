import { CookieSerializeOptions } from 'cookie';
export declare namespace CookieStorage {
    type SetCookieOptions = Partial<Pick<CookieSerializeOptions, 'domain' | 'expires' | 'httpOnly' | 'maxAge' | 'sameSite' | 'secure' | 'path'>>;
    type Cookie = {
        name: string;
        value?: string;
    } & SetCookieOptions;
    interface Adapter {
        /**
         * Get all cookies from the storage.
         */
        getAll(): Cookie[];
        /**
         * Get a cookie from the storage.
         * @param name The name of the cookie.
         */
        get(name: string): Cookie | undefined;
        /**
         * Set a cookie in the storage.
         * @param name The name of the cookie.
         * @param value The value of the cookie.
         * @param [options] The cookie's options.
         */
        set(name: string, value: string, options?: SetCookieOptions): void;
        /**
         * Delete a cookie from the storage.
         * @param name The name of the cookie.
         */
        delete(name: string): void;
    }
}
