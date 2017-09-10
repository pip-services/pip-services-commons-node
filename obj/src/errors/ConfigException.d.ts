import { ApplicationException } from './ApplicationException';
/**
 * Errors related to mistakes in microservice user-defined configuration
 */
export declare class ConfigException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
