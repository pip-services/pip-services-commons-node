import { NullCounters } from './NullCounters';
import { LogCounters } from './LogCounters';
import { CompositeCounters } from './CompositeCounters';
import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultCountersFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "counters", "default", "1.0");
	public static readonly NullCountersDescriptor = new Descriptor("pip-services-commons", "counters", "null", "*", "1.0");
	public static readonly LogCountersDescriptor = new Descriptor("pip-services-commons", "counters", "log", "*", "1.0");
	public static readonly CompositeCountersDescriptor = new Descriptor("pip-services-commons", "counters", "composite", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultCountersFactory.NullCountersDescriptor, NullCounters);
		this.registerAsType(DefaultCountersFactory.LogCountersDescriptor, LogCounters);
		this.registerAsType(DefaultCountersFactory.CompositeCountersDescriptor, CompositeCounters);
	}
}