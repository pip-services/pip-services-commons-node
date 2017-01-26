"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    RunReferencesDecorator.prototype.put = function (component, locator) {
        _super.prototype.put.call(this, component, locator);
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