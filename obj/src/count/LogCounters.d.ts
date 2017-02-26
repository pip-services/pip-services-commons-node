import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
export declare class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger;
    LogCounters(): void;
    setReferences(references: IReferences): void;
    private counterToString(counter);
    protected save(counters: Counter[]): void;
}
