# Basic portable abstractions for Pip.Services in Node.js Changelog

## <a name="2.5.0"></a> 2.5.0 (2017-08-05)

### Features
* Added to FixedRateTimer support for callback

### Bug Fixed
* Fixed setAsObject in AnyValueMap and StringValueMap with 1 parameter

## <a name="2.4.0"></a> 2.4.0 (2017-04-20)

### Breaking changes
* Deprecated and removed ReferenceQuery

### Bug Fixed
* Fixed field names in validation

## <a name="2.3.10"></a> 2.3.10 (2017-04-19)

### Bug Fixed
* Fixed validation error messages
* Fixed connection resolution in MemoryDiscovery
* Fixed number of defects in ConnectionResolver
* Fixed number of defects in CredentialResolver

## <a name="2.3.3"></a> 2.3.3 (2017-04-12)

### Bug Fixed
* Relaxed validation of numbers in Node.js

## <a name="2.3.0"></a> 2.3.0 (2017-04-11)

### Features
* **validate** Added FilterParamsSchema and PagingParamsSchema
* **config** Added parameters to ConfigReader.readConfig()

## <a name="2.2.4"></a> 2.2.4 (2017-04-09)

### Bug Fixed
* Code cleanup after sync with Python
* Fixed date to string conversion

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

