import { IExecutable } from '../run/IExecutable';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export interface ICommand extends IExecutable {
    name: string;
    validate(args: Parameters): ValidationResult[];
}
