import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
export declare class PropertySchema extends Schema {
    private _name;
    private _type;
    constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any);
    name: string;
    type: any;
    performValidation(path: string, value: any, results: ValidationResult[]): void;
}
