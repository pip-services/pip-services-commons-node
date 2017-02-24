import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { IEventListener } from './IEventListener';
import { ICommandIntercepter } from './ICommandIntercepter';
import { InterceptedCommand } from './InterceptedCommand';
import { BadRequestException } from '../errors/BadRequestException';
import { ValidationException } from '../validate/ValidationException';
import { ValidationResult } from '../validate/ValidationResult';
import { ValidationResultType } from '../validate/ValidationResultType';
import { Parameters } from '../run/Parameters';
import { IdGenerator } from '../data/IdGenerator';

export class CommandSet {
    private readonly _commands: ICommand[] = [];
    private readonly _events: IEvent[] = [];
    private readonly _intercepters: ICommandIntercepter[] = [];

    private _commandsByName: { [name: string]: ICommand } = {};
    private _eventsByName: { [name: string]: IEvent } = {};

    public constructor() { }

    public getCommands(): ICommand[] {
        return this._commands;
    }

    public getEvents(): IEvent[] {
        return this._events;
    }

    public findCommand(commandName: string): ICommand {
        return this._commandsByName[commandName];
    }

    public findEvent(eventName: string): IEvent {
        return this._eventsByName[eventName];
    }

    private buildCommandChain(command: ICommand): void {
        let next: ICommand = command;

        for (var i = this._intercepters.length - 1; i >= 0; i--)
            next = new InterceptedCommand(this._intercepters[i], next);

        this._commandsByName[next.getName()] = next;
    }

    private rebuildAllCommandChains(): void {
        this._commandsByName = {};

        for (var i = 0; i < this._commands.length; i++) {
            let command: ICommand = this._commands[i];
            this.buildCommandChain(command);
        }
    }

    public addCommand(command: ICommand): void {
        this._commands.push(command);
        this.buildCommandChain(command);
    }

    public addCommands(commands: ICommand[]): void {
        for (var i = 0; i < commands.length; i++) 
            this.addCommand(commands[i]);
    }

    public addEvent(event: IEvent): void {
        this._events.push(event);
        this._eventsByName[event.getName()] = event;
    }

    public addEvents(events: IEvent[]): void {
        for (var i = 0; i < events.length; i++)
            this.addEvent(events[i]);
    }

    public addCommandSet(commandSet: CommandSet): void {
        this.addCommands(commandSet.getCommands());
        this.addEvents(commandSet.getEvents());
    }

    public addListener(listener: IEventListener): void {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].addListener(listener);
    }

    public removeListener(listener: IEventListener): void {
        for (var i = 0; i < this._events.length; i++)
            this._events[i].removeListener(listener);
    }

    public addInterceptor(intercepter: ICommandIntercepter): void {
        this._intercepters.push(intercepter);
        this.rebuildAllCommandChains();
    }

    public execute(correlationId: string, commandName: string, args: Parameters, callback: (err: any, result: any) => void): void {
        let cref = this.findCommand(commandName);

        if (!cref) {
            let err =  new BadRequestException(
                correlationId,
                "CMD_NOT_FOUND",
                "Request command does not exist"
            )
            .withDetails("command", commandName);

            callback(err, null);
        }

        if (!correlationId)
            correlationId = IdGenerator.nextShort();

        let results = cref.validate(args);
        try {
            ValidationException.throwExceptionIfNeeded(correlationId, results, false);
            cref.execute(correlationId, args, callback);
        } catch (ex) {
            callback(ex, null);
        }

    }

    public validate(commandName: string, args: Parameters): ValidationResult[] {
        let cref = this.findCommand(commandName);

        if (!cref) {
            let result: ValidationResult[] = [];
            result.push(new ValidationResult(
                null, 
                ValidationResultType.Error, 
                "CMD_NOT_FOUND", 
                "Requested command does not exist", 
                null, 
                null
            ));
            return result;
        }

        return cref.validate(args);
    }

    public notify(correlationId: string, eventName: string, args: Parameters): void {
        let event = this.findEvent(eventName);

        if (event) event.notify(correlationId, args);
    }
}
