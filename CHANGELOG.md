# Basic portable abstractions for Pip.Services in Node.js Changelog

## <a name="2.2.0"></a> 2.2.0 (2017-04-05)

### Features
* **data** Added IChangeable interface

### Bug Fixes
* Fixed field names in ITrackable interface

## <a name="2.1.0"></a> 2.1.0 (2017-03-31)

### Features
* **data** Added MultiString class
* **data** Added TagsProcessor class

## <a name="2.0.11"></a> 2.0.11 (2017-03-28)

### Features
* **command** Added ICommandable interface
* **command** Command contructor not accepts a function
* **data** Added fromValue static method to FilterParams, StringValueMap, Parameters

## <a name="2.0.8"></a> 2.0.8 (2017-03-16)

### Breaking Changes
* ConnectionParams.getUri() now returns stored property instead of calculating it

## <a name="2.0.0"></a> 2.0.0 (2017-02-24)

Cleaned up and simplified dependency management and object creation.

### Features
* **refer** Added **DependencyResolver**
* **build** Added **Factory**

### Breaking Changes
* Refactored **refer** package. Removed IDescriptable and ILocateable interface. Made locator a mandatory requirement to place component into references.
* Moved **ManagedReferences** to **pip-services-container**
* Made **IConfigReader** interface asynchronous

### Bug Fixes
* Replaced log formatting with C-like format from **util** package

## <a name="1.0.0"></a> 1.0.0-1.0.3 (2017-01-28 - 2017-02-24)

Initial public release

### Features
* **build** Component factories framework
* **commands** Command and Eventing patterns
* **config** Configuration framework
* **convert** Portable soft data converters
* **count** Performance counters components
* **data** Data value objects and random value generators
* **errors** Portable application errors
* **log** Logging components
* **random** Random data generators
* **refer** Component referencing framework
* **reflect** Portable reflection helpers
* **run** Execution framework
* **validate** Data validators

