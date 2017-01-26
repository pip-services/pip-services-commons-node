import { IValidationRule } from './IValidationRule';
import { Schema } from './Schema';
import { ValidationResult } from './ValidationResult';

export class AndRule implements IValidationRule {
    private readonly _rules: IValidationRule[];

    public constructor(...rules: IValidationRule[]) {
        this._rules = rules;
    }

    public validate(path: string, schema: Schema, value: any, results: ValidationResult[]): void {
        if (!this._rules) return;

        for (var i = 0; i < this._rules.length; i++) {
            let rule: IValidationRule = this._rules[i];
            rule.validate(path, schema, value, results);
        }
    }

}
