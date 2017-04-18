import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';

export class NotRule implements IValidationRule {
    private readonly _rule: IValidationRule;

    public constructor(rule: IValidationRule) {
        this._rule = rule;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._rule) return;

        let name = path || "value";
        let localResults: ValidationResult[] = [];

        this._rule.validate(path, schema, value, localResults);

        if (localResults.length > 0) return;

        results.push(
            new ValidationResult(
                path,
                ValidationResultType.Error,
                "NOT_FAILED",
                "Negative check for " + name + " failed",
                null,
                null
            )
        );
    }

}
