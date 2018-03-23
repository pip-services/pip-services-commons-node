import { LogLevel } from './LogLevel';
import { ErrorDescription } from '../errors/ErrorDescription';

export class LogMessage {	
	public time: Date;
	public source: string;
	public level: string;
	public correlation_id: string;
	public error: ErrorDescription;
	public message: string;
}