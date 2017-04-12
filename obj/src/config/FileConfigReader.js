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
var ConfigReader_1 = require("./ConfigReader");
var FileConfigReader = (function (_super) {
    __extends(FileConfigReader, _super);
    function FileConfigReader(path) {
        if (path === void 0) { path = null; }
        var _this = _super.call(this) || this;
        _this._path = path;
        return _this;
    }
    FileConfigReader.prototype.getPath = function () {
        return this._path;
    };
    FileConfigReader.prototype.setPath = function (path) {
        this._path = path;
    };
    FileConfigReader.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        this._path = config.getAsStringWithDefault("path", this._path);
    };
    return FileConfigReader;
}(ConfigReader_1.ConfigReader));
exports.FileConfigReader = FileConfigReader;
//# sourceMappingURL=FileConfigReader.js.map