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
var YamlConfigReader = (function (_super) {
    __extends(YamlConfigReader, _super);
    function YamlConfigReader(path) {
        if (path === void 0) { path = null; }
        return _super.call(this, path) || this;
    }
    YamlConfigReader.prototype.readObject = function (correlationId) {
        if (_super.prototype.getPath.call(this) == null)
            throw new ConfigException_1.ConfigException(correlationId, "NO_PATH", "Missing config file path");
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
        return new YamlConfigReader(path).readObject(correlationId);
    };
    YamlConfigReader.readConfig = function (correlationId, path) {
        return new YamlConfigReader(path).readConfig(correlationId);
    };
    return YamlConfigReader;
}(FileConfigReader_1.FileConfigReader));
exports.YamlConfigReader = YamlConfigReader;
//# sourceMappingURL=YamlConfigReader.js.map