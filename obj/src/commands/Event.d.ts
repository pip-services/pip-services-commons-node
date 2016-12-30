import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { Parameters } from '../run/Parameters';
export declare class Event implements IEvent {
    _name: string;
    _listeners: IEventListener[];
    constructor(name: string);
    readonly name: string;
    readonly listeners: IEventListener[];
    addListener(listener: IEventListener): void;
    removeListener(listener: IEventListener): void;
    notify(correlationId: string, args: Parameters): void;
}
