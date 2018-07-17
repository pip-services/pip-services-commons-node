import { ICache } from './ICache';
/**
 * Null implementation of the {@link ICache} interface. Returns null instead of real values. 
 * Can be used for cutting dependecies while testing.
 * 
 * @see ICache
 */
export class NullCache implements ICache {
    
    /**
     * Null function that will always return null when retrieving key-value pairs
     * from the cache.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param key               key to retrieve value by.
     * @param callback          callback function that will always be called with 
     *                          null as both the error and result.
     */
    public retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void {
        callback(null, null);
    }

    /**
     * Null function that will always return null when storing key-value pairs
     * in the cache.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param key               key to store the value by in the cache.
     * @param value             value to be stored in the cache.
     * @param timeout           timeout for storing the key-value pair in the cache.
     * @param callback          callback function that will always be called with 
     *                          null as the error and value as the result.
     */
    public store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void {
        callback(null, value);
    }

    /**
     * Null function that will always return null when removing key-value pairs
     * from the cache.
     * 
     * @param correlationId     unique id to correlate across all request flows.
     * @param key               key to delete key-value pair by.
     * @param callback          callback function that will always be called with null.
     */
    public remove(correlationId: string, key: string, callback: (err: any) => void): void {
        callback(null);
    }

}
