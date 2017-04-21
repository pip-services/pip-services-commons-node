import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';

export class PropertySchema extends Schema {
    private _name: string;
    private _type: any;
    
    public constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any) {
        super(required, rules);

        this._name = name;
        this._type = type;
    }

    public getName(): string {
        return this._name; 
    }

    public setName(value: string) {
        this._name = value; 
    }

    public getType(): any {
        return this._type; 
    }

    public setType(value: any) {
        this._type = value; 
    }

    public performValidation(path: string, value: any, results: ValidationResult[]): void {
        path = path != "" ? path + "." + this.getName() : this.getName();

        super.performValidation(path, value, results);

        super.performTypeValidation(path, this.getType(), value, results);
    }

}
