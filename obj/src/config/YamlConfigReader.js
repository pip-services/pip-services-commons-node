"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var yaml = require('js-yaml');
var ConfigParams_1 = require("./ConfigParams");
var FileConfigReader_1 = require("./FileConfigReader");
var Descriptor_1 = require("../refer/Descriptor");
var ConfigException_1 = require("../errors/ConfigException");
var FileException_1 = require("../errors/FileException");
var YamlConfigReader = (function (_super) {
    __extends(YamlConfigReader, _super);
    function YamlConfigReader(name, path) {
        if (name === void 0) { name = null; }
        if (path === void 0) { path = null; }
        return _super.call(this, name, path) || this;
    }
    YamlConfigReader.prototype.getDescriptor = function () {
        return new Descriptor_1.Descriptor("pip-services-commons", "config-reader", "yaml", _super.prototype.getName.call(this) || "default", "1.0");
    };
    YamlConfigReader.prototype.readObject = function (correlationId) {
        if (_super.prototype.getPath.call(this) == null) {
            throw new ConfigException_1.ConfigException(correlationId, "NO_PATH", "Missing config file path");
        }
        try {
            // Todo: make this async?
            var data = yaml.safeLoad(fs.readFileSync(_super.prototype.getPath.call(this), 'utf8'));
            return data;
        }
        catch (e) {
            throw new FileException_1.FileException(correlationId, "READ_FAILED", "Failed reading configuration " + _super.prototype.getPath.call(this) + ": " + e)
                .withDetails("path", _super.prototype.getPath.call(this))
                .withCause(e);
        }
    };
    YamlConfigReader.prototype.performReadConfig = function (correlationId) {
        var value = this.readObject(correlationId);
        return ConfigParams_1.ConfigParams.fromValue(value);
    };
    YamlConfigReader.readObject = function (correlationId, path) {
        return new YamlConfigReader(null, path).readObject(correlationId);
    };
    YamlConfigReader.readConfig = function (correlationId, path) {
        return new YamlConfigReader(null, path).readConfig(correlationId);
    };
    return YamlConfigReader;
}(FileConfigReader_1.FileConfigReader));
exports.YamlConfigReader = YamlConfigReader;
//# sourceMappingURL=YamlConfigReader.js.map