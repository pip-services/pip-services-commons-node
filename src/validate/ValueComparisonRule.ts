import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ObjectComparator } from './ObjectComparator';
import { ValidationResultType } from './ValidationResultType';
import { ObjectReader } from '../reflect/ObjectReader';

export class ValueComparisonRule implements IValidationRule {
    private readonly _value: any;
    private readonly _operation: string;

    public constructor(operation: string, value: any) {
        this._operation = operation;
        this._value = value;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        let name = path || "value";

        if (!ObjectComparator.compare(value, this._operation, this._value)) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "BAD_VALUE",
                    name + " must " + this._operation + " " + this._value + " but found " + value,
                    this._operation + " " + this._value,
                    value
                )
            );
        }
    }

}