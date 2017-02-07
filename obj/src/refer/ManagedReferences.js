"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Opener_1 = require("../run/Opener");
var Closer_1 = require("../run/Closer");
var References_1 = require("./References");
var Referencer_1 = require("./Referencer");
var ReferencesDecorator_1 = require("./ReferencesDecorator");
var BuildReferencesDecorator_1 = require("./BuildReferencesDecorator");
var LinkReferencesDecorator_1 = require("./LinkReferencesDecorator");
var RunReferencesDecorator_1 = require("./RunReferencesDecorator");
var ManagedReferences = (function (_super) {
    __extends(ManagedReferences, _super);
    function ManagedReferences(components) {
        if (components === void 0) { components = null; }
        var _this = _super.call(this, null, null) || this;
        _this._references = new References_1.References(components);
        _this._builder = new BuildReferencesDecorator_1.BuildReferencesDecorator(_this._references, _this);
        _this._linker = new LinkReferencesDecorator_1.LinkReferencesDecorator(_this._builder, _this);
        _this._runner = new RunReferencesDecorator_1.RunReferencesDecorator(_this._linker, _this);
        _this.baseReferences = _this._runner;
        return _this;
    }
    ManagedReferences.prototype.isOpened = function () {
        var components = this._references.getAll();
        return Opener_1.Opener.isOpened(components);
    };
    ManagedReferences.prototype.open = function (correlationId, callback) {
        var components = this._references.getAll();
        Referencer_1.Referencer.setReferences(this, components);
        Opener_1.Opener.open(correlationId, components);
    };
    ManagedReferences.prototype.close = function (correlationId, callback) {
        var components = this._references.getAll();
        Closer_1.Closer.close(correlationId, components);
        Referencer_1.Referencer.unsetReferences(components);
    };
    return ManagedReferences;
}(ReferencesDecorator_1.ReferencesDecorator));
exports.ManagedReferences = ManagedReferences;
//# sourceMappingURL=ManagedReferences.js.map