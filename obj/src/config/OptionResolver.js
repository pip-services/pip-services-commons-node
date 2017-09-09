"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionResolver = /** @class */ (function () {
    function OptionResolver() {
    }
    OptionResolver.resolve = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = false; }
        var options = config.getSection("options");
        if (Object.keys(options).length == 0 && configAsDefault)
            options = config;
        return options;
    };
    return OptionResolver;
}());
exports.OptionResolver = OptionResolver;
//# sourceMappingURL=OptionResolver.js.map