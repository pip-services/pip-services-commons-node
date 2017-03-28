import { CommandSet } from './CommandSet';

export interface ICommandable {
    getCommandSet(): CommandSet;
}