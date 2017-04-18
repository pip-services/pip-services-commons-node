import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

export class OnlyOneExistRule implements IValidationRule {
    private readonly _properties: string[];

    public constructor(...properties: string[]) {
        this._properties = properties;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        let found: string[] = [];

        for (var i = 0; i < this._properties.length; i++) {
            let property: string = this._properties[i];

            var propertyValue = ObjectReader.getProperty(value, property);

            if (propertyValue)
                found.push(property);
        }

        if (found.length == 0) {
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
        } else if (found.length > 1) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_ONLY_ONE",
                    name + "must have only one property from " + this._properties,
                    this._properties,
                    null
                )
            );
        }
    }

}
