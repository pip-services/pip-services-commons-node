import { NullLogger } from './NullLogger';
import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { FluentdLogger } from './FluentdLogger';
import { Factory } from '../build/Factory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';

export class DefaultLoggerFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services-commons", "factory", "logger", "default", "1.0");
	public static readonly NullLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "null", "*", "1.0");
	public static readonly ConsoleLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "console", "*", "1.0");
	public static readonly CompositeLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "composite", "*", "1.0");
	public static readonly FluentdLoggerDescriptor = new Descriptor("pip-services-commons", "logger", "fluentd", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger);
		this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger);
		this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger);
		this.registerAsType(DefaultLoggerFactory.FluentdLoggerDescriptor, FluentdLogger);
	}
}