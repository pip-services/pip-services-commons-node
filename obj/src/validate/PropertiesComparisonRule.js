"use strict";
var ValidationResult_1 = require("./ValidationResult");
var ObjectComparator_1 = require("./ObjectComparator");
var ValidationResultType_1 = require("./ValidationResultType");
var ObjectReader_1 = require("../reflect/ObjectReader");
var PropertiesComparisonRule = (function () {
    function PropertiesComparisonRule(property1, property2, operation) {
        this._property1 = property1;
        this._property2 = property2;
        this._operation = operation;
    }
    PropertiesComparisonRule.prototype.validate = function (path, schema, value, results) {
        var value1 = ObjectReader_1.ObjectReader.getProperty(value, this._property1);
        var value2 = ObjectReader_1.ObjectReader.getProperty(value, this._property2);
        if (!ObjectComparator_1.ObjectComparator.compare(value1, this._operation, value2)) {
            results.push(new ValidationResult_1.ValidationResult(path, ValidationResultType_1.ValidationResultType.Error, "PROPERTIES_NOT_MATCH", "Property " + this._property1 + " is expected to " + this._operation + " property " + this._property2, value2, value1));
        }
    };
    return PropertiesComparisonRule;
}());
exports.PropertiesComparisonRule = PropertiesComparisonRule;
//# sourceMappingURL=PropertiesComparisonRule.js.map