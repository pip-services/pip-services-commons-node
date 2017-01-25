/**
 * Defines broad categories of application errors.
 */
export declare class ErrorCategory {
    /**
     * Unknown or unexpected errors
     */
    static readonly Unknown: string;
    /**
     * Internal errors caused by programming mistakes
     */
    static readonly Internal: string;
    /**
     * Errors related to mistakes in user-defined configuration
     */
    static readonly Misconfiguration: string;
    /**
     * Errors related to operations called in wrong component state.
     * For instance, business calls when component is not ready
     */
    static readonly InvalidState: string;
    /**
     * Errors happened during connection to remote services.
     * They can be related to misconfiguration, network issues
     * or remote service itself
     */
    static readonly NoResponse: string;
    /**
     * Errors returned by remote services or network
     * during call attempts
     */
    static readonly FailedInvocation: string;
    /**
     * Errors in read/write file operations
     */
    static readonly FileError: string;
    /**
     * Errors due to improper user requests, like
     * missing or wrong parameters
     */
    static readonly BadRequest: string;
    /**
     * Access errors caused by missing user identity
     * or security permissions
     */
    static readonly Unauthorized: string;
    /**
     * Error caused by attempt to access missing object
     */
    static readonly NotFound: string;
    /**
     * Errors raised by conflict in object versions
     * posted by user and stored on server.
     */
    static readonly Conflict: string;
    /**
     * Errors caused by calls to unsupported
     * or not yet implemented functionality
     */
    static readonly Unsupported: string;
}
