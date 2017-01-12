import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ObjectComparator } from './ObjectComparator';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

export class PropertiesComparisonRule implements IValidationRule {
    private readonly _property1: string;
    private readonly _property2: string;
    private readonly _operation: string;

    public constructor(property1: string, property2: string, operation: string) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        var value1 = ObjectReader.getProperty(value, this._property1);
        var value2 = ObjectReader.getProperty(value, this._property2);

        if (!ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "PROPERTIES_NOT_MATCH",
                    "Property " + this._property1 + " is expected to " + this._operation + " property " + this._property2,
                    value2,
                    value1
                )
            );
        }
    }

}
