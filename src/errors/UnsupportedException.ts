import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors caused by calls to unsupported or not yet implemented functionality
 */
export class UnsupportedException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Unsupported, correlation_id, code, message);
		this.status = 500;
	}
}
