"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var StringValueMap_1 = require("../data/StringValueMap");
var RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
/**
 * Map with configuration parameters that use complex keys with dot notation and simple string values.
 *
 * Example of values, stored in the configuration parameters:
 * <ul>
 * <li>Section-1.Subsection-1-1.Key-1-1-1=123</li>
 * <li>Section-1.Subsection-1-2.Key-1-2-1="ABC"</li>
 * <li>Section-2.Subsection-1.Key-2-1-1="2016-09-16T00:00:00.00Z"</li>
 * </ul>
 *
 * Configuration parameters support getting and adding sections from the map.
 *
 * Also, configuration parameters may come in a form of parameterized string:
 * Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z
 *
 * All keys stored in the map are case-insensitive.
 */
var ConfigParams = (function (_super) {
    __extends(ConfigParams, _super);
    function ConfigParams(values) {
        if (values === void 0) { values = null; }
        return _super.call(this, values) || this;
    }
    ConfigParams.prototype.getSectionNames = function () {
        var sections = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                var pos = key.indexOf('.');
                var section = key;
                if (pos > 0)
                    section = key.substring(0, pos);
                // Perform case sensitive search
                var found = false;
                for (var index = 0; index < sections.length; index++) {
                    if (section.toLowerCase() == sections[index].toLowerCase()) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    sections.push(section);
            }
        }
        return sections;
    };
    ConfigParams.prototype.getSection = function (section) {
        var result = new ConfigParams();
        var prefix = section.toLowerCase() + ".";
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                // Prevents exception on the next line
                if (key.length < prefix.length)
                    continue;
                // Perform case sensitive match
                var keyPrefix = key.substring(0, prefix.length).toLowerCase();
                if (keyPrefix == prefix) {
                    var name_1 = key.substring(prefix.length);
                    result.put(name_1, this[key]);
                }
            }
        }
        return result;
    };
    ConfigParams.prototype.isShadowName = function (name) {
        return name == null || name.length == 0 || _.startsWith(name, "_");
    };
    ConfigParams.prototype.addSection = function (section, sectionParams) {
        if (section == null)
            throw new Error("Section name cannot be null");
        section = this.isShadowName(section) ? "" : section;
        if (sectionParams != null) {
            for (var key in sectionParams) {
                if (sectionParams.hasOwnProperty(key)) {
                    var name_2 = key;
                    name_2 = this.isShadowName(name_2) ? "" : name_2;
                    if (name_2.length > 0 && section.length > 0)
                        name_2 = section + "." + name_2;
                    else if (name_2.length == 0)
                        name_2 = section;
                    var value = sectionParams[key];
                    this.put(name_2, value);
                }
            }
        }
    };
    ConfigParams.prototype.override = function (configParams) {
        var map = StringValueMap_1.StringValueMap.fromMaps(this, configParams);
        return new ConfigParams(map);
    };
    ConfigParams.prototype.setDefaults = function (defaultConfigParams) {
        var map = StringValueMap_1.StringValueMap.fromMaps(defaultConfigParams, this);
        return new ConfigParams(map);
    };
    ConfigParams.fromValue = function (value) {
        var map = RecursiveObjectReader_1.RecursiveObjectReader.getProperties(value);
        return new ConfigParams(map);
    };
    ConfigParams.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromTuplesArray(tuples);
        return new ConfigParams(map);
    };
    ConfigParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new ConfigParams(map);
    };
    ConfigParams.mergeConfigs = function () {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i] = arguments[_i];
        }
        var map = StringValueMap_1.StringValueMap.fromMaps(configs);
        return new ConfigParams(map);
    };
    return ConfigParams;
}(StringValueMap_1.StringValueMap));
exports.ConfigParams = ConfigParams;
//# sourceMappingURL=ConfigParams.js.map