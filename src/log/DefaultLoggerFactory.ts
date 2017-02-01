import { NullLogger } from './NullLogger';
//import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLoggerFactory implements IFactory, IDescriptable {
	public static readonly descriptor: Descriptor = new Descriptor("pip-services-commons", "counters", "logger", "default", "1.0");

	public getDescriptor(): Descriptor {
		return DefaultLoggerFactory.descriptor;
	}

    public canCreate(locator: any): boolean {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return false;

        if (descriptor.match(NullLogger.descriptor))
            return true;

        // if (descriptor.match(ConsoleLogger.descriptor))
        //     return true;

        if (descriptor.match(CompositeLogger.descriptor))
            return true;

        return false;
    }

    public create(locator: any): any {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return null;

        if (descriptor.match(NullLogger.descriptor))
            return new NullLogger();

        // if (descriptor.match(ConsoleLogger.descriptor))
        //     return new ConsoleLogger();

        if (descriptor.match(CompositeLogger.descriptor))
            return new CompositeLogger();

        throw new CreateException(null, locator);
    }

}