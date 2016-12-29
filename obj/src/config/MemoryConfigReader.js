"use strict";
var ConfigParams_1 = require("./ConfigParams");
var NameResolver_1 = require("./NameResolver");
var Descriptor_1 = require("../refer/Descriptor");
var MemoryConfigReader = (function () {
    function MemoryConfigReader(name, config) {
        if (name === void 0) { name = null; }
        if (config === void 0) { config = null; }
        this._config = new ConfigParams_1.ConfigParams();
        this._name = null;
        this._config = config;
        this._name = name;
    }
    MemoryConfigReader.prototype.getName = function () {
        return this._name;
    };
    MemoryConfigReader.prototype.setName = function (name) {
        this._name = name;
    };
    MemoryConfigReader.prototype.getDescriptor = function () {
        return new Descriptor_1.Descriptor("pip-services-commons", "config-reader", "memory", this._name || "default", "1.0");
    };
    MemoryConfigReader.prototype.configure = function (config) {
        this._name = NameResolver_1.NameResolver.resolve(config, this._name);
        this._config = config;
    };
    MemoryConfigReader.prototype.readConfig = function (correlationId) {
        return new ConfigParams_1.ConfigParams(this._config);
    };
    MemoryConfigReader.prototype.readConfigSection = function (correlationId, section) {
        return this._config == null ? null : this._config.getSection(section);
    };
    return MemoryConfigReader;
}());
exports.MemoryConfigReader = MemoryConfigReader;
//# sourceMappingURL=MemoryConfigReader.js.map