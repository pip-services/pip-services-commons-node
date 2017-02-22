import { InternalException } from '../errors/InternalException';

/**
 * Exception thrown when component cannot be created by a factory
 */
export class CreateException extends InternalException {

	public constructor(correlationId: string = null, messageOrLocator: any) {
		super(
            correlationId, 
            "CANNOT_CREATE", 
            typeof(messageOrLocator) == 'string' ? messageOrLocator
                : "Requested component " + messageOrLocator + " cannot be created"
        );

        if (typeof(messageOrLocator) != 'string' && messageOrLocator != null)
		    this.withDetails("locator", messageOrLocator);
	}
    
}
