"use strict";
/**
 * Component descriptor used to find a component by its descriptive elements:
 * <ul>
 * <li> logical group: package or other logical group of components like 'pip-services-storage-blocks'
 * <li> component type: identifies component interface like 'controller', 'services' or 'cache'
 * <li> component id: identifies component internal content or implementation like 'memory', 'file' or 'mongodb', ...
 * <li> implementation version: '1.0', '1.5' or '10.4'
 * </ul>
 */
var Descriptor = (function () {
    /**
     * Creates instance of a component locator
     * @param group - logical group: 'pip-services-runtime', 'pip-services-logging'
     * @param type - external type: 'cache', 'services' or 'controllers'
     * @param id - internal content/implementation: 'memory', 'file' or 'memcached'
     * @param version - implementation version: '1.0'. '1.5' or '10.4'
     */
    function Descriptor(group, type, id, version) {
        if ("*" == group)
            group = null;
        if ("*" == type)
            type = null;
        if ("*" == id)
            id = null;
        if ("*" == version)
            version = null;
        this._group = group;
        this._type = type;
        this._id = id;
        this._version = version;
    }
    /**
     * Gets a component group
     * @return a component group
     */
    Descriptor.prototype.getGroup = function () {
        return this._group;
    };
    /**
     * Gets a component type
     * @return a component type
     */
    Descriptor.prototype.getType = function () {
        return this._type;
    };
    /**
     * Gets a component id
     * @return a component id
     */
    Descriptor.prototype.getId = function () {
        return this._id;
    };
    /**
     * Gets an implementation version
     * @return an implementation version
     */
    Descriptor.prototype.getVersion = function () {
        return this._version;
    };
    Descriptor.prototype.matchField = function (field1, field2) {
        return field1 == null
            || field2 == null
            || field1 == field2;
    };
    /**
     * Matches this descriptor to another descriptor
     * All '*' or null descriptor elements match to any other value.
     * Specific values must match exactly.
     *
     * @param descriptor - another descriptor to match this one.
     * @return <b>true</b> if descriptors match or <b>false</b> otherwise.
     */
    Descriptor.prototype.match = function (descriptor) {
        return this.matchField(this._group, descriptor.getGroup())
            && this.matchField(this._type, descriptor.getType())
            && this.matchField(this._id, descriptor.getId())
            && this.matchField(this._version, descriptor.getVersion());
    };
    Descriptor.prototype.exactMatchField = function (field1, field2) {
        if (field1 == null && field2 == null)
            return true;
        if (field1 == null || field2 == null)
            return false;
        return field1 == field2;
    };
    Descriptor.prototype.exactMatch = function (descriptor) {
        return this.exactMatchField(this._group, descriptor.getGroup())
            && this.exactMatchField(this._type, descriptor.getType())
            && this.exactMatchField(this._id, descriptor.getId())
            && this.exactMatchField(this._version, descriptor.getVersion());
    };
    Descriptor.prototype.isComplete = function () {
        return this._group != null && this._type != null
            && this._id != null && this._version != null;
    };
    Descriptor.prototype.equals = function (value) {
        if (value instanceof Descriptor)
            return this.match(value);
        return false;
    };
    Descriptor.prototype.toString = function () {
        var output = "";
        output += this._group != null ? this._group : "*";
        output += ":" + (this._type != null ? this._type : "*");
        output += ":" + (this._id != null ? this._id : "*");
        output += ":" + (this._version != null ? this._version : "*");
        return output.toString();
    };
    Descriptor.fromString = function (value) {
        if (value == null || value.length == 0)
            return null;
        var tokens = value.split(":");
        if (tokens.length != 4) {
            throw Error("!!!");
        }
        return new Descriptor(tokens[0].trim(), tokens[1].trim(), tokens[2].trim(), tokens[3].trim());
    };
    return Descriptor;
}());
exports.Descriptor = Descriptor;
//# sourceMappingURL=Descriptor.js.map