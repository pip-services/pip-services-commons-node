import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';
export declare class ApplicationExceptionFactory {
    static create(description: ErrorDescription): ApplicationException;
}
