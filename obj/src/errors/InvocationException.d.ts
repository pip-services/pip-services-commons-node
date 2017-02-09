import { ApplicationException } from './ApplicationException';
/**
 * Errors returned by remote services or network during call attempts
 */
export declare class InvocationException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
