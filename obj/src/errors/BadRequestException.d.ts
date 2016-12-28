import { ApplicationException } from './ApplicationException';
/**
 * Errors due to improper user requests, like missing or wrong parameters
 */
export declare class BadRequestException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
