"use strict";
var Timing_1 = require("./Timing");
var Descriptor_1 = require("../refer/Descriptor");
var NullCounters = (function () {
    function NullCounters() {
    }
    NullCounters.prototype.NullCounters = function () { };
    NullCounters.prototype.getDescriptor = function () {
        return NullCounters.descriptor;
    };
    NullCounters.prototype.beginTiming = function (name) {
        return new Timing_1.Timing();
    };
    ;
    NullCounters.prototype.stats = function (name, value) { };
    ;
    NullCounters.prototype.last = function (name, value) { };
    ;
    NullCounters.prototype.timestampNow = function (name) { };
    ;
    NullCounters.prototype.timestamp = function (name, value) { };
    ;
    NullCounters.prototype.incrementOne = function (name) { };
    ;
    NullCounters.prototype.increment = function (name, value) { };
    ;
    return NullCounters;
}());
NullCounters.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "null", "default", "1.0");
exports.NullCounters = NullCounters;
//# sourceMappingURL=NullCounters.js.map