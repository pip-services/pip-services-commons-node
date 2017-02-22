import { ValidationResult } from './ValidationResult';
import { BadRequestException } from '../errors/BadRequestException';
export declare class ValidationException extends BadRequestException {
    private static readonly SerialVersionUid;
    constructor(correlationId: string, message?: string, results?: ValidationResult[]);
    static composeMessage(results: ValidationResult[]): string;
    static throwExceptionIfNeeded(correlationId: string, results: ValidationResult[], strict: boolean): void;
}
