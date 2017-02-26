"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigParams_1 = require("./ConfigParams");
var MemoryConfigReader = (function () {
    function MemoryConfigReader(config) {
        if (config === void 0) { config = null; }
        this._config = new ConfigParams_1.ConfigParams();
        this._config = config;
    }
    MemoryConfigReader.prototype.configure = function (config) {
        this._config = config;
    };
    MemoryConfigReader.prototype.readConfig = function (correlationId, callback) {
        var config = new ConfigParams_1.ConfigParams(this._config);
        callback(null, config);
    };
    MemoryConfigReader.prototype.readConfigSection = function (correlationId, section, callback) {
        var config = this._config == null ? null : this._config.getSection(section);
        callback(null, config);
    };
    return MemoryConfigReader;
}());
exports.MemoryConfigReader = MemoryConfigReader;
//# sourceMappingURL=MemoryConfigReader.js.map