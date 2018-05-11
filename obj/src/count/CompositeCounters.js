"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timing_1 = require("./Timing");
var Descriptor_1 = require("../refer/Descriptor");
var CompositeCounters = /** @class */ (function () {
    function CompositeCounters() {
        this._counters = [];
    }
    CompositeCounters.prototype.CompositeCounters = function (references) {
        if (references === void 0) { references = null; }
        if (references != null)
            this.setReferences(references);
    };
    CompositeCounters.prototype.setReferences = function (references) {
        var counters = references.getOptional(new Descriptor_1.Descriptor(null, "counters", null, null, null));
        for (var i = 0; i < counters.length; i++) {
            var counter = counters[i];
            if (counter != this)
                this._counters.push(counter);
        }
    };
    CompositeCounters.prototype.beginTiming = function (name) {
        return new Timing_1.Timing(name, this);
    };
    CompositeCounters.prototype.endTiming = function (name, elapsed) {
        for (var i = 0; i < this._counters.length; i++) {
            var counter = this._counters[i];
            var callback = counter;
            if (callback != null)
                callback.endTiming(name, elapsed);
        }
    };
    CompositeCounters.prototype.stats = function (name, value) {
        for (var i = 0; i < this._counters.length; i++)
            this._counters[i].stats(name, value);
    };
    CompositeCounters.prototype.last = function (name, value) {
        for (var i = 0; i < this._counters.length; i++)
            this._counters[i].last(name, value);
    };
    CompositeCounters.prototype.timestampNow = function (name) {
        this.timestamp(name, new Date());
    };
    CompositeCounters.prototype.timestamp = function (name, value) {
        for (var i = 0; i < this._counters.length; i++)
            this._counters[i].timestamp(name, value);
    };
    CompositeCounters.prototype.incrementOne = function (name) {
        this.increment(name, 1);
    };
    CompositeCounters.prototype.increment = function (name, value) {
        if (!name)
            throw new Error("Name cannot be null");
        for (var i = 0; i < this._counters.length; i++)
            this._counters[i].increment(name, value);
    };
    return CompositeCounters;
}());
exports.CompositeCounters = CompositeCounters;
//# sourceMappingURL=CompositeCounters.js.map