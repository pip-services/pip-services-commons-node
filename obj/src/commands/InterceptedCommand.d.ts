import { ICommand } from './ICommand';
import { ICommandIntercepter } from './ICommandIntercepter';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
export declare class InterceptedCommand implements ICommand {
    private readonly _intercepter;
    private readonly _next;
    constructor(intercepter: ICommandIntercepter, next: ICommand);
    getName(): string;
    execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void;
    validate(args: Parameters): ValidationResult[];
}
