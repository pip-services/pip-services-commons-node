import { IClosable } from './IClosable';
import { INotifiable } from './INotifiable';
export declare class FixedRateTimer implements IClosable {
    private _task;
    private _delay;
    private _interval;
    private _timer;
    private _timeout;
    constructor(task?: INotifiable, interval?: number, delay?: number);
    getTask(): INotifiable;
    setTask(value: INotifiable): void;
    getDelay(): number;
    setDelay(value: number): void;
    getInterval(): number;
    setInterval(value: number): void;
    isStarted(): boolean;
    start(): void;
    stop(): void;
    close(correlationId: string, callback?: (err: any) => void): void;
}
