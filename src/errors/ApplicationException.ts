let _ = require('lodash');

import { ErrorCategory } from './ErrorCategory';

export class ApplicationException extends Error {
    public message: string;
    public category: string;
    public status: number = 500;
    public code: string = 'UNKNOWN';
    public details: any;   
    public correlation_id: string;
    public stack_trace: string;
    public cause: any;

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
        return this.stack_trace || super.stack;
    }

    public setStackTraceString(value: string): void {
    	this.stack_trace = value;
    }

    public withCode(code: string): ApplicationException {
        this.code = code || 'UNKNOWN';
        this.name = this.code;
        return this;
    }
        
    public withCause(cause: any): ApplicationException {
        this.cause = cause;
        return this;
    }
    
    public withStatus(status: number): ApplicationException {
        this.status = status || 500;
        return this;
    }
    
    public withDetails(key: string, value: any): ApplicationException {
        this.details = this.details || {};
        this.details[key] = value;
        return this;
    }
    
    public withCorrelationId(correlation_id: string): ApplicationException {
        this.correlation_id = correlation_id;
        return this;
    }

    public wrap(cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        this.withCause(cause);
        return this;
    }
    
    public static wrapError(error: ApplicationException, cause: any): ApplicationException {
        cause = ApplicationException.unwrapError(cause);

        if (cause instanceof ApplicationException) 
            return <ApplicationException>cause;

        error.withCause(cause);
        return error;
    }

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
