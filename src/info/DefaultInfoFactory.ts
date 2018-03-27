import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';

import { ContextInfo } from './ContextInfo';

export class DefaultInfoFactory extends Factory {
	public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "info", "default", "1.0");
	public static readonly ContextInfoDescriptor: Descriptor = new Descriptor("pip-services", "context-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor: Descriptor = new Descriptor("pip-services", "container-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor2: Descriptor = new Descriptor("pip-services-container", "container-info", "default", "*", "1.0");
	
	public constructor() {
		super();
		this.registerAsType(DefaultInfoFactory.ContextInfoDescriptor, ContextInfo);
		this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor, ContextInfo);
		this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor2, ContextInfo);
	}
}
