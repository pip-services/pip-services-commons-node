import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors related to mistakes in the microservice's user-defined configurations.
 */
export class ConfigException extends ApplicationException {
	
	/**
	 * Call ApplicationException's constructor with the category parameter set to 
	 * ErrorCategory.Misconfiguration and set the status to 500.
	 * 
	 * @see ApplicationException#ApplicationException
	 * @see ErrorCategory
	 */
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Misconfiguration, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ConfigException.prototype;

		this.status = 500;
	}
}
