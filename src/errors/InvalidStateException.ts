import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors related to calling operations, which require the component to be in a specific state.
 * 
 * For instance: business calls when the component is not ready.
 */
export class InvalidStateException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.InvalidState, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = InvalidStateException.prototype;

		this.status = 500;
	}
}
