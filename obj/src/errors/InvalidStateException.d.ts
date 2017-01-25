import { ApplicationException } from './ApplicationException';
/**
 * Errors related to operations called in wrong component state.
 * For instance, business calls when component is not ready
 */
export declare class InvalidStateException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
