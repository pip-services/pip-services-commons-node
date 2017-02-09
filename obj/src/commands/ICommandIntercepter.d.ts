import { ICommand } from './ICommand';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';
export interface ICommandIntercepter {
    getName(command: ICommand): string;
    execute(correlationId: string, command: ICommand, args: Parameters, callback: (err: any, result: any) => void): void;
    validate(command: ICommand, args: Parameters): ValidationResult[];
}
