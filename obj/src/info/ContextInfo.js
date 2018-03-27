"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require('os');
var StringValueMap_1 = require("../data/StringValueMap");
var ContextInfo = /** @class */ (function () {
    function ContextInfo(name, description) {
        this._name = "unknown";
        this._description = null;
        this._contextId = os.hostname(); // IdGenerator.nextLong();
        this._startTime = new Date();
        this._properties = new StringValueMap_1.StringValueMap();
        this._name = name || "unknown";
        this._description = description || null;
    }
    ContextInfo.prototype.configure = function (config) {
        this.name = config.getAsStringWithDefault("name", this.name);
        this.description = config.getAsStringWithDefault("description", this.description);
        this.properties = config.getSection("properties");
    };
    Object.defineProperty(ContextInfo.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value || "unknown"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextInfo.prototype, "description", {
        get: function () { return this._description; },
        set: function (value) { this._description = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextInfo.prototype, "contextId", {
        get: function () { return this._contextId; },
        set: function (value) { this._contextId = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextInfo.prototype, "startTime", {
        get: function () { return this._startTime; },
        set: function (value) { this._startTime = value || new Date(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextInfo.prototype, "uptime", {
        get: function () {
            return new Date().getTime() - this._startTime.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextInfo.prototype, "properties", {
        get: function () { return this._properties; },
        set: function (properties) {
            this._properties = StringValueMap_1.StringValueMap.fromValue(properties);
        },
        enumerable: true,
        configurable: true
    });
    ContextInfo.fromConfig = function (config) {
        var result = new ContextInfo();
        result.configure(config);
        return result;
    };
    return ContextInfo;
}());
exports.ContextInfo = ContextInfo;
//# sourceMappingURL=ContextInfo.js.map