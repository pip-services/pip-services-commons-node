import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class ExcludedRule implements IValidationRule {
    private readonly _values;
    constructor(...values: any[]);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
