"use strict";
var ErrorCategory_1 = require("./ErrorCategory");
var UnknownException_1 = require("./UnknownException");
var InternalException_1 = require("./InternalException");
var ConfigException_1 = require("./ConfigException");
var ConnectionException_1 = require("./ConnectionException");
var InvocationException_1 = require("./InvocationException");
var FileException_1 = require("./FileException");
var BadRequestException_1 = require("./BadRequestException");
var UnauthorizedException_1 = require("./UnauthorizedException");
var ConflictException_1 = require("./ConflictException");
var NotFoundException_1 = require("./NotFoundException");
var UnsupportedException_1 = require("./UnsupportedException");
var InvalidStateException_1 = require("./InvalidStateException");
var ApplicationExceptionFactory = (function () {
    function ApplicationExceptionFactory() {
    }
    ApplicationExceptionFactory.prototype.create = function (description) {
        if (description == null)
            throw new Error("Description cannot be null");
        var error = null;
        var category = description.category;
        var code = description.code;
        var message = description.message;
        var correlationId = description.correlation_id;
        // Create well-known exception type based on error category
        if (ErrorCategory_1.ErrorCategory.Unknown == category)
            error = new UnknownException_1.UnknownException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Internal == category)
            error = new InternalException_1.InternalException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Misconfiguration == category)
            error = new ConfigException_1.ConfigException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.NoResponse == category)
            error = new ConnectionException_1.ConnectionException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.FailedInvocation == category)
            error = new InvocationException_1.InvocationException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.FileError == category)
            error = new FileException_1.FileException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.BadRequest == category)
            error = new BadRequestException_1.BadRequestException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Unauthorized == category)
            error = new UnauthorizedException_1.UnauthorizedException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Conflict == category)
            error = new ConflictException_1.ConflictException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.NotFound == category)
            error = new NotFoundException_1.NotFoundException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.InvalidState == category)
            error = new InvalidStateException_1.InvalidStateException(correlationId, code, message);
        else if (ErrorCategory_1.ErrorCategory.Unsupported == category)
            error = new UnsupportedException_1.UnsupportedException(correlationId, code, message);
        else {
            error = new UnknownException_1.UnknownException();
            error.category = category;
            error.status = description.status;
        }
        // Fill error with details
        error.details = description.details;
        error.setCauseString(description.cause);
        error.setStackTraceString(description.stack_trace);
        return error;
    };
    return ApplicationExceptionFactory;
}());
exports.ApplicationExceptionFactory = ApplicationExceptionFactory;
//# sourceMappingURL=ApplicationExceptionFactory.js.map