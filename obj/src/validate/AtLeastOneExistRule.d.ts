import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class AtLeastOneExistRule implements IValidationRule {
    private readonly _properties;
    constructor(...properties: string[]);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
