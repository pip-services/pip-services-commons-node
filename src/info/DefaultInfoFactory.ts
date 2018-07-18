import { Factory } from '../build/Factory';
import { Descriptor } from '../refer/Descriptor';

import { ContextInfo } from './ContextInfo';

/**
 * Contains static read-only descriptors for ContextInfo and ContainerInfo (as well as a default info descriptor). 
 * There are two different ContainerInfoDescriptors for backward compatibility purposes.
 * 
 * @see Factory
 */
export class DefaultInfoFactory extends Factory {
	public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "info", "default", "1.0");
	public static readonly ContextInfoDescriptor: Descriptor = new Descriptor("pip-services", "context-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor: Descriptor = new Descriptor("pip-services", "container-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor2: Descriptor = new Descriptor("pip-services-container", "container-info", "default", "*", "1.0");
	
    /**
	 * Registers the ContextInfoDescriptor, ContainerInfoDescriptor, and ContainerInfoDescriptor2 (backward compatibility) 
	 * descriptors as types in this factory.
	 * 
	 * @see Factory#Factory
	 */
	public constructor() {
		super();
		this.registerAsType(DefaultInfoFactory.ContextInfoDescriptor, ContextInfo);
		this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor, ContextInfo);
		this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor2, ContextInfo);
	}
}
