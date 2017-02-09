import { ApplicationException } from './ApplicationException';
/**
 * Error caused by attempt to access missing object
 */
export declare class NotFoundException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
