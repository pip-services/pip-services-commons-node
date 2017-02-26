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
var ReferencesDecorator_1 = require("./ReferencesDecorator");
var Opener_1 = require("../run/Opener");
var Closer_1 = require("../run/Closer");
var RunReferencesDecorator = (function (_super) {
    __extends(RunReferencesDecorator, _super);
    function RunReferencesDecorator(baseReferences, parentReferences) {
        var _this = _super.call(this, baseReferences, parentReferences) || this;
        _this.openEnabled = true;
        _this.closeEnabled = true;
        return _this;
    }
    RunReferencesDecorator.prototype.putX = function (locator, component) {
        _super.prototype.putX.call(this, locator, component);
        if (this.openEnabled)
            Opener_1.Opener.openOne(null, component, null);
    };
    RunReferencesDecorator.prototype.remove = function (locator) {
        var component = _super.prototype.remove.call(this, locator);
        if (this.closeEnabled)
            Closer_1.Closer.closeOne(null, component, null);
        return component;
    };
    RunReferencesDecorator.prototype.removeAll = function (locator) {
        var components = _super.prototype.removeAll.call(this, locator);
        if (this.closeEnabled)
            Closer_1.Closer.close(null, components, null);
        return components;
    };
    return RunReferencesDecorator;
}(ReferencesDecorator_1.ReferencesDecorator));
exports.RunReferencesDecorator = RunReferencesDecorator;
//# sourceMappingURL=RunReferencesDecorator.js.map