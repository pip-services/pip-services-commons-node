import { Timing } from './Timing';
import { ICounters } from './ICounters';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';

export class NullCounters implements ICounters, IDescriptable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "null", "default", "1.0");

	public NullCounters() {}
	
	public getDescriptor() : Descriptor{ 
		return NullCounters.descriptor; 
	}
	
    beginTiming(name: string) : Timing {
        return new Timing();
    };

    stats(name: string, value: number) : void {};
	last(name: string, value: number) : void {};
	timestampNow(name: string) : void {};
	timestamp(name: string, value: Date) : void {};
	incrementOne(name: string) : void {};
	increment(name: string, value: number) : void {};
}