import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
export declare abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    private static readonly DefaultInterval;
    private _interval;
    private readonly _cache;
    private _updated;
    private _lastDumpTime;
    CachedCounters(): void;
    interval: number;
    protected abstract save(counters: Counter[]): void;
    configure(config: ConfigParams): void;
    clear(name: string): void;
    clearAll(): void;
    beginTiming(name: string): Timing;
    dump(): void;
    protected update(): void;
    getAll(): Counter[];
    get(name: string, type: CounterType): Counter;
    private calculateStats(counter, value);
    endTiming(name: string, elapsed: number): void;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
