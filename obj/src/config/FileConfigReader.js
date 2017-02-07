"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CachedConfigReader_1 = require("./CachedConfigReader");
var FileConfigReader = (function (_super) {
    __extends(FileConfigReader, _super);
    function FileConfigReader(name, path) {
        if (name === void 0) { name = null; }
        if (path === void 0) { path = null; }
        var _this = _super.call(this, name) || this;
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
        this._path = config.getAsString("path");
    };
    return FileConfigReader;
}(CachedConfigReader_1.CachedConfigReader));
exports.FileConfigReader = FileConfigReader;
//# sourceMappingURL=FileConfigReader.js.map