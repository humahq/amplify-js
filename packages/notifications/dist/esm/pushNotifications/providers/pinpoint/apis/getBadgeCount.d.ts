import { GetBadgeCount } from '../types';
/**
 * Returns the current badge count (the number next to your app's icon). This function is safe to call (but will be
 * ignored) even when your React Native app is running on platforms where badges are not supported.
 *
 * @throws platform: {@link PlatformNotSupportedError} - Thrown if called against an unsupported platform. Currently,
 * only React Native is supported by this API.
 * @returns A promise that resolves to a number representing the current count displayed on the app badge.
 * @example
 * ```ts
 * const badgeCount = await getBadgeCount();
 * ```
 */
export declare const getBadgeCount: GetBadgeCount;
