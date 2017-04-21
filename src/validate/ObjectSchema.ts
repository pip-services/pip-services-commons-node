import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { ValidationResultType } from './ValidationResultType';
import { Schema } from './Schema';
import { PropertySchema } from './PropertySchema';
import { ObjectComparator } from './ObjectComparator';
import { ObjectReader } from '../reflect/ObjectReader';

export class ObjectSchema extends Schema {
    private _properties: PropertySchema[];
    private _isUndefinedAllowed: boolean;
    private _allowExcess: boolean = false;

    public constructor(allowExcessProperies?: boolean, required?: boolean, rules?: IValidationRule[]) {
        super(required, rules);
        this._allowExcess = allowExcessProperies;
    }

    public get properties(): PropertySchema[] {
        return this._properties;
    }

    public set properties(value: PropertySchema[]) {
        this._properties = value;
    }

    public get isUndefinedAllowed(): boolean {
        return this._isUndefinedAllowed;
    }

    public set isUndefinedAllowed(value: boolean) {
        this._isUndefinedAllowed = value;
    }

    public allowUndefined(value: boolean): ObjectSchema {
        this.isUndefinedAllowed = value;
        return this;
    }

    public withProperty(schema: PropertySchema): ObjectSchema {
        this.properties = this.properties || [];
        this.properties.push(schema);
        return this;
    }

    public withRequiredProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema {
        this.properties = this.properties || [];

        var schema = new PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeRequired();

        return this.withProperty(schema);
    }

    public withOptionalProperty(name: string, type?: any, ...rules: IValidationRule[]): ObjectSchema {
        this.properties = this.properties || [];

        var schema = new PropertySchema(null, null, name, type);
        schema.setRules(rules.slice());
        schema.makeOptional();

        return this.withProperty(schema);
    }

    protected performValidation(path: string, value: any, results: ValidationResult[]): void {
        super.performValidation(path, value, results);

        if (!value) return;

        let name = path || "value";
        let properties = ObjectReader.getProperties(value);

        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var propertySchema: PropertySchema = this.properties[i];
                var processedName = null;

                for (var key in properties) {
                    var propertyName = key;
                    var propertyValue = properties[key];

                    if (ObjectComparator.areEqual(propertySchema.getName(), propertyName)) {
                        propertySchema.performValidation(path, propertyValue, results);
                        processedName = propertyName;
                        break;
                    }
                }

                if (processedName)
                    delete properties[processedName];
                else
                    propertySchema.performValidation(path, null, results);
            }
        }

        if (!this._allowExcess)
            for (var key in properties) {
                let propertyPath: string = key && path != "" ? path + "." + key : key;

                results.push(new ValidationResult(
                    propertyPath,
                    ValidationResultType.Warning,
                    "UNEXPECTED_PROPERTY",
                    name + " contains unexpected property " + key,
                    null,
                    key
                ));
            }
    }

}
