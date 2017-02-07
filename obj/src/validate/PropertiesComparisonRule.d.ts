import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class PropertiesComparisonRule implements IValidationRule {
    private readonly _property1;
    private readonly _property2;
    private readonly _operation;
    constructor(property1: string, operation: string, property2: string);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
