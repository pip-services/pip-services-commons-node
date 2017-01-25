import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
export declare class Schema {
    private _isRequired;
    private _rules;
    constructor(required?: boolean, rules?: IValidationRule[]);
    isRequired: boolean;
    rules: IValidationRule[];
    makeRequired(): Schema;
    makeOptional(): Schema;
    withRule(rule: IValidationRule): Schema;
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void;
    validate(value: any): ValidationResult[];
    validateAndThrowException(correlationId: string, value: any, strict?: boolean): void;
}
