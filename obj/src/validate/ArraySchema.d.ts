import { Schema } from '../validate/Schema';
import { ValidationResult } from './ValidationResult';
export declare class ArraySchema extends Schema {
    private _valueType;
    constructor(valueType: any);
    readonly valueType: any;
    protected performValidation(path: string, value: any, results: ValidationResult[]): void;
}
