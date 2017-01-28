import { IClosable } from './IClosable';
import { INotifiable } from './INotifiable';
import { Parameters } from './Parameters';

export class FixedRateTimer implements IClosable {
	private _task: INotifiable;
	private _delay: number;
	private _interval: number;
	private _timer: any;
    private _timeout: any;
	
	public constructor(task: INotifiable = null, interval: number = null, delay: number = null) {
		this._task = task;
		this._interval = interval;
		this._delay = delay;
	}

	public getTask(): INotifiable { return this._task; }
	public setTask(value: INotifiable): void { this._task = value; }

	public getDelay(): number { return this._delay; }
	public setDelay(value: number): void { this._delay = value; }
	
	public getInterval(): number { return this._interval; }
	public setInterval(value: number): void { this._interval = value; }
	
	public isStarted(): boolean { return this._timer != null; }
	
	public start(): void {
        // Stop previously set timer
        this.stop();
        
        // Introducing delay
        let delay = Math.max(0, this._delay - this._interval);

        this._timeout = setTimeout(() => {
            this._timeout = null;

            // Set a new timer
            this._timer = setInterval(() => {
                try {
                    this._task.notify("pip-commons-timer", new Parameters());
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
