import { NullCounters } from './NullCounters';
import { LogCounters } from './LogCounters';
import { CompositeCounters } from './CompositeCounters';
import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';

export abstract class DefaultCountersFactory implements IFactory, IDescriptable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "log", "default", "1.0");

	public getDescriptor(): Descriptor {
		return DefaultCountersFactory.descriptor;
	}

    public canCreate(locator: any): boolean {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return false;

        if (descriptor.match(NullCounters.descriptor))
            return true;

        if (descriptor.match(LogCounters.descriptor))
            return true;

        if (descriptor.match(CompositeCounters.descriptor))
            return true;

        return false;
    }

    public create(locator: any): any {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return null;

        if (descriptor.match(NullCounters.descriptor))
            return new NullCounters();

        if (descriptor.match(LogCounters.descriptor))
            return new LogCounters();

        if (descriptor.match(CompositeCounters.descriptor))
            return new CompositeCounters();

        throw new CreateException(null, locator);
    }

}