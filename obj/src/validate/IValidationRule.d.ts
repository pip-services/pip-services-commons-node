import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export interface IValidationRule {
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
