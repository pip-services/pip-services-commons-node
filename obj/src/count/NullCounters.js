"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timing_1 = require("./Timing");
var NullCounters = (function () {
    function NullCounters() {
    }
    NullCounters.prototype.NullCounters = function () { };
    NullCounters.prototype.beginTiming = function (name) {
        return new Timing_1.Timing();
    };
    NullCounters.prototype.stats = function (name, value) { };
    NullCounters.prototype.last = function (name, value) { };
    NullCounters.prototype.timestampNow = function (name) { };
    NullCounters.prototype.timestamp = function (name, value) { };
    NullCounters.prototype.incrementOne = function (name) { };
    NullCounters.prototype.increment = function (name, value) { };
    return NullCounters;
}());
exports.NullCounters = NullCounters;
//# sourceMappingURL=NullCounters.js.map