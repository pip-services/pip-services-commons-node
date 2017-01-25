"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReferencesDecorator_1 = require("./ReferencesDecorator");
var Referencer_1 = require("./Referencer");
var LinkReferencesDecorator = (function (_super) {
    __extends(LinkReferencesDecorator, _super);
    function LinkReferencesDecorator(baseReferences, parentReferences) {
        var _this = _super.call(this, baseReferences, parentReferences) || this;
        _this.linkEnabled = true;
        return _this;
    }
    LinkReferencesDecorator.prototype.put = function (component, locator) {
        if (locator === void 0) { locator = null; }
        _super.prototype.put.call(this, component, locator);
        if (this.linkEnabled)
            Referencer_1.Referencer.setReferencesForOne(this.parentReferences, component);
    };
    LinkReferencesDecorator.prototype.remove = function (locator) {
        var component = _super.prototype.remove.call(this, locator);
        if (this.linkEnabled)
            Referencer_1.Referencer.unsetReferencesForOne(component);
        return component;
    };
    LinkReferencesDecorator.prototype.removeAll = function (locator) {
        var components = _super.prototype.removeAll.call(this, locator);
        if (this.linkEnabled)
            Referencer_1.Referencer.unsetReferences(components);
        return components;
    };
    return LinkReferencesDecorator;
}(ReferencesDecorator_1.ReferencesDecorator));
exports.LinkReferencesDecorator = LinkReferencesDecorator;
//# sourceMappingURL=LinkReferencesDecorator.js.map