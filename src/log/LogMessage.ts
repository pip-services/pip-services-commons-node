import { LogLevel } from './LogLevel';
import { ErrorDescription } from '../errors/ErrorDescription';

export class LogMessage {
	private _time: Date;
	private _source: string;
	private  _level: LogLevel;
	private _correlationId: string;
	private _error: ErrorDescription;
	private _message: string;
	
    public constructor(level: LogLevel,source: string,correlationId: string, error: ErrorDescription, message: string) {
    	this._time = new Date();
        this._level = level;
        this._source = source;
        this._correlationId = correlationId;
        this._error = error;
        this._message = message;
    }

    public getTime() : Date { return this._time; }
    public setTime(value: Date) : void { this._time = value; }

    public getSource() : string { return this._source; }
    public setSource(value: string) : void { this._source = value; }

    public getLevel() : LogLevel { return this._level; }
    public setLevel(value: LogLevel) : void { this._level = value; }

    public getCorrelationId() : string { return this._correlationId; }
    public setCorrelationId(value: string) : void { this._correlationId = value; }

    public getError() : ErrorDescription { return this._error; }
    public setError(value: ErrorDescription) : void { this._error = value; }
    
    public getMessage() : string { return this._message; }
    public setMessage(value: string)  : void { this._message = value; }
}