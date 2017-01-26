import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { IReferenceable } from '../refer/IReferenceable';
import { IReferences } from '../refer/IReferences';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { InternalException } from '../errors/InternalException';

export class CompositeCounters implements ICounters, ITimingCallback, IReferenceable, IDescriptable {
	
    public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "composite", "default", "1.0");

    protected readonly _counters: ICounters[] = [];

	public CompositeCounters(references: IReferences = null) {
        if (references != null) 
            this.setReferences(references);
    }
	
	public getDescriptor(): Descriptor {
		return CompositeCounters.descriptor; 
	}

    public setReferences(references: IReferences): void {
        var counters = references.getOptional<ICounters>(new Descriptor(null, "counters", null, null, null));
        for(var i = 0; i < counters.length; i++) {
            let counter: ICounters = counters[i];

            if (counter != this as ICounters)
                this._counters.push(counter);
        }
    }

    public beginTiming(name: string) : Timing {
        return new Timing();
    };

    public endTiming(name: string, elapsed: number) : void {
        for (var i = 0; i < this. _counters.length; i++) {
            let counter: any =  this. _counters[i];
            var callback = counter as ITimingCallback;
            if (callback != null)
                callback.endTiming(name, elapsed);
        }
    };

    public stats(name: string, value: number) : void {
        for (var i = 0; i < this. _counters.length; i++) {
            this. _counters[i].stats(name, value);
        }
    };

    public last(name: string, value: number): void {
        for(var i = 0; i < this._counters.length; i++) {
            this._counters[i].last(name, value);
        }
    }

    public timestampNow(name: string): void {
        this.timestamp(name, new Date());
    }

    public timestamp(name: string, value: Date): void {
        for(var i = 0; i < this._counters.length; i++) {
            this._counters[i].timestamp(name, value);
        }
    }

    public incrementOne(name: string): void {
        this.increment(name, 1);
    }

    public increment(name: string, value: number): void {
        if (!name)
    		throw new Error("Name cannot be null");

        for(var i = 0; i < this._counters.length; i++) {
            this._counters[i].increment(name, value);
        }
    }
}