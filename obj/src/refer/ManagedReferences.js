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
    function ManagedReferences(tuples) {
        if (tuples === void 0) { tuples = null; }
        var _this = _super.call(this, null, null) || this;
        _this._references = new References_1.References(tuples);
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
    ManagedReferences.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        return new ManagedReferences(tuples);
    };
    return ManagedReferences;
}(ReferencesDecorator_1.ReferencesDecorator));
exports.ManagedReferences = ManagedReferences;
//# sourceMappingURL=ManagedReferences.js.map