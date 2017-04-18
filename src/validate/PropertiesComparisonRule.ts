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

    public constructor(property1: string, operation: string, property2: string) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";
        let value1 = ObjectReader.getProperty(value, this._property1);
        let value2 = ObjectReader.getProperty(value, this._property2);

        if (!ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "PROPERTIES_NOT_MATCH",
                    name + " must have " + this._property1 + " " + this._operation + " " + this._property2,
                    value2,
                    value1
                )
            );
        }
    }

}
