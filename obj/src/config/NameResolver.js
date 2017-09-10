"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Descriptor_1 = require("../refer/Descriptor");
var NameResolver = /** @class */ (function () {
    function NameResolver() {
    }
    NameResolver.resolve = function (config, defaultName) {
        if (defaultName === void 0) { defaultName = null; }
        var name = config.getAsNullableString("name") || config.getAsNullableString("id");
        if (name == null) {
            var descriptorStr = config.getAsNullableString("descriptor");
            var descriptor = Descriptor_1.Descriptor.fromString(descriptorStr);
            if (descriptor != null)
                name = descriptor.getName();
        }
        return name || defaultName;
    };
    return NameResolver;
}());
exports.NameResolver = NameResolver;
//# sourceMappingURL=NameResolver.js.map