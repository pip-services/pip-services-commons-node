import { ErrorCategory } from './ErrorCategory';
import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';

/**
 * Contains the static method 'create', which converts ApplicationExceptions and specific (unknown) errors into ErrorDescriptions.
 * 
 * @see ErrorDescription
 * @see ApplicationException
 */
export class ErrorDescriptionFactory {

	/**
	 * @param error  	a child classs of ApplicationException (in which case it is simply converted into an ErrorDescription), 
     *                  or a specific (unknown) error, which contain error.name (set to ErrorDescription's type), error.message (error.toString(), 
     *                  if not available), and error.stack. In the second case, the ErrorDescription's 
     *                  status will be 500, and its code (and category) will be 'UNKNOWN' (ErrorCategory.Unknown).
	 * @returns       	An ErrorDescription, containing all available information about the error.
	 */
	public static create(error: any): ErrorDescription {        
        let description = new ErrorDescription();

        if (error instanceof ApplicationException) {
            let ex = <ApplicationException>error;
            description.category = ex.category;
            description.status = ex.status;
            description.code  = ex.code;
            description.message = ex.message;
            description.details = ex.details;
            description.correlation_id = ex.correlation_id;
            description.cause = ex.getCauseString();
            description.stack_trace = ex.getStackTraceString();
        } else {
            error = error || {};
            description.type = error.name;
            description.category = ErrorCategory.Unknown;
            description.status = 500;
            description.code = "UNKNOWN";
            description.message = error.message || error.toString();
            description.stack_trace = error.stack;
        }

        return description;
    }

}
