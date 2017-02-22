/**
 * Defines broad categories of application errors.
 */
export class ErrorCategory {
	/**
	 * Unknown or unexpected errors
	 */
	public static readonly Unknown: string = "Unknown";

	/**
	 * Internal errors caused by programming mistakes
	 */
	public static readonly Internal: string = "Internal";

	/**
	 * Errors related to mistakes in user-defined configuration
	 */
	public static readonly Misconfiguration: string = "Misconfiguration";
	
	/**
	 * Errors related to operations called in wrong component state.
	 * For instance, business calls when component is not ready
	 */
	public static readonly InvalidState: string = "InvalidState";
	
	/**
	 * Errors happened during connection to remote services.
	 * They can be related to misconfiguration, network issues
	 * or remote service itself 
	 */
	public static readonly NoResponse: string = "NoResponse";

    /**
     * Errors returned by remote services or network
     * during call attempts
     */
	public static readonly FailedInvocation: string = "FailedInvocation";

	/**
	 * Errors in read/write file operations
	 */
	public static readonly FileError: string = "FileError";

	/**
	 * Errors due to improper user requests, like
	 * missing or wrong parameters 
	 */
	public static readonly BadRequest: string = "BadRequest";
	
	/**
	 * Access errors caused by missing user identity
	 * or security permissions
	 */
	public static readonly Unauthorized: string = "Unauthorized";

    /**
     * Error caused by attempt to access missing object
     */
	public static readonly NotFound: string = "NotFound";
	
	/**
	 * Errors raised by conflict in object versions
	 * posted by user and stored on server.
	 */
	public static readonly Conflict: string = "Conflict";	
	
	/**
	 * Errors caused by calls to unsupported 
	 * or not yet implemented functionality
	 */
	public static readonly Unsupported: string = "Unsupported";
}
