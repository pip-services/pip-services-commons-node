import { ApplicationException } from './ApplicationException';
/**
 * Unknown or unexpected errors
 */
export declare class UnknownException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
