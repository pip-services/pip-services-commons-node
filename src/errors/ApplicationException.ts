let _ = require('lodash');

import { ErrorCategory } from './ErrorCategory';
import { StringValueMap } from '../data/StringValueMap';

/**
 * This class provides cross-(programming)language and (natural)language-independent standardization of exceptions. 
 * 
 * ApplicationException contains a strict structure, which allows for structuration of free-form exception messages, as well as 
 * their serialization. Serialization is necessary for sending exceptions over the REST interface back to 'caller' microservices.
 * 
 * An ApplicationException contains enough information to translate an exception from one (natural) language to another. 
 * It concretely defines the type of exception (via the 'code' field) and links exceptions to business transactions 
 * (via 'correlation_id'). ApplicationException's fields allow us to develop (natural) language-independent exceptions, 
 * as well as cross-(programming)language error propagation.
 * 
 * ApplicationException serves as a parent class for all other (Category)Exception classes. 
 * 
 * Usage:
 * - Developers can use this class to create their own application exceptions (create exceptions from the ground up).
 * - Exceptions can be wrapped around one another (wrap an exception around an existing exception).
 * - Our microservices automatically intercept common exceptions and try to convert them to the closest available type of 
 *   ApplicationException.
 * - ApplicationExceptions are converted to {@link ErrorDescription}s, which are then sent back to 'caller' 
    * microservices. When the microservice on the other end receives the ErrorDescription, it can use it to restore the 
    * ApplicationException and propagate it to the place from where it was called.
 * 
 * Defaults: 
 * - status = 500
 * - code = 'UNKNOWN'
 * - category = ErrorCategory.Unknown
 * - message = 'Unknown error'
 */
export class ApplicationException extends Error {
    /**
     * This field stores the message that was contained in the original error. 
     * Errors' messages are always in English. However, using this class's 
     * 'code' and 'details' fields, we can translate the error's message to 
     * any other language during UI population.
     */
    public message: string;
    /**
     * Defines what category of exceptions this exception belongs to.
     */
    public category: string;
    /**
     * Used when sending over the REST interface, so that we know what status to raise.
     */
    public status: number = 500;
    /**
     * Every error needs a unique code by which it can be identified. Using this code, 
     * we can select error messages from various natural languages to display later on 
     * in the UI.
     */
    public code: string = 'UNKNOWN';
    /**
     * This field is used when translating an error into a different natural language (to be displayed
     * later on in the UI).
     * 
     * For example, if we received an ObjectNotFoundException (general error) when searching for an 
     * object via its id, the id by which the object was not found can be added as a detail. This allows 
     * us to add additional details to our translated error messages. 
     * Resulting error message format: “{Error's text in some language} - id: {id}”
     */
    public details: StringValueMap; 
    /**
     * Important field for microservices, as it allows us 
     * to tie an exception to a specific business transaction. 
     */   
    public correlation_id: string;
    /**
     * Stack trace of the exception.
     */ 
    public stack_trace: string;
    /**
     * Additional information, regarding to the cause of the exception.
     */ 
    public cause: string;

    /**
     * @param category          category that this exception belongs to.
     * @param correlation_id    ties the exception to a specific business transaction. 
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
    
    public getCauseString(): string { 
        return this.cause != null ? this.cause.toString() : null;
    }

    public setCauseString(value: string): void {
    	this.cause = value;
    }    

    public getStackTraceString(): string {
        return this.stack_trace || (<any>this).stack;
    }

    public setStackTraceString(value: string): void {
    	this.stack_trace = value;
    }

    public withCode(code: string): ApplicationException {
        this.code = code || 'UNKNOWN';
        this.name = this.code;
        return this;
    }
        
    public withCause(cause: Error): ApplicationException {
        if (cause)
            this.cause = cause.message;
        return this;
    }
    
    public withStatus(status: number): ApplicationException {
        this.status = status || 500;
        return this;
    }
    
    public withDetails(key: string, value: any): ApplicationException {
        this.details = this.details || new StringValueMap();
        this.details.setAsObject(key, value);
        return this;
    }
    
    public withCorrelationId(correlation_id: string): ApplicationException {
        this.correlation_id = correlation_id;
        return this;
    }

    public withStackTrace(stackTrace: string): ApplicationException {
        this.stack_trace = stackTrace;
        return this;
    }

    /** 
     * Method 'wrap' unwraps the parameter 'cause' [unwrapError(cause)], and, if the 
     * unwrapped cause is an instance of ApplicationException, returns the unwrapped ApplicationException.
     * If the unwrapped cause is NOT an instance of ApplicationException, then this ApplicationException's 
     * 'cause' is set to 'cause.message'. 
     * 
     * @param cause     Cause of the exception that will be unwrapped and returned/added.
     * @returns         Unwrapped from 'cause' ApplicationException, or this ApplicationException with 
     *                  'this.cause' set to 'cause.message'.
     */
    public wrap(cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        this.withCause(cause);
        return this;
    }
    
    /** 
     * Static method 'wrapError' is identical to the non-static method 'wrap'
     * and wraps the ApplicationException passed as 'error', instead of itself (this).
     * 
     * @param error     ApplicationException to wrap.
     * @param cause     Cause of the exception that will be unwrapped and returned/added.
     * @returns         Unwrapped from 'cause' ApplicationException, or ApplicationException 
     *                  'error' with 'error.cause' set to 'cause.message'.
     */
    public static wrapError(error: ApplicationException, cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        error.withCause(cause);
        return error;
    }

    /** 
     * Method 'unwrapError' is used to unwrap Seneca exceptions and restify exceptions.
     * 
     * @param error     'wrapped' error.
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
