import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors related to operations called in wrong component state.
 * For instance, business calls when component is not ready
 */
export class InvalidStateException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.InvalidState, correlation_id, code, message);
		this.status = 500;
	}
}
