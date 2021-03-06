import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';

export class ExcludedRule implements IValidationRule {
    private readonly _values: any[];

    public constructor(...values: any[]) {
        this._values = values;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._values) return;

        let name = path || "value";
        let found: boolean = false;

        for (var i = 0; i < this._values.length && !found; i++) {
            let thisValue: any = this._values[i];

            if (thisValue && thisValue == value) {
                found = true;
            }
        }

        if (found) {
            results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_INCLUDED",
                    name + " must not be one of " + this._values,
                    this._values,
                    null
                )
            );
        }
    }

}
