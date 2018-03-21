import { NullLogger } from './NullLogger';
import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLoggerFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "logger", "default", "1.0");
	public static readonly NullLoggerDescriptor = new Descriptor("pip-services", "logger", "null", "*", "1.0");
	public static readonly NullLoggerDescriptor2 = new Descriptor("pip-services-commons", "logger", "null", "*", "1.0");
	public static readonly ConsoleLoggerDescriptor = new Descriptor("pip-services", "logger", "console", "*", "1.0");
	public static readonly ConsoleLoggerDescriptor2 = new Descriptor("pip-services-commons", "logger", "console", "*", "1.0");
	public static readonly CompositeLoggerDescriptor = new Descriptor("pip-services", "logger", "composite", "*", "1.0");
	public static readonly CompositeLoggerDescriptor2 = new Descriptor("pip-services-commons", "logger", "composite", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger);
		this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor2, NullLogger);
		this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger);
		this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor2, ConsoleLogger);
		this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger);
		this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor2, CompositeLogger);
	}
}