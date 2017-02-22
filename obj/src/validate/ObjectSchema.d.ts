import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
import { PropertySchema } from './PropertySchema';
export declare class ObjectSchema extends Schema {
    private _properties;
    private _isUndefinedAllowed;
    private _allowExcess;
    constructor(allowExcessProperies?: boolean, required?: boolean, rules?: IValidationRule[]);
    properties: PropertySchema[];
    isUndefinedAllowed: boolean;
    allowUndefined(value: boolean): ObjectSchema;
    withProperty(schema: PropertySchema): ObjectSchema;
    withRequiredProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema;
    withOptionalProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema;
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
