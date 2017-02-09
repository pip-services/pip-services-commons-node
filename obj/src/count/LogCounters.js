"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CachedCounters_1 = require("./CachedCounters");
var CompositeLogger_1 = require("../log/CompositeLogger");
var Descriptor_1 = require("../refer/Descriptor");
var StringConverter_1 = require("../convert/StringConverter");
var LogCounters = (function (_super) {
    __extends(LogCounters, _super);
    function LogCounters() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._logger = new CompositeLogger_1.CompositeLogger();
        return _this;
    }
    LogCounters.prototype.LogCounters = function () { };
    LogCounters.prototype.getDescriptor = function () {
        return LogCounters.descriptor;
    };
    LogCounters.prototype.setReferences = function (references) {
        this._logger.setReferences(references);
    };
    LogCounters.prototype.counterToString = function (counter) {
        var result = "Counter " + counter.getName() + " { ";
        result += "\"type\": " + counter.getType();
        if (counter.getLast() != null)
            result += ", \"last\": " + StringConverter_1.StringConverter.toString(counter.getLast());
        if (counter.getCount() != null)
            result += ", \"count\": " + StringConverter_1.StringConverter.toString(counter.getCount());
        if (counter.getMin() != null)
            result += ", \"min\": " + StringConverter_1.StringConverter.toString(counter.getMin());
        if (counter.getMax() != null)
            result += ", \"max\": " + StringConverter_1.StringConverter.toString(counter.getMax());
        if (counter.getAverage() != null)
            result += ", \"avg\": " + StringConverter_1.StringConverter.toString(counter.getAverage());
        if (counter.getTime() != null)
            result += ", \"time\": " + StringConverter_1.StringConverter.toString(counter.getTime());
        result += " }";
        return result;
    };
    LogCounters.prototype.save = function (counters) {
        if (this._logger == null || counters == null)
            return;
        if (counters.length == 0)
            return;
        counters.sort(function (c1, c2) {
            if (c1.getName() < c2.getName())
                return -1;
            if (c1.getName() > c2.getName())
                return 1;
            return 0;
        });
        for (var i = 0; i < counters.length; i++) {
            this._logger.info(null, this.counterToString(counters[i]));
        }
    };
    return LogCounters;
}(CachedCounters_1.CachedCounters));
LogCounters.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "counters", "log", "default", "1.0");
exports.LogCounters = LogCounters;
//# sourceMappingURL=LogCounters.js.map