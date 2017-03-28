let _ = require('lodash');

import { ICommand } from './ICommand';
import { InvocationException } from '../errors/InvocationException';
import { Schema } from '../validate/Schema';
import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export class Command implements ICommand {
    private readonly _schema: Schema;
    private readonly _function: (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => void;
    private _name: string;

    public constructor(name: string, schema: Schema, func: any) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");

        this._name = name;
        this._schema = schema;

        if (!_.isFunction(func))
            this._function = func.execute;
        else
            this._function = func;

        if (!_.isFunction(this._function))
            throw new Error("Function doesn't have function type");
    }

    public getName(): string {
        return this._name;
    }

    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
        if (this._schema) {
            try {
                this._schema.validateAndThrowException(correlationId, args);
            } catch (ex) {
                callback(ex, null);
                return;
            }
        }

        try {
            this._function(correlationId, args, callback);
        } catch (ex) {
            let err = new InvocationException(
                correlationId,
                "EXEC_FAILED",
                "Execution " + this.getName() + " failed: " + ex
            ).withDetails("command", this.getName()).wrap(ex);

            callback(err, null);
        }
    }

    public validate(args: Parameters): ValidationResult[] {
        if (this._schema)
            return this._schema.validate(args);

        return [];
    }
}
