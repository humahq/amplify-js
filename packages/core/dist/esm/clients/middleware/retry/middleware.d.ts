import { MiddlewareContext, MiddlewareHandler, Request, Response } from '../../types/core';
import { RetryDeciderOutput } from './types';
/**
 * Configuration of the retry middleware
 */
export interface RetryOptions<TResponse = Response> {
    /**
     * Function to decide if the request should be retried.
     *
     * @param response Optional response of the request.
     * @param error Optional error thrown from previous attempts.
     * @param middlewareContext Optional context object to store data between retries.
     * @returns True if the request should be retried.
     */
    retryDecider(response?: TResponse, error?: unknown, middlewareContext?: MiddlewareContext): Promise<RetryDeciderOutput>;
    /**
     * Function to compute the delay in milliseconds before the next retry based
     * on the number of attempts.
     * @param attempt Current number of attempts, including the first attempt.
     * @returns Delay in milliseconds.
     */
    computeDelay(attempt: number): number;
    /**
     * Maximum number of retry attempts, starting from 1. Defaults to 3.
     */
    maxAttempts?: number;
    /**
     * Optional AbortSignal to abort the retry attempts.
     */
    abortSignal?: AbortSignal;
}
/**
 * Retry middleware
 */
export declare const retryMiddlewareFactory: <TInput = Request, TOutput = Response>({ maxAttempts, retryDecider, computeDelay, abortSignal, }: RetryOptions<TOutput>) => (next: MiddlewareHandler<TInput, TOutput>, context: MiddlewareContext) => (request: TInput) => Promise<NonNullable<TOutput>>;
