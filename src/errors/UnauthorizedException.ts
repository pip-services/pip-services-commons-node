import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Access errors caused by missing user identity or security permissions
 */
export class UnauthorizedException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.Unauthorized, correlation_id, code, message);
		this.status = 401;
	}
}
