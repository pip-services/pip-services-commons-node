import { Timing } from './Timing';
import { ICounters } from './ICounters';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class NullCounters implements ICounters, IDescriptable {
    static readonly descriptor: Descriptor;
    NullCounters(): void;
    getDescriptor(): Descriptor;
    beginTiming(name: string): Timing;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
