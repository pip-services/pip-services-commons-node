import { InternalException } from '../errors/InternalException';

/**
 * Exception thrown when required component is not found in references
 */
export class ReferenceException extends InternalException {

	public constructor(correlationId: string, locator: any) {
		super(correlationId, "REF_ERROR", "Failed to obtain reference to " + locator);
		this.withDetails("locator", locator);
	}

}
