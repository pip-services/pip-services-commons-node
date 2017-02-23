"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionResolver = (function () {
    function OptionResolver() {
    }
    OptionResolver.resolve = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var options = config.getSection("options");
        if (Object.keys(options).length == 0)
            options = config;
        return options;
    };
    return OptionResolver;
}());
exports.OptionResolver = OptionResolver;
//# sourceMappingURL=OptionResolver.js.map