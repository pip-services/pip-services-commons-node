"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines broad categories of application errors.
 */
var ErrorCategory = (function () {
    function ErrorCategory() {
    }
    /**
     * Unknown or unexpected errors
     */
    ErrorCategory.Unknown = "Unknown";
    /**
     * Internal errors caused by programming mistakes
     */
    ErrorCategory.Internal = "Internal";
    /**
     * Errors related to mistakes in user-defined configuration
     */
    ErrorCategory.Misconfiguration = "Misconfiguration";
    /**
     * Errors related to operations called in wrong component state.
     * For instance, business calls when component is not ready
     */
    ErrorCategory.InvalidState = "InvalidState";
    /**
     * Errors happened during connection to remote services.
     * They can be related to misconfiguration, network issues
     * or remote service itself
     */
    ErrorCategory.NoResponse = "NoResponse";
    /**
     * Errors returned by remote services or network
     * during call attempts
     */
    ErrorCategory.FailedInvocation = "FailedInvocation";
    /**
     * Errors in read/write file operations
     */
    ErrorCategory.FileError = "FileError";
    /**
     * Errors due to improper user requests, like
     * missing or wrong parameters
     */
    ErrorCategory.BadRequest = "BadRequest";
    /**
     * Access errors caused by missing user identity
     * or security permissions
     */
    ErrorCategory.Unauthorized = "Unauthorized";
    /**
     * Error caused by attempt to access missing object
     */
    ErrorCategory.NotFound = "NotFound";
    /**
     * Errors raised by conflict in object versions
     * posted by user and stored on server.
     */
    ErrorCategory.Conflict = "Conflict";
    /**
     * Errors caused by calls to unsupported
     * or not yet implemented functionality
     */
    ErrorCategory.Unsupported = "Unsupported";
    return ErrorCategory;
}());
exports.ErrorCategory = ErrorCategory;
//# sourceMappingURL=ErrorCategory.js.map