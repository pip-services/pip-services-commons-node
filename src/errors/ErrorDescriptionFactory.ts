import { ErrorCategory } from './ErrorCategory';
import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';

/**
 * Class 'ApplicationExceptionFactory' contains the static method 'create', 
 * which generates ErrorDescriptions based on information about the error.
 */
export class ErrorDescriptionFactory {

	/**
	 * @param error  	'error' can be an instance of ApplicationException (in which case the 
     *                  ErrorDescription is generated based on the data in the ApplicationException), 
     *                  or simply contain error.name (its type), error.message (error.toString(), 
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
