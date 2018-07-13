import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Unknown or unexpected errors.
 */
export class UnknownException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Unknown, correlation_id, code, message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = UnknownException.prototype;

		this.status = 500;
	}
}
