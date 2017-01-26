import { ApplicationException } from './ApplicationException';
/**
 * Errors caused by calls to unsupported or not yet implemented functionality
 */
export declare class UnsupportedException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
