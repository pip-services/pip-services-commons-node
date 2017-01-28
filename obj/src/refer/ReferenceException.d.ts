import { InternalException } from '../errors/InternalException';
/**
 * Exception thrown when required component is not found in references
 */
export declare class ReferenceException extends InternalException {
    constructor(correlationId: string, locator: any);
}
