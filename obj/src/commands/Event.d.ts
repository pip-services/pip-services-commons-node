import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { Parameters } from '../run/Parameters';
export declare class Event implements IEvent {
    private _name;
    private _listeners;
    constructor(name: string);
    readonly name: string;
    readonly listeners: IEventListener[];
    addListener(listener: IEventListener): void;
    removeListener(listener: IEventListener): void;
    notify(correlationId: string, args: Parameters): void;
}
