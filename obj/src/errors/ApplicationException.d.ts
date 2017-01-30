export declare class ApplicationException extends Error {
    message: string;
    category: string;
    status: number;
    code: string;
    details: any;
    correlation_id: string;
    stack_trace: string;
    cause: any;
    constructor(category?: string, correlation_id?: string, code?: string, message?: string);
    getCauseString(): string;
    setCauseString(value: string): void;
    getStackTraceString(): string;
    setStackTraceString(value: string): void;
    withCode(code: string): ApplicationException;
    withCause(cause: any): ApplicationException;
    withStatus(status: number): ApplicationException;
    withDetails(key: string, value: any): ApplicationException;
    withCorrelationId(correlation_id: string): ApplicationException;
    wrap(cause: any): ApplicationException;
    static wrapError(error: ApplicationException, cause: any): ApplicationException;
    static unwrapError(error: any): any;
}
