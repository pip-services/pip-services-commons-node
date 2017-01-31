import { ErrorCategory } from './ErrorCategory';
import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';

export class ErrorDescriptionFactory {

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
