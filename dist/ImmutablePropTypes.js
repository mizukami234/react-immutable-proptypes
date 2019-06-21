"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This is a straight rip-off of the React.js ReactPropTypes.js proptype validators,
 * modified to make it possible to validate Immutable.js data.
 *     ImmutableTypes.listOf is patterned after React.PropTypes.arrayOf, but for Immutable.List
 *     ImmutableTypes.shape  is based on React.PropTypes.shape, but for any Immutable.Iterable
 */
var Immutable = require('immutable');

var ANONYMOUS = '<<anonymous>>';
var ImmutablePropTypes;

if (process.env.NODE_ENV !== 'production') {
  ImmutablePropTypes = {
    listOf: createListOfTypeChecker,
    mapOf: createMapOfTypeChecker,
    orderedMapOf: createOrderedMapOfTypeChecker,
    setOf: createSetOfTypeChecker,
    orderedSetOf: createOrderedSetOfTypeChecker,
    stackOf: createStackOfTypeChecker,
    iterableOf: createIterableOfTypeChecker,
    recordOf: createRecordOfTypeChecker,
    shape: createShapeChecker,
    contains: createShapeChecker,
    mapContains: createMapContainsChecker,
    // Primitive Types
    list: createImmutableTypeChecker('List', Immutable.List.isList),
    map: createImmutableTypeChecker('Map', Immutable.Map.isMap),
    orderedMap: createImmutableTypeChecker('OrderedMap', Immutable.OrderedMap.isOrderedMap),
    set: createImmutableTypeChecker('Set', Immutable.Set.isSet),
    orderedSet: createImmutableTypeChecker('OrderedSet', Immutable.OrderedSet.isOrderedSet),
    stack: createImmutableTypeChecker('Stack', Immutable.Stack.isStack),
    seq: createImmutableTypeChecker('Seq', Immutable.Seq.isSeq),
    record: createImmutableTypeChecker('Record', function (isRecord) {
      return isRecord instanceof Immutable.Record;
    }),
    iterable: createImmutableTypeChecker('Iterable', Immutable.Iterable.isIterable)
  };
} else {
  var productionTypeChecker = function productionTypeChecker() {
    invariant(false, 'ImmutablePropTypes type checking code is stripped in production.');
  };

  productionTypeChecker.isRequired = productionTypeChecker;

  var getProductionTypeChecker = function getProductionTypeChecker() {
    return productionTypeChecker;
  };

  ImmutablePropTypes = {
    listOf: getProductionTypeChecker,
    mapOf: getProductionTypeChecker,
    orderedMapOf: getProductionTypeChecker,
    setOf: getProductionTypeChecker,
    orderedSetOf: getProductionTypeChecker,
    stackOf: getProductionTypeChecker,
    iterableOf: getProductionTypeChecker,
    recordOf: getProductionTypeChecker,
    shape: getProductionTypeChecker,
    contains: getProductionTypeChecker,
    mapContains: getProductionTypeChecker,
    // Primitive Types
    list: productionTypeChecker,
    map: productionTypeChecker,
    orderedMap: productionTypeChecker,
    set: productionTypeChecker,
    orderedSet: productionTypeChecker,
    stack: productionTypeChecker,
    seq: productionTypeChecker,
    record: productionTypeChecker,
    iterable: productionTypeChecker
  };
}

ImmutablePropTypes.iterable.indexed = createIterableSubclassTypeChecker('Indexed', Immutable.Iterable.isIndexed);
ImmutablePropTypes.iterable.keyed = createIterableSubclassTypeChecker('Keyed', Immutable.Iterable.isKeyed);

function getPropType(propValue) {
  var propType = _typeof(propValue);

  if (Array.isArray(propValue)) {
    return 'array';
  }

  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }

  if (propValue instanceof Immutable.Iterable) {
    return 'Immutable.' + propValue.toSource().split(' ')[0];
  }

  return propType;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    propFullName = propFullName || propName;
    componentName = componentName || ANONYMOUS;

    if (props[propName] == null) {
      var locationName = location;

      if (isRequired) {
        return new Error("Required ".concat(locationName, " `").concat(propFullName, "` was not specified in ") + "`".concat(componentName, "`."));
      }
    } else {
      for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        rest[_key - 6] = arguments[_key];
      }

      return validate.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

function createImmutableTypeChecker(immutableClassName, immutableClassTypeValidator) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];

    if (!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      return new Error("Invalid ".concat(location, " `").concat(propFullName, "` of type `").concat(propType, "` ") + "supplied to `".concat(componentName, "`, expected `").concat(immutableClassName, "`."));
    }

    return null;
  }

  return createChainableTypeChecker(validate);
}

function createIterableSubclassTypeChecker(subclassName, validator) {
  return createImmutableTypeChecker("Iterable.".concat(subclassName), function (propValue) {
    return Immutable.Iterable.isIterable(propValue) && validator(propValue);
  });
}

function createIterableTypeChecker(typeChecker, immutableClassName, immutableClassTypeValidator) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];

    if (!immutableClassTypeValidator(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error("Invalid ".concat(locationName, " `").concat(propFullName, "` of type ") + "`".concat(propType, "` supplied to `").concat(componentName, "`, expected an Immutable.js ").concat(immutableClassName, "."));
    }

    if (typeof typeChecker !== 'function') {
      return new Error("Invalid typeChecker supplied to `".concat(componentName, "` ") + "for propType `".concat(propFullName, "`, expected a function."));
    }

    var propValues = propValue.toArray();

    for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    for (var i = 0, len = propValues.length; i < len; i++) {
      var error = typeChecker.apply(void 0, [propValues, i, componentName, location, "".concat(propFullName, "[").concat(i, "]")].concat(rest));

      if (error instanceof Error) {
        return error;
      }
    }
  }

  return createChainableTypeChecker(validate);
}

function createKeysTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];

    if (typeof typeChecker !== 'function') {
      return new Error("Invalid keysTypeChecker (optional second argument) supplied to `".concat(componentName, "` ") + "for propType `".concat(propFullName, "`, expected a function."));
    }

    var keys = propValue.keySeq().toArray();

    for (var _len3 = arguments.length, rest = new Array(_len3 > 5 ? _len3 - 5 : 0), _key3 = 5; _key3 < _len3; _key3++) {
      rest[_key3 - 5] = arguments[_key3];
    }

    for (var i = 0, len = keys.length; i < len; i++) {
      var error = typeChecker.apply(void 0, [keys, i, componentName, location, "".concat(propFullName, " -> key(").concat(keys[i], ")")].concat(rest));

      if (error instanceof Error) {
        return error;
      }
    }
  }

  return createChainableTypeChecker(validate);
}

function createListOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'List', Immutable.List.isList);
}

function createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, immutableClassName, immutableClassTypeValidator) {
  function validate() {
    return createIterableTypeChecker(valuesTypeChecker, immutableClassName, immutableClassTypeValidator).apply(void 0, arguments) || keysTypeChecker && createKeysTypeChecker(keysTypeChecker).apply(void 0, arguments);
  }

  return createChainableTypeChecker(validate);
}

function createMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, 'Map', Immutable.Map.isMap);
}

function createOrderedMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, 'OrderedMap', Immutable.OrderedMap.isOrderedMap);
}

function createSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Set', Immutable.Set.isSet);
}

function createOrderedSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'OrderedSet', Immutable.OrderedSet.isOrderedSet);
}

function createStackOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Stack', Immutable.Stack.isStack);
}

function createIterableOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Iterable', Immutable.Iterable.isIterable);
}

var CACHE_KEY = '__REACT_IMMUTABLE_PROPTYPES_VALIDATED_BY__';

function createRecordOfTypeChecker(recordKeys) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];

    if (!(propValue instanceof Immutable.Record)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error("Invalid ".concat(locationName, " `").concat(propFullName, "` of type `").concat(propType, "` ") + "supplied to `".concat(componentName, "`, expected an Immutable.js Record."));
    } // cache validation result to make it faster


    if (propValue[CACHE_KEY] === recordKeys) {
      return;
    }

    for (var _len4 = arguments.length, rest = new Array(_len4 > 5 ? _len4 - 5 : 0), _key4 = 5; _key4 < _len4; _key4++) {
      rest[_key4 - 5] = arguments[_key4];
    }

    for (var key in recordKeys) {
      var checker = recordKeys[key];

      if (!checker) {
        continue;
      }

      var mutablePropValue = propValue.toObject();
      var error = checker.apply(void 0, [mutablePropValue, key, componentName, location, "".concat(propFullName, ".").concat(key)].concat(rest));

      if (error) {
        return error;
      }
    }

    propValue[CACHE_KEY] = recordKeys;
  }

  return createChainableTypeChecker(validate);
} // there is some irony in the fact that shapeTypes is a standard hash and not an immutable collection


function createShapeTypeChecker(shapeTypes) {
  var immutableClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Iterable';
  var immutableClassTypeValidator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Immutable.Iterable.isIterable;

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];

    if (!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error("Invalid ".concat(locationName, " `").concat(propFullName, "` of type `").concat(propType, "` ") + "supplied to `".concat(componentName, "`, expected an Immutable.js ").concat(immutableClassName, "."));
    }

    var mutablePropValue = propValue.toObject();

    for (var _len5 = arguments.length, rest = new Array(_len5 > 5 ? _len5 - 5 : 0), _key5 = 5; _key5 < _len5; _key5++) {
      rest[_key5 - 5] = arguments[_key5];
    }

    for (var key in shapeTypes) {
      var checker = shapeTypes[key];

      if (!checker) {
        continue;
      }

      var error = checker.apply(void 0, [mutablePropValue, key, componentName, location, "".concat(propFullName, ".").concat(key)].concat(rest));

      if (error) {
        return error;
      }
    }
  }

  return createChainableTypeChecker(validate);
}

function createShapeChecker(shapeTypes) {
  return createShapeTypeChecker(shapeTypes);
}

function createMapContainsChecker(shapeTypes) {
  return createShapeTypeChecker(shapeTypes, 'Map', Immutable.Map.isMap);
}

module.exports = ImmutablePropTypes;