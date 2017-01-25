import { ApplicationException } from './ApplicationException';
/**
 * Errors raised by conflict in object versions posted by user and stored on server.
 */
export declare class ConflictException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
