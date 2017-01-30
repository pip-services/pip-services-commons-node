import { InternalException } from '../errors/InternalException';
/**
 * Exception thrown when component cannot be created by a factory
 */
export declare class CreateException extends InternalException {
    constructor(correlationId: string, messageOrLocator: any);
}
