import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { CompositeLogger } from '../log/CompositeLogger';
import { IDescriptable } from '../refer/IDescriptable';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
import { Descriptor } from '../refer/Descriptor';
import { StringConverter } from '../convert/StringConverter';

export class LogCounters extends CachedCounters implements IDescriptable, IReferenceable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "log", "default", "1.0");

    private readonly _logger: CompositeLogger = new CompositeLogger();

    public LogCounters() { }

	public getDescriptor(): Descriptor {
		return LogCounters.descriptor;
	}

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
    }

    private counterToString(counter: Counter): string {
        var result = "Counter " + counter.getName() + " { ";
        result += "\"type\": " + counter.getType();
        if (counter.getLast() != null)
            result += ", \"last\": " + StringConverter.toString(counter.getLast());
        if (counter.getCount() != null)
            result += ", \"count\": " + StringConverter.toString(counter.getCount());
        if (counter.getMin() != null)
            result += ", \"min\": " + StringConverter.toString(counter.getMin());
        if (counter.getMax() != null)
            result += ", \"max\": " + StringConverter.toString(counter.getMax());
        if (counter.getAverage() != null)
            result += ", \"avg\": " + StringConverter.toString(counter.getAverage());
        if (counter.getTime() != null)
            result += ", \"time\": " + StringConverter.toString(counter.getTime());
        result += " }";
        return result;
    }

    protected save(counters: Counter[]): void {
        if (this._logger == null || counters == null)
            return;

        if (counters.length == 0) return;

        counters.sort((c1, c2) => {
            if (c1.getName() < c2.getName()) return -1;
            if (c1.getName() > c2.getName()) return 1;
            return 0;
        });

        for(var i = 0; i < counters.length; i++) {
            this._logger.info(null, this.counterToString(counters[i]));
        }
    }

}