let _ = require('lodash');

import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { Schema } from './Schema';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';
import { StringConverter } from '../convert/StringConverter';

export class MapSchema extends Schema {
    private _keyType: any;
    private _valueType: any;
    
    public constructor(required?: boolean, rules?: IValidationRule[], keyType?: any, valueType?: any) {
        super(required, rules);

        this._keyType = keyType;
        this._valueType = valueType;
    }

    public getKeyType(): any {
        return this._keyType; 
    }

    public setKeyType(value: any) {
        this._keyType = value; 
    }

    public getValueType(): any {
        return this._valueType; 
    }

    public setValueType(value: any) {
        this._valueType = value; 
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        value = ObjectReader.getValue(value);

        super.performValidation(path, value, results);

        if (!value) return;

        let name = path || "value";
        let valueType: TypeCode = TypeConverter.toTypeCode(value);
        let map: any = valueType === TypeCode.Map ? value : null;

        if (map) {
            for (var key in map) {
                var elementPath = path != "" ? path + "." + key : StringConverter.toString(key);

                this.performTypeValidation(elementPath, this.getKeyType(), key, results);
                this.performTypeValidation(elementPath, this.getValueType(), map[key], results);
            }
        } else {
            if (this.isRequired) {
                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ISNOT_MAP",
                    name + " type must be Map",
                    TypeCode.Map,
                    valueType
                ));
            }
        }
    }

}
