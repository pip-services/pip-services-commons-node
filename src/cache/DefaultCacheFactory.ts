import { IFactory } from '../build/IFactory';
import { CreateException } from '../build/CreateException';
import { Descriptor } from '../refer/Descriptor';
import { NullCache } from './NullCache';
import { MemoryCache } from './MemoryCache';

export class DefaultCacheFactory implements IFactory {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services-commons", "factory", "cache", "default", "1.0");
    public static readonly NullCacheDescriptor: Descriptor = new Descriptor("pip-services-commons", "cache", "null", "default", "1.0");
    public static readonly MemoryCacheDescriptor: Descriptor = new Descriptor("pip-services-commons", "cache", "memory", "default", "1.0");

    public canCreate(locator: any): boolean {
        if (locator instanceof Descriptor) {
            let descriptor: Descriptor = <Descriptor>locator;

            if (descriptor.match(DefaultCacheFactory.NullCacheDescriptor))
                return true;

            if (descriptor.match(DefaultCacheFactory.MemoryCacheDescriptor))
                return true;
        }

        return false;
    }

    public create(locator: any): any {
        if (locator instanceof Descriptor) {
            let descriptor: Descriptor = <Descriptor>locator;

            if (descriptor.match(DefaultCacheFactory.NullCacheDescriptor))
                return new NullCache();

            if (descriptor.match(DefaultCacheFactory.MemoryCacheDescriptor))
                return new MemoryCache();
        }

        return null;
    }

}
