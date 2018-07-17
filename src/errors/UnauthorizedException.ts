import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Access errors caused by missing user identity (authentication error) or incorrect security permissions (authorization error).
 */
export class UnauthorizedException extends ApplicationException {

	/**
	 * Call ApplicationException's constructor with the category parameter set to 
	 * ErrorCategory.Unauthorized and set the status to 401.
	 * 
	 * @see ApplicationException#ApplicationException
	 * @see ErrorCategory
	 */
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Unauthorized, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = UnauthorizedException.prototype;

		this.status = 401;
	}
}
