"use strict";
var NameResolver = (function () {
    function NameResolver() {
    }
    NameResolver.resolve = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var options = config.getSection("options");
        if (options.getCount() == 0) {
            options = config;
        }
        return options;
    };
    return NameResolver;
}());
exports.NameResolver = NameResolver;
//# sourceMappingURL=OptionsResolver.js.map