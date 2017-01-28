import { ICommand } from './ICommand';
import { ICommandIntercepter } from './ICommandIntercepter';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export class InterceptedCommand implements ICommand {
    private readonly _intercepter: ICommandIntercepter;
    private readonly _next: ICommand;

    public constructor(intercepter: ICommandIntercepter, next: ICommand) {
        this._intercepter = intercepter;
        this._next = next;
    }

    public getName(): string {
        return this._intercepter.getName(this._next);
    }

    public execute(correlationId: string, args: Parameters, callback: (err: any, result: any) => void): void {
        this._intercepter.execute(correlationId, this._next, args, callback);
    }

    public validate(args: Parameters): ValidationResult[] {
        return this._intercepter.validate(this._next, args);
    }

}
