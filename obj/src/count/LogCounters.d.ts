import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { IDescriptable } from '../refer/IDescriptable';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
import { Descriptor } from '../refer/Descriptor';
export declare class LogCounters extends CachedCounters implements IDescriptable, IReferenceable {
    static readonly descriptor: Descriptor;
    private readonly _logger;
    LogCounters(): void;
    getDescriptor(): Descriptor;
    setReferences(references: IReferences): void;
    private counterToString(counter);
    protected save(counters: Counter[]): void;
}
