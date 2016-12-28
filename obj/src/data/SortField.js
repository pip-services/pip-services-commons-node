"use strict";
var SortField = (function () {
    function SortField(name, ascending) {
        if (name === void 0) { name = null; }
        if (ascending === void 0) { ascending = true; }
        this.name = name;
        this.ascending = ascending;
    }
    return SortField;
}());
exports.SortField = SortField;
//# sourceMappingURL=SortField.js.map