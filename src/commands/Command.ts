import { ICommand } from './ICommand';
import { InvocationException } from '../errors/InvocationException';
import { Schema } from '../validate/Schema';
import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export class Command implements ICommand {
    private readonly _schema: Schema;
    private readonly _function: IExecutable;

    public _name: string;

    public constructor(name: string, schema: Schema, func: IExecutable)
    {
        if (!name)
			throw new Error("Name cannot be null");

        if (!func)
			throw new Error("Function cannot be null");

        this._name = name;
        this._schema = schema;
        this._function = func;
    }

    public get name(): string {
        return this._name; 
    }
    
    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): any {
        if (this._schema)
            this._schema.validateAndThrowException(correlationId, args);

        try {
            return this._function.execute(correlationId, args, callback);
        } catch (ex) {
            throw new InvocationException(
                correlationId, 
                "EXEC_FAILED", 
                "Execution " + this.name + " failed: " + ex
            ).withDetails("command", this.name).wrap(ex);
        }
    }

    public validate(args: Parameters): ValidationResult[] {
        if (this._schema)
            return this._schema.validate(args);

        return [];
    }

}
