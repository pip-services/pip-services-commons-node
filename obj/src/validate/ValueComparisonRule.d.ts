import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class ValueComparisonRule implements IValidationRule {
    private readonly _value;
    private readonly _operation;
    constructor(operation: string, value: any);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
