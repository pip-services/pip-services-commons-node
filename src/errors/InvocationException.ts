import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors returned by remote services or network during call attempts 
 */
export class InvocationException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.FailedInvocation, correlation_id, code, message);
		this.status = 500;
	}
}
