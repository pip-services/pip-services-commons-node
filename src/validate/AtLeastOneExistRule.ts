import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

export class AtLeastOneExistRule implements IValidationRule {
    private readonly _properties: string[];

    public constructor(...properties: string[]) {
        this._properties = properties;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        let found: string[] = [];

        for (var i = 0; i < this._properties.length; i++) {
            var propertyValue = ObjectReader.getProperty(value, this._properties[i]);
            if (propertyValue != null)
                found.push(this._properties[i]);
        }

        if (found.length === 0) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_NULL",
                    name + " must have at least one property from " + this._properties,
                    this._properties,
                    null
                )
            );
        }
    }

}