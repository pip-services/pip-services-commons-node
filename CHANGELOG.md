# Basic portable abstractions for Pip.Services in Node.js Changelog

## <a name="2.0.0"></a> 2.0.0 (2017-02-24)

Cleaned up and simplified programming model.

### Breaking Changes
* Refactored **refer** package. Removed IDescriptable and ILocateable interface. Made locator a mandatory requirement to place component into references.
* Moved **ManagedReferences** to **pip-services-container**
* Made **IConfigReader** interface asynchronous

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

### Breaking Changes
No breaking changes since this is the first version

### Bug Fixes
No fixes in this version

