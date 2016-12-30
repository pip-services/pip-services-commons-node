import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { ValidationException } from './ValidationException';
import { ObjectReader } from '../reflect/ObjectReader';
import { TypeMatcher } from '../reflect/TypeMatcher';
import { TypeCode } from '../convert/TypeCode';
import { TypeConverter } from '../convert/TypeConverter';

export class Schema {
    private _isRequired: boolean;
    private _rules: IValidationRule[];
    
    public constructor(required?: boolean, rules?: IValidationRule[])
    {
        this._isRequired = required;
        this._rules = rules;
    }

    public get isRequired(): boolean {
        return this._isRequired; 
    }

    public set isRequired(value: boolean) {
        this._isRequired = value; 
    }

    public get rules(): IValidationRule[] {
        return this._rules; 
    }

    public set rules(value: IValidationRule[]) {
        this._rules = value; 
    }

    public makeRequired(): Schema {
        this._isRequired = true;
        return this;
    }

    public makeOptional(): Schema {
        this._isRequired = false;
        return this;
    }

    public withRule(rule: IValidationRule): Schema {
        this._rules = this._rules || [];
        this._rules.push(rule);
        return this;
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        if (!value) {
            if (this.isRequired) {
                results.push(new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "VALUE_IS_NULL",
                    "value cannot be null",
                    "NOT NULL",
                    null
                ));
            }
        } else {
            value = ObjectReader.getValue(value);

            // Check validation rules
            if (this.rules != null) {
                for (var i = 0; i < this.rules.length; i++) {
                    let rule: IValidationRule = this.rules[i];
                    rule.validate(path, this, value, results);
                }
            }
        }
    }

    protected performTypeValidation(path: string, type: any, value: any, results: ValidationResult[]): void {
        // If type it not defined then skip
        if (!type) return;

        // Perform validation against schema
        let schema: Schema = type;
        if (schema) {
            schema.performValidation(path, value, results);
            return;
        }

        // If value is null then skip
        value = ObjectReader.getValue(value);
        if (!value) return;

        let valueType: TypeCode = TypeConverter.toTypeCode(value);

        // Match types
        if (TypeMatcher.matchType(type, valueType))
            return;

        results.push(
                new ValidationResult(
                    path,
                    ValidationResultType.Error,
                    "TYPE_MISMATCH",
                    "Expected type " + type + " but found " + valueType.toString(),
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

    public validateAndThrowException(correlationId: string, value: any, strict: boolean = false): void {
        let results: ValidationResult[] = this.validate(value);
        ValidationException.throwExceptionIfNeeded(correlationId, results, strict);
    }

}
