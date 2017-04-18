let _ = require('lodash');

import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ValidationException } from './ValidationException';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeMatcher } from '../reflect/TypeMatcher';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class Schema {
    private _required: boolean;
    private _rules: IValidationRule[];

    public constructor(required?: boolean, rules?: IValidationRule[]) {
        this._required = required;
        this._rules = rules;
    }

    public isRequired(): boolean {
        return this._required;
    }

    public setRequired(value: boolean) {
        this._required = value;
    }

    public getRules(): IValidationRule[] {
        return this._rules;
    }

    public setRules(value: IValidationRule[]) {
        this._rules = value;
    }

    public makeRequired(): Schema {
        this._required = true;
        return this;
    }

    public makeOptional(): Schema {
        this._required = false;
        return this;
    }

    public withRule(rule: IValidationRule): Schema {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        let name = path || "value";

        if (value == null) {
            if (this.isRequired()) {
                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_IS_NULL",
                    name + " must not be null",
                    "NOT NULL",
                    null
                ));
            }
        } else {
            value = ObjectReader.getValue(value);

            // Check validation rules
            if (this._rules != null) {
                for (var i = 0; i < this._rules.length; i++) {
                    let rule: IValidationRule = this._rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    }

    private typeToString(type: any): string {
        if (type == null)
            return "unknown";
        if (_.isNumber(type))
            return TypeConverter.toString(type);
        return type.toString();
    }

    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void {
        // If type it not defined then skip
        if (type == null) return;

        // Perform validation against schema
        if (type instanceof Schema) {
            let schema: Schema = type as Schema;
            schema.performValidation(path, value, results);
            return;
        }

        // If value is null then skip
        value = ObjectReader.getValue(value);
        if (value == null) return;

        let name = path || "value";
        let valueType: TypeCode = TypeConverter.toTypeCode(value);

        // Match types
        if (TypeMatcher.matchType(type, valueType))
            return;

        results.push(
            new ValidationResult(
                path,
                ValidationResultType.Error,
                "TYPE_MISMATCH",
                name + " type must be " + this.typeToString(type) + " but found " + this.typeToString(valueType),
                type,
                valueType.toString()
            )
        );
    }

    public validate(value: any): ValidationResult[] {
        let results: ValidationResult[] = [];
        this.performValidation("", value, results);
        return results;
    }

    public validateAndReturnException(correlationId: string, value: any, strict: boolean = false): ValidationException {
        let results: ValidationResult[] = this.validate(value);
        return ValidationException.fromResults(correlationId, results, strict);
    }

    public validateAndThrowException(correlationId: string, value: any, strict: boolean = false): void {
        let results: ValidationResult[] = this.validate(value);
        ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    }

}
