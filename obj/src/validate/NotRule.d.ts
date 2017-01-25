import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
export declare class NotRule implements IValidationRule {
    private readonly _rule;
    constructor(rule: IValidationRule);
    validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void;
}