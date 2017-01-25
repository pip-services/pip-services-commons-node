import { ApplicationException } from './ApplicationException';
/**
 * Errors caused by programming mistakes
 */
export declare class InternalException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
