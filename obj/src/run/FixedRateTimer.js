"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parameters_1 = require("./Parameters");
var FixedRateTimer = (function () {
    function FixedRateTimer(task, interval, delay) {
        if (task === void 0) { task = null; }
        if (interval === void 0) { interval = null; }
        if (delay === void 0) { delay = null; }
        this._task = task;
        this._interval = interval;
        this._delay = delay;
    }
    FixedRateTimer.prototype.getTask = function () { return this._task; };
    FixedRateTimer.prototype.setTask = function (value) { this._task = value; };
    FixedRateTimer.prototype.getDelay = function () { return this._delay; };
    FixedRateTimer.prototype.setDelay = function (value) { this._delay = value; };
    FixedRateTimer.prototype.getInterval = function () { return this._interval; };
    FixedRateTimer.prototype.setInterval = function (value) { this._interval = value; };
    FixedRateTimer.prototype.isStarted = function () { return this._timer != null; };
    FixedRateTimer.prototype.start = function () {
        var _this = this;
        // Stop previously set timer
        this.stop();
        // Introducing delay
        var delay = Math.max(0, this._delay - this._interval);
        this._timeout = setTimeout(function () {
            _this._timeout = null;
            // Set a new timer
            _this._timer = setInterval(function () {
                try {
                    _this._task.notify("pip-commons-timer", new Parameters_1.Parameters());
                }
                catch (ex) {
                    // Ignore or better log!
                }
            }, _this._interval);
        }, delay);
    };
    FixedRateTimer.prototype.stop = function () {
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this._timer != null) {
            clearInterval(this._timer);
            this._timer = null;
        }
    };
    FixedRateTimer.prototype.close = function (correlationId, callback) {
        this.stop();
        if (callback != null)
            callback(null);
    };
    return FixedRateTimer;
}());
exports.FixedRateTimer = FixedRateTimer;
//# sourceMappingURL=FixedRateTimer.js.map