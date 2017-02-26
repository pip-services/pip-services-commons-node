import { NullCounters } from './NullCounters';
import { LogCounters } from './LogCounters';
import { CompositeCounters } from './CompositeCounters';
import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultCountersFactory implements IFactory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "counters", "default", "1.0");
	public static readonly NullCountersDescriptor = new Descriptor("pip-services-commons", "counters", "null", "default", "1.0");
	public static readonly LogCountersDescriptor = new Descriptor("pip-services-commons", "counters", "log", "default", "1.0");
	public static readonly CompositeCountersDescriptor = new Descriptor("pip-services-commons", "counters", "composite", "default", "1.0");

    public canCreate(locator: any): boolean {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return false;

        if (descriptor.match(DefaultCountersFactory.NullCountersDescriptor))
            return true;

        if (descriptor.match(DefaultCountersFactory.LogCountersDescriptor))
            return true;

        if (descriptor.match(DefaultCountersFactory.CompositeCountersDescriptor))
            return true;

        return false;
    }

    public create(locator: any): any {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return null;

        if (descriptor.match(DefaultCountersFactory.NullCountersDescriptor))
            return new NullCounters();

        if (descriptor.match(DefaultCountersFactory.LogCountersDescriptor))
            return new LogCounters();

        if (descriptor.match(DefaultCountersFactory.CompositeCountersDescriptor))
            return new CompositeCounters();

        throw new CreateException(null, locator);
    }

}