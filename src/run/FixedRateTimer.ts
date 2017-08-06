let _ = require('lodash');

import { IClosable } from './IClosable';
import { INotifiable } from './INotifiable';
import { Parameters } from './Parameters';

export class FixedRateTimer implements IClosable {
    private _task: INotifiable;
    private _callback: () => void;
	private _delay: number;
	private _interval: number;
	private _timer: any;
    private _timeout: any;
	
	public constructor(taskOrCallback: any = null, interval: number = null, delay: number = null) {
        if (_.isObject(taskOrCallback) && _.isFunction(taskOrCallback.notify))
            this.setTask(taskOrCallback);
        else 
		    this.setCallback(taskOrCallback);

        this.setInterval(interval);
		this.setDelay(delay);
	}

	public getTask(): INotifiable {return this._task; }
	public setTask(value: INotifiable): void {
        this._task = value;
        this._callback = () => { 
            this._task.notify("pip-commons-timer", new Parameters()); 
        }
    }

    public getCallback(): () => void { return this._callback; }
    public setCallback(value: () => void) {
        this._callback = value;
        this._task = null;
    }

	public getDelay(): number { return this._delay; }
	public setDelay(value: number): void { this._delay = value; }
	
	public getInterval(): number { return this._interval; }
	public setInterval(value: number): void { this._interval = value; }
	
	public isStarted(): boolean { return this._timer != null; }
    
	public start(): void {
        // Stop previously set timer
        this.stop();
        
        // Exit if interval is not defined
        if (this._interval == null || this._interval <= 0) return;

        // Introducing delay
        let delay = Math.max(0, this._delay - this._interval);

        this._timeout = setTimeout(() => {
            this._timeout = null;

            // Set a new timer
            this._timer = setInterval(() => {
                try {
                    if (this._callback) this._callback();
                } catch (ex) {
                    // Ignore or better log!
                }
            }, this._interval);
        }, delay);
	}
	
	public stop(): void {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }

        if (this._timer != null) {
            clearInterval(this._timer);
            this._timer = null;
        }
	}
	
	public close(correlationId: string, callback?: (err: any) => void): void {
		this.stop();

        if (callback != null)
            callback(null);
	}
}
