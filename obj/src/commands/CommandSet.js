"use strict";
var InterceptedCommand_1 = require("./InterceptedCommand");
var BadRequestException_1 = require("../errors/BadRequestException");
var ValidationException_1 = require("../validate/ValidationException");
var ValidationResult_1 = require("../validate/ValidationResult");
var ValidationResultType_1 = require("../validate/ValidationResultType");
var IdGenerator_1 = require("../data/IdGenerator");
var CommandSet = (function () {
    function CommandSet() {
        this._commands = [];
        this._events = [];
        this._intercepters = [];
        this._commandsByName = {};
        this._eventsByName = {};
    }
    Object.defineProperty(CommandSet.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandSet.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    CommandSet.prototype.findCommand = function (commandName) {
        return this._commandsByName[commandName];
    };
    CommandSet.prototype.findEvent = function (eventName) {
        return this._eventsByName[eventName];
    };
    CommandSet.prototype.buildCommandChain = function (command) {
        var next = command;
        for (var i = this._intercepters.length - 1; i >= 0; i--)
            next = new InterceptedCommand_1.InterceptedCommand(this._intercepters[i], next);
        this._commandsByName[next.name] = next;
    };
    CommandSet.prototype.rebuildAllCommandChains = function () {
        this._commandsByName = {};
        for (var i = 0; i < this._commands.length; i++) {
            var command = this._commands[i];
            this.buildCommandChain(command);
        }
    };
    CommandSet.prototype.addCommand = function (command) {
        this._commands.push(command);
        this.buildCommandChain(command);
    };
    CommandSet.prototype.addCommands = function (commands) {
        for (var i = 0; i < commands.length; i++) {
            this.addCommand(commands[i]);
        }
    };
    CommandSet.prototype.addEvent = function (event) {
        this._events.push(event);
        this._eventsByName[event.name] = event;
    };
    CommandSet.prototype.addEvents = function (events) {
        for (var i = 0; i < events.length; i++) {
            this.addEvent(events[i]);
        }
    };
    CommandSet.prototype.addCommandSet = function (commandSet) {
        this.addCommands(commandSet.commands);
        this.addEvents(commandSet.events);
    };
    CommandSet.prototype.addListener = function (listener) {
        for (var i = 0; i < this._events.length; i++) {
            this._events[i].addListener(listener);
        }
    };
    CommandSet.prototype.removeListener = function (listener) {
        for (var i = 0; i < this._events.length; i++) {
            this._events[i].removeListener(listener);
        }
    };
    CommandSet.prototype.addInterceptor = function (intercepter) {
        this._intercepters.push(intercepter);
        this.rebuildAllCommandChains();
    };
    CommandSet.prototype.execute = function (correlationId, commandName, args, callback) {
        var cref = this.findCommand(commandName);
        if (!cref) {
            throw new BadRequestException_1.BadRequestException(correlationId, "CMD_NOT_FOUND", "Request command does not exist")
                .withDetails("command", commandName);
        }
        if (!correlationId)
            correlationId = IdGenerator_1.IdGenerator.nextShort();
        var results = cref.validate(args);
        ValidationException_1.ValidationException.throwExceptionIfNeeded(correlationId, results, false);
        cref.execute(correlationId, args, callback);
    };
    CommandSet.prototype.validate = function (commandName, args) {
        var cref = this.findCommand(commandName);
        if (!cref) {
            var result = [];
            result.push(new ValidationResult_1.ValidationResult(null, ValidationResultType_1.ValidationResultType.Error, "CMD_NOT_FOUND", "Requested command does not exist", null, null));
            return result;
        }
        return cref.validate(args);
    };
    CommandSet.prototype.notify = function (correlationId, eventName, args) {
        var event = this.findEvent(eventName);
        if (event)
            event.notify(correlationId, args);
    };
    return CommandSet;
}());
exports.CommandSet = CommandSet;
//# sourceMappingURL=CommandSet.js.map