import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
import { InvocationException } from '../errors/InvocationException';

export abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    private static readonly DefaultInterval = 300000;
    private _interval: number;

    private readonly _cache: { [id: string]: Counter } = {};
    private _updated: boolean;
    private _lastDumpTime: number = new Date().getDate();

    public CachedCounters() {
        this.setInterval(CachedCounters.DefaultInterval);
    }

    public getInterval() {
        return this._interval;
    }

    public setInterval(value: number) {
        this._interval = value;
    }

    protected abstract save(counters: Counter[]): void;

    public configure(config: ConfigParams): void {
        this.setInterval(config.getAsLongWithDefault("interval", this.getInterval()));
    }

    public clear(name: string): void {
        delete this._cache[name];
    }

    public clearAll(): void {
        for (var key in this._cache)
            delete this._cache[key];

        this._updated = false;
    }

    public beginTiming(name: string): Timing {
        return new Timing(name, this);
    }

    public dump(): void {
        if (!this._updated) return;

        var counters = this.getAll();

        this.save(counters);

        this._updated = false;
        this._lastDumpTime = new Date().getDate();
    }

    protected update(): void {
        this._updated = true;
        if (new Date().getDate() > this._lastDumpTime + this.getInterval()) {
            try {
                this.dump();
            } catch (InvocationException) {
                // Todo: decide what to do
            }
        }
    }

    public getAll(): Counter[] {
        let result: Counter[] = [];

        for (var key in this._cache)
            result.push(this._cache[key]);

        return result;
    }

    public get(name: string, type: CounterType): Counter {
        if (!name)
            throw new Error("Name cannot be null");

        let counter: Counter = this._cache[name];

        if (counter == null || counter.getType() != type) {
            counter = new Counter(name, type);
            this._cache[name] = counter;
        }

        return counter;
    }

    private calculateStats(counter: Counter, value: number): void {
        if (counter == null)
            throw new Error("Counter cannot be null");

        counter.setLast(value);
        counter.setCount(counter.getCount() != null ? counter.getCount() + 1 : 1);
        counter.setMax(counter.getMax() != null ? Math.max(counter.getMax(), value) : value);
        counter.setMin(counter.getMin() != null ? Math.min(counter.getMin(), value) : value);
        counter.setAverage((counter.getAverage() != null && counter.getCount() > 1
            ? (counter.getAverage() * (counter.getCount() - 1) + value) / counter.getCount() : value));
    }

    public endTiming(name: string, elapsed: number): void {
        let counter: Counter = this.get(name, CounterType.Interval);
        this.calculateStats(counter, elapsed);
        this.update();
    }

    public stats(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Statistics);
        this.calculateStats(counter, value);
        this.update();
    }

    public last(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.LastValue);
        counter.setLast(value);
        this.update();
    }

    public timestampNow(name: string): void {
        this.timestamp(name, new Date());
    }

    public timestamp(name: string, value: Date): void {
        let counter: Counter = this.get(name, CounterType.Timestamp);
        counter.setTime(value);
        this.update();
    }

    public incrementOne(name: string): void {
        this.increment(name, 1);
    }

    public increment(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Increment);
        counter.setCount(counter.getCount() ? counter.getCount() + value : value);
        this.update();
    }

}