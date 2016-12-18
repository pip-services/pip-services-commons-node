import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors happened during connection to remote services.
 * They can be related to misconfiguration, network issues or remote service itself 
 */
export class ConnectionException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.NoResponse, correlation_id, code, message);
		this.status = 500;
	}
}
