"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringConverter_1 = require("../convert/StringConverter");
var ReferenceException_1 = require("./ReferenceException");
var Descriptor_1 = require("./Descriptor");
var DependencyResolver = /** @class */ (function () {
    function DependencyResolver(config, references) {
        this._dependencies = {};
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    DependencyResolver.prototype.configure = function (config) {
        var dependencies = config.getSection("dependencies");
        var names = dependencies.getKeys();
        for (var index = 0; index < names.length; index++) {
            var name_1 = names[index];
            var locator = dependencies.get(name_1);
            if (locator == null)
                continue;
            try {
                var descriptor = Descriptor_1.Descriptor.fromString(locator);
                if (descriptor != null)
                    this._dependencies[name_1] = descriptor;
                else
                    this._dependencies[name_1] = locator;
            }
            catch (ex) {
                this._dependencies[name_1] = locator;
            }
        }
    };
    DependencyResolver.prototype.setReferences = function (references) {
        this._references = references;
    };
    DependencyResolver.prototype.put = function (name, locator) {
        this._dependencies[name] = locator;
    };
    DependencyResolver.prototype.locate = function (name) {
        if (name == null)
            throw new Error("Dependency name cannot be null");
        if (this._references == null)
            throw new Error("References shall be set");
        return this._dependencies[name];
    };
    /**
     * Gets a list of component references that match provided locator
     * @param name a dependency name
     * @return a list with found component references
     */
    DependencyResolver.prototype.getOptional = function (name) {
        var locator = this.locate(name);
        return locator != null ? this._references.getOptional(locator) : null;
    };
    /**
     * Gets a list of component references that match provided locator.
     * If no references found an exception is thrown
     * @param name a dependency name
     * @return a list with found component references
     * @throws ReferenceException when no single component reference is found
     */
    DependencyResolver.prototype.getRequired = function (name) {
        var locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getRequired(locator);
    };
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference or <code>null</code> if nothing was found
     */
    DependencyResolver.prototype.getOneOptional = function (name) {
        var locator = this.locate(name);
        return locator != null ? this._references.getOneOptional(locator) : null;
    };
    /**
     * Gets a component references that matches provided locator.
     * The search is performed from latest added references.
     * @param name a dependency name
     * @return a found component reference
     * @throws ReferenceException when requested component wasn't found
     */
    DependencyResolver.prototype.getOneRequired = function (name) {
        var locator = this.locate(name);
        if (locator == null)
            throw new ReferenceException_1.ReferenceException(null, name);
        return this._references.getOneRequired(locator);
    };
    /**
     * Find all references by specified query criteria
     * @param name a dependency name
     * @param required force to raise exception is no reference is found
     * @return list of found references
     * @throws ReferenceException when requested component wasn't found
     */
    DependencyResolver.prototype.find = function (name, required) {
        if (name == null)
            throw new Error("Name cannot be null");
        var locator = this.locate(name);
        if (locator == null) {
            if (required)
                throw new ReferenceException_1.ReferenceException(null, name);
            return null;
        }
        return this._references.find(locator, required);
    };
    DependencyResolver.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var result = new DependencyResolver();
        if (tuples == null || tuples.length == 0)
            return result;
        for (var index = 0; index < tuples.length; index += 2) {
            if (index + 1 >= tuples.length)
                break;
            var name_2 = StringConverter_1.StringConverter.toString(tuples[index]);
            var locator = tuples[index + 1];
            result.put(name_2, locator);
        }
        return result;
    };
    return DependencyResolver;
}());
exports.DependencyResolver = DependencyResolver;
//# sourceMappingURL=DependencyResolver.js.map