import { Timing } from './Timing';
import { ICounters } from './ICounters';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';

export class NullCounters implements ICounters, IDescriptable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "null", "default", "1.0");

	public NullCounters() { }

	public getDescriptor(): Descriptor {
		return NullCounters.descriptor;
	}

	public beginTiming(name: string): Timing {
		return new Timing();
	}

	public stats(name: string, value: number): void { }
	public last(name: string, value: number): void { }
	public timestampNow(name: string): void { }
	public timestamp(name: string, value: Date): void { }
	public incrementOne(name: string): void { }
	public increment(name: string, value: number): void { }
}