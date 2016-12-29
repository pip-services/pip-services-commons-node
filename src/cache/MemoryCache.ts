import { ICache } from './ICache';
import { CacheEntry } from './CacheEntry';
import { Descriptor } from '../refer/Descriptor';
import { IDescriptable } from '../refer/IDescriptable';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
import { NameResolver } from '../config/NameResolver';
import { ApplicationException } from '../errors/ApplicationException';

export class MemoryCache implements ICache, IDescriptable, IReconfigurable {
	/**
	 * Default configuration for memory cache component
	 */
    //milliseconds
    private static readonly _defaultTimeout: number = 60000;
    private static readonly _defaultMaxSize: number = 1000;

    private _cache: any = {};
    private _count: number = 0;

    private _name: string;
    //milliseconds
    private _timeout: number;
    private _maxSize: number;

	/**
	 * Unique descriptor for the Memory Cache component
	 */
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services-common", "cache", "memory", "default", "1.0");

	/**
	 * Creates instance of local in-memory cache component
	 */
    public constructor(name: string = null, config: ConfigParams = null)
    {
        this._name = name;
        this._timeout = MemoryCache._defaultTimeout;
        this._maxSize = MemoryCache._defaultMaxSize;

        if (config != null) this.configure(config);
    }

    public get name(): string {
        return this._name; 
    }

    public set name(value: string) {
        this._name = value; 
    }

    public get timeout(): number {
        return this._timeout; 
    }

    public set timeout(value: number) {
        this._timeout = value; 
    }
   
    public get maxSize(): number {
        return this._maxSize; 
    }

    public set maxSize(value: number) {
        this._maxSize = value; 
    }
 
    public getDescriptor(): Descriptor {
        return MemoryCache.Descriptor;
    }

	/**
	 * Sets component configuration parameters and switches component
	 * to 'Configured' state. The configuration is only allowed once
	 * right after creation. Attempts to perform reconfiguration will 
	 * cause an exception.
	 * @param config the component configuration parameters.
	 * @throws MicroserviceError when component is in illegal state 
	 * or configuration validation fails. 
	 */
    public configure(config: ConfigParams): void {
        this.name = NameResolver.resolve(config, this.name);
        this.timeout = config.getAsLongWithDefault("timeout", this.timeout);
        this.maxSize = config.getAsLongWithDefault("max_size", this.maxSize);
    }

	/**
	 * Cleans up cache from obsolete values and shrinks the cache
	 * to fit into allowed max size by dropping values that were not
	 * accessed for a long time
	 */
    private cleanup(): void {
        let oldest: CacheEntry = null;
        let now: number = new Date().getTime();
        this._count = 0;
        
        // Cleanup obsolete entries and find the oldest
        for (var prop in this._cache) {
            if (this._cache.hasOwnProperty(prop)) {
                let entry: CacheEntry = <CacheEntry>this._cache[prop];
                // Remove obsolete entry
                if (entry.isExpired()) {
                    delete this._cache[prop];
                }
                // Count the remaining entry 
                else {
                    this._count++;
                    if (oldest == null || oldest.expiration > entry.expiration)
                        oldest = entry;
                }
            }
        }
        
        // Remove the oldest if cache size exceeded maximum
        if (this._count > this._maxSize && oldest != null) {
            delete this._cache[oldest.key];
            this._count--;
        }
    }

	/**
	 * Retrieves a value from the cache by unique key.
	 * It is recommended to use either string GUIDs like '123456789abc'
	 * or unique natural keys prefixed with the functional group
	 * like 'pip-services-storage:block-123'. 
	 * @param correlationId a unique id to correlate across all request flow.
	 * @param key a unique key to locate value in the cache
	 * @param callback a callback function to be called 
	 * with error or retrieved value. It returns <b>null</b> 
	 * when value was not found
	 */
    public retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void {
        if (key == null)
            throw new ApplicationException(null, correlationId, null, 'Key cannot be null');

        // Get entry from the cache
        let entry: CacheEntry = <CacheEntry>this._cache[key];
        
        // Cache has nothing
        if (entry == null) {
            callback(null, null);
            return;
        }
        
        // Remove entry if expiration set and entry is expired
        if (this._timeout > 0 && entry.isExpired()) {
            delete this._cache[key];
            this._count--;
            callback(null, null);
            return;
        }
                
        callback(null, entry.value);
    }
    
	/**
	 * Stores value identified by unique key in the cache. 
	 * Stale timeout is configured in the component options. 
	 * @param correlationId a unique id to correlate across all request flow.
	 * @param key a unique key to locate value in the cache.
	 * @param value a value to store.
	 * @param callback a callback function to be called with error
	 * or stored value
	 */
    public store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void {
        if (key == null)
            throw new ApplicationException(null, correlationId, null, 'Key cannot be null');

        // Get the entry
        let entry: CacheEntry = <CacheEntry>this._cache[key];

        // Shortcut to remove entry from the cache
        if (value == null) {
            if (entry != null) {
                delete this._cache[key];
                this._count--;
            }
            if (callback) callback(null, value);
            return;        
        }
        
        timeout = timeout != null && timeout > 0 ? timeout : this._timeout;

        // Update the entry
        if (entry) {
            entry.setValue(value, timeout);
        }
        // Or create a new entry 
        else {
            entry = new CacheEntry(key, value, timeout);
            this._cache[key] = entry;
            this._count++;
        }

        // Clean up the cache
        if (this._maxSize > 0 && this._count > this._maxSize)
            this.cleanup();
        
        if (callback) callback(null, value);        
    }
    
	/**
	 * Removes value stored in the cache.
	 * @param correlationId a unique id to correlate across all request flow.
	 * @param key a unique key to locate value in the cache.
	 * @param callback a callback function to be called
	 * with error or success
	 */
    public remove(correlationId: string, key: string, callback: (err: any) => void): void {
        if (key == null)
            throw new ApplicationException(null, correlationId, null, 'Key cannot be null');

        // Get the entry
        let entry: CacheEntry = <CacheEntry>this._cache[key];

        // Remove entry from the cache
        if (entry != null) {
            delete this._cache[key];
            this._count--;
        }

        if (callback) callback(null);
    }

}
