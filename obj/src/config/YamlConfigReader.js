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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var yaml = require('js-yaml');
var ConfigParams_1 = require("./ConfigParams");
var FileConfigReader_1 = require("./FileConfigReader");
var ConfigException_1 = require("../errors/ConfigException");
var FileException_1 = require("../errors/FileException");
var YamlConfigReader = /** @class */ (function (_super) {
    __extends(YamlConfigReader, _super);
    function YamlConfigReader(path) {
        if (path === void 0) { path = null; }
        return _super.call(this, path) || this;
    }
    YamlConfigReader.prototype.readObject = function (correlationId, parameters) {
        if (_super.prototype.getPath.call(this) == null)
            throw new ConfigException_1.ConfigException(correlationId, "NO_PATH", "Missing config file path");
        try {
            // Todo: make this async?
            var content = fs.readFileSync(_super.prototype.getPath.call(this), 'utf8');
            content = this.parameterize(content, parameters);
            var data = yaml.safeLoad(content);
            return data;
        }
        catch (e) {
            throw new FileException_1.FileException(correlationId, "READ_FAILED", "Failed reading configuration " + _super.prototype.getPath.call(this) + ": " + e)
                .withDetails("path", _super.prototype.getPath.call(this))
                .withCause(e);
        }
    };
    YamlConfigReader.prototype.readConfig = function (correlationId, parameters, callback) {
        try {
            var value = this.readObject(correlationId, parameters);
            var config = ConfigParams_1.ConfigParams.fromValue(value);
            callback(null, config);
        }
        catch (ex) {
            callback(ex, null);
        }
    };
    YamlConfigReader.readObject = function (correlationId, path, parameters) {
        return new YamlConfigReader(path).readObject(correlationId, parameters);
    };
    YamlConfigReader.readConfig = function (correlationId, path, parameters) {
        var value = new YamlConfigReader(path).readObject(correlationId, parameters);
        var config = ConfigParams_1.ConfigParams.fromValue(value);
        return config;
    };
    return YamlConfigReader;
}(FileConfigReader_1.FileConfigReader));
exports.YamlConfigReader = YamlConfigReader;
//# sourceMappingURL=YamlConfigReader.js.map