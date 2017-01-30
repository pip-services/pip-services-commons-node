"use strict";
var ReferenceQuery = (function () {
    function ReferenceQuery(locator, startLocator, ascending) {
        if (startLocator === void 0) { startLocator = null; }
        if (ascending === void 0) { ascending = false; }
        this.locator = locator;
        this.startLocator = startLocator;
        this.ascending = ascending;
    }
    return ReferenceQuery;
}());
exports.ReferenceQuery = ReferenceQuery;
//# sourceMappingURL=ReferenceQuery.js.map