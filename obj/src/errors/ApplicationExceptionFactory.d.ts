import { ErrorDescription } from './ErrorDescription';
import { ApplicationException } from './ApplicationException';
export declare class ApplicationExceptionFactory {
    create(description: ErrorDescription): ApplicationException;
}
