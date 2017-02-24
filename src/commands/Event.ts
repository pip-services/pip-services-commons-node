import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { InvocationException } from '../errors/InvocationException';
import { Parameters } from '../run/Parameters';
import { ValidationResult } from '../validate/ValidationResult';

export class Event implements IEvent {
    private _name: string;
    private _listeners: IEventListener[];

    public constructor(name: string) {
        if (!name)
            throw new Error("Name cannot be null");

        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public getListeners(): IEventListener[] {
        return this._listeners;
    }

    public addListener(listener: IEventListener): void {
        this._listeners.push(listener);
    }

    public removeListener(listener: IEventListener): void {
        var index = this._listeners.indexOf(listener);

        if (index > -1)
            this._listeners.splice(index, 1);
    }

    public notify(correlationId: string, args: Parameters): void {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                let listener: IEventListener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            } catch (ex) {
                throw new InvocationException(
                    correlationId,
                    "EXEC_FAILED",
                    "Raising event " + this.getName() + " failed: " + ex)
                    .withDetails("event", this.getName())
                    .wrap(ex);
            }
        }
    }
}
