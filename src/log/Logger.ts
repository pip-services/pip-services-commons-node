let util = require('util');

import { IReconfigurable } from '../config/IReconfigurable';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LogLevelConverter } from './LogLevelConverter';
import { ConfigParams } from '../config/ConfigParams';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
import { ContextInfo } from '../info/ContextInfo';
import { Descriptor } from '../refer/Descriptor';

export abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel = LogLevel.Info;
    protected _source: string = null;

    protected constructor() { }

    public configure(config: ConfigParams): void {
        this._level = LogLevelConverter.toLogLevel(
            config.getAsObject("level"),
            this._level
        );
        this._source = config.getAsStringWithDefault("source", this._source);
    }

    public setReferences(references: IReferences) {
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "*", "*", "1.0"));
        if (contextInfo != null && this._source == null) {
            this._source = contextInfo.name;
        }
    }

    public getLevel(): LogLevel {
        return this._level;
    }

    public setLevel(value: LogLevel): void {
        this._level = value;
    }

    public getSource(): string {
        return this._source;
    }

    public setSource(value: string): void {
        this._source = value;
    }
    
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;

    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            // message = message.replace(/{(\d+)}/g, function (match, number) {
            //     return typeof args[number] != 'undefined' ? args[number] : match;
            // });
            message = util.format(message, ...args);
        }

        this.write(level, correlationId, error, message);
    }

    public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(level, correlationId, error, message, ...args);
    }

    public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Fatal, correlationId, error, message, ...args);
    }

    public error(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Error, correlationId, error, message, ...args);
    }

    public warn(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, ...args);
    }

    public info(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Info, correlationId, null, message, ...args);
    }

    public debug(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Debug, correlationId, null, message, ...args);
    }

    public trace(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Trace, correlationId, null, message, ...args);
    }

    protected composeError(error: Error): string {
        let builder: string = "";

        if (builder.length > 0)
            builder += " Caused by error: ";

        builder += error.message;
        builder += " StackTrace: ";
        builder += error.stack;

        return builder;
    }
}