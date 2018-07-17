import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors returned by remote services or by the network during call attempts.
 */
export class InvocationException extends ApplicationException {

	/**
	 * Call ApplicationException's constructor with the category parameter set to 
	 * ErrorCategory.FailedInvocation and set the status to 500.
	 * 
	 * @see ApplicationException#ApplicationException
	 * @see ErrorCategory
	 */
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.FailedInvocation, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = InvocationException.prototype;

		this.status = 500;
	}
}
