import { ApplicationException } from './ApplicationException';
/**
 * Errors in read/write file operations
 */
export declare class FileException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
