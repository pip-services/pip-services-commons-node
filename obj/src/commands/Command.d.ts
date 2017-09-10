import { ICommand } from './ICommand';
import { Schema } from '../validate/Schema';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
export declare class Command implements ICommand {
    private readonly _schema;
    private readonly _function;
    private _name;
    constructor(name: string, schema: Schema, func: any);
    getName(): string;
    execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
    validate(args: Parameters): ValidationResult[];
}
