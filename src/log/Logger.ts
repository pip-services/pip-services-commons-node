import { IReconfigurable } from '../config/IReconfigurable';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LogLevelConverter } from './LogLevelConverter';
import { ConfigParams } from '../config/ConfigParams';

export abstract class Logger implements ILogger, IReconfigurable {
	
    private _level: LogLevel = LogLevel.Info;
	
	protected constructor() {
    }

    public configure(config: ConfigParams): void {
        this._level = LogLevelConverter.toLogLevel(
    		config.getAsObject("level")
		);
    }

	public getLevel(): LogLevel { 
        return this._level; 
    }

	public setLevel(value: LogLevel): void { 
        this._level = value; 
    }

	protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string) : void;

    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            message = message.replace(/{(\d+)}/g, function(match, number) { 
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match;
                });
        }
        
        this.write(level, correlationId, error, message);
	}
	
    public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
    	this.formatAndWrite(level, correlationId, error, message, args);
    }

    public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void {
    	this.formatAndWrite(LogLevel.Fatal, correlationId, error, message, args);
    }

    public error(correlationId: string, error: Error, message: string, ...args: any[]): void {
    	this.formatAndWrite(LogLevel.Error, correlationId, error, message, args);
    }

    public warn(correlationId: string, message: string, ...args: any[]) : void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, args);
    }

    public info(correlationId: string, message: string, ...args: any[]) : void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, args);
    }

    public debug(correlationId: string, message: string, ...args: any[]) : void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, args);
    }

    public trace(correlationId: string, message: string, ...args: any[]) : void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, args);
    }  
}