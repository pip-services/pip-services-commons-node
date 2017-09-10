import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class OrRule implements IValidationRule {
    private readonly _rules;
    constructor(...rules: IValidationRule[]);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}
