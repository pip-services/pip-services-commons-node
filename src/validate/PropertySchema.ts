import { IValidationRule } from './IValidationRule';
import { ValidationResult } from './ValidationResult';
import { Schema } from './Schema';

export class PropertySchema extends Schema {
    private _name: string;
    private _type: any;
    
    public constructor(required?: boolean, rules?: IValidationRule[], name?: string, type?: any)
    {
        super(required, rules);

        this._name = name;
        this._type = type;
    }

    public get name(): string {
        return this._name; 
    }

    public set name(value: string) {
        this._name = value; 
    }

    public get type(): any {
        return this._type; 
    }

    public set type(value: any) {
        this._type = value; 
    }

    public performValidation(path: string, value: any, results: ValidationResult[]): void {
        path = path ? this.name : path + "." + this.name;

        super.performValidation(path, value, results);

        this.performTypeValidation(path, this.type, value, results);
    }

}
