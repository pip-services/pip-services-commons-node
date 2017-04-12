"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
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
    MemoryConfigReader.prototype.readConfig = function (correlationId, parameters, callback) {
        if (parameters != null) {
            var config = new ConfigParams_1.ConfigParams(this._config).toString();
            var template = _.template(config);
            config = template(parameters);
            callback(null, ConfigParams_1.ConfigParams.fromString(config));
        }
        else {
            var config = new ConfigParams_1.ConfigParams(this._config);
            ;
            callback(null, config);
        }
    };
    return MemoryConfigReader;
}());
exports.MemoryConfigReader = MemoryConfigReader;
//# sourceMappingURL=MemoryConfigReader.js.map