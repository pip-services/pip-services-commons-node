let _ = require('lodash');

import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ValidationException } from './ValidationException';
import { Schema } from './Schema';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeMatcher } from '../reflect/TypeMatcher';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class MapSchema extends Schema {
    private _keyType: any;
    private _valueType: any;
    
    public constructor(required?: boolean, rules?: IValidationRule[], keyType?: any, valueType?: any)
    {
        super(required, rules);

        this._keyType = keyType;
        this._valueType = valueType;
    }

    public get keyType(): any {
        return this._keyType; 
    }

    public set keyType(value: any) {
        this._keyType = value; 
    }

    public get valueType(): any {
        return this._valueType; 
    }

    public set valueType(value: any) {
        this._valueType = value; 
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        value = ObjectReader.getValue(value);

        super.performValidation(path, value, results);

        if (!value) return;

        let valueType: TypeCode = TypeConverter.toTypeCode(value);

        let map: any = valueType === TypeCode.Map ? value : null;

        if (map) {
            for (var key in map) {
                var elementPath = path ? path + "." + key : key.toString();

                this.performTypeValidation(elementPath, this.keyType, key, results);
                this.performTypeValidation(elementPath, this.valueType, map[key], results);
            }
        } else {
            if (this.isRequired) {

                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ISNOT_MAP",
                    "Value type is expected to be Dictionary",
                    TypeCode.Map,
                    valueType
                ));
            }
        }
    }

}
