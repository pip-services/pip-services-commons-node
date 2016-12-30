"use strict";
var InvocationException_1 = require("../errors/InvocationException");
var Event = (function () {
    function Event(name) {
        if (!name)
            throw new Error("Name cannot be null");
        this._name = name;
    }
    Object.defineProperty(Event.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "listeners", {
        get: function () {
            return this._listeners;
        },
        enumerable: true,
        configurable: true
    });
    Event.prototype.addListener = function (listener) {
        this._listeners.push(listener);
    };
    Event.prototype.removeListener = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    };
    Event.prototype.notify = function (correlationId, args) {
        for (var i = 0; i < this._listeners.length; i++) {
            try {
                var listener = this._listeners[i];
                listener.onEvent(correlationId, this, args);
            }
            catch (ex) {
                throw new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Raising event " + this.name + " failed: " + ex)
                    .withDetails("event", this.name)
                    .wrap(ex);
            }
        }
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map