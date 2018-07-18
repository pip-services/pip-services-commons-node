let _ = require('lodash');

import { ErrorCategory } from './ErrorCategory';
import { StringValueMap } from '../data/StringValueMap';

/**
 * This class provides cross-language (portable) and language-independent (localizable) standardization of exceptions. 
 * 
 * ApplicationException contains a strict structure and methods that help structurize free-form exception messages.
 * While ApplicationExceptions themselves are not serializable, they can be converted to {@link ErrorDescription}s, 
 * which are serializable. Serialization of ErrorDescriptions is necessary for sending exceptions over the REST interface 
 * back to "caller" microservices (cross-language error propagation).
 * 
 * An ApplicationException contains enough information in its fields to create detailed localized strings for practically 
 * any exception. It uniquely defines the type of exception (via the 'code' field) and links exceptions to business 
 * transactions (via 'correlation_id').
 * 
 * ApplicationException serves as a parent class for all other (Category)Exception classes. 
 * 
 * Usage:
 * - The classes included in this package (which already extend ApplicationException) can be used "as is".
 * - Developers can use this class to create their own application exceptions (from the ground up).
 * - Exceptions can be wrapped around one another (new exceptions can be wrapped around existing exceptions).
 * - PipService's microservices automatically intercept common exceptions and try to convert them to the closest available 
    * type of ApplicationException.
 * - ApplicationExceptions can be converted to {@link ErrorDescription}s, which can then be sent back to 'caller' 
    * microservices, even if they are written in a different language. When the microservice on the other end 
    * receives the ErrorDescription, it can use it to restore the ApplicationException and propagate the exception to 
    * the place from where the call was made.
 * 
 * Defaults: 
 * - status = 500
 * - code = 'UNKNOWN'
 * - category = ErrorCategory.Unknown
 * - message = 'Unknown error'
 * 
 * @see ErrorDescription
 */
export class ApplicationException extends Error {
    /**This field stores the message or description that was contained in the original error. 
     * Errors' messages are always in English. However, using this class's 'code' and 'details' 
     * fields, we can create localized versions of the error's message and use them instead in the UI. */
    public message: string;
    /** Defines what category of exceptions this exception belongs to. */
    public category: string;
    /** Used when sending over the REST interface, so that we know what HTTP status code to raise. */
    public status: number = 500;
    /** Every error needs a unique code by which it can be identified. Using this code, 
     *  we can select which localized error messages to use and what to display in the UI.*/
    public code: string = 'UNKNOWN';
    /**This field is used to add additional information to localized error message strings.
     * 
     * For example, if we received an ObjectNotFoundException (general error) when searching for an 
     * object via its id, the id by which the object was not found can be added as a detail. This allows 
     * us to add additional details to localized error messages. 
     * Resulting error message format: “(Localized error's text) - id: (id)” */
    public details: StringValueMap; 
    /** Unique business transaction id to trace calls across components. Important field for microservices, 
     * as it allows us to tie an exception to a specific business transaction.  */   
    public correlation_id: string;
    /** Stack trace of the exception. */ 
    public stack_trace: string;
    /** Additional information about the cause of the exception. */ 
    public cause: string;

    /**
     * @param category          category that this exception belongs to.
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param code              unique code that can be used to identify the error.
     * @param message           the message that was contained in the original error.
     */
    constructor(category: string = null, correlation_id: string = null, code: string = null, message: string = null) {
        super(message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ApplicationException.prototype;

        this.category = category || ErrorCategory.Unknown;
        this.correlation_id = correlation_id;
        this.code = code || 'UNKNOWN';
        if (!this.message) this.message = message || 'Unknown error';
        this.name = this.code;
    }
    
    /**
     * Returns additional information about the cause of the exception.
     */ 
    public getCauseString(): string { 
        return this.cause != null ? this.cause.toString() : null;
    }

    /**
     * Sets additional information about the cause of the exception.
     */ 
    public setCauseString(value: string): void {
    	this.cause = value;
    }    

    /**
     * Returns the stack trace of the exception.
     */ 
    public getStackTraceString(): string {
        return this.stack_trace || (<any>this).stack;
    }

    /**
     * Sets the stack trace of the exception.
     */ 
    public setStackTraceString(value: string): void {
    	this.stack_trace = value;
    }

    /**
     * Sets the code of the exception and returns the resulting ApplicationException.
     * Every error needs a unique code by which it can be identified. Using this code, 
     * we can select which localized error messages to use and what to display in the UI.
     * */
    public withCode(code: string): ApplicationException {
        this.code = code || 'UNKNOWN';
        this.name = this.code;
        return this;
    }
        
    /**
     * Sets the cause of the exception and returns the resulting ApplicationException.
     * The 'cause' field contains additional information about the cause of the exception.
     */ 
    public withCause(cause: Error): ApplicationException {
        if (cause)
            this.cause = cause.message;
        return this;
    }
        
    /**
     * Sets the status of the exception and returns the resulting ApplicationException.
     * The 'status' field is used when sending exceptions over the REST interface, 
     * so that we know what HTTP status code to raise.
     */ 
    public withStatus(status: number): ApplicationException {
        this.status = status || 500;
        return this;
    }
    
    /**
     * Sets the details of the exception and returns the resulting ApplicationException.
     * Details are used to add additional information to localized error message strings.
     */ 
    public withDetails(key: string, value: any): ApplicationException {
        this.details = this.details || new StringValueMap();
        this.details.setAsObject(key, value);
        return this;
    }
    
    /**
     * Sets the correlation ID of the exception and returns the resulting ApplicationException.
     * The correlation ID ties an exception to a specific business transaction.
     */ 
    public withCorrelationId(correlation_id: string): ApplicationException {
        this.correlation_id = correlation_id;
        return this;
    }

    /**
     * Sets the stack trace of the exception and returns the resulting ApplicationException.
     */ 
    public withStackTrace(stackTrace: string): ApplicationException {
        this.stack_trace = stackTrace;
        return this;
    }

    /** 
     * Wrapping allows us to transform general exceptions into ApplicationExceptions.
     * 
     * This method does the following:
     * - attempts to unwrap Seneca and restify exceptions from the parameter 'cause' using the 
     * static method {@link #unwrapError} (if they are present).
     * - checks whether 'cause' is an ApplicationException (if it is, then no additional wrapping is done).
     * - if the 'cause' parameter contains an unknown exception, then the cause field of this 
     * ApplicationException object is set to the original exception (the 'cause' parameter's 'message' field).
     * 
     * The third point of this list is used in the following way: when an unknown exception is raised, the 
     * exception's type can be determined, a category of ApplicationExceptions that is closest to the exception's 
     * type can be chosen from the ones available, after which the unknown exception can be wrapped around the 
     * chosen type of ApplicationException. This is done for unifying exceptions, as it is challenging to process 
     * a wide variety of unknown exceptions. Wrapping unknown exceptions around existing ones allows us to categorize 
     * them and be "in the ballpark". 
     * 
     * @param cause     the exception that is to be wrapped around this ApplicationException object.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or this ApplicationException 
     *                  object with 'this.cause' set to the 'cause' parameter's 'message' field.
     * 
     * @see #unwrapError
     */
    public wrap(cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        this.withCause(cause);
        return this;
    }
    
    /** 
     * Static method that is identical to the non-static method {@link #wrap}. Wraps 'cause' around 
     * the ApplicationException passed as 'error', instead of itself (this).
     * 
     * @param error     ApplicationException that has been chosen for wrapping.
     * @param cause     the exception that is to be wrapped around the 'error' parameter.
     * @returns         the 'cause' parameter as an ApplicationException (if it is one) or the parameter 
     *                  'error' with its 'cause' field set to the 'cause' parameter's 'message' field.
     * 
     * @see #wrap
     */
    public static wrapError(error: ApplicationException, cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        error.withCause(cause);
        return error;
    }

    /** 
     * Used to unwrap Seneca exceptions and restify exceptions.
     * 
     * @param error     error that may contain Seneca or restify exceptions.
     * @returns         For Seneca exceptions: error.orig. For restify exceptions: error.body.
     */
    public static unwrapError(error: any): any {
        if (error == null) return null;
        
        // Unwrapping Seneca exceptions
        if (error.code == 'act_execute' && error.orig) {
            error = error.orig;
            if (error.orig)
                error = error.orig;
        }
        
        // Unwrapping restify exceptions 
        if (error.body && !_.isEmpty(error.body))
            error = error.body;
        
        return error;
    }
    
}
