import { LogLevel } from './LogLevel';
import { ErrorDescription } from '../errors/ErrorDescription';

export class LogMessage {	
    public constructor(level: LogLevel, source: string, correlationId: string, error: ErrorDescription, message: string) {
    	this.time = new Date();
        this.level = level;
        this.source = source;
        this.correlationId = correlationId;
        this.error = error;
        this.message = message;
    }

	public time: Date;
	public source: string;
	public level: LogLevel;
	public correlationId: string;
	public error: ErrorDescription;
	public message: string;
}