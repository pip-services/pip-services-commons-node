import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors related to mistakes in microservice user-defined configuration
 */
export class ConfigException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Misconfiguration, correlation_id, code, message);
		this.status = 500;
	}
}
