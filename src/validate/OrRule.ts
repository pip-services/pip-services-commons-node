import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';

export class OrRule implements IValidationRule {
    private readonly _rules: IValidationRule[];

    public constructor(...rules: IValidationRule[]) {
        this._rules = rules;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._rules || this._rules.length == 0) return;

        let localResults: ValidationResult[] = [];

        for (var i = 0; i < this._rules.length; i++) {
            var resultCount = localResults.length;

            this._rules[i].validate(path, schema, value, localResults);

            if (resultCount == localResults.length) return;
        }

        results.push.apply(results, localResults);
    }

}
