import { Observable } from 'rxjs';
import { ConnectionState } from '../types/PubSub';
type LinkedConnectionState = 'connected' | 'disconnected';
type LinkedHealthState = 'healthy' | 'unhealthy';
interface LinkedConnectionStates {
    networkState: LinkedConnectionState;
    connectionState: LinkedConnectionState | 'connecting';
    intendedConnectionState: LinkedConnectionState;
    keepAliveState: LinkedHealthState;
}
export declare const CONNECTION_CHANGE: {
    [key in 'KEEP_ALIVE_MISSED' | 'KEEP_ALIVE' | 'CONNECTION_ESTABLISHED' | 'CONNECTION_FAILED' | 'CLOSING_CONNECTION' | 'OPENING_CONNECTION' | 'CLOSED' | 'ONLINE' | 'OFFLINE']: Partial<LinkedConnectionStates>;
};
export declare class ConnectionStateMonitor {
    /**
     * @private
     */
    private _linkedConnectionState;
    private _linkedConnectionStateObservable;
    private _linkedConnectionStateObserver?;
    private _networkMonitoringSubscription?;
    private _initialNetworkStateSubscription?;
    constructor();
    /**
     * Turn network state monitoring on if it isn't on already
     */
    private enableNetworkMonitoring;
    /**
     * Turn network state monitoring off if it isn't off already
     */
    private disableNetworkMonitoring;
    /**
     * Get the observable that allows us to monitor the connection state
     *
     * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
     */
    get connectionStateObservable(): Observable<ConnectionState>;
    record(statusUpdates: Partial<LinkedConnectionStates>): void;
    private connectionStatesTranslator;
}
export {};
