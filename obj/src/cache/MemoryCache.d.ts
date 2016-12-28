import { ICache } from './ICache';
import { Descriptor } from '../refer/Descriptor';
import { IDescriptable } from '../refer/IDescriptable';
import { IReconfigurable } from '../config/IReconfigurable';
import { ConfigParams } from '../config/ConfigParams';
export declare class MemoryCache implements ICache, IDescriptable, IReconfigurable {
    /**
     * Default configuration for memory cache component
     */
    private static readonly _defaultTimeout;
    private static readonly _defaultMaxSize;
    private _cache;
    private _count;
    private _name;
    private _timeout;
    private _maxSize;
    /**
     * Unique descriptor for the Memory Cache component
     */
    static readonly Descriptor: Descriptor;
    /**
     * Creates instance of local in-memory cache component
     */
    constructor(name?: string, config?: ConfigParams);
    name: string;
    timeout: number;
    maxSize: number;
    getDescriptor(): Descriptor;
    /**
     * Sets component configuration parameters and switches component
     * to 'Configured' state. The configuration is only allowed once
     * right after creation. Attempts to perform reconfiguration will
     * cause an exception.
     * @param config the component configuration parameters.
     * @throws MicroserviceError when component is in illegal state
     * or configuration validation fails.
     */
    configure(config: ConfigParams): void;
    retrieveAsync(correlationId: string, key: string): any;
    storeAsync(correlationId: string, key: string, value: any, timeout: number): any;
    removeAsync(correlationId: string, key: string): void;
    /**
     * Cleans up cache from obsolete values and shrinks the cache
     * to fit into allowed max size by dropping values that were not
     * accessed for a long time
     */
    private cleanup();
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
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    /**
     * Stores value identified by unique key in the cache.
     * Stale timeout is configured in the component options.
     * @param correlationId a unique id to correlate across all request flow.
     * @param key a unique key to locate value in the cache.
     * @param value a value to store.
     * @param callback a callback function to be called with error
     * or stored value
     */
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    /**
     * Removes value stored in the cache.
     * @param correlationId a unique id to correlate across all request flow.
     * @param key a unique key to locate value in the cache.
     * @param callback a callback function to be called
     * with error or success
     */
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
