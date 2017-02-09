import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';
export declare class MapSchema extends Schema {
    private _keyType;
    private _valueType;
    constructor(required?: boolean, rules?: IValidationRule[], keyType?: any, valueType?: any);
    getKeyType(): any;
    setKeyType(value: any): void;
    getValueType(): any;
    setValueType(value: any): void;
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
