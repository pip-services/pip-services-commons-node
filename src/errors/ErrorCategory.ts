/**
 * Defines broad categories of application errors.
 */
export class ErrorCategory {
	
	/**
	 * Unknown or unexpected errors.
	 */
	public static readonly Unknown: string = "Unknown";

	/**
	 * Internal errors caused by programming mistakes.
	 */
	public static readonly Internal: string = "Internal";

	/**
	 * Errors related to mistakes in user-defined configurations.
	 */
	public static readonly Misconfiguration: string = "Misconfiguration";
	
	/**
	 * Errors related to calling operations, which require the component 
	 * to be in a specific state. 
	 * 
	 * For example: business calls when the component is not ready.
	 */
	public static readonly InvalidState: string = "InvalidState";
	
	/**
	 * Errors that occur during connections to remote services.
	 * They can be related to misconfiguration, network issues,
	 * or the remote service itself.
	 */
	public static readonly NoResponse: string = "NoResponse";

    /**
     * Errors returned by remote services or by the network
     * during call attempts.
     */
	public static readonly FailedInvocation: string = "FailedInvocation";

	/**
	 * Errors in read/write file operations.
	 */
	public static readonly FileError: string = "FileError";

	/**
	 * Errors due to improper user requests. 
	 * 
	 * For example: missing or incorrect parameters.
	 */
	public static readonly BadRequest: string = "BadRequest";
	
	/**
	 * Access errors caused by missing user identity (authentication error)
	 * or incorrect security permissions (authorization error).
	 */
	public static readonly Unauthorized: string = "Unauthorized";

    /**
     * Errors caused by attempts to access missing objects.
     */
	public static readonly NotFound: string = "NotFound";
	
	/**
	 * Errors raised by conflicts between object versions that were
	 * posted by the user and those that are stored on the server.
	 */
	public static readonly Conflict: string = "Conflict";	
	
	/**
	 * Errors caused by calls to unsupported 
	 * or not yet implemented functionality.
	 */
	public static readonly Unsupported: string = "Unsupported";
}
