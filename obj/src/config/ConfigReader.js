"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var mustache = require('mustache');
var ConfigParams_1 = require("./ConfigParams");
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
        this._parameters = new ConfigParams_1.ConfigParams();
    }
    ConfigReader.prototype.configure = function (config) {
        var parameters = config.getSection("parameters");
        if (parameters.length() > 0)
            this._parameters = parameters;
    };
    ConfigReader.prototype.parameterize = function (config, parameters) {
        parameters = this._parameters.override(parameters);
        // Convert template to lodash
        //config = config.replace(/{{/g, "<%=").replace(/}}/g, "%>");
        //let template = _.template(config);
        //return template(parameters);
        return mustache.render(config, parameters);
    };
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=ConfigReader.js.map