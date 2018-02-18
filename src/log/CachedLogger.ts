import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
import { ErrorDescription } from '../errors/ErrorDescription';
import { ErrorDescriptionFactory } from '../errors/ErrorDescriptionFactory';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';

export abstract class CachedLogger extends Logger implements IReconfigurable {
	private static readonly _defaultInterval: number = 60000;
	
    protected _cache: LogMessage[] = [];
    protected _updated: boolean = false;
    protected _lastDumpTime: number = new Date().getTime();
    protected _interval: number = CachedLogger._defaultInterval;
	
	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
		let error: ErrorDescription = ex != null ? ErrorDescriptionFactory.create(ex) : null;
		let logMessage: LogMessage = new LogMessage(level, this._source, correlationId, error, message);
		
        this._cache.push(logMessage);
		
		this.update();
	}

    protected abstract save(messages: LogMessage[]): void;

    public configure(config: ConfigParams): void {
        super.configure(config);
        
        this._interval = config.getAsLongWithDefault("interval", this._interval);
    }
    
    public clear(): void {
        this._cache = [];
	    this._updated = false;
    }

    public dump(): void {
        if (this._updated) {
            if (!this._updated) return;
            
            let messages = this._cache;
            this._cache = [];
            
            this.save(messages);

            this._updated = false;
            this._lastDumpTime = new Date().getTime();
        }
    }

    protected update(): void {
    	this._updated = true;
    	let now = new Date().getTime();

    	if (now > this._lastDumpTime + this._interval) {
    		try {
    			this.dump();
    		} catch (ex) {
    			// Todo: decide what to do
    		}
    	}
    }
}
