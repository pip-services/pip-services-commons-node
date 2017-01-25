import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';



export class NullLogger implements ILogger, IDescriptable {
	private readonly _descriptor : Descriptor = new Descriptor("pip-services-commons", "logger", "null", "default", "1.0");
	
	public constructor() {}
	
	public getDescriptor() : Descriptor { 
		return this._descriptor; 
	}
	
	public getLevel() : LogLevel { return LogLevel.None; }
	public setLevel(value: LogLevel ) : void { }

    public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]) : void { }
    public fatal(correlationId: string, error: Error, message: string, ...args: any[]) : void {}
	public error(correlationId: string, error: Error, message: string, ...args: any[]) : void {}
    public warn(correlationId: string, message: string, ...args: any[]) : void {}
    public info(correlationId: string, message: string, ...args: any[]) : void {}
    public debug(correlationId: string, message: string, ...args: any[]) : void {}
    public trace(correlationId: string, message: string, ...args: any[]) : void {}  
}