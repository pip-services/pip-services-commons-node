let _ = require('lodash');

import { Schema } from '../validate/Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class ArraySchema extends Schema {
    private _valueType: any;

    public constructor(valueType: any) {
        super();

        this._valueType = valueType;
    }

    public get valueType(): any {
        return this._valueType;
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        value = ObjectReader.getValue(value);

        super.performValidation(path, value, results);

        if (!value) return;

        if (_.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                var elementPath = !path ? i.toString() : path + "." + i;
                this.performTypeValidation(elementPath, this.valueType, value[i], results);
            }
        } else {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ISNOT_ARRAY",
                    name + " type must to be List or Array",
                    TypeCode.Array,
                    TypeConverter.toTypeCode(value)
                )
            );
        }
    }

}
