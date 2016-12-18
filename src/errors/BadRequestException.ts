import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors due to improper user requests, like missing or wrong parameters 
 */
export class BadRequestException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.BadRequest, correlation_id, code, message);
		this.status = 400;
	}
}
