import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class CompositeCounters implements ICounters, ITimingCallback, IReferenceable, IDescriptable {
    static readonly descriptor: Descriptor;
    protected readonly _counters: ICounters[];
    CompositeCounters(references?: IReferences): void;
    getDescriptor(): Descriptor;
    setReferences(references: IReferences): void;
    beginTiming(name: string): Timing;
    endTiming(name: string, elapsed: number): void;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
