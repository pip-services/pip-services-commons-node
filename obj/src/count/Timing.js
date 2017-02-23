"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timing = (function () {
    function Timing(counter, callback) {
        if (counter === void 0) { counter = null; }
        if (callback === void 0) { callback = null; }
        this._counter = counter;
        this._callback = callback;
        this._start = new Date().getTime();
    }
    Timing.prototype.endTiming = function () {
        if (this._callback != null) {
            var elapsed = new Date().getTime() - this._start;
            this._callback.endTiming(this._counter, elapsed);
        }
    };
    return Timing;
}());
exports.Timing = Timing;
//# sourceMappingURL=Timing.js.map