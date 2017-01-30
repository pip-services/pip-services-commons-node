import { ApplicationException } from './ApplicationException';
/**
 * Errors happened during connection to remote services.
 * They can be related to misconfiguration, network issues or remote service itself
 */
export declare class ConnectionException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
