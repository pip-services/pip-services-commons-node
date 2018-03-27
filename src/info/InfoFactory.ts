import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';

import { ContextInfo } from './ContextInfo';

export class InfoFactory extends Factory {
	public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "info", "default", "1.0");
	public static readonly ContextInfoDescriptor: Descriptor = new Descriptor("pip-services", "context-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor: Descriptor = new Descriptor("pip-services", "container-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor2: Descriptor = new Descriptor("pip-services-container", "container-info", "default", "*", "1.0");
	
	public constructor() {
		super();
		this.registerAsType(InfoFactory.ContextInfoDescriptor, ContextInfo);
		this.registerAsType(InfoFactory.ContainerInfoDescriptor, ContextInfo);
		this.registerAsType(InfoFactory.ContainerInfoDescriptor2, ContextInfo);
	}
}
