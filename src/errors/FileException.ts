import { ErrorCategory } from './ErrorCategory';
import { ApplicationException } from './ApplicationException';

/**
 * Errors in read/write file operations
 */
export class FileException extends ApplicationException {
	public constructor(correlation_id: string = null, code: string = null, message: string = null) {
		super(ErrorCategory.FileError, correlation_id, code, message);
		this.status = 500;
	}
}
