import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Error caused by attempt to access missing object
 */
export class NotFoundException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.NotFound, correlation_id, code, message);
		this.status = 404;
	}
}
