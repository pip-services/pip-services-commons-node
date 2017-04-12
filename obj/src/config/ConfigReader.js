"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var ConfigParams_1 = require("./ConfigParams");
var ConfigReader = (function () {
    function ConfigReader() {
        this._parameters = new ConfigParams_1.ConfigParams();
    }
    ConfigReader.prototype.configure = function (config) {
        var parameters = config.getSection("parameters");
        if (parameters.length() > 0)
            this._parameters = parameters;
    };
    ConfigReader.prototype.parameterize = function (config, parameters) {
        // Convert template to lodash
        config = config.replace("{{", "<%=").replace("}}", "%>");
        parameters = this._parameters.override(parameters);
        var template = _.template(config);
        return template(parameters);
    };
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=ConfigReader.js.map