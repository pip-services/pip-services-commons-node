import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors that occur during connections to remote services.
 * They can be related to misconfiguration, network issues, or the remote service itself.
 */
export class ConnectionException extends ApplicationException {

	/**
	 * Call ApplicationException's constructor with the category parameter set to 
	 * ErrorCategory.NoResponse and set the status to 500.
	 * 
	 * @see ApplicationException#ApplicationException
	 * @see ErrorCategory
	 */
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.NoResponse, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ConnectionException.prototype;

		this.status = 500;
	}
}
