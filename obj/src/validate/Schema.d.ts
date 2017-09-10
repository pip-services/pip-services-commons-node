import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationException } from './ValidationException';
export declare class Schema {
    private _required;
    private _rules;
    constructor(required?: boolean, rules?: IValidationRule[]);
    isRequired(): boolean;
    setRequired(value: boolean): void;
    getRules(): IValidationRule[];
    setRules(value: IValidationRule[]): void;
    makeRequired(): Schema;
    makeOptional(): Schema;
    withRule(rule: IValidationRule): Schema;
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
    private typeToString(type);
    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void;
    validate(value: any): ValidationResult[];
    validateAndReturnException(correlationId: string, value: any, strict?: boolean): ValidationException;
    validateAndThrowException(correlationId: string, value: any, strict?: boolean): void;
}
