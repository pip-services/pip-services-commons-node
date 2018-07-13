import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors due to improper user requests. 
 * 
 * For example: missing or incorrect parameters.
 */
export class BadRequestException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.BadRequest, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = BadRequestException.prototype;

		this.status = 400;
	}
}
