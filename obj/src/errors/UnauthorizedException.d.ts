import { ApplicationException } from './ApplicationException';
/**
 * Access errors caused by missing user identity or security permissions
 */
export declare class UnauthorizedException extends ApplicationException {
    constructor(correlation_id?: string, code?: string, message?: string);
}
