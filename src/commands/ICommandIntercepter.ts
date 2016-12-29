import { ICommand } from './ICommand';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export interface ICommandIntercepter {
    getName(command: ICommand): string;
    execute(correlationId: string, command: ICommand, args: Parameters): any;
    validate(command: ICommand, args: Parameters): ValidationResult[];
}
