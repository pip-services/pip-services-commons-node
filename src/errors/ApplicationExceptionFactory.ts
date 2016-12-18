import { ErrorCategory } from './ErrorCategory';
import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';
import { UnknownException } from './UnknownException';
import { InternalException } from './InternalException';
import { ConfigException } from './ConfigException';
import { ConnectionException } from './ConnectionException';
import { InvocationException } from './InvocationException';
import { FileException } from './FileException';
import { BadRequestException } from './BadRequestException';
import { UnauthorizedException } from './UnauthorizedException';
import { ConflictException } from './ConflictException';
import { NotFoundException } from './NotFoundException';
import { UnsupportedException } from './UnsupportedException';
import { InvalidStateException } from './InvalidStateException';

export class ApplicationExceptionFactory {
	
    public create(description: ErrorDescription): ApplicationException {
    	if (description == null)
    		throw new Error("Description cannot be null");
    	
    	let error: ApplicationException = null;
    	let category = description.category;
    	let code = description.code;
    	let message = description.message;
    	let correlationId = description.correlation_id;
    	
    	// Create well-known exception type based on error category
    	if (ErrorCategory.Unknown == category)
    		error = new UnknownException(correlationId, code, message);
    	else if (ErrorCategory.Internal == category)
    		error = new InternalException(correlationId, code, message);
    	else if (ErrorCategory.Misconfiguration == category)
    		error = new ConfigException(correlationId, code, message);
    	else if (ErrorCategory.NoResponse == category)
    		error = new ConnectionException(correlationId, code, message);
    	else if (ErrorCategory.FailedInvocation == category)
    		error = new InvocationException(correlationId, code, message);
    	else if (ErrorCategory.FileError == category)
    		error = new FileException(correlationId, code, message);
    	else if (ErrorCategory.BadRequest == category)
    		error = new BadRequestException(correlationId, code, message);
    	else if (ErrorCategory.Unauthorized == category)
    		error = new UnauthorizedException(correlationId, code, message);
    	else if (ErrorCategory.Conflict == category)
    		error = new ConflictException(correlationId, code, message);
    	else if (ErrorCategory.NotFound == category)
    		error = new NotFoundException(correlationId, code, message);
    	else if (ErrorCategory.InvalidState == category)
    		error = new InvalidStateException(correlationId, code, message);
    	else if (ErrorCategory.Unsupported == category)
    		error = new UnsupportedException(correlationId, code, message);
    	else {
    		error = new UnknownException();
    		error.category = category;
    		error.status = description.status;
    	}
    	
    	// Fill error with details
    	error.details = description.details;
        error.setCauseString(description.cause);
        error.setStackTraceString(description.stack_trace);
    	
    	return error;
    }

}
