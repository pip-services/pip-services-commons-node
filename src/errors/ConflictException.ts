import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors raised by conflict in object versions posted by user and stored on server.
 */
export class ConflictException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Conflict, correlation_id, code, message);
		this.status = 409;
	}
}
