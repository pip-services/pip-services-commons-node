import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Unknown or unexpected errors
 */
export class UnknownException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Unknown, correlation_id, code, message);
		this.status = 500;
	}
}
