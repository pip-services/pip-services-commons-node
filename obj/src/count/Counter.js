"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Counter = (function () {
    function Counter(name, type) {
        this._name = name;
        this._type = type;
    }
    Counter.prototype.getName = function () { return this._name; };
    Counter.prototype.setName = function (name) { this._name = name; };
    Counter.prototype.getType = function () { return this._type; };
    Counter.prototype.setType = function (type) { this._type = type; };
    Counter.prototype.getLast = function () { return this._last; };
    Counter.prototype.setLast = function (last) { this._last = last; };
    Counter.prototype.getCount = function () { return this._count; };
    Counter.prototype.setCount = function (count) { this._count = count; };
    Counter.prototype.getMin = function () { return this._min; };
    Counter.prototype.setMin = function (min) { this._min = min; };
    Counter.prototype.getMax = function () { return this._max; };
    Counter.prototype.setMax = function (max) { this._max = max; };
    Counter.prototype.getAverage = function () { return this._average; };
    Counter.prototype.setAverage = function (average) { this._average = average; };
    Counter.prototype.getTime = function () { return this._time; };
    Counter.prototype.setTime = function (time) { this._time = time; };
    return Counter;
}());
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map