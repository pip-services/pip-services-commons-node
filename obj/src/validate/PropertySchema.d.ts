import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
export declare class PropertySchema extends Schema {
    private _name;
    private _type;
    constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any);
    getName(): string;
    setName(value: string): void;
    getType(): any;
    setType(value: any): void;
    performValidation(path: string, value: any, results: ValidationResult[]): void;
}
