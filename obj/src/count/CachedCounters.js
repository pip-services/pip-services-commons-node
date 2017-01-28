"use strict";
var Timing_1 = require("./Timing");
var CounterType_1 = require("./CounterType");
var Counter_1 = require("./Counter");
var CachedCounters = (function () {
    function CachedCounters() {
        this._interval = CachedCounters._defaultInterval;
        this._cache = {};
        this._lastDumpTime = new Date().getDate();
    }
    CachedCounters.prototype.CachedCounters = function () { };
    CachedCounters.prototype.getInterval = function () {
        return this._interval;
    };
    CachedCounters.prototype.setInterval = function (value) {
        this._interval = value;
    };
    CachedCounters.prototype.configure = function (config) {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
    };
    CachedCounters.prototype.clear = function (name) {
        delete this._cache[name];
    };
    CachedCounters.prototype.clearAll = function () {
        for (var key in this._cache)
            delete this._cache[key];
        this._updated = false;
    };
    CachedCounters.prototype.beginTiming = function (name) {
        return new Timing_1.Timing(name, this);
    };
    CachedCounters.prototype.dump = function () {
        if (!this._updated)
            return;
        var counters = this.getAll();
        this.save(counters);
        this._updated = false;
        this._lastDumpTime = new Date().getDate();
    };
    CachedCounters.prototype.update = function () {
        this._updated = true;
        if (new Date().getDate() > this._lastDumpTime + this.getInterval()) {
            try {
                this.dump();
            }
            catch (InvocationException) {
            }
        }
    };
    CachedCounters.prototype.getAll = function () {
        var result = [];
        for (var key in this._cache)
            result.push(this._cache[key]);
        return result;
    };
    CachedCounters.prototype.get = function (name, type) {
        if (!name)
            throw new Error("Name cannot be null");
        var counter = this._cache[name];
        if (counter == null || counter.getType() != type) {
            counter = new Counter_1.Counter(name, type);
            this._cache[name] = counter;
        }
        return counter;
    };
    CachedCounters.prototype.calculateStats = function (counter, value) {
        if (counter == null)
            throw new Error("Counter cannot be null");
        counter.setLast(value);
        counter.setCount(counter.getCount() != null ? counter.getCount() + 1 : 1);
        counter.setMax(counter.getMax() != null ? Math.max(counter.getMax(), value) : value);
        counter.setMin(counter.getMin() != null ? Math.min(counter.getMin(), value) : value);
        counter.setAverage((counter.getAverage() != null && counter.getCount() > 1
            ? (counter.getAverage() * (counter.getCount() - 1) + value) / counter.getCount() : value));
    };
    CachedCounters.prototype.endTiming = function (name, elapsed) {
        var counter = this.get(name, CounterType_1.CounterType.Interval);
        this.calculateStats(counter, elapsed);
        this.update();
    };
    CachedCounters.prototype.stats = function (name, value) {
        var counter = this.get(name, CounterType_1.CounterType.Statistics);
        this.calculateStats(counter, value);
        this.update();
    };
    CachedCounters.prototype.last = function (name, value) {
        var counter = this.get(name, CounterType_1.CounterType.LastValue);
        counter.setLast(value);
        this.update();
    };
    CachedCounters.prototype.timestampNow = function (name) {
        this.timestamp(name, new Date());
    };
    CachedCounters.prototype.timestamp = function (name, value) {
        var counter = this.get(name, CounterType_1.CounterType.Timestamp);
        counter.setTime(value);
        this.update();
    };
    CachedCounters.prototype.incrementOne = function (name) {
        this.increment(name, 1);
    };
    CachedCounters.prototype.increment = function (name, value) {
        var counter = this.get(name, CounterType_1.CounterType.Increment);
        counter.setCount(counter.getCount() ? counter.getCount() + value : value);
        this.update();
    };
    return CachedCounters;
}());
CachedCounters._defaultInterval = 300000;
exports.CachedCounters = CachedCounters;
//# sourceMappingURL=CachedCounters.js.map