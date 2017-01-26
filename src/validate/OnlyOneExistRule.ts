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
                    "At least one property expected from " + this._properties,
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
                    "Only one property expected from " + this._properties,
                    this._properties,
                    null
                )
            );
        }
    }

}
