import { NullLogger } from './NullLogger';
import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLoggerFactory implements IFactory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "logger", "default", "1.0");
	public static readonly NullLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "null", "default", "1.0");
	public static readonly ConsoleLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "console", "default", "1.0");
	public static readonly CompositeLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");

    public canCreate(locator: any): boolean {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return false;

        if (descriptor.match(DefaultLoggerFactory.NullLoggerDescriptor))
            return true;

        if (descriptor.match(DefaultLoggerFactory.ConsoleLoggerDescriptor))
            return true;

        if (descriptor.match(DefaultLoggerFactory.CompositeLoggerDescriptor))
            return true;

        return false;
    }

    public create(locator: any): any {
        if (locator == null)
            throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return null;

        if (descriptor.match(DefaultLoggerFactory.NullLoggerDescriptor))
            return new NullLogger();

        if (descriptor.match(DefaultLoggerFactory.ConsoleLoggerDescriptor))
            return new ConsoleLogger();

        if (descriptor.match(DefaultLoggerFactory.CompositeLoggerDescriptor))
            return new CompositeLogger();

        throw new CreateException(null, locator);
    }

}