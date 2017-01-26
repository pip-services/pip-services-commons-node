import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { NullCache } from './NullCache';
import { MemoryCache } from './MemoryCache';

export class DefaultCacheFactory implements IFactory, IDescriptable {
	/**
	 * Unique descriptor for the Memory Cache component
	 */
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services-common", "cache", "memory", "default", "1.0");
	 
    public getDescriptor(): Descriptor {
        return DefaultCacheFactory.Descriptor;
    }
	
	public canCreate(locator: any): boolean {
		if (locator == null)
			throw new Error("Locator cannot be null");
		
        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return false;

        if (descriptor.match(NullCache.Descriptor))
            return true;

        if (descriptor.match(MemoryCache.Descriptor))
            return true;
		
		return false;
	}
	
	public create(locator: any): any {
		if (locator == null)
			throw new Error("Locator cannot be null");

        let descriptor: Descriptor = <Descriptor>locator;

        if (descriptor == null) return null;

        if (descriptor.match(NullCache.Descriptor))
            return new NullCache();

        if (descriptor.match(MemoryCache.Descriptor))
            return new MemoryCache(descriptor.getName());
		
		throw new CreateException(null, locator);
	}
	
}
