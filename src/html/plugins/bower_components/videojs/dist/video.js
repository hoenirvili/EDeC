/**
 * @license
 * Video.js 5.0.0-29 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = _dereq_('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":3}],2:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(_dereq_,module,exports){

},{}],4:[function(_dereq_,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],5:[function(_dereq_,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],6:[function(_dereq_,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],7:[function(_dereq_,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],8:[function(_dereq_,module,exports){
var createBaseFor = _dereq_('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":17}],9:[function(_dereq_,module,exports){
var baseFor = _dereq_('./baseFor'),
    keysIn = _dereq_('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":39,"./baseFor":8}],10:[function(_dereq_,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],11:[function(_dereq_,module,exports){
var arrayEach = _dereq_('./arrayEach'),
    baseMergeDeep = _dereq_('./baseMergeDeep'),
    isArray = _dereq_('../lang/isArray'),
    isArrayLike = _dereq_('./isArrayLike'),
    isObject = _dereq_('../lang/isObject'),
    isObjectLike = _dereq_('./isObjectLike'),
    isTypedArray = _dereq_('../lang/isTypedArray'),
    keys = _dereq_('../object/keys');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? null : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":30,"../lang/isObject":33,"../lang/isTypedArray":36,"../object/keys":38,"./arrayEach":6,"./baseMergeDeep":12,"./isArrayLike":20,"./isObjectLike":25}],12:[function(_dereq_,module,exports){
var arrayCopy = _dereq_('./arrayCopy'),
    isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isArrayLike = _dereq_('./isArrayLike'),
    isPlainObject = _dereq_('../lang/isPlainObject'),
    isTypedArray = _dereq_('../lang/isTypedArray'),
    toPlainObject = _dereq_('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":29,"../lang/isArray":30,"../lang/isPlainObject":34,"../lang/isTypedArray":36,"../lang/toPlainObject":37,"./arrayCopy":5,"./isArrayLike":20}],13:[function(_dereq_,module,exports){
var toObject = _dereq_('./toObject');

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : toObject(object)[key];
  };
}

module.exports = baseProperty;

},{"./toObject":28}],14:[function(_dereq_,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],15:[function(_dereq_,module,exports){
var identity = _dereq_('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":43}],16:[function(_dereq_,module,exports){
var bindCallback = _dereq_('./bindCallback'),
    isIterateeCall = _dereq_('./isIterateeCall'),
    restParam = _dereq_('../function/restParam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":4,"./bindCallback":15,"./isIterateeCall":23}],17:[function(_dereq_,module,exports){
var toObject = _dereq_('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":28}],18:[function(_dereq_,module,exports){
var baseProperty = _dereq_('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":13}],19:[function(_dereq_,module,exports){
var isNative = _dereq_('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":32}],20:[function(_dereq_,module,exports){
var getLength = _dereq_('./getLength'),
    isLength = _dereq_('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":18,"./isLength":24}],21:[function(_dereq_,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
var isHostObject = (function() {
  try {
    Object({ 'toString': 0 } + '');
  } catch(e) {
    return function() { return false; };
  }
  return function(value) {
    // IE < 9 presents many host objects as `Object` objects that can coerce
    // to strings despite having improperly defined `toString` methods.
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  };
}());

module.exports = isHostObject;

},{}],22:[function(_dereq_,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],23:[function(_dereq_,module,exports){
var isArrayLike = _dereq_('./isArrayLike'),
    isIndex = _dereq_('./isIndex'),
    isObject = _dereq_('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":33,"./isArrayLike":20,"./isIndex":22}],24:[function(_dereq_,module,exports){
/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],25:[function(_dereq_,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],26:[function(_dereq_,module,exports){
var baseForIn = _dereq_('./baseForIn'),
    isArguments = _dereq_('../lang/isArguments'),
    isHostObject = _dereq_('./isHostObject'),
    isObjectLike = _dereq_('./isObjectLike'),
    support = _dereq_('../support');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value)) ||
      (!hasOwnProperty.call(value, 'constructor') &&
        (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) ||
      (!support.argsTag && isArguments(value))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  if (support.ownLast) {
    baseForIn(value, function(subValue, key, object) {
      result = hasOwnProperty.call(object, key);
      return false;
    });
    return result !== false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = shimIsPlainObject;

},{"../lang/isArguments":29,"../support":42,"./baseForIn":9,"./isHostObject":21,"./isObjectLike":25}],27:[function(_dereq_,module,exports){
var isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isIndex = _dereq_('./isIndex'),
    isLength = _dereq_('./isLength'),
    isString = _dereq_('../lang/isString'),
    keysIn = _dereq_('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":29,"../lang/isArray":30,"../lang/isString":35,"../object/keysIn":39,"./isIndex":22,"./isLength":24}],28:[function(_dereq_,module,exports){
var isObject = _dereq_('../lang/isObject'),
    isString = _dereq_('../lang/isString'),
    support = _dereq_('../support');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  if (support.unindexedChars && isString(value)) {
    var index = -1,
        length = value.length,
        result = Object(value);

    while (++index < length) {
      result[index] = value.charAt(index);
    }
    return result;
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":33,"../lang/isString":35,"../support":42}],29:[function(_dereq_,module,exports){
var isArrayLike = _dereq_('../internal/isArrayLike'),
    isObjectLike = _dereq_('../internal/isObjectLike'),
    support = _dereq_('../support');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}
// Fallback for environments without a `toStringTag` for `arguments` objects.
if (!support.argsTag) {
  isArguments = function(value) {
    return isObjectLike(value) && isArrayLike(value) &&
      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
}

module.exports = isArguments;

},{"../internal/isArrayLike":20,"../internal/isObjectLike":25,"../support":42}],30:[function(_dereq_,module,exports){
var getNative = _dereq_('../internal/getNative'),
    isLength = _dereq_('../internal/isLength'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":19,"../internal/isLength":24,"../internal/isObjectLike":25}],31:[function(_dereq_,module,exports){
(function (global){
var baseIsFunction = _dereq_('../internal/baseIsFunction'),
    getNative = _dereq_('../internal/getNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = getNative(global, 'Uint8Array');

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../internal/baseIsFunction":10,"../internal/getNative":19}],32:[function(_dereq_,module,exports){
var escapeRegExp = _dereq_('../string/escapeRegExp'),
    isHostObject = _dereq_('../internal/isHostObject'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"../internal/isHostObject":21,"../internal/isObjectLike":25,"../string/escapeRegExp":41}],33:[function(_dereq_,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],34:[function(_dereq_,module,exports){
var getNative = _dereq_('../internal/getNative'),
    isArguments = _dereq_('./isArguments'),
    shimIsPlainObject = _dereq_('../internal/shimIsPlainObject'),
    support = _dereq_('../support');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var getPrototypeOf = getNative(Object, 'getPrototypeOf');

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && objToString.call(value) == objectTag) || (!support.argsTag && isArguments(value))) {
    return false;
  }
  var valueOf = getNative(value, 'valueOf'),
      objProto = valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internal/getNative":19,"../internal/shimIsPlainObject":26,"../support":42,"./isArguments":29}],35:[function(_dereq_,module,exports){
var isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":25}],36:[function(_dereq_,module,exports){
var isLength = _dereq_('../internal/isLength'),
    isObjectLike = _dereq_('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":24,"../internal/isObjectLike":25}],37:[function(_dereq_,module,exports){
var baseCopy = _dereq_('../internal/baseCopy'),
    keysIn = _dereq_('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":7,"../object/keysIn":39}],38:[function(_dereq_,module,exports){
var getNative = _dereq_('../internal/getNative'),
    isArrayLike = _dereq_('../internal/isArrayLike'),
    isObject = _dereq_('../lang/isObject'),
    shimKeys = _dereq_('../internal/shimKeys'),
    support = _dereq_('../support');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? null : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":19,"../internal/isArrayLike":20,"../internal/shimKeys":27,"../lang/isObject":33,"../support":42}],39:[function(_dereq_,module,exports){
var arrayEach = _dereq_('../internal/arrayEach'),
    isArguments = _dereq_('../lang/isArguments'),
    isArray = _dereq_('../lang/isArray'),
    isFunction = _dereq_('../lang/isFunction'),
    isIndex = _dereq_('../internal/isIndex'),
    isLength = _dereq_('../internal/isLength'),
    isObject = _dereq_('../lang/isObject'),
    isString = _dereq_('../lang/isString'),
    support = _dereq_('../support');

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/** Used to fix the JScript `[[DontEnum]]` bug. */
var shadowProps = [
  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'
];

/** Used for native method references. */
var errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to avoid iterating over non-enumerable properties in IE < 9. */
var nonEnumProps = {};
nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
nonEnumProps[objectTag] = { 'constructor': true };

arrayEach(shadowProps, function(key) {
  for (var tag in nonEnumProps) {
    if (hasOwnProperty.call(nonEnumProps, tag)) {
      var props = nonEnumProps[tag];
      props[key] = hasOwnProperty.call(props, key);
    }
  }
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;

  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
      isProto = proto === object,
      result = Array(length),
      skipIndexes = length > 0,
      skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
      skipProto = support.enumPrototypes && isFunction(object);

  while (++index < length) {
    result[index] = (index + '');
  }
  // lodash skips the `constructor` property when it infers it is iterating
  // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
  // attribute of an existing property and the `constructor` property of a
  // prototype defaults to non-enumerable.
  for (var key in object) {
    if (!(skipProto && key == 'prototype') &&
        !(skipErrorProps && (key == 'message' || key == 'name')) &&
        !(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  if (support.nonEnumShadows && object !== objectProto) {
    var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

    if (tag == objectTag) {
      proto = objectProto;
    }
    length = shadowProps.length;
    while (length--) {
      key = shadowProps[length];
      var nonEnum = nonEnums[key];
      if (!(isProto && nonEnum) &&
          (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
        result.push(key);
      }
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/arrayEach":6,"../internal/isIndex":22,"../internal/isLength":24,"../lang/isArguments":29,"../lang/isArray":30,"../lang/isFunction":31,"../lang/isObject":33,"../lang/isString":35,"../support":42}],40:[function(_dereq_,module,exports){
var baseMerge = _dereq_('../internal/baseMerge'),
    createAssigner = _dereq_('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":11,"../internal/createAssigner":16}],41:[function(_dereq_,module,exports){
var baseToString = _dereq_('../internal/baseToString');

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":14}],42:[function(_dereq_,module,exports){
(function (global){
/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    objectTag = '[object Object]';

/** Used for native method references. */
var arrayProto = Array.prototype,
    errorProto = Error.prototype,
    objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) ? document.document : null;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {
  var Ctor = function() { this.x = x; },
      object = { '0': x, 'length': x },
      props = [];

  Ctor.prototype = { 'valueOf': x, 'y': x };
  for (var key in new Ctor) { props.push(key); }

  /**
   * Detect if the `toStringTag` of `arguments` objects is resolvable
   * (all but Firefox < 4, IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.argsTag = objToString.call(arguments) == argsTag;

  /**
   * Detect if `name` or `message` properties of `Error.prototype` are
   * enumerable by default (IE < 9, Safari < 5.1).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
    propertyIsEnumerable.call(errorProto, 'name');

  /**
   * Detect if `prototype` properties are enumerable by default.
   *
   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
   * (if the prototype or a property on the prototype has been set)
   * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
   * property to `true`.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

  /**
   * Detect if the `toStringTag` of DOM nodes is resolvable (all but IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nodeTag = objToString.call(document) != objectTag;

  /**
   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
   *
   * In IE < 9 an object's own properties, shadowing non-enumerable ones,
   * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumShadows = !/valueOf/.test(props);

  /**
   * Detect if own properties are iterated after inherited properties (IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.ownLast = props[0] != 'x';

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects
   * correctly.
   *
   * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
   * `shift()` and `splice()` functions that fail to remove the last element,
   * `value[0]`, of array-like objects even though the "length" property is
   * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
   * while `splice()` is buggy regardless of mode in IE < 9.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

  /**
   * Detect lack of support for accessing string characters by index.
   *
   * IE < 8 can't access characters by index. IE 8 can only access characters
   * by index on string literals, not string objects.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }
}(1, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],43:[function(_dereq_,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],44:[function(_dereq_,module,exports){
'use strict';

// modified from https://github.com/es-shims/es6-shim
var keys = _dereq_('object-keys');
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
var defineProperties = _dereq_('define-properties');
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
var isEnumerableOn = function (obj) {
	return function isEnumerable(prop) {
		return propIsEnumerable.call(obj, prop);
	};
};

var assignShim = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = Object(target);
	var s, source, i, props;
	for (s = 1; s < arguments.length; ++s) {
		source = Object(arguments[s]);
		props = keys(source);
		if (hasSymbols && Object.getOwnPropertySymbols) {
			props.push.apply(props, Object.getOwnPropertySymbols(source).filter(isEnumerableOn(source)));
		}
		for (i = 0; i < props.length; ++i) {
			objTarget[props[i]] = source[props[i]];
		}
	}
	return objTarget;
};

assignShim.shim = function shimObjectAssign() {
	if (Object.assign && Object.preventExtensions) {
		var assignHasPendingExceptions = (function () {
			// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
			// which is 72% slower than our shim, and Firefox 40's native implementation.
			var thrower = Object.preventExtensions({ 1: 2 });
			try {
				Object.assign(thrower, 'xy');
			} catch (e) {
				return thrower[1] === 'y';
			}
		}());
		if (assignHasPendingExceptions) {
			delete Object.assign;
		}
	}
	if (!Object.assign) {
		defineProperties(Object, {
			assign: assignShim
		});
	}
	return Object.assign || assignShim;
};

module.exports = assignShim;


},{"define-properties":45,"object-keys":47}],45:[function(_dereq_,module,exports){
'use strict';

var keys = _dereq_('object-keys');
var foreach = _dereq_('foreach');

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { value: obj });
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: value
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	foreach(keys(map), function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":46,"object-keys":47}],46:[function(_dereq_,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],47:[function(_dereq_,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var isArgs = _dereq_('./isArguments');
var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var ctor = object.constructor;
		var skipConstructor = ctor && ctor.prototype === object;

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (!Object.keys) {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":48}],48:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]'
			&& value !== null
			&& typeof value === 'object'
			&& typeof value.length === 'number'
			&& value.length >= 0
			&& toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],49:[function(_dereq_,module,exports){
module.exports = SafeParseTuple

function SafeParseTuple(obj, reviver) {
    var json
    var error = null

    try {
        json = JSON.parse(obj, reviver)
    } catch (err) {
        error = err
    }

    return [error, json]
}

},{}],50:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('./button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('./component.js');

var _Component2 = _interopRequireWildcard(_Component);

/* Big Play Button
================================================================================ */
/**
 * Initial play button. Shows before the video has played. The hiding of the
 * big play button is done via CSS and player states.
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var BigPlayButton = (function (_Button) {
  function BigPlayButton() {
    _classCallCheck(this, BigPlayButton);

    if (_Button != null) {
      _Button.apply(this, arguments);
    }
  }

  _inherits(BigPlayButton, _Button);

  BigPlayButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-big-play-button';
  };

  BigPlayButton.prototype.handleClick = function handleClick() {
    this.player_.play();
  };

  return BigPlayButton;
})(_Button3['default']);

BigPlayButton.prototype.controlText_ = 'Play Video';

_Component2['default'].registerComponent('BigPlayButton', BigPlayButton);
exports['default'] = BigPlayButton;
module.exports = exports['default'];

},{"./button.js":51,"./component.js":52}],51:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('./utils/events.js');

var Events = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./utils/fn.js');

var Fn = _interopRequireWildcard(_import3);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

/* Button - Base class for all buttons
================================================================================ */
/**
 * Base class for all buttons
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Button = (function (_Component) {
  function Button(player, options) {
    _classCallCheck(this, Button);

    _Component.call(this, player, options);

    this.emitTapEvents();

    this.on('tap', this.handleClick);
    this.on('click', this.handleClick);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
  }

  _inherits(Button, _Component);

  Button.prototype.createEl = function createEl() {
    var type = arguments[0] === undefined ? 'button' : arguments[0];
    var props = arguments[1] === undefined ? {} : arguments[1];

    // Add standard Aria and Tabindex info
    props = _assign2['default']({
      className: this.buildCSSClass(),
      role: 'button',
      'aria-live': 'polite', // let the screen reader user know that the text of the button may change
      tabIndex: 0
    }, props);

    var el = _Component.prototype.createEl.call(this, type, props);

    this.controlTextEl_ = Dom.createEl('span', {
      className: 'vjs-control-text'
    });

    el.appendChild(this.controlTextEl_);

    this.controlText(this.controlText_);

    return el;
  };

  Button.prototype.controlText = function controlText(text) {
    if (!text) {
      return this.controlText_ || 'Need Text';
    }this.controlText_ = text;
    this.controlTextEl_.innerHTML = this.localize(this.controlText_);

    return this;
  };

  Button.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-control vjs-button ' + _Component.prototype.buildCSSClass.call(this);
  };

  // Click - Override with specific functionality for button

  Button.prototype.handleClick = function handleClick() {};

  // Focus - Add keyboard functionality to element

  Button.prototype.handleFocus = function handleFocus() {
    Events.on(_document2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
  };

  // KeyPress (document level) - Trigger click when keys are pressed

  Button.prototype.handleKeyPress = function handleKeyPress(event) {
    // Check for space bar (32) or enter (13) keys
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      this.handleClick();
    }
  };

  // Blur - Remove keyboard triggers

  Button.prototype.handleBlur = function handleBlur() {
    Events.off(_document2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
  };

  return Button;
})(_Component3['default']);

_Component3['default'].registerComponent('Button', Button);
exports['default'] = Button;
module.exports = exports['default'];

},{"./component":52,"./utils/dom.js":110,"./utils/events.js":111,"./utils/fn.js":112,"global/document":1,"object.assign":44}],52:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;
/**
 * @fileoverview Player Component - Base class for all UI objects
 *
 */

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _import = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('./utils/fn.js');

var Fn = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./utils/guid.js');

var Guid = _interopRequireWildcard(_import3);

var _import4 = _dereq_('./utils/events.js');

var Events = _interopRequireWildcard(_import4);

var _log = _dereq_('./utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _toTitleCase = _dereq_('./utils/to-title-case.js');

var _toTitleCase2 = _interopRequireWildcard(_toTitleCase);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

var _mergeOptions = _dereq_('./utils/merge-options.js');

var _mergeOptions2 = _interopRequireWildcard(_mergeOptions);

/**
 * Base UI Component class
 *
 * Components are embeddable UI objects that are represented by both a
 * javascript object and an element in the DOM. They can be children of other
 * components, and can have many children themselves.
 *
 *     // adding a button to the player
 *     var button = player.addChild('button');
 *     button.el(); // -> button element
 *
 *     <div class="video-js">
 *       <div class="vjs-button">Button</div>
 *     </div>
 *
 * Components are also event emitters.
 *
 *     button.on('click', function(){
 *       console.log('Button Clicked!');
 *     });
 *
 *     button.trigger('customevent');
 *
 * @param {Object} player  Main Player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Component = (function () {
  function Component(player, options, ready) {
    _classCallCheck(this, Component);

    // The component might be the player itself and we can't pass `this` to super
    if (!player && this.play) {
      this.player_ = player = this; // eslint-disable-line
    } else {
      this.player_ = player;
    }

    // Make a copy of prototype.options_ to protect against overriding defaults
    this.options_ = _mergeOptions2['default']({}, this.options_);

    // Updated options with supplied options
    options = this.options(options);

    // Get ID from options or options element if one is supplied
    this.id_ = options.id || options.el && options.el.id;

    // If there was no ID from the options, generate one
    if (!this.id_) {
      // Don't require the player ID function in the case of mock players
      var id = player && player.id && player.id() || 'no_player';

      this.id_ = '' + id + '_component_' + Guid.newGUID();
    }

    this.name_ = options.name || null;

    // Create element if one wasn't provided in options
    if (options.el) {
      this.el_ = options.el;
    } else if (options.createEl !== false) {
      this.el_ = this.createEl();
    }

    this.children_ = [];
    this.childIndex_ = {};
    this.childNameIndex_ = {};

    // Add any child components in options
    if (options.initChildren !== false) {
      this.initChildren();
    }

    this.ready(ready);
    // Don't want to trigger ready here or it will before init is actually
    // finished for all children that run this constructor

    if (options.reportTouchActivity !== false) {
      this.enableTouchActivity();
    }
  }

  // Temp for ES6 class transition, remove before 5.0

  Component.prototype.init = function init() {
    // console.log('init called on Component');
    Component.apply(this, arguments);
  };

  /**
   * Dispose of the component and all child components
   */

  Component.prototype.dispose = function dispose() {
    this.trigger({ type: 'dispose', bubbles: false });

    // Dispose all children.
    if (this.children_) {
      for (var i = this.children_.length - 1; i >= 0; i--) {
        if (this.children_[i].dispose) {
          this.children_[i].dispose();
        }
      }
    }

    // Delete child references
    this.children_ = null;
    this.childIndex_ = null;
    this.childNameIndex_ = null;

    // Remove all event listeners.
    this.off();

    // Remove element from DOM
    if (this.el_.parentNode) {
      this.el_.parentNode.removeChild(this.el_);
    }

    Dom.removeElData(this.el_);
    this.el_ = null;
  };

  /**
   * Return the component's player
   *
   * @return {Player}
   */

  Component.prototype.player = function player() {
    return this.player_;
  };

  /**
   * Deep merge of options objects
   *
   * Whenever a property is an object on both options objects
   * the two properties will be merged using mergeOptions.
   *
   * This is used for merging options for child components. We
   * want it to be easy to override individual options on a child
   * component without having to rewrite all the other default options.
   *
   *     Parent.prototype.options_ = {
   *       children: {
   *         'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },
   *         'childTwo': {},
   *         'childThree': {}
   *       }
   *     }
   *     newOptions = {
   *       children: {
   *         'childOne': { 'foo': 'baz', 'abc': '123' }
   *         'childTwo': null,
   *         'childFour': {}
   *       }
   *     }
   *
   *     this.options(newOptions);
   *
   * RESULT
   *
   *     {
   *       children: {
   *         'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },
   *         'childTwo': null, // Disabled. Won't be initialized.
   *         'childThree': {},
   *         'childFour': {}
   *       }
   *     }
   *
   * @param  {Object} obj Object of new option values
   * @return {Object}     A NEW object of this.options_ and obj merged
   */

  Component.prototype.options = function options(obj) {
    if (!obj) {
      return this.options_;
    }

    this.options_ = _mergeOptions2['default'](this.options_, obj);
    return this.options_;
  };

  /**
   * Get the component's DOM element
   *
   *     var domEl = myComponent.el();
   *
   * @return {Element}
   */

  Component.prototype.el = function el() {
    return this.el_;
  };

  /**
   * Create the component's DOM element
   *
   * @param  {String=} tagName  Element's node type. e.g. 'div'
   * @param  {Object=} attributes An object of element attributes that should be set on the element
   * @return {Element}
   */

  Component.prototype.createEl = function createEl(tagName, attributes) {
    return Dom.createEl(tagName, attributes);
  };

  Component.prototype.localize = function localize(string) {
    var code = this.player_.language && this.player_.language();
    var languages = this.player_.languages && this.player_.languages();

    if (!code || !languages) {
      return string;
    }

    var language = languages[code];

    if (language && language[string]) {
      return language[string];
    }

    var primaryCode = code.split('-')[0];
    var primaryLang = languages[primaryCode];

    if (primaryLang && primaryLang[string]) {
      return primaryLang[string];
    }

    return string;
  };

  /**
   * Return the component's DOM element where children are inserted.
   * Will either be the same as el() or a new element defined in createEl().
   *
   * @return {Element}
   */

  Component.prototype.contentEl = function contentEl() {
    return this.contentEl_ || this.el_;
  };

  /**
   * Get the component's ID
   *
   *     var id = myComponent.id();
   *
   * @return {String}
   */

  Component.prototype.id = function id() {
    return this.id_;
  };

  /**
   * Get the component's name. The name is often used to reference the component.
   *
   *     var name = myComponent.name();
   *
   * @return {String}
   */

  Component.prototype.name = function name() {
    return this.name_;
  };

  /**
   * Get an array of all child components
   *
   *     var kids = myComponent.children();
   *
   * @return {Array} The children
   */

  Component.prototype.children = function children() {
    return this.children_;
  };

  /**
   * Returns a child component with the provided ID
   *
   * @return {Component}
   */

  Component.prototype.getChildById = function getChildById(id) {
    return this.childIndex_[id];
  };

  /**
   * Returns a child component with the provided name
   *
   * @return {Component}
   */

  Component.prototype.getChild = function getChild(name) {
    return this.childNameIndex_[name];
  };

  /**
   * Adds a child component inside this component
   *
   *     myComponent.el();
   *     // -> <div class='my-component'></div>
   *     myComponent.children();
   *     // [empty array]
   *
   *     var myButton = myComponent.addChild('MyButton');
   *     // -> <div class='my-component'><div class="my-button">myButton<div></div>
   *     // -> myButton === myComonent.children()[0];
   *
   * Pass in options for child constructors and options for children of the child
   *
   *     var myButton = myComponent.addChild('MyButton', {
   *       text: 'Press Me',
   *       children: {
   *         buttonChildExample: {
   *           buttonChildOption: true
   *         }
   *       }
   *     });
   *
   * @param {String|Component} child The class name or instance of a child to add
   * @param {Object=} options Options, including options to be passed to children of the child.
   * @return {Component} The child component (created by this process if a string was used)
   * @suppress {accessControls|checkRegExp|checkTypes|checkVars|const|constantProperty|deprecated|duplicate|es5Strict|fileoverviewTags|globalThis|invalidCasts|missingProperties|nonStandardJsDocs|strictModuleDepCheck|undefinedNames|undefinedVars|unknownDefines|uselessCode|visibility}
   */

  Component.prototype.addChild = function addChild(child) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    var component = undefined;
    var componentName = undefined;

    // If child is a string, create nt with options
    if (typeof child === 'string') {
      componentName = child;

      // Options can also be specified as a boolean, so convert to an empty object if false.
      if (!options) {
        options = {};
      }

      // Same as above, but true is deprecated so show a warning.
      if (options === true) {
        _log2['default'].warn('Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`.');
        options = {};
      }

      // If no componentClass in options, assume componentClass is the name lowercased
      // (e.g. playButton)
      var componentClassName = options.componentClass || _toTitleCase2['default'](componentName);

      // Set name through options
      options.name = componentName;

      // Create a new object & element for this controls set
      // If there's no .player_, this is a player
      var ComponentClass = Component.getComponent(componentClassName);

      component = new ComponentClass(this.player_ || this, options);

      // child is a component instance
    } else {
      component = child;
    }

    this.children_.push(component);

    if (typeof component.id === 'function') {
      this.childIndex_[component.id()] = component;
    }

    // If a name wasn't used to create the component, check if we can use the
    // name function of the component
    componentName = componentName || component.name && component.name();

    if (componentName) {
      this.childNameIndex_[componentName] = component;
    }

    // Add the UI object's element to the container div (box)
    // Having an element is not required
    if (typeof component.el === 'function' && component.el()) {
      this.contentEl().appendChild(component.el());
    }

    // Return so it can stored on parent object if desired.
    return component;
  };

  /**
   * Remove a child component from this component's list of children, and the
   * child component's element from this component's element
   *
   * @param  {Component} component Component to remove
   */

  Component.prototype.removeChild = function removeChild(component) {
    if (typeof component === 'string') {
      component = this.getChild(component);
    }

    if (!component || !this.children_) {
      return;
    }

    var childFound = false;

    for (var i = this.children_.length - 1; i >= 0; i--) {
      if (this.children_[i] === component) {
        childFound = true;
        this.children_.splice(i, 1);
        break;
      }
    }

    if (!childFound) {
      return;
    }

    this.childIndex_[component.id()] = null;
    this.childNameIndex_[component.name()] = null;

    var compEl = component.el();

    if (compEl && compEl.parentNode === this.contentEl()) {
      this.contentEl().removeChild(component.el());
    }
  };

  /**
   * Add and initialize default child components from options
   *
   *     // when an instance of MyComponent is created, all children in options
   *     // will be added to the instance by their name strings and options
   *     MyComponent.prototype.options_.children = {
   *       myChildComponent: {
   *         myChildOption: true
   *       }
   *     }
   *
   *     // Or when creating the component
   *     var myComp = new MyComponent(player, {
   *       children: {
   *         myChildComponent: {
   *           myChildOption: true
   *         }
   *       }
   *     });
   *
   * The children option can also be an Array of child names or
   * child options objects (that also include a 'name' key).
   *
   *     var myComp = new MyComponent(player, {
   *       children: [
   *         'button',
   *         {
   *           name: 'button',
   *           someOtherOption: true
   *         }
   *       ]
   *     });
   *
   */

  Component.prototype.initChildren = function initChildren() {
    var _this = this;

    var children = this.options_.children;

    if (children) {
      (function () {
        // `this` is `parent`
        var parentOptions = _this.options();
        var handleAdd = function handleAdd(name, opts) {
          // Allow options for children to be set at the parent options
          // e.g. videojs(id, { controlBar: false });
          // instead of videojs(id, { children: { controlBar: false });
          if (parentOptions[name] !== undefined) {
            opts = parentOptions[name];
          }

          // Allow for disabling default components
          // e.g. options['children']['posterImage'] = false
          if (opts === false) {
            return;
          }

          // Create and add the child component.
          // Add a direct reference to the child by name on the parent instance.
          // If two of the same component are used, different names should be supplied
          // for each
          _this[name] = _this.addChild(name, opts);
        };

        // Allow for an array of children details to passed in the options
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var _name = undefined;
            var opts = undefined;

            if (typeof child === 'string') {
              // ['myComponent']
              _name = child;
              opts = {};
            } else {
              // [{ name: 'myComponent', otherOption: true }]
              _name = child.name;
              opts = child;
            }

            handleAdd(_name, opts);
          }
        } else {
          Object.getOwnPropertyNames(children).forEach(function (name) {
            handleAdd(name, children[name]);
          });
        }
      })();
    }
  };

  /**
   * Allows sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   */

  Component.prototype.buildCSSClass = function buildCSSClass() {
    // Child classes can include a function that does:
    // return 'CLASS NAME' + this._super();
    return '';
  };

  /**
   * Add an event listener to this component's element
   *
   *     var myFunc = function(){
   *       var myComponent = this;
   *       // Do something when the event is fired
   *     };
   *
   *     myComponent.on('eventType', myFunc);
   *
   * The context of myFunc will be myComponent unless previously bound.
   *
   * Alternatively, you can add a listener to another element or component.
   *
   *     myComponent.on(otherElement, 'eventName', myFunc);
   *     myComponent.on(otherComponent, 'eventName', myFunc);
   *
   * The benefit of using this over `VjsEvents.on(otherElement, 'eventName', myFunc)`
   * and `otherComponent.on('eventName', myFunc)` is that this way the listeners
   * will be automatically cleaned up when either component is disposed.
   * It will also bind myComponent as the context of myFunc.
   *
   * **NOTE**: When using this on elements in the page other than window
   * and document (both permanent), if you remove the element from the DOM
   * you need to call `myComponent.trigger(el, 'dispose')` on it to clean up
   * references to it and allow the browser to garbage collect it.
   *
   * @param  {String|Component} first   The event type or other component
   * @param  {Function|String}      second  The event handler or event type
   * @param  {Function}             third   The event handler
   * @return {Component}        self
   */

  Component.prototype.on = function on(first, second, third) {
    var _this2 = this;

    if (typeof first === 'string' || Array.isArray(first)) {
      Events.on(this.el_, first, Fn.bind(this, second));

      // Targeting another component or element
    } else {
      (function () {
        var target = first;
        var type = second;
        var fn = Fn.bind(_this2, third);

        // When this component is disposed, remove the listener from the other component
        var removeOnDispose = function removeOnDispose() {
          return _this2.off(target, type, fn);
        };

        // Use the same function ID so we can remove it later it using the ID
        // of the original listener
        removeOnDispose.guid = fn.guid;
        _this2.on('dispose', removeOnDispose);

        // If the other component is disposed first we need to clean the reference
        // to the other component in this component's removeOnDispose listener
        // Otherwise we create a memory leak.
        var cleanRemover = function cleanRemover() {
          return _this2.off('dispose', removeOnDispose);
        };

        // Add the same function ID so we can easily remove it later
        cleanRemover.guid = fn.guid;

        // Check if this is a DOM node
        if (first.nodeName) {
          // Add the listener to the other element
          Events.on(target, type, fn);
          Events.on(target, 'dispose', cleanRemover);

          // Should be a component
          // Not using `instanceof Component` because it makes mock players difficult
        } else if (typeof first.on === 'function') {
          // Add the listener to the other component
          target.on(type, fn);
          target.on('dispose', cleanRemover);
        }
      })();
    }

    return this;
  };

  /**
   * Remove an event listener from this component's element
   *
   *     myComponent.off('eventType', myFunc);
   *
   * If myFunc is excluded, ALL listeners for the event type will be removed.
   * If eventType is excluded, ALL listeners will be removed from the component.
   *
   * Alternatively you can use `off` to remove listeners that were added to other
   * elements or components using `myComponent.on(otherComponent...`.
   * In this case both the event type and listener function are REQUIRED.
   *
   *     myComponent.off(otherElement, 'eventType', myFunc);
   *     myComponent.off(otherComponent, 'eventType', myFunc);
   *
   * @param  {String=|Component}  first  The event type or other component
   * @param  {Function=|String}       second The listener function or event type
   * @param  {Function=}              third  The listener for other component
   * @return {Component}
   */

  Component.prototype.off = function off(first, second, third) {
    if (!first || typeof first === 'string' || Array.isArray(first)) {
      Events.off(this.el_, first, second);
    } else {
      var target = first;
      var type = second;
      // Ensure there's at least a guid, even if the function hasn't been used
      var fn = Fn.bind(this, third);

      // Remove the dispose listener on this component,
      // which was given the same guid as the event listener
      this.off('dispose', fn);

      if (first.nodeName) {
        // Remove the listener
        Events.off(target, type, fn);
        // Remove the listener for cleaning the dispose listener
        Events.off(target, 'dispose', fn);
      } else {
        target.off(type, fn);
        target.off('dispose', fn);
      }
    }

    return this;
  };

  /**
   * Add an event listener to be triggered only once and then removed
   *
   *     myComponent.one('eventName', myFunc);
   *
   * Alternatively you can add a listener to another element or component
   * that will be triggered only once.
   *
   *     myComponent.one(otherElement, 'eventName', myFunc);
   *     myComponent.one(otherComponent, 'eventName', myFunc);
   *
   * @param  {String|Component}  first   The event type or other component
   * @param  {Function|String}       second  The listener function or event type
   * @param  {Function=}             third   The listener function for other component
   * @return {Component}
   */

  Component.prototype.one = function one(first, second, third) {
    var _this3 = this;

    var _arguments = arguments;

    if (typeof first === 'string' || Array.isArray(first)) {
      Events.one(this.el_, first, Fn.bind(this, second));
    } else {
      (function () {
        var target = first;
        var type = second;
        var fn = Fn.bind(_this3, third);

        var newFunc = (function (_newFunc) {
          function newFunc() {
            return _newFunc.apply(this, arguments);
          }

          newFunc.toString = function () {
            return _newFunc.toString();
          };

          return newFunc;
        })(function () {
          _this3.off(target, type, newFunc);
          fn.apply(null, _arguments);
        });

        // Keep the same function ID so we can remove it later
        newFunc.guid = fn.guid;

        _this3.on(target, type, newFunc);
      })();
    }

    return this;
  };

  /**
   * Trigger an event on an element
   *
   *     myComponent.trigger('eventName');
   *     myComponent.trigger({'type':'eventName'});
   *
   * @param  {Event|Object|String} event  A string (the type) or an event object with a type attribute
   * @return {Component}       self
   */

  Component.prototype.trigger = function trigger(event) {
    Events.trigger(this.el_, event);
    return this;
  };

  /**
   * Bind a listener to the component's ready state
   *
   * Different from event listeners in that if the ready event has already happened
   * it will trigger the function immediately.
   *
   * @param  {Function} fn Ready listener
   * @return {Component}
   */

  Component.prototype.ready = function ready(fn) {
    if (fn) {
      if (this.isReady_) {
        // Ensure function is always called asynchronously
        this.setTimeout(fn, 1);
      } else {
        this.readyQueue_ = this.readyQueue_ || [];
        this.readyQueue_.push(fn);
      }
    }
    return this;
  };

  /**
   * Trigger the ready listeners
   *
   * @return {Component}
   */

  Component.prototype.triggerReady = function triggerReady() {
    this.isReady_ = true;

    // Ensure ready is triggerd asynchronously
    this.setTimeout(function () {
      var readyQueue = this.readyQueue_;

      if (readyQueue && readyQueue.length > 0) {
        readyQueue.forEach(function (fn) {
          fn.call(this);
        }, this);

        // Reset Ready Queue
        this.readyQueue_ = [];
      }

      // Allow for using event listeners also
      this.trigger('ready');
    }, 1);
  };

  /**
   * Check if a component's element has a CSS class name
   *
   * @param {String} classToCheck Classname to check
   * @return {Component}
   */

  Component.prototype.hasClass = function hasClass(classToCheck) {
    return Dom.hasElClass(this.el_, classToCheck);
  };

  /**
   * Add a CSS class name to the component's element
   *
   * @param {String} classToAdd Classname to add
   * @return {Component}
   */

  Component.prototype.addClass = function addClass(classToAdd) {
    Dom.addElClass(this.el_, classToAdd);
    return this;
  };

  /**
   * Remove a CSS class name from the component's element
   *
   * @param {String} classToRemove Classname to remove
   * @return {Component}
   */

  Component.prototype.removeClass = function removeClass(classToRemove) {
    Dom.removeElClass(this.el_, classToRemove);
    return this;
  };

  /**
   * Show the component element if hidden
   *
   * @return {Component}
   */

  Component.prototype.show = function show() {
    this.removeClass('vjs-hidden');
    return this;
  };

  /**
   * Hide the component element if currently showing
   *
   * @return {Component}
   */

  Component.prototype.hide = function hide() {
    this.addClass('vjs-hidden');
    return this;
  };

  /**
   * Lock an item in its visible state
   * To be used with fadeIn/fadeOut.
   *
   * @return {Component}
   * @private
   */

  Component.prototype.lockShowing = function lockShowing() {
    this.addClass('vjs-lock-showing');
    return this;
  };

  /**
   * Unlock an item to be hidden
   * To be used with fadeIn/fadeOut.
   *
   * @return {Component}
   * @private
   */

  Component.prototype.unlockShowing = function unlockShowing() {
    this.removeClass('vjs-lock-showing');
    return this;
  };

  /**
   * Set or get the width of the component (CSS values)
   *
   * Setting the video tag dimension values only works with values in pixels.
   * Percent values will not work.
   * Some percents can be used, but width()/height() will return the number + %,
   * not the actual computed width/height.
   *
   * @param  {Number|String=} num   Optional width number
   * @param  {Boolean} skipListeners Skip the 'resize' event trigger
   * @return {Component} This component, when setting the width
   * @return {Number|String} The width, when getting
   */

  Component.prototype.width = function width(num, skipListeners) {
    return this.dimension('width', num, skipListeners);
  };

  /**
   * Get or set the height of the component (CSS values)
   *
   * Setting the video tag dimension values only works with values in pixels.
   * Percent values will not work.
   * Some percents can be used, but width()/height() will return the number + %,
   * not the actual computed width/height.
   *
   * @param  {Number|String=} num     New component height
   * @param  {Boolean=} skipListeners Skip the resize event trigger
   * @return {Component} This component, when setting the height
   * @return {Number|String} The height, when getting
   */

  Component.prototype.height = function height(num, skipListeners) {
    return this.dimension('height', num, skipListeners);
  };

  /**
   * Set both width and height at the same time
   *
   * @param  {Number|String} width
   * @param  {Number|String} height
   * @return {Component} The component
   */

  Component.prototype.dimensions = function dimensions(width, height) {
    // Skip resize listeners on width for optimization
    return this.width(width, true).height(height);
  };

  /**
   * Get or set width or height
   *
   * This is the shared code for the width() and height() methods.
   * All for an integer, integer + 'px' or integer + '%';
   *
   * Known issue: Hidden elements officially have a width of 0. We're defaulting
   * to the style.width value and falling back to computedStyle which has the
   * hidden element issue. Info, but probably not an efficient fix:
   * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
   *
   * @param  {String} widthOrHeight  'width' or 'height'
   * @param  {Number|String=} num     New dimension
   * @param  {Boolean=} skipListeners Skip resize event trigger
   * @return {Component} The component if a dimension was set
   * @return {Number|String} The dimension if nothing was set
   * @private
   */

  Component.prototype.dimension = function dimension(widthOrHeight, num, skipListeners) {
    if (num !== undefined) {
      // Set to zero if null or literally NaN (NaN !== NaN)
      if (num === null || num !== num) {
        num = 0;
      }

      // Check if using css width/height (% or px) and adjust
      if (('' + num).indexOf('%') !== -1 || ('' + num).indexOf('px') !== -1) {
        this.el_.style[widthOrHeight] = num;
      } else if (num === 'auto') {
        this.el_.style[widthOrHeight] = '';
      } else {
        this.el_.style[widthOrHeight] = num + 'px';
      }

      // skipListeners allows us to avoid triggering the resize event when setting both width and height
      if (!skipListeners) {
        this.trigger('resize');
      }

      // Return component
      return this;
    }

    // Not setting a value, so getting it
    // Make sure element exists
    if (!this.el_) {
      return 0;
    }

    // Get dimension value from style
    var val = this.el_.style[widthOrHeight];
    var pxIndex = val.indexOf('px');

    if (pxIndex !== -1) {
      // Return the pixel value with no 'px'
      return parseInt(val.slice(0, pxIndex), 10);
    }

    // No px so using % or no style was set, so falling back to offsetWidth/height
    // If component has display:none, offset will return 0
    // TODO: handle display:none and no dimension style using px
    return parseInt(this.el_['offset' + _toTitleCase2['default'](widthOrHeight)], 10);
  };

  /**
   * Emit 'tap' events when touch events are supported
   *
   * This is used to support toggling the controls through a tap on the video.
   *
   * We're requiring them to be enabled because otherwise every component would
   * have this extra overhead unnecessarily, on mobile devices where extra
   * overhead is especially bad.
   * @private
   */

  Component.prototype.emitTapEvents = function emitTapEvents() {
    // Track the start time so we can determine how long the touch lasted
    var touchStart = 0;
    var firstTouch = null;

    // Maximum movement allowed during a touch event to still be considered a tap
    // Other popular libs use anywhere from 2 (hammer.js) to 15, so 10 seems like a nice, round number.
    var tapMovementThreshold = 10;

    // The maximum length a touch can be while still being considered a tap
    var touchTimeThreshold = 200;

    var couldBeTap = undefined;

    this.on('touchstart', function (event) {
      // If more than one finger, don't consider treating this as a click
      if (event.touches.length === 1) {
        // Copy the touches object to prevent modifying the original
        firstTouch = _assign2['default']({}, event.touches[0]);
        // Record start time so we can detect a tap vs. "touch and hold"
        touchStart = new Date().getTime();
        // Reset couldBeTap tracking
        couldBeTap = true;
      }
    });

    this.on('touchmove', function (event) {
      // If more than one finger, don't consider treating this as a click
      if (event.touches.length > 1) {
        couldBeTap = false;
      } else if (firstTouch) {
        // Some devices will throw touchmoves for all but the slightest of taps.
        // So, if we moved only a small distance, this could still be a tap
        var xdiff = event.touches[0].pageX - firstTouch.pageX;
        var ydiff = event.touches[0].pageY - firstTouch.pageY;
        var touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);

        if (touchDistance > tapMovementThreshold) {
          couldBeTap = false;
        }
      }
    });

    var noTap = function noTap() {
      couldBeTap = false;
    };

    // TODO: Listen to the original target. http://youtu.be/DujfpXOKUp8?t=13m8s
    this.on('touchleave', noTap);
    this.on('touchcancel', noTap);

    // When the touch ends, measure how long it took and trigger the appropriate
    // event
    this.on('touchend', function (event) {
      firstTouch = null;
      // Proceed only if the touchmove/leave/cancel event didn't happen
      if (couldBeTap === true) {
        // Measure how long the touch lasted
        var touchTime = new Date().getTime() - touchStart;

        // Make sure the touch was less than the threshold to be considered a tap
        if (touchTime < touchTimeThreshold) {
          // Don't let browser turn this into a click
          event.preventDefault();
          this.trigger('tap');
          // It may be good to copy the touchend event object and change the
          // type to tap, if the other event properties aren't exact after
          // Events.fixEvent runs (e.g. event.target)
        }
      }
    });
  };

  /**
   * Report user touch activity when touch events occur
   *
   * User activity is used to determine when controls should show/hide. It's
   * relatively simple when it comes to mouse events, because any mouse event
   * should show the controls. So we capture mouse events that bubble up to the
   * player and report activity when that happens.
   *
   * With touch events it isn't as easy. We can't rely on touch events at the
   * player level, because a tap (touchstart + touchend) on the video itself on
   * mobile devices is meant to turn controls off (and on). User activity is
   * checked asynchronously, so what could happen is a tap event on the video
   * turns the controls off, then the touchend event bubbles up to the player,
   * which if it reported user activity, would turn the controls right back on.
   * (We also don't want to completely block touch events from bubbling up)
   *
   * Also a touchmove, touch+hold, and anything other than a tap is not supposed
   * to turn the controls back on on a mobile device.
   *
   * Here we're setting the default component behavior to report user activity
   * whenever touch events happen, and this can be turned off by components that
   * want touch events to act differently.
   */

  Component.prototype.enableTouchActivity = function enableTouchActivity() {
    // Don't continue if the root player doesn't support reporting user activity
    if (!this.player() || !this.player().reportUserActivity) {
      return;
    }

    // listener for reporting that the user is active
    var report = Fn.bind(this.player(), this.player().reportUserActivity);

    var touchHolding = undefined;

    this.on('touchstart', function () {
      report();
      // For as long as the they are touching the device or have their mouse down,
      // we consider them active even if they're not moving their finger or mouse.
      // So we want to continue to update that they are active
      this.clearInterval(touchHolding);
      // report at the same interval as activityCheck
      touchHolding = this.setInterval(report, 250);
    });

    var touchEnd = function touchEnd(event) {
      report();
      // stop the interval that maintains activity if the touch is holding
      this.clearInterval(touchHolding);
    };

    this.on('touchmove', report);
    this.on('touchend', touchEnd);
    this.on('touchcancel', touchEnd);
  };

  /**
   * Creates timeout and sets up disposal automatically.
   * @param {Function} fn The function to run after the timeout.
   * @param {Number} timeout Number of ms to delay before executing specified function.
   * @return {Number} Returns the timeout ID
   */

  Component.prototype.setTimeout = function setTimeout(fn, timeout) {
    fn = Fn.bind(this, fn);

    // window.setTimeout would be preferable here, but due to some bizarre issue with Sinon and/or Phantomjs, we can't.
    var timeoutId = _window2['default'].setTimeout(fn, timeout);

    var disposeFn = function disposeFn() {
      this.clearTimeout(timeoutId);
    };

    disposeFn.guid = 'vjs-timeout-' + timeoutId;

    this.on('dispose', disposeFn);

    return timeoutId;
  };

  /**
   * Clears a timeout and removes the associated dispose listener
   * @param {Number} timeoutId The id of the timeout to clear
   * @return {Number} Returns the timeout ID
   */

  Component.prototype.clearTimeout = function clearTimeout(timeoutId) {
    _window2['default'].clearTimeout(timeoutId);

    var disposeFn = function disposeFn() {};

    disposeFn.guid = 'vjs-timeout-' + timeoutId;

    this.off('dispose', disposeFn);

    return timeoutId;
  };

  /**
   * Creates an interval and sets up disposal automatically.
   * @param {Function} fn The function to run every N seconds.
   * @param {Number} interval Number of ms to delay before executing specified function.
   * @return {Number} Returns the interval ID
   */

  Component.prototype.setInterval = function setInterval(fn, interval) {
    fn = Fn.bind(this, fn);

    var intervalId = _window2['default'].setInterval(fn, interval);

    var disposeFn = function disposeFn() {
      this.clearInterval(intervalId);
    };

    disposeFn.guid = 'vjs-interval-' + intervalId;

    this.on('dispose', disposeFn);

    return intervalId;
  };

  /**
   * Clears an interval and removes the associated dispose listener
   * @param {Number} intervalId The id of the interval to clear
   * @return {Number} Returns the interval ID
   */

  Component.prototype.clearInterval = function clearInterval(intervalId) {
    _window2['default'].clearInterval(intervalId);

    var disposeFn = function disposeFn() {};

    disposeFn.guid = 'vjs-interval-' + intervalId;

    this.off('dispose', disposeFn);

    return intervalId;
  };

  Component.registerComponent = function registerComponent(name, comp) {
    if (!Component.components_) {
      Component.components_ = {};
    }

    Component.components_[name] = comp;
    return comp;
  };

  Component.getComponent = function getComponent(name) {
    if (Component.components_ && Component.components_[name]) {
      return Component.components_[name];
    }

    if (_window2['default'] && _window2['default'].videojs && _window2['default'].videojs[name]) {
      _log2['default'].warn('The ' + name + ' component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)');
      return _window2['default'].videojs[name];
    }
  };

  Component.extend = function extend(props) {
    props = props || {};
    // Set up the constructor using the supplied init method
    // or using the init of the parent object
    // Make sure to check the unobfuscated version for external libs
    var init = props.init || props.init || this.prototype.init || this.prototype.init || function () {};
    // In Resig's simple class inheritance (previously used) the constructor
    //  is a function that calls `this.init.apply(arguments)`
    // However that would prevent us from using `ParentObject.call(this);`
    //  in a Child constructor because the `this` in `this.init`
    //  would still refer to the Child and cause an infinite loop.
    // We would instead have to do
    //    `ParentObject.prototype.init.apply(this, arguments);`
    //  Bleh. We're not creating a _super() function, so it's good to keep
    //  the parent constructor reference simple.
    var subObj = function subObj() {
      init.apply(this, arguments);
    };

    // Inherit from this object's prototype
    subObj.prototype = Object.create(this.prototype);
    // Reset the constructor property for subObj otherwise
    // instances of subObj would have the constructor of the parent Object
    subObj.prototype.constructor = subObj;

    // Make the class extendable
    subObj.extend = Component.extend;
    // Make a function for creating instances
    // subObj.create = CoreObject.create;

    // Extend subObj's prototype with functions and other properties from props
    for (var _name2 in props) {
      if (props.hasOwnProperty(_name2)) {
        subObj.prototype[_name2] = props[_name2];
      }
    }

    return subObj;
  };

  return Component;
})();

Component.registerComponent('Component', Component);
exports['default'] = Component;
module.exports = exports['default'];

},{"./utils/dom.js":110,"./utils/events.js":111,"./utils/fn.js":112,"./utils/guid.js":114,"./utils/log.js":115,"./utils/merge-options.js":116,"./utils/to-title-case.js":119,"global/window":2,"object.assign":44}],53:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

// Required children

var _PlayToggle = _dereq_('./play-toggle.js');

var _PlayToggle2 = _interopRequireWildcard(_PlayToggle);

var _CurrentTimeDisplay = _dereq_('./time-controls/current-time-display.js');

var _CurrentTimeDisplay2 = _interopRequireWildcard(_CurrentTimeDisplay);

var _DurationDisplay = _dereq_('./time-controls/duration-display.js');

var _DurationDisplay2 = _interopRequireWildcard(_DurationDisplay);

var _TimeDivider = _dereq_('./time-controls/time-divider.js');

var _TimeDivider2 = _interopRequireWildcard(_TimeDivider);

var _RemainingTimeDisplay = _dereq_('./time-controls/remaining-time-display.js');

var _RemainingTimeDisplay2 = _interopRequireWildcard(_RemainingTimeDisplay);

var _LiveDisplay = _dereq_('./live-display.js');

var _LiveDisplay2 = _interopRequireWildcard(_LiveDisplay);

var _ProgressControl = _dereq_('./progress-control/progress-control.js');

var _ProgressControl2 = _interopRequireWildcard(_ProgressControl);

var _FullscreenToggle = _dereq_('./fullscreen-toggle.js');

var _FullscreenToggle2 = _interopRequireWildcard(_FullscreenToggle);

var _VolumeControl = _dereq_('./volume-control/volume-control.js');

var _VolumeControl2 = _interopRequireWildcard(_VolumeControl);

var _VolumeMenuButton = _dereq_('./volume-menu-button.js');

var _VolumeMenuButton2 = _interopRequireWildcard(_VolumeMenuButton);

var _MuteToggle = _dereq_('./mute-toggle.js');

var _MuteToggle2 = _interopRequireWildcard(_MuteToggle);

var _ChaptersButton = _dereq_('./text-track-controls/chapters-button.js');

var _ChaptersButton2 = _interopRequireWildcard(_ChaptersButton);

var _SubtitlesButton = _dereq_('./text-track-controls/subtitles-button.js');

var _SubtitlesButton2 = _interopRequireWildcard(_SubtitlesButton);

var _CaptionsButton = _dereq_('./text-track-controls/captions-button.js');

var _CaptionsButton2 = _interopRequireWildcard(_CaptionsButton);

var _PlaybackRateMenuButton = _dereq_('./playback-rate-menu/playback-rate-menu-button.js');

var _PlaybackRateMenuButton2 = _interopRequireWildcard(_PlaybackRateMenuButton);

var _CustomControlSpacer = _dereq_('./spacer-controls/custom-control-spacer.js');

var _CustomControlSpacer2 = _interopRequireWildcard(_CustomControlSpacer);

/**
 * Container of main controls
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 * @extends Component
 */

var ControlBar = (function (_Component) {
  function ControlBar() {
    _classCallCheck(this, ControlBar);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(ControlBar, _Component);

  ControlBar.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-control-bar'
    });
  };

  return ControlBar;
})(_Component3['default']);

ControlBar.prototype.options_ = {
  loadEvent: 'play',
  children: ['playToggle', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'muteToggle', 'volumeControl', 'chaptersButton', 'subtitlesButton', 'captionsButton', 'volumeMenuButton', 'fullscreenToggle']
};

_Component3['default'].registerComponent('ControlBar', ControlBar);
exports['default'] = ControlBar;
module.exports = exports['default'];

},{"../component.js":52,"./fullscreen-toggle.js":54,"./live-display.js":55,"./mute-toggle.js":56,"./play-toggle.js":57,"./playback-rate-menu/playback-rate-menu-button.js":58,"./progress-control/progress-control.js":62,"./spacer-controls/custom-control-spacer.js":64,"./text-track-controls/captions-button.js":67,"./text-track-controls/chapters-button.js":68,"./text-track-controls/subtitles-button.js":71,"./time-controls/current-time-display.js":74,"./time-controls/duration-display.js":75,"./time-controls/remaining-time-display.js":76,"./time-controls/time-divider.js":77,"./volume-control/volume-control.js":79,"./volume-menu-button.js":81}],54:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * Toggle fullscreen video
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @extends vjs.Button
 */

var FullscreenToggle = (function (_Button) {
  function FullscreenToggle() {
    _classCallCheck(this, FullscreenToggle);

    if (_Button != null) {
      _Button.apply(this, arguments);
    }
  }

  _inherits(FullscreenToggle, _Button);

  FullscreenToggle.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-fullscreen-control ' + _Button.prototype.buildCSSClass.call(this);
  };

  FullscreenToggle.prototype.handleClick = function handleClick() {
    if (!this.player_.isFullscreen()) {
      this.player_.requestFullscreen();
      this.controlText('Non-Fullscreen');
    } else {
      this.player_.exitFullscreen();
      this.controlText('Fullscreen');
    }
  };

  return FullscreenToggle;
})(_Button3['default']);

FullscreenToggle.prototype.controlText_ = 'Fullscreen';

_Component2['default'].registerComponent('FullscreenToggle', FullscreenToggle);
exports['default'] = FullscreenToggle;
module.exports = exports['default'];

},{"../button.js":51,"../component.js":52}],55:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

/**
 * Displays the live indicator
 * TODO - Future make it click to snap to live
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var LiveDisplay = (function (_Component) {
  function LiveDisplay() {
    _classCallCheck(this, LiveDisplay);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(LiveDisplay, _Component);

  LiveDisplay.prototype.createEl = function createEl() {
    var el = _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-live-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-live-display',
      innerHTML: '<span class="vjs-control-text">' + this.localize('Stream Type') + '</span>' + this.localize('LIVE'),
      'aria-live': 'off'
    });

    el.appendChild(this.contentEl_);

    return el;
  };

  return LiveDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('LiveDisplay', LiveDisplay);
exports['default'] = LiveDisplay;
module.exports = exports['default'];

},{"../component":52,"../utils/dom.js":110}],56:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('../button');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

/**
 * A button component for muting the audio
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var MuteToggle = (function (_Button) {
  function MuteToggle(player, options) {
    _classCallCheck(this, MuteToggle);

    _Button.call(this, player, options);

    this.on(player, 'volumechange', this.update);

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }

    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
  }

  _inherits(MuteToggle, _Button);

  MuteToggle.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-mute-control ' + _Button.prototype.buildCSSClass.call(this);
  };

  MuteToggle.prototype.handleClick = function handleClick() {
    this.player_.muted(this.player_.muted() ? false : true);
  };

  MuteToggle.prototype.update = function update() {
    var vol = this.player_.volume(),
        level = 3;

    if (vol === 0 || this.player_.muted()) {
      level = 0;
    } else if (vol < 0.33) {
      level = 1;
    } else if (vol < 0.67) {
      level = 2;
    }

    // Don't rewrite the button text if the actual text doesn't change.
    // This causes unnecessary and confusing information for screen reader users.
    // This check is needed because this function gets called every time the volume level is changed.
    var toMute = this.player_.muted() ? 'Unmute' : 'Mute';
    var localizedMute = this.localize(toMute);
    if (this.controlText() !== localizedMute) {
      this.controlText(localizedMute);
    }

    /* TODO improve muted icon classes */
    for (var i = 0; i < 4; i++) {
      Dom.removeElClass(this.el_, 'vjs-vol-' + i);
    }
    Dom.addElClass(this.el_, 'vjs-vol-' + level);
  };

  return MuteToggle;
})(_Button3['default']);

MuteToggle.prototype.controlText_ = 'Mute';

_Component2['default'].registerComponent('MuteToggle', MuteToggle);
exports['default'] = MuteToggle;
module.exports = exports['default'];

},{"../button":51,"../component":52,"../utils/dom.js":110}],57:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * Button to toggle between play and pause
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var PlayToggle = (function (_Button) {
  function PlayToggle(player, options) {
    _classCallCheck(this, PlayToggle);

    _Button.call(this, player, options);

    this.on(player, 'play', this.handlePlay);
    this.on(player, 'pause', this.handlePause);
  }

  _inherits(PlayToggle, _Button);

  PlayToggle.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-play-control ' + _Button.prototype.buildCSSClass.call(this);
  };

  // handleClick - Toggle between play and pause

  PlayToggle.prototype.handleClick = function handleClick() {
    if (this.player_.paused()) {
      this.player_.play();
    } else {
      this.player_.pause();
    }
  };

  // handlePlay - Add the vjs-playing class to the element so it can change appearance

  PlayToggle.prototype.handlePlay = function handlePlay() {
    this.removeClass('vjs-paused');
    this.addClass('vjs-playing');
    this.controlText('Pause'); // change the button text to "Pause"
  };

  // handlePause - Add the vjs-paused class to the element so it can change appearance

  PlayToggle.prototype.handlePause = function handlePause() {
    this.removeClass('vjs-playing');
    this.addClass('vjs-paused');
    this.controlText('Play'); // change the button text to "Play"
  };

  return PlayToggle;
})(_Button3['default']);

PlayToggle.prototype.controlText_ = 'Play';

_Component2['default'].registerComponent('PlayToggle', PlayToggle);
exports['default'] = PlayToggle;
module.exports = exports['default'];

},{"../button.js":51,"../component.js":52}],58:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _MenuButton2 = _dereq_('../../menu/menu-button.js');

var _MenuButton3 = _interopRequireWildcard(_MenuButton2);

var _Menu = _dereq_('../../menu/menu.js');

var _Menu2 = _interopRequireWildcard(_Menu);

var _PlaybackRateMenuItem = _dereq_('./playback-rate-menu-item.js');

var _PlaybackRateMenuItem2 = _interopRequireWildcard(_PlaybackRateMenuItem);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

/**
 * The component for controlling the playback rate
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PlaybackRateMenuButton = (function (_MenuButton) {
  function PlaybackRateMenuButton(player, options) {
    _classCallCheck(this, PlaybackRateMenuButton);

    _MenuButton.call(this, player, options);

    this.updateVisibility();
    this.updateLabel();

    this.on(player, 'loadstart', this.updateVisibility);
    this.on(player, 'ratechange', this.updateLabel);
  }

  _inherits(PlaybackRateMenuButton, _MenuButton);

  PlaybackRateMenuButton.prototype.createEl = function createEl() {
    var el = _MenuButton.prototype.createEl.call(this);

    this.labelEl_ = Dom.createEl('div', {
      className: 'vjs-playback-rate-value',
      innerHTML: 1
    });

    el.appendChild(this.labelEl_);

    return el;
  };

  PlaybackRateMenuButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-playback-rate ' + _MenuButton.prototype.buildCSSClass.call(this);
  };

  // Menu creation

  PlaybackRateMenuButton.prototype.createMenu = function createMenu() {
    var menu = new _Menu2['default'](this.player());
    var rates = this.player().options().playbackRates;

    if (rates) {
      for (var i = rates.length - 1; i >= 0; i--) {
        menu.addChild(new _PlaybackRateMenuItem2['default'](this.player(), { rate: rates[i] + 'x' }));
      }
    }

    return menu;
  };

  PlaybackRateMenuButton.prototype.updateARIAAttributes = function updateARIAAttributes() {
    // Current playback rate
    this.el().setAttribute('aria-valuenow', this.player().playbackRate());
  };

  PlaybackRateMenuButton.prototype.handleClick = function handleClick() {
    // select next rate option
    var currentRate = this.player().playbackRate();
    var rates = this.player().options().playbackRates;
    // this will select first one if the last one currently selected
    var newRate = rates[0];
    for (var i = 0; i < rates.length; i++) {
      if (rates[i] > currentRate) {
        newRate = rates[i];
        break;
      }
    }
    this.player().playbackRate(newRate);
  };

  PlaybackRateMenuButton.prototype.playbackRateSupported = function playbackRateSupported() {
    return this.player().tech && this.player().tech.featuresPlaybackRate && this.player().options().playbackRates && this.player().options().playbackRates.length > 0;
  };

  /**
   * Hide playback rate controls when they're no playback rate options to select
   */

  PlaybackRateMenuButton.prototype.updateVisibility = function updateVisibility() {
    if (this.playbackRateSupported()) {
      this.removeClass('vjs-hidden');
    } else {
      this.addClass('vjs-hidden');
    }
  };

  /**
   * Update button label when rate changed
   */

  PlaybackRateMenuButton.prototype.updateLabel = function updateLabel() {
    if (this.playbackRateSupported()) {
      this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
    }
  };

  return PlaybackRateMenuButton;
})(_MenuButton3['default']);

PlaybackRateMenuButton.prototype.controlText_ = 'Playback Rate';

_Component2['default'].registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton);
exports['default'] = PlaybackRateMenuButton;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu-button.js":89,"../../menu/menu.js":91,"../../utils/dom.js":110,"./playback-rate-menu-item.js":59}],59:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireWildcard(_MenuItem2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * The specific menu item type for selecting a playback rate
 *
 * @constructor
 */

var PlaybackRateMenuItem = (function (_MenuItem) {
  function PlaybackRateMenuItem(player, options) {
    _classCallCheck(this, PlaybackRateMenuItem);

    var label = options.rate;
    var rate = parseFloat(label, 10);

    // Modify options for parent MenuItem class's init.
    options.label = label;
    options.selected = rate === 1;
    _MenuItem.call(this, player, options);

    this.label = label;
    this.rate = rate;

    this.on(player, 'ratechange', this.update);
  }

  _inherits(PlaybackRateMenuItem, _MenuItem);

  PlaybackRateMenuItem.prototype.handleClick = function handleClick() {
    _MenuItem.prototype.handleClick.call(this);
    this.player().playbackRate(this.rate);
  };

  PlaybackRateMenuItem.prototype.update = function update() {
    this.selected(this.player().playbackRate() === this.rate);
  };

  return PlaybackRateMenuItem;
})(_MenuItem3['default']);

PlaybackRateMenuItem.prototype.contentElType = 'button';

_Component2['default'].registerComponent('PlaybackRateMenuItem', PlaybackRateMenuItem);
exports['default'] = PlaybackRateMenuItem;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu-item.js":90}],60:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var LoadProgressBar = (function (_Component) {
  function LoadProgressBar(player, options) {
    _classCallCheck(this, LoadProgressBar);

    _Component.call(this, player, options);
    this.on(player, 'progress', this.update);
  }

  _inherits(LoadProgressBar, _Component);

  LoadProgressBar.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-load-progress',
      innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Loaded') + '</span>: 0%</span>'
    });
  };

  LoadProgressBar.prototype.update = function update() {
    var buffered = this.player_.buffered();
    var duration = this.player_.duration();
    var bufferedEnd = this.player_.bufferedEnd();
    var children = this.el_.children;

    // get the percent width of a time compared to the total end
    var percentify = function percentify(time, end) {
      var percent = time / end || 0; // no NaN
      return (percent >= 1 ? 1 : percent) * 100 + '%';
    };

    // update the width of the progress bar
    this.el_.style.width = percentify(bufferedEnd, duration);

    // add child elements to represent the individual buffered time ranges
    for (var i = 0; i < buffered.length; i++) {
      var start = buffered.start(i);
      var end = buffered.end(i);
      var part = children[i];

      if (!part) {
        part = this.el_.appendChild(Dom.createEl());
      }

      // set the percent based on the width of the progress bar (bufferedEnd)
      part.style.left = percentify(start, bufferedEnd);
      part.style.width = percentify(end - start, bufferedEnd);
    }

    // remove unused buffered range elements
    for (var i = children.length; i > buffered.length; i--) {
      this.el_.removeChild(children[i - 1]);
    }
  };

  return LoadProgressBar;
})(_Component3['default']);

_Component3['default'].registerComponent('LoadProgressBar', LoadProgressBar);
exports['default'] = LoadProgressBar;
module.exports = exports['default'];

},{"../../component.js":52,"../../utils/dom.js":110}],61:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

/**
 * Shows play progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PlayProgressBar = (function (_Component) {
  function PlayProgressBar() {
    _classCallCheck(this, PlayProgressBar);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(PlayProgressBar, _Component);

  PlayProgressBar.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-play-progress',
      innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
    });
  };

  return PlayProgressBar;
})(_Component3['default']);

_Component3['default'].registerComponent('PlayProgressBar', PlayProgressBar);
exports['default'] = PlayProgressBar;
module.exports = exports['default'];

},{"../../component.js":52}],62:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _SeekBar = _dereq_('./seek-bar.js');

var _SeekBar2 = _interopRequireWildcard(_SeekBar);

/**
 * The Progress Control component contains the seek bar, load progress,
 * and play progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var ProgressControl = (function (_Component) {
  function ProgressControl() {
    _classCallCheck(this, ProgressControl);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(ProgressControl, _Component);

  ProgressControl.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-progress-control vjs-control'
    });
  };

  return ProgressControl;
})(_Component3['default']);

ProgressControl.prototype.options_ = {
  children: {
    seekBar: {}
  }
};

_Component3['default'].registerComponent('ProgressControl', ProgressControl);
exports['default'] = ProgressControl;
module.exports = exports['default'];

},{"../../component.js":52,"./seek-bar.js":63}],63:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Slider2 = _dereq_('../../slider/slider.js');

var _Slider3 = _interopRequireWildcard(_Slider2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _LoadProgressBar = _dereq_('./load-progress-bar.js');

var _LoadProgressBar2 = _interopRequireWildcard(_LoadProgressBar);

var _PlayProgressBar = _dereq_('./play-progress-bar.js');

var _PlayProgressBar2 = _interopRequireWildcard(_PlayProgressBar);

var _import = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _formatTime = _dereq_('../../utils/format-time.js');

var _formatTime2 = _interopRequireWildcard(_formatTime);

var _roundFloat = _dereq_('../../utils/round-float.js');

var _roundFloat2 = _interopRequireWildcard(_roundFloat);

/**
 * Seek Bar and holder for the progress bars
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var SeekBar = (function (_Slider) {
  function SeekBar(player, options) {
    _classCallCheck(this, SeekBar);

    _Slider.call(this, player, options);
    this.on(player, 'timeupdate', this.updateARIAAttributes);
    player.ready(Fn.bind(this, this.updateARIAAttributes));
  }

  _inherits(SeekBar, _Slider);

  SeekBar.prototype.createEl = function createEl() {
    return _Slider.prototype.createEl.call(this, 'div', {
      className: 'vjs-progress-holder',
      'aria-label': 'video progress bar'
    });
  };

  SeekBar.prototype.updateARIAAttributes = function updateARIAAttributes() {
    // Allows for smooth scrubbing, when player can't keep up.
    var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.el_.setAttribute('aria-valuenow', _roundFloat2['default'](this.getPercent() * 100, 2)); // machine readable value of progress bar (percentage complete)
    this.el_.setAttribute('aria-valuetext', _formatTime2['default'](time, this.player_.duration())); // human readable value of progress bar (time complete)
  };

  SeekBar.prototype.getPercent = function getPercent() {
    var percent = this.player_.currentTime() / this.player_.duration();
    return percent >= 1 ? 1 : percent;
  };

  SeekBar.prototype.handleMouseDown = function handleMouseDown(event) {
    _Slider.prototype.handleMouseDown.call(this, event);

    this.player_.scrubbing(true);

    this.videoWasPlaying = !this.player_.paused();
    this.player_.pause();
  };

  SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
    var newTime = this.calculateDistance(event) * this.player_.duration();

    // Don't let video end while scrubbing.
    if (newTime === this.player_.duration()) {
      newTime = newTime - 0.1;
    }

    // Set new time (tell player to seek to new time)
    this.player_.currentTime(newTime);
  };

  SeekBar.prototype.handleMouseUp = function handleMouseUp(event) {
    _Slider.prototype.handleMouseUp.call(this, event);

    this.player_.scrubbing(false);
    if (this.videoWasPlaying) {
      this.player_.play();
    }
  };

  SeekBar.prototype.stepForward = function stepForward() {
    this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
  };

  SeekBar.prototype.stepBack = function stepBack() {
    this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
  };

  return SeekBar;
})(_Slider3['default']);

SeekBar.prototype.options_ = {
  children: {
    loadProgressBar: {},
    playProgressBar: {}
  },
  barName: 'playProgressBar'
};

SeekBar.prototype.playerEvent = 'timeupdate';

_Component2['default'].registerComponent('SeekBar', SeekBar);
exports['default'] = SeekBar;
module.exports = exports['default'];

},{"../../component.js":52,"../../slider/slider.js":96,"../../utils/fn.js":112,"../../utils/format-time.js":113,"../../utils/round-float.js":117,"./load-progress-bar.js":60,"./play-progress-bar.js":61}],64:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Spacer2 = _dereq_('./spacer.js');

var _Spacer3 = _interopRequireWildcard(_Spacer2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * Spacer specifically meant to be used as an insertion point for new plugins, etc.
 *
 * @param {Player|Object} player
 * @param {Obect=} options
 */

var CustomControlSpacer = (function (_Spacer) {
  function CustomControlSpacer() {
    _classCallCheck(this, CustomControlSpacer);

    if (_Spacer != null) {
      _Spacer.apply(this, arguments);
    }
  }

  _inherits(CustomControlSpacer, _Spacer);

  CustomControlSpacer.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-custom-control-spacer ' + _Spacer.prototype.buildCSSClass.call(this);
  };

  CustomControlSpacer.prototype.createEl = function createEl() {
    return _Spacer.prototype.createEl.call(this, {
      className: this.buildCSSClass()
    });
  };

  return CustomControlSpacer;
})(_Spacer3['default']);

_Component2['default'].registerComponent('CustomControlSpacer', CustomControlSpacer);
exports['default'] = CustomControlSpacer;
module.exports = exports['default'];

},{"../../component.js":52,"./spacer.js":65}],65:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

/**
 * Just an empty spacer element that can be used as an append point for plugins, etc.
 * Also can be used to create space between elements when necessary.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 */

var Spacer = (function (_Component) {
  function Spacer() {
    _classCallCheck(this, Spacer);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Spacer, _Component);

  Spacer.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-spacer ' + _Component.prototype.buildCSSClass.call(this);
  };

  Spacer.prototype.createEl = function createEl(props) {
    return _Component.prototype.createEl.call(this, 'div', {
      className: this.buildCSSClass()
    });
  };

  return Spacer;
})(_Component3['default']);

_Component3['default'].registerComponent('Spacer', Spacer);

exports['default'] = Spacer;
module.exports = exports['default'];

},{"../../component.js":52}],66:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _TextTrackMenuItem2 = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem3 = _interopRequireWildcard(_TextTrackMenuItem2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var CaptionSettingsMenuItem = (function (_TextTrackMenuItem) {
  function CaptionSettingsMenuItem(player, options) {
    _classCallCheck(this, CaptionSettingsMenuItem);

    options.track = {
      kind: options.kind,
      player: player,
      label: options.kind + ' settings',
      'default': false,
      mode: 'disabled'
    };

    _TextTrackMenuItem.call(this, player, options);
    this.addClass('vjs-texttrack-settings');
  }

  _inherits(CaptionSettingsMenuItem, _TextTrackMenuItem);

  CaptionSettingsMenuItem.prototype.handleClick = function handleClick() {
    this.player().getChild('textTrackSettings').show();
  };

  return CaptionSettingsMenuItem;
})(_TextTrackMenuItem3['default']);

_Component2['default'].registerComponent('CaptionSettingsMenuItem', CaptionSettingsMenuItem);
exports['default'] = CaptionSettingsMenuItem;
module.exports = exports['default'];

},{"../../component.js":52,"./text-track-menu-item.js":73}],67:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireWildcard(_TextTrackButton2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _CaptionSettingsMenuItem = _dereq_('./caption-settings-menu-item.js');

var _CaptionSettingsMenuItem2 = _interopRequireWildcard(_CaptionSettingsMenuItem);

/**
 * The button component for toggling and selecting captions
 *
 * @constructor
 */

var CaptionsButton = (function (_TextTrackButton) {
  function CaptionsButton(player, options, ready) {
    _classCallCheck(this, CaptionsButton);

    _TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Captions Menu');
  }

  _inherits(CaptionsButton, _TextTrackButton);

  CaptionsButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-captions-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
  };

  CaptionsButton.prototype.update = function update() {
    var threshold = 2;
    _TextTrackButton.prototype.update.call(this);

    // if native, then threshold is 1 because no settings button
    if (this.player().tech && this.player().tech.featuresNativeTextTracks) {
      threshold = 1;
    }

    if (this.items && this.items.length > threshold) {
      this.show();
    } else {
      this.hide();
    }
  };

  CaptionsButton.prototype.createItems = function createItems() {
    var items = [];

    if (!(this.player().tech && this.player().tech.featuresNativeTextTracks)) {
      items.push(new _CaptionSettingsMenuItem2['default'](this.player_, { kind: this.kind_ }));
    }

    return _TextTrackButton.prototype.createItems.call(this, items);
  };

  return CaptionsButton;
})(_TextTrackButton3['default']);

CaptionsButton.prototype.kind_ = 'captions';
CaptionsButton.prototype.controlText_ = 'Captions';

_Component2['default'].registerComponent('CaptionsButton', CaptionsButton);
exports['default'] = CaptionsButton;
module.exports = exports['default'];

},{"../../component.js":52,"./caption-settings-menu-item.js":66,"./text-track-button.js":72}],68:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireWildcard(_TextTrackButton2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _TextTrackMenuItem = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem2 = _interopRequireWildcard(_TextTrackMenuItem);

var _ChaptersTrackMenuItem = _dereq_('./chapters-track-menu-item.js');

var _ChaptersTrackMenuItem2 = _interopRequireWildcard(_ChaptersTrackMenuItem);

var _Menu = _dereq_('../../menu/menu.js');

var _Menu2 = _interopRequireWildcard(_Menu);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import2);

var _toTitleCase = _dereq_('../../utils/to-title-case.js');

var _toTitleCase2 = _interopRequireWildcard(_toTitleCase);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

// Chapters act much differently than other text tracks
// Cues are navigation vs. other tracks of alternative languages
/**
 * The button component for toggling and selecting chapters
 *
 * @constructor
 */

var ChaptersButton = (function (_TextTrackButton) {
  function ChaptersButton(player, options, ready) {
    _classCallCheck(this, ChaptersButton);

    _TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Chapters Menu');
  }

  _inherits(ChaptersButton, _TextTrackButton);

  ChaptersButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-chapters-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
  };

  // Create a menu item for each text track

  ChaptersButton.prototype.createItems = function createItems() {
    var items = [];

    var tracks = this.player_.textTracks();

    if (!tracks) {
      return items;
    }

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.kind === this.kind_) {
        items.push(new _TextTrackMenuItem2['default'](this.player_, {
          track: track
        }));
      }
    }

    return items;
  };

  ChaptersButton.prototype.createMenu = function createMenu() {
    var tracks = this.player_.textTracks() || [];
    var chaptersTrack = undefined;
    var items = this.items = [];

    for (var i = 0, l = tracks.length; i < l; i++) {
      var track = tracks[i];
      if (track.kind === this.kind_) {
        if (!track.cues) {
          track.mode = 'hidden';
          /* jshint loopfunc:true */
          // TODO see if we can figure out a better way of doing this https://github.com/videojs/video.js/issues/1864
          _window2['default'].setTimeout(Fn.bind(this, function () {
            this.createMenu();
          }), 100);
          /* jshint loopfunc:false */
        } else {
          chaptersTrack = track;
          break;
        }
      }
    }

    var menu = this.menu;
    if (menu === undefined) {
      menu = new _Menu2['default'](this.player_);
      menu.contentEl().appendChild(Dom.createEl('li', {
        className: 'vjs-menu-title',
        innerHTML: _toTitleCase2['default'](this.kind_),
        tabIndex: -1
      }));
    }

    if (chaptersTrack) {
      var cues = chaptersTrack.cues,
          cue = undefined;

      for (var i = 0, l = cues.length; i < l; i++) {
        cue = cues[i];

        var mi = new _ChaptersTrackMenuItem2['default'](this.player_, {
          track: chaptersTrack,
          cue: cue
        });

        items.push(mi);

        menu.addChild(mi);
      }
      this.addChild(menu);
    }

    if (this.items.length > 0) {
      this.show();
    }

    return menu;
  };

  return ChaptersButton;
})(_TextTrackButton3['default']);

ChaptersButton.prototype.kind_ = 'chapters';
ChaptersButton.prototype.controlText_ = 'Chapters';

_Component2['default'].registerComponent('ChaptersButton', ChaptersButton);
exports['default'] = ChaptersButton;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu.js":91,"../../utils/dom.js":110,"../../utils/fn.js":112,"../../utils/to-title-case.js":119,"./chapters-track-menu-item.js":69,"./text-track-button.js":72,"./text-track-menu-item.js":73,"global/window":2}],69:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireWildcard(_MenuItem2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

/**
 * @constructor
 */

var ChaptersTrackMenuItem = (function (_MenuItem) {
  function ChaptersTrackMenuItem(player, options) {
    _classCallCheck(this, ChaptersTrackMenuItem);

    var track = options.track;
    var cue = options.cue;
    var currentTime = player.currentTime();

    // Modify options for parent MenuItem class's init.
    options.label = cue.text;
    options.selected = cue.startTime <= currentTime && currentTime < cue.endTime;
    _MenuItem.call(this, player, options);

    this.track = track;
    this.cue = cue;
    track.addEventListener('cuechange', Fn.bind(this, this.update));
  }

  _inherits(ChaptersTrackMenuItem, _MenuItem);

  ChaptersTrackMenuItem.prototype.handleClick = function handleClick() {
    _MenuItem.prototype.handleClick.call(this);
    this.player_.currentTime(this.cue.startTime);
    this.update(this.cue.startTime);
  };

  ChaptersTrackMenuItem.prototype.update = function update() {
    var cue = this.cue;
    var currentTime = this.player_.currentTime();

    // vjs.log(currentTime, cue.startTime);
    this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
  };

  return ChaptersTrackMenuItem;
})(_MenuItem3['default']);

_Component2['default'].registerComponent('ChaptersTrackMenuItem', ChaptersTrackMenuItem);
exports['default'] = ChaptersTrackMenuItem;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu-item.js":90,"../../utils/fn.js":112}],70:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _TextTrackMenuItem2 = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem3 = _interopRequireWildcard(_TextTrackMenuItem2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * A special menu item for turning of a specific type of text track
 *
 * @constructor
 */

var OffTextTrackMenuItem = (function (_TextTrackMenuItem) {
  function OffTextTrackMenuItem(player, options) {
    _classCallCheck(this, OffTextTrackMenuItem);

    // Create pseudo track info
    // Requires options['kind']
    options.track = {
      kind: options.kind,
      player: player,
      label: options.kind + ' off',
      'default': false,
      mode: 'disabled'
    };

    _TextTrackMenuItem.call(this, player, options);
    this.selected(true);
  }

  _inherits(OffTextTrackMenuItem, _TextTrackMenuItem);

  OffTextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
    var tracks = this.player().textTracks();
    var selected = true;

    for (var i = 0, l = tracks.length; i < l; i++) {
      var track = tracks[i];
      if (track.kind === this.track.kind && track.mode === 'showing') {
        selected = false;
        break;
      }
    }

    this.selected(selected);
  };

  return OffTextTrackMenuItem;
})(_TextTrackMenuItem3['default']);

_Component2['default'].registerComponent('OffTextTrackMenuItem', OffTextTrackMenuItem);
exports['default'] = OffTextTrackMenuItem;
module.exports = exports['default'];

},{"../../component.js":52,"./text-track-menu-item.js":73}],71:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _TextTrackButton2 = _dereq_('./text-track-button.js');

var _TextTrackButton3 = _interopRequireWildcard(_TextTrackButton2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

/**
 * The button component for toggling and selecting subtitles
 *
 * @constructor
 */

var SubtitlesButton = (function (_TextTrackButton) {
  function SubtitlesButton(player, options, ready) {
    _classCallCheck(this, SubtitlesButton);

    _TextTrackButton.call(this, player, options, ready);
    this.el_.setAttribute('aria-label', 'Subtitles Menu');
  }

  _inherits(SubtitlesButton, _TextTrackButton);

  SubtitlesButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-subtitles-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
  };

  return SubtitlesButton;
})(_TextTrackButton3['default']);

SubtitlesButton.prototype.kind_ = 'subtitles';
SubtitlesButton.prototype.controlText_ = 'Subtitles';

_Component2['default'].registerComponent('SubtitlesButton', SubtitlesButton);
exports['default'] = SubtitlesButton;
module.exports = exports['default'];

},{"../../component.js":52,"./text-track-button.js":72}],72:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _MenuButton2 = _dereq_('../../menu/menu-button.js');

var _MenuButton3 = _interopRequireWildcard(_MenuButton2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _TextTrackMenuItem = _dereq_('./text-track-menu-item.js');

var _TextTrackMenuItem2 = _interopRequireWildcard(_TextTrackMenuItem);

var _OffTextTrackMenuItem = _dereq_('./off-text-track-menu-item.js');

var _OffTextTrackMenuItem2 = _interopRequireWildcard(_OffTextTrackMenuItem);

/**
 * The base class for buttons that toggle specific text track types (e.g. subtitles)
 *
 * @constructor
 */

var TextTrackButton = (function (_MenuButton) {
  function TextTrackButton(player, options) {
    _classCallCheck(this, TextTrackButton);

    _MenuButton.call(this, player, options);

    var tracks = this.player_.textTracks();

    if (this.items.length <= 1) {
      this.hide();
    }

    if (!tracks) {
      return;
    }

    var updateHandler = Fn.bind(this, this.update);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  _inherits(TextTrackButton, _MenuButton);

  // Create a menu item for each text track

  TextTrackButton.prototype.createItems = function createItems() {
    var items = arguments[0] === undefined ? [] : arguments[0];

    // Add an OFF menu item to turn all tracks off
    items.push(new _OffTextTrackMenuItem2['default'](this.player_, { kind: this.kind_ }));

    var tracks = this.player_.textTracks();

    if (!tracks) {
      return items;
    }

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      // only add tracks that are of the appropriate kind and have a label
      if (track.kind === this.kind_) {
        items.push(new _TextTrackMenuItem2['default'](this.player_, {
          track: track
        }));
      }
    }

    return items;
  };

  return TextTrackButton;
})(_MenuButton3['default']);

_Component2['default'].registerComponent('TextTrackButton', TextTrackButton);
exports['default'] = TextTrackButton;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu-button.js":89,"../../utils/fn.js":112,"./off-text-track-menu-item.js":70,"./text-track-menu-item.js":73}],73:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _MenuItem2 = _dereq_('../../menu/menu-item.js');

var _MenuItem3 = _interopRequireWildcard(_MenuItem2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/**
 * The specific menu item type for selecting a language within a text track kind
 *
 * @constructor
 */

var TextTrackMenuItem = (function (_MenuItem) {
  function TextTrackMenuItem(player, options) {
    var _this = this;

    _classCallCheck(this, TextTrackMenuItem);

    var track = options.track;
    var tracks = player.textTracks();

    // Modify options for parent MenuItem class's init.
    options.label = track.label || track.language || 'Unknown';
    options.selected = track['default'] || track.mode === 'showing';
    _MenuItem.call(this, player, options);

    this.track = track;

    if (tracks) {
      (function () {
        var changeHandler = Fn.bind(_this, _this.handleTracksChange);

        tracks.addEventListener('change', changeHandler);
        _this.on('dispose', function () {
          tracks.removeEventListener('change', changeHandler);
        });
      })();
    }

    // iOS7 doesn't dispatch change events to TextTrackLists when an
    // associated track's mode changes. Without something like
    // Object.observe() (also not present on iOS7), it's not
    // possible to detect changes to the mode attribute and polyfill
    // the change event. As a poor substitute, we manually dispatch
    // change events whenever the controls modify the mode.
    if (tracks && tracks.onchange === undefined) {
      (function () {
        var event = undefined;

        _this.on(['tap', 'click'], function () {
          if (typeof _window2['default'].Event !== 'object') {
            // Android 2.3 throws an Illegal Constructor error for window.Event
            try {
              event = new _window2['default'].Event('change');
            } catch (err) {}
          }

          if (!event) {
            event = _document2['default'].createEvent('Event');
            event.initEvent('change', true, true);
          }

          tracks.dispatchEvent(event);
        });
      })();
    }
  }

  _inherits(TextTrackMenuItem, _MenuItem);

  TextTrackMenuItem.prototype.handleClick = function handleClick(event) {
    var kind = this.track.kind;
    var tracks = this.player_.textTracks();

    _MenuItem.prototype.handleClick.call(this, event);

    if (!tracks) {
      return;
    }for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      if (track.kind !== kind) {
        continue;
      }

      if (track === this.track) {
        track.mode = 'showing';
      } else {
        track.mode = 'disabled';
      }
    }
  };

  TextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
    this.selected(this.track.mode === 'showing');
  };

  return TextTrackMenuItem;
})(_MenuItem3['default']);

_Component2['default'].registerComponent('TextTrackMenuItem', TextTrackMenuItem);
exports['default'] = TextTrackMenuItem;
module.exports = exports['default'];

},{"../../component.js":52,"../../menu/menu-item.js":90,"../../utils/fn.js":112,"global/document":1,"global/window":2}],74:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _formatTime = _dereq_('../../utils/format-time.js');

var _formatTime2 = _interopRequireWildcard(_formatTime);

/**
 * Displays the current time
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var CurrentTimeDisplay = (function (_Component) {
  function CurrentTimeDisplay(player, options) {
    _classCallCheck(this, CurrentTimeDisplay);

    _Component.call(this, player, options);

    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(CurrentTimeDisplay, _Component);

  CurrentTimeDisplay.prototype.createEl = function createEl() {
    var el = _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-current-time vjs-time-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-current-time-display',
      innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00', // label the current time for screen reader users
      'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
    });

    el.appendChild(this.contentEl_);
    return el;
  };

  CurrentTimeDisplay.prototype.updateContent = function updateContent() {
    // Allows for smooth scrubbing, when player can't keep up.
    var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
    var localizedText = this.localize('Current Time');
    var formattedTime = _formatTime2['default'](time, this.player_.duration());
    this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime;
  };

  return CurrentTimeDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('CurrentTimeDisplay', CurrentTimeDisplay);
exports['default'] = CurrentTimeDisplay;
module.exports = exports['default'];

},{"../../component.js":52,"../../utils/dom.js":110,"../../utils/format-time.js":113}],75:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _formatTime = _dereq_('../../utils/format-time.js');

var _formatTime2 = _interopRequireWildcard(_formatTime);

/**
 * Displays the duration
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var DurationDisplay = (function (_Component) {
  function DurationDisplay(player, options) {
    _classCallCheck(this, DurationDisplay);

    _Component.call(this, player, options);

    // this might need to be changed to 'durationchange' instead of 'timeupdate' eventually,
    // however the durationchange event fires before this.player_.duration() is set,
    // so the value cannot be written out using this method.
    // Once the order of durationchange and this.player_.duration() being set is figured out,
    // this can be updated.
    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(DurationDisplay, _Component);

  DurationDisplay.prototype.createEl = function createEl() {
    var el = _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-duration vjs-time-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-duration-display',
      innerHTML: '<span class="vjs-control-text">' + this.localize('Duration Time') + '</span> 0:00', // label the duration time for screen reader users
      'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
    });

    el.appendChild(this.contentEl_);
    return el;
  };

  DurationDisplay.prototype.updateContent = function updateContent() {
    var duration = this.player_.duration();
    if (duration) {
      var localizedText = this.localize('Duration Time');
      var formattedTime = _formatTime2['default'](duration);
      this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime; // label the duration time for screen reader users
    }
  };

  return DurationDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('DurationDisplay', DurationDisplay);
exports['default'] = DurationDisplay;
module.exports = exports['default'];

},{"../../component.js":52,"../../utils/dom.js":110,"../../utils/format-time.js":113}],76:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _formatTime = _dereq_('../../utils/format-time.js');

var _formatTime2 = _interopRequireWildcard(_formatTime);

/**
 * Displays the time left in the video
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var RemainingTimeDisplay = (function (_Component) {
  function RemainingTimeDisplay(player, options) {
    _classCallCheck(this, RemainingTimeDisplay);

    _Component.call(this, player, options);

    this.on(player, 'timeupdate', this.updateContent);
  }

  _inherits(RemainingTimeDisplay, _Component);

  RemainingTimeDisplay.prototype.createEl = function createEl() {
    var el = _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-remaining-time vjs-time-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-remaining-time-display',
      innerHTML: '<span class="vjs-control-text">' + this.localize('Remaining Time') + '</span> -0:00', // label the remaining time for screen reader users
      'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
    });

    el.appendChild(this.contentEl_);
    return el;
  };

  RemainingTimeDisplay.prototype.updateContent = function updateContent() {
    if (this.player_.duration()) {
      var localizedText = this.localize('Remaining Time');
      var formattedTime = _formatTime2['default'](this.player_.remainingTime());
      this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> -' + formattedTime;
    }

    // Allows for smooth scrubbing, when player can't keep up.
    // var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
    // this.contentEl_.innerHTML = vjs.formatTime(time, this.player_.duration());
  };

  return RemainingTimeDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('RemainingTimeDisplay', RemainingTimeDisplay);
exports['default'] = RemainingTimeDisplay;
module.exports = exports['default'];

},{"../../component.js":52,"../../utils/dom.js":110,"../../utils/format-time.js":113}],77:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

/**
 * The separator between the current time and duration
 *
 * Can be hidden if it's not needed in the design.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var TimeDivider = (function (_Component) {
  function TimeDivider() {
    _classCallCheck(this, TimeDivider);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(TimeDivider, _Component);

  TimeDivider.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-time-control vjs-time-divider',
      innerHTML: '<div><span>/</span></div>'
    });
  };

  return TimeDivider;
})(_Component3['default']);

_Component3['default'].registerComponent('TimeDivider', TimeDivider);
exports['default'] = TimeDivider;
module.exports = exports['default'];

},{"../../component.js":52}],78:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Slider2 = _dereq_('../../slider/slider.js');

var _Slider3 = _interopRequireWildcard(_Slider2);

var _Component = _dereq_('../../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _roundFloat = _dereq_('../../utils/round-float.js');

var _roundFloat2 = _interopRequireWildcard(_roundFloat);

// Required children

var _VolumeLevel = _dereq_('./volume-level.js');

var _VolumeLevel2 = _interopRequireWildcard(_VolumeLevel);

/**
 * The bar that contains the volume level and can be clicked on to adjust the level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeBar = (function (_Slider) {
  function VolumeBar(player, options) {
    _classCallCheck(this, VolumeBar);

    _Slider.call(this, player, options);
    this.on(player, 'volumechange', this.updateARIAAttributes);
    player.ready(Fn.bind(this, this.updateARIAAttributes));
  }

  _inherits(VolumeBar, _Slider);

  VolumeBar.prototype.createEl = function createEl() {
    return _Slider.prototype.createEl.call(this, 'div', {
      className: 'vjs-volume-bar',
      'aria-label': 'volume level'
    });
  };

  VolumeBar.prototype.handleMouseMove = function handleMouseMove(event) {
    if (this.player_.muted()) {
      this.player_.muted(false);
    }

    this.player_.volume(this.calculateDistance(event));
  };

  VolumeBar.prototype.getPercent = function getPercent() {
    if (this.player_.muted()) {
      return 0;
    } else {
      return this.player_.volume();
    }
  };

  VolumeBar.prototype.stepForward = function stepForward() {
    this.player_.volume(this.player_.volume() + 0.1);
  };

  VolumeBar.prototype.stepBack = function stepBack() {
    this.player_.volume(this.player_.volume() - 0.1);
  };

  VolumeBar.prototype.updateARIAAttributes = function updateARIAAttributes() {
    // Current value of volume bar as a percentage
    this.el_.setAttribute('aria-valuenow', _roundFloat2['default'](this.player_.volume() * 100, 2));
    this.el_.setAttribute('aria-valuetext', _roundFloat2['default'](this.player_.volume() * 100, 2) + '%');
  };

  return VolumeBar;
})(_Slider3['default']);

VolumeBar.prototype.options_ = {
  children: {
    volumeLevel: {}
  },
  barName: 'volumeLevel'
};

VolumeBar.prototype.playerEvent = 'volumechange';

_Component2['default'].registerComponent('VolumeBar', VolumeBar);
exports['default'] = VolumeBar;
module.exports = exports['default'];

},{"../../component.js":52,"../../slider/slider.js":96,"../../utils/fn.js":112,"../../utils/round-float.js":117,"./volume-level.js":80}],79:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

// Required children

var _VolumeBar = _dereq_('./volume-bar.js');

var _VolumeBar2 = _interopRequireWildcard(_VolumeBar);

/**
 * The component for controlling the volume level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeControl = (function (_Component) {
  function VolumeControl(player, options) {
    _classCallCheck(this, VolumeControl);

    _Component.call(this, player, options);

    // hide volume controls when they're not supported by the current tech
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }
    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
  }

  _inherits(VolumeControl, _Component);

  VolumeControl.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-volume-control vjs-control'
    });
  };

  return VolumeControl;
})(_Component3['default']);

VolumeControl.prototype.options_ = {
  children: {
    volumeBar: {}
  }
};

_Component3['default'].registerComponent('VolumeControl', VolumeControl);
exports['default'] = VolumeControl;
module.exports = exports['default'];

},{"../../component.js":52,"./volume-bar.js":78}],80:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

/**
 * Shows volume level
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var VolumeLevel = (function (_Component) {
  function VolumeLevel() {
    _classCallCheck(this, VolumeLevel);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(VolumeLevel, _Component);

  VolumeLevel.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-volume-level',
      innerHTML: '<span class="vjs-control-text"></span>'
    });
  };

  return VolumeLevel;
})(_Component3['default']);

_Component3['default'].registerComponent('VolumeLevel', VolumeLevel);
exports['default'] = VolumeLevel;
module.exports = exports['default'];

},{"../../component.js":52}],81:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button = _dereq_('../button.js');

var _Button2 = _interopRequireWildcard(_Button);

var _Component = _dereq_('../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _Menu = _dereq_('../menu/menu.js');

var _Menu2 = _interopRequireWildcard(_Menu);

var _MenuButton2 = _dereq_('../menu/menu-button.js');

var _MenuButton3 = _interopRequireWildcard(_MenuButton2);

var _MuteToggle = _dereq_('./mute-toggle.js');

var _MuteToggle2 = _interopRequireWildcard(_MuteToggle);

var _VolumeBar = _dereq_('./volume-control/volume-bar.js');

var _VolumeBar2 = _interopRequireWildcard(_VolumeBar);

/**
 * Menu button with a popup for showing the volume slider.
 * @constructor
 */

var VolumeMenuButton = (function (_MenuButton) {
  function VolumeMenuButton(player, options) {
    _classCallCheck(this, VolumeMenuButton);

    _MenuButton.call(this, player, options);

    // Same listeners as MuteToggle
    this.on(player, 'volumechange', this.volumeUpdate);

    // hide mute toggle if the current tech doesn't support volume control
    if (player.tech && player.tech.featuresVolumeControl === false) {
      this.addClass('vjs-hidden');
    }
    this.on(player, 'loadstart', function () {
      if (player.tech.featuresVolumeControl === false) {
        this.addClass('vjs-hidden');
      } else {
        this.removeClass('vjs-hidden');
      }
    });
    this.addClass('vjs-menu-button');
  }

  _inherits(VolumeMenuButton, _MenuButton);

  VolumeMenuButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-volume-menu-button ' + _MenuButton.prototype.buildCSSClass.call(this);
  };

  VolumeMenuButton.prototype.createMenu = function createMenu() {
    var menu = new _Menu2['default'](this.player_, {
      contentElType: 'div'
    });

    // The volumeBar is vertical by default in the base theme when used with a VolumeMenuButton
    var options = this.options_.volumeBar || {};
    options.vertical = options.vertical || true;

    var vc = new _VolumeBar2['default'](this.player_, options);

    vc.on('focus', function () {
      menu.lockShowing();
    });
    vc.on('blur', function () {
      menu.unlockShowing();
    });
    menu.addChild(vc);
    return menu;
  };

  VolumeMenuButton.prototype.handleClick = function handleClick() {
    _MuteToggle2['default'].prototype.handleClick.call(this);
    _MenuButton.prototype.handleClick.call(this);
  };

  return VolumeMenuButton;
})(_MenuButton3['default']);

VolumeMenuButton.prototype.volumeUpdate = _MuteToggle2['default'].prototype.update;
VolumeMenuButton.prototype.controlText_ = 'Mute';

_Component2['default'].registerComponent('VolumeMenuButton', VolumeMenuButton);
exports['default'] = VolumeMenuButton;
module.exports = exports['default'];

},{"../button.js":51,"../component.js":52,"../menu/menu-button.js":89,"../menu/menu.js":91,"./mute-toggle.js":56,"./volume-control/volume-bar.js":78}],82:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import);

/**
 * Display that an error has occurred making the video unplayable
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var ErrorDisplay = (function (_Component) {
  function ErrorDisplay(player, options) {
    _classCallCheck(this, ErrorDisplay);

    _Component.call(this, player, options);

    this.update();
    this.on(player, 'error', this.update);
  }

  _inherits(ErrorDisplay, _Component);

  ErrorDisplay.prototype.createEl = function createEl() {
    var el = _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-error-display'
    });

    this.contentEl_ = Dom.createEl('div');
    el.appendChild(this.contentEl_);

    return el;
  };

  ErrorDisplay.prototype.update = function update() {
    if (this.player().error()) {
      this.contentEl_.innerHTML = this.localize(this.player().error().message);
    }
  };

  return ErrorDisplay;
})(_Component3['default']);

_Component3['default'].registerComponent('ErrorDisplay', ErrorDisplay);
exports['default'] = ErrorDisplay;
module.exports = exports['default'];

},{"./component":52,"./utils/dom.js":110}],83:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = _dereq_('./utils/events.js');

var Events = _interopRequireWildcard(_import);

var EventEmitter = function EventEmitter() {};

EventEmitter.prototype.allowedEvents_ = {};

EventEmitter.prototype.on = function (type, fn) {
  // Remove the addEventListener alias before calling Events.on
  // so we don't get into an infinite type loop
  var ael = this.addEventListener;
  this.addEventListener = Function.prototype;
  Events.on(this, type, fn);
  this.addEventListener = ael;
};
EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;

EventEmitter.prototype.off = function (type, fn) {
  Events.off(this, type, fn);
};
EventEmitter.prototype.removeEventListener = EventEmitter.prototype.off;

EventEmitter.prototype.one = function (type, fn) {
  Events.one(this, type, fn);
};

EventEmitter.prototype.trigger = function (event) {
  var type = event.type || event;

  if (typeof event === 'string') {
    event = {
      type: type
    };
  }
  event = Events.fixEvent(event);

  if (this.allowedEvents_[type] && this['on' + type]) {
    this['on' + type](event);
  }

  Events.trigger(this, event);
};
// The standard DOM EventTarget.dispatchEvent() is aliased to trigger()
EventEmitter.prototype.dispatchEvent = EventEmitter.prototype.trigger;

exports['default'] = EventEmitter;
module.exports = exports['default'];

},{"./utils/events.js":111}],84:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
/**
 * A combination of node inherits and babel's inherits (after transpile).
 * Both work the same but node adds `super_` to the subClass
 * and Bable adds the superClass as __proto__. Both seem useful.
 */
var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superClass) {
    // node
    subClass.super_ = superClass;
  }
};

/**
 * Function for subclassing using the same inheritance that
 * videojs uses internally
 *
 * ```
 * var Button = videojs.getComponent('Button');
 *
 * var MyButton = videojs.extends(Button, {
 *   constructor: function(player, options) {
 *     Button.call(this, player, options);
 *   },
 *
 *   onClick: function() {
 *     // doSomething
 *   }
 * });
 * ```
 */
var extendsFn = function extendsFn(superClass) {
  var subClassMethods = arguments[1] === undefined ? {} : arguments[1];

  var subClass = function subClass() {
    superClass.apply(this, arguments);
  };
  var methods = {};

  if (subClassMethods.constructor !== Object.prototype.constructor) {
    subClass = subClassMethods.constructor;
    methods = subClassMethods;
  } else if (typeof subClassMethods === 'function') {
    subClass = subClassMethods;
  }

  _inherits(subClass, superClass);

  // Extend subObj's prototype with functions and other properties from props
  for (var name in methods) {
    if (methods.hasOwnProperty(name)) {
      subClass.prototype[name] = methods[name];
    }
  }

  return subClass;
};

exports['default'] = extendsFn;
module.exports = exports['default'];

},{}],85:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/**
 * Store the browser-specific methods for the fullscreen API
 * @type {Object|undefined}
 * @private
 */
var FullscreenApi = {};

// browser API methods
// map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
var apiMap = [
// Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
// WebKit
['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
// Old WebKit (Safari 5.1)
['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
// Mozilla
['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
// Microsoft
['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

var specApi = apiMap[0];
var browserApi = undefined;

// determine the supported set of functions
for (var i = 0; i < apiMap.length; i++) {
  // check for exitFullscreen function
  if (apiMap[i][1] in _document2['default']) {
    browserApi = apiMap[i];
    break;
  }
}

// map the browser API names to the spec API names
if (browserApi) {
  for (var i = 0; i < browserApi.length; i++) {
    FullscreenApi[specApi[i]] = browserApi[i];
  }
}

exports['default'] = FullscreenApi;
module.exports = exports['default'];

},{"global/document":1}],86:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var navigator = _window2['default'].navigator;

/**
 * Global Player instance options, surfaced from Player.prototype.options_
 * options = Player.prototype.options_
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 */
exports['default'] = {
  // Default order of fallback technology
  techOrder: ['html5', 'flash'],
  // techOrder: ['flash','html5'],

  html5: {},
  flash: {},

  // defaultVolume: 0.85,
  defaultVolume: 0, // The freakin seaguls are driving me crazy!

  // default inactivity timeout
  inactivityTimeout: 2000,

  // default playback rates
  playbackRates: [],
  // Add playback rate selection by adding rates
  // 'playbackRates': [0.5, 1, 1.5, 2],

  // Included control sets
  children: {
    mediaLoader: {},
    posterImage: {},
    textTrackDisplay: {},
    loadingSpinner: {},
    bigPlayButton: {},
    controlBar: {},
    errorDisplay: {},
    textTrackSettings: {}
  },

  language: _document2['default'].getElementsByTagName('html')[0].getAttribute('lang') || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || 'en',

  // locales and their language translations
  languages: {},

  // Default message to show when a video cannot be played.
  notSupportedMessage: 'No compatible source was found for this video.'
};
module.exports = exports['default'];

},{"global/document":1,"global/window":2}],87:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('./component');

var _Component3 = _interopRequireWildcard(_Component2);

/* Loading Spinner
================================================================================ */
/**
 * Loading spinner for waiting events
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var LoadingSpinner = (function (_Component) {
  function LoadingSpinner() {
    _classCallCheck(this, LoadingSpinner);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(LoadingSpinner, _Component);

  LoadingSpinner.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-loading-spinner'
    });
  };

  return LoadingSpinner;
})(_Component3['default']);

_Component3['default'].registerComponent('LoadingSpinner', LoadingSpinner);
exports['default'] = LoadingSpinner;
module.exports = exports['default'];

},{"./component":52}],88:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

/**
 * Custom MediaError to mimic the HTML5 MediaError
 * @param {Number} code The media error code
 */
var MediaError = (function (_MediaError) {
  function MediaError(_x) {
    return _MediaError.apply(this, arguments);
  }

  MediaError.toString = function () {
    return _MediaError.toString();
  };

  return MediaError;
})(function (code) {
  if (typeof code === 'number') {
    this.code = code;
  } else if (typeof code === 'string') {
    // default code is zero, so this is a custom error
    this.message = code;
  } else if (typeof code === 'object') {
    // object
    _assign2['default'](this, code);
  }

  if (!this.message) {
    this.message = MediaError.defaultMessages[this.code] || '';
  }
});

/**
 * The error code that refers two one of the defined
 * MediaError types
 * @type {Number}
 */
MediaError.prototype.code = 0;

/**
 * An optional message to be shown with the error.
 * Message is not part of the HTML5 video spec
 * but allows for more informative custom errors.
 * @type {String}
 */
MediaError.prototype.message = '';

/**
 * An optional status code that can be set by plugins
 * to allow even more detail about the error.
 * For example the HLS plugin might provide the specific
 * HTTP status code that was returned when the error
 * occurred, then allowing a custom error overlay
 * to display more information.
 * @type {[type]}
 */
MediaError.prototype.status = null;

MediaError.errorTypes = ['MEDIA_ERR_CUSTOM', // = 0
'MEDIA_ERR_ABORTED', // = 1
'MEDIA_ERR_NETWORK', // = 2
'MEDIA_ERR_DECODE', // = 3
'MEDIA_ERR_SRC_NOT_SUPPORTED', // = 4
'MEDIA_ERR_ENCRYPTED' // = 5
];

MediaError.defaultMessages = {
  1: 'You aborted the video playback',
  2: 'A network error caused the video download to fail part-way.',
  3: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.',
  4: 'The video could not be loaded, either because the server or network failed or because the format is not supported.',
  5: 'The video is encrypted and we do not have the keys to decrypt it.'
};

// Add types as properties on MediaError
// e.g. MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
for (var errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
  MediaError[MediaError.errorTypes[errNum]] = errNum;
  // values should be accessible on both the class and instance
  MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
}

exports['default'] = MediaError;
module.exports = exports['default'];

},{"object.assign":44}],89:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _Menu = _dereq_('./menu.js');

var _Menu2 = _interopRequireWildcard(_Menu);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import2);

var _toTitleCase = _dereq_('../utils/to-title-case.js');

var _toTitleCase2 = _interopRequireWildcard(_toTitleCase);

/**
 * A button class with a popup menu
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var MenuButton = (function (_Button) {
  function MenuButton(player, options) {
    _classCallCheck(this, MenuButton);

    _Button.call(this, player, options);

    this.update();

    this.on('keydown', this.handleKeyPress);
    this.el_.setAttribute('aria-haspopup', true);
    this.el_.setAttribute('role', 'button');
  }

  _inherits(MenuButton, _Button);

  MenuButton.prototype.update = function update() {
    var menu = this.createMenu();

    if (this.menu) {
      this.removeChild(this.menu);
    }

    this.menu = menu;
    this.addChild(menu);

    /**
     * Track the state of the menu button
     * @type {Boolean}
     * @private
     */
    this.buttonPressed_ = false;

    if (this.items && this.items.length === 0) {
      this.hide();
    } else if (this.items && this.items.length > 1) {
      this.show();
    }
  };

  MenuButton.prototype.createMenu = function createMenu() {
    var menu = new _Menu2['default'](this.player_);

    // Add a title list item to the top
    if (this.options().title) {
      menu.contentEl().appendChild(Dom.createEl('li', {
        className: 'vjs-menu-title',
        innerHTML: _toTitleCase2['default'](this.options().title),
        tabIndex: -1
      }));
    }

    this.items = this.createItems();

    if (this.items) {
      // Add menu items to the menu
      for (var i = 0; i < this.items.length; i++) {
        menu.addItem(this.items[i]);
      }
    }

    return menu;
  };

  /**
   * Create the list of menu items. Specific to each subclass.
   */

  MenuButton.prototype.createItems = function createItems() {};

  MenuButton.prototype.createEl = function createEl() {
    return _Button.prototype.createEl.call(this, 'div', {
      className: this.buildCSSClass()
    });
  };

  /** @inheritDoc */

  MenuButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-menu-button ' + _Button.prototype.buildCSSClass.call(this);
  };

  // Focus - Add keyboard functionality to element
  // This function is not needed anymore. Instead, the keyboard functionality is handled by
  // treating the button as triggering a submenu. When the button is pressed, the submenu
  // appears. Pressing the button again makes the submenu disappear.

  MenuButton.prototype.handleFocus = function handleFocus() {};

  // Can't turn off list display that we turned on with focus, because list would go away.

  MenuButton.prototype.handleBlur = function handleBlur() {};

  MenuButton.prototype.handleClick = function handleClick() {
    // When you click the button it adds focus, which will show the menu indefinitely.
    // So we'll remove focus when the mouse leaves the button.
    // Focus is needed for tab navigation.
    this.one('mouseout', Fn.bind(this, function () {
      this.menu.unlockShowing();
      this.el_.blur();
    }));
    if (this.buttonPressed_) {
      this.unpressButton();
    } else {
      this.pressButton();
    }
  };

  MenuButton.prototype.handleKeyPress = function handleKeyPress(event) {

    // Check for space bar (32) or enter (13) keys
    if (event.which === 32 || event.which === 13) {
      if (this.buttonPressed_) {
        this.unpressButton();
      } else {
        this.pressButton();
      }
      event.preventDefault();
      // Check for escape (27) key
    } else if (event.which === 27) {
      if (this.buttonPressed_) {
        this.unpressButton();
      }
      event.preventDefault();
    }
  };

  MenuButton.prototype.pressButton = function pressButton() {
    this.buttonPressed_ = true;
    this.menu.lockShowing();
    this.el_.setAttribute('aria-pressed', true);
    if (this.items && this.items.length > 0) {
      this.items[0].el().focus(); // set the focus to the title of the submenu
    }
  };

  MenuButton.prototype.unpressButton = function unpressButton() {
    this.buttonPressed_ = false;
    this.menu.unlockShowing();
    this.el_.setAttribute('aria-pressed', false);
  };

  return MenuButton;
})(_Button3['default']);

_Component2['default'].registerComponent('MenuButton', MenuButton);
exports['default'] = MenuButton;
module.exports = exports['default'];

},{"../button.js":51,"../component.js":52,"../utils/dom.js":110,"../utils/fn.js":112,"../utils/to-title-case.js":119,"./menu.js":91}],90:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('../button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('../component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

/**
 * The component for a menu item. `<li>`
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var MenuItem = (function (_Button) {
  function MenuItem(player, options) {
    _classCallCheck(this, MenuItem);

    _Button.call(this, player, options);
    this.selected(options.selected);
  }

  _inherits(MenuItem, _Button);

  /** @inheritDoc */

  MenuItem.prototype.createEl = function createEl(type, props) {
    return _Button.prototype.createEl.call(this, 'li', _assign2['default']({
      className: 'vjs-menu-item',
      innerHTML: this.localize(this.options_.label)
    }, props));
  };

  /**
   * Handle a click on the menu item, and set it to selected
   */

  MenuItem.prototype.handleClick = function handleClick() {
    this.selected(true);
  };

  /**
   * Set this menu item as selected or not
   * @param  {Boolean} selected
   */

  MenuItem.prototype.selected = (function (_selected) {
    function selected(_x) {
      return _selected.apply(this, arguments);
    }

    selected.toString = function () {
      return _selected.toString();
    };

    return selected;
  })(function (selected) {
    if (selected) {
      this.addClass('vjs-selected');
      this.el_.setAttribute('aria-selected', true);
    } else {
      this.removeClass('vjs-selected');
      this.el_.setAttribute('aria-selected', false);
    }
  });

  return MenuItem;
})(_Button3['default']);

_Component2['default'].registerComponent('MenuItem', MenuItem);
exports['default'] = MenuItem;
module.exports = exports['default'];

},{"../button.js":51,"../component.js":52,"object.assign":44}],91:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import2);

var _import3 = _dereq_('../utils/events.js');

var Events = _interopRequireWildcard(_import3);

/* Menu
================================================================================ */
/**
 * The Menu component is used to build pop up menus, including subtitle and
 * captions selection menus.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

var Menu = (function (_Component) {
  function Menu() {
    _classCallCheck(this, Menu);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Menu, _Component);

  /**
   * Add a menu item to the menu
   * @param {Object|String} component Component or component type to add
   */

  Menu.prototype.addItem = function addItem(component) {
    this.addChild(component);
    component.on('click', Fn.bind(this, function () {
      this.unlockShowing();
    }));
  };

  Menu.prototype.createEl = function createEl() {
    var contentElType = this.options().contentElType || 'ul';
    this.contentEl_ = Dom.createEl(contentElType, {
      className: 'vjs-menu-content'
    });
    var el = _Component.prototype.createEl.call(this, 'div', {
      append: this.contentEl_,
      className: 'vjs-menu'
    });
    el.appendChild(this.contentEl_);

    // Prevent clicks from bubbling up. Needed for Menu Buttons,
    // where a click on the parent is significant
    Events.on(el, 'click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    });

    return el;
  };

  return Menu;
})(_Component3['default']);

_Component3['default'].registerComponent('Menu', Menu);
exports['default'] = Menu;
module.exports = exports['default'];

},{"../component.js":52,"../utils/dom.js":110,"../utils/events.js":111,"../utils/fn.js":112}],92:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
// Subclasses Component

var _Component2 = _dereq_('./component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _import = _dereq_('./utils/events.js');

var Events = _interopRequireWildcard(_import);

var _import2 = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./utils/fn.js');

var Fn = _interopRequireWildcard(_import3);

var _import4 = _dereq_('./utils/guid.js');

var Guid = _interopRequireWildcard(_import4);

var _import5 = _dereq_('./utils/browser.js');

var browser = _interopRequireWildcard(_import5);

var _log = _dereq_('./utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _toTitleCase = _dereq_('./utils/to-title-case.js');

var _toTitleCase2 = _interopRequireWildcard(_toTitleCase);

var _createTimeRange = _dereq_('./utils/time-ranges.js');

var _bufferedPercent2 = _dereq_('./utils/buffer.js');

var _FullscreenApi = _dereq_('./fullscreen-api.js');

var _FullscreenApi2 = _interopRequireWildcard(_FullscreenApi);

var _MediaError = _dereq_('./media-error.js');

var _MediaError2 = _interopRequireWildcard(_MediaError);

var _globalOptions = _dereq_('./global-options.js');

var _globalOptions2 = _interopRequireWildcard(_globalOptions);

var _safeParseTuple2 = _dereq_('safe-json-parse/tuple');

var _safeParseTuple3 = _interopRequireWildcard(_safeParseTuple2);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

var _mergeOptions = _dereq_('./utils/merge-options.js');

var _mergeOptions2 = _interopRequireWildcard(_mergeOptions);

// Include required child components (importing also registers them)

var _MediaLoader = _dereq_('./tech/loader.js');

var _MediaLoader2 = _interopRequireWildcard(_MediaLoader);

var _PosterImage = _dereq_('./poster-image.js');

var _PosterImage2 = _interopRequireWildcard(_PosterImage);

var _TextTrackDisplay = _dereq_('./tracks/text-track-display.js');

var _TextTrackDisplay2 = _interopRequireWildcard(_TextTrackDisplay);

var _LoadingSpinner = _dereq_('./loading-spinner.js');

var _LoadingSpinner2 = _interopRequireWildcard(_LoadingSpinner);

var _BigPlayButton = _dereq_('./big-play-button.js');

var _BigPlayButton2 = _interopRequireWildcard(_BigPlayButton);

var _ControlBar = _dereq_('./control-bar/control-bar.js');

var _ControlBar2 = _interopRequireWildcard(_ControlBar);

var _ErrorDisplay = _dereq_('./error-display.js');

var _ErrorDisplay2 = _interopRequireWildcard(_ErrorDisplay);

var _TextTrackSettings = _dereq_('./tracks/text-track-settings.js');

var _TextTrackSettings2 = _interopRequireWildcard(_TextTrackSettings);

// Require html5 tech, at least for disposing the original video tag

var _Html5 = _dereq_('./tech/html5.js');

var _Html52 = _interopRequireWildcard(_Html5);

/**
 * An instance of the `Player` class is created when any of the Video.js setup methods are used to initialize a video.
 *
 * ```js
 * var myPlayer = videojs('example_video_1');
 * ```
 *
 * In the following example, the `data-setup` attribute tells the Video.js library to create a player instance when the library is ready.
 *
 * ```html
 * <video id="example_video_1" data-setup='{}' controls>
 *   <source src="my-source.mp4" type="video/mp4">
 * </video>
 * ```
 *
 * After an instance has been created it can be accessed globally using `Video('example_video_1')`.
 *
 * @class
 * @extends Component
 */

var Player = (function (_Component) {

  /**
   * player's constructor function
   *
   * @constructs
   * @method init
   * @param {Element} tag        The original video tag used for configuring options
   * @param {Object=} options    Player options
   * @param {Function=} ready    Ready callback function
   */

  function Player(tag, options, ready) {
    var _this = this;

    _classCallCheck(this, Player);

    // Make sure tag ID exists
    tag.id = tag.id || 'vjs_video_' + Guid.newGUID();

    // Set Options
    // The options argument overrides options set in the video tag
    // which overrides globally set options.
    // This latter part coincides with the load order
    // (tag must exist before Player)
    options = _assign2['default'](Player.getTagSettings(tag), options);

    // Delay the initialization of children because we need to set up
    // player properties first, and can't use `this` before `super()`
    options.initChildren = false;

    // Same with creating the element
    options.createEl = false;

    // we don't want the player to report touch activity on itself
    // see enableTouchActivity in Component
    options.reportTouchActivity = false;

    // Run base component initializing with new options
    _Component.call(this, null, options, ready);

    // if the global option object was accidentally blown away by
    // someone, bail early with an informative error
    if (!this.options_ || !this.options_.techOrder || !this.options_.techOrder.length) {
      throw new Error('No techOrder specified. Did you overwrite ' + 'videojs.options instead of just changing the ' + 'properties you want to override?');
    }

    this.tag = tag; // Store the original tag used to set options

    // Store the tag attributes used to restore html5 element
    this.tagAttributes = tag && Dom.getElAttributes(tag);

    // Update current language
    this.language(options.language || _globalOptions2['default'].language);

    // Update Supported Languages
    if (options.languages) {
      (function () {
        // Normalise player option languages to lowercase
        var languagesToLower = {};

        Object.getOwnPropertyNames(options.languages).forEach(function (name) {
          languagesToLower[name.toLowerCase()] = options.languages[name];
        });
        _this.languages_ = languagesToLower;
      })();
    } else {
      this.languages_ = _globalOptions2['default'].languages;
    }

    // Cache for video property values.
    this.cache_ = {};

    // Set poster
    this.poster_ = options.poster || '';

    // Set controls
    this.controls_ = !!options.controls;
    // Original tag settings stored in options
    // now remove immediately so native controls don't flash.
    // May be turned back on by HTML5 tech if nativeControlsForTouch is true
    tag.controls = false;

    /**
    * Store the internal state of scrubbing
    * @private
    * @return {Boolean} True if the user is scrubbing
    */
    this.scrubbing_ = false;

    this.el_ = this.createEl();

    // Load plugins
    if (options.plugins) {
      (function () {
        var plugins = options.plugins;

        Object.getOwnPropertyNames(plugins).forEach(function (name) {
          this[name](plugins[name]);
        }, _this);
      })();
    }

    this.initChildren();

    // Set isAudio based on whether or not an audio tag was used
    this.isAudio(tag.nodeName.toLowerCase() === 'audio');

    // Update controls className. Can't do this when the controls are initially
    // set because the element doesn't exist yet.
    if (this.controls()) {
      this.addClass('vjs-controls-enabled');
    } else {
      this.addClass('vjs-controls-disabled');
    }

    if (this.isAudio()) {
      this.addClass('vjs-audio');
    }

    if (this.flexNotSupported_()) {
      this.addClass('vjs-no-flex');
    }

    // TODO: Make this smarter. Toggle user state between touching/mousing
    // using events, since devices can have both touch and mouse events.
    // if (browser.TOUCH_ENABLED) {
    //   this.addClass('vjs-touch-enabled');
    // }

    // Make player easily findable by ID
    Player.players[this.id_] = this;

    // When the player is first initialized, trigger activity so components
    // like the control bar show themselves if needed
    this.userActive_ = true;
    this.reportUserActivity();
    this.listenForUserActivity();

    this.on('fullscreenchange', this.handleFullscreenChange);
    this.on('stageclick', this.handleStageClick);
  }

  _inherits(Player, _Component);

  /**
   * Destroys the video player and does any necessary cleanup
   *
   *     myPlayer.dispose();
   *
   * This is especially helpful if you are dynamically adding and removing videos
   * to/from the DOM.
   */

  Player.prototype.dispose = function dispose() {
    this.trigger('dispose');
    // prevent dispose from being called twice
    this.off('dispose');

    // Kill reference to this player
    Player.players[this.id_] = null;
    if (this.tag && this.tag.player) {
      this.tag.player = null;
    }
    if (this.el_ && this.el_.player) {
      this.el_.player = null;
    }

    if (this.tech) {
      this.tech.dispose();
    }

    _Component.prototype.dispose.call(this);
  };

  Player.prototype.createEl = function createEl() {
    var el = this.el_ = _Component.prototype.createEl.call(this, 'div');
    var tag = this.tag;

    // Remove width/height attrs from tag so CSS can make it 100% width/height
    tag.removeAttribute('width');
    tag.removeAttribute('height');

    // Copy over all the attributes from the tag, including ID and class
    // ID will now reference player box, not the video tag
    var attrs = Dom.getElAttributes(tag);

    Object.getOwnPropertyNames(attrs).forEach(function (attr) {
      // workaround so we don't totally break IE7
      // http://stackoverflow.com/questions/3653444/css-styles-not-applied-on-dynamic-elements-in-internet-explorer-7
      if (attr === 'class') {
        el.className = attrs[attr];
      } else {
        el.setAttribute(attr, attrs[attr]);
      }
    });

    // Update tag id/class for use as HTML5 playback tech
    // Might think we should do this after embedding in container so .vjs-tech class
    // doesn't flash 100% width/height, but class only applies with .video-js parent
    tag.id += '_html5_api';
    tag.className = 'vjs-tech';

    // Make player findable on elements
    tag.player = el.player = this;
    // Default state of video is paused
    this.addClass('vjs-paused');

    // Add a style element in the player that we'll use to set the width/height
    // of the player in a way that's still overrideable by CSS, just like the
    // video element
    this.styleEl_ = _document2['default'].createElement('style');
    el.appendChild(this.styleEl_);

    // Pass in the width/height/aspectRatio options which will update the style el
    this.width(this.options_.width);
    this.height(this.options_.height);
    this.fluid(this.options_.fluid);
    this.aspectRatio(this.options_.aspectRatio);

    // insertElFirst seems to cause the networkState to flicker from 3 to 2, so
    // keep track of the original for later so we can know if the source originally failed
    tag.initNetworkState_ = tag.networkState;

    // Wrap video tag in div (el/box) container
    if (tag.parentNode) {
      tag.parentNode.insertBefore(el, tag);
    }
    Dom.insertElFirst(tag, el); // Breaks iPhone, fixed in HTML5 setup.

    this.el_ = el;

    return el;
  };

  Player.prototype.width = function width(value) {
    return this.dimension('width', value);
  };

  Player.prototype.height = function height(value) {
    return this.dimension('height', value);
  };

  Player.prototype.dimension = (function (_dimension) {
    function dimension(_x, _x2) {
      return _dimension.apply(this, arguments);
    }

    dimension.toString = function () {
      return _dimension.toString();
    };

    return dimension;
  })(function (dimension, value) {
    var privDimension = dimension + '_';

    if (value === undefined) {
      return this[privDimension] || 0;
    }

    if (value === '') {
      // If an empty string is given, reset the dimension to be automatic
      this[privDimension] = undefined;
    } else {
      var parsedVal = parseFloat(value);

      if (isNaN(parsedVal)) {
        _log2['default'].error('Improper value "' + value + '" supplied for for ' + dimension);
        return this;
      }

      this[privDimension] = parsedVal;
    }

    this.updateStyleEl_();
    return this;
  });

  Player.prototype.fluid = function fluid(bool) {
    if (bool === undefined) {
      return !!this.fluid_;
    }

    this.fluid_ = !!bool;

    if (bool) {
      this.addClass('vjs-fluid');
    } else {
      this.removeClass('vjs-fluid');
    }
  };

  Player.prototype.aspectRatio = function aspectRatio(ratio) {
    if (ratio === undefined) {
      return this.aspectRatio_;
    }

    // Check for width:height format
    if (!/^\d+\:\d+$/.test(ratio)) {
      throw new Error('Improper value suplied for aspect ratio. The format should be width:height, for example 16:9.');
    }
    this.aspectRatio_ = ratio;

    // We're assuming if you set an aspect ratio you want fluid mode,
    // because in fixed mode you could calculate width and height yourself.
    this.fluid(true);

    this.updateStyleEl_();
  };

  Player.prototype.updateStyleEl_ = function updateStyleEl_() {
    var width = undefined;
    var height = undefined;
    var aspectRatio = undefined;

    // The aspect ratio is either used directly or to calculate width and height.
    if (this.aspectRatio_ !== undefined && this.aspectRatio_ !== 'auto') {
      // Use any aspectRatio that's been specifically set
      aspectRatio = this.aspectRatio_;
    } else if (this.videoWidth()) {
      // Otherwise try to get the aspect ratio from the video metadata
      aspectRatio = this.videoWidth() + ':' + this.videoHeight();
    } else {
      // Or use a default. The video element's is 2:1, but 16:9 is more common.
      aspectRatio = '16:9';
    }

    // Get the ratio as a decimal we can use to calculate dimensions
    var ratioParts = aspectRatio.split(':');
    var ratioMultiplier = ratioParts[1] / ratioParts[0];

    if (this.width_ !== undefined) {
      // Use any width that's been specifically set
      width = this.width_;
    } else if (this.height_ !== undefined) {
      // Or calulate the width from the aspect ratio if a height has been set
      width = this.height_ / ratioMultiplier;
    } else {
      // Or use the video's metadata, or use the video el's default of 300
      width = this.videoWidth() || 300;
    }

    if (this.height_ !== undefined) {
      // Use any height that's been specifically set
      height = this.height_;
    } else {
      // Otherwise calculate the height from the ratio and the width
      height = width * ratioMultiplier;
    }

    var idClass = this.id() + '-dimensions';

    // Ensure the right class is still on the player for the style element
    this.addClass(idClass);

    // Create the width/height CSS
    var css = '.' + idClass + ' { width: ' + width + 'px; height: ' + height + 'px; }';
    // Add the aspect ratio CSS for when using a fluid layout
    css += '.' + idClass + '.vjs-fluid { padding-top: ' + ratioMultiplier * 100 + '%; }';

    // Update the style el
    if (this.styleEl_.styleSheet) {
      this.styleEl_.styleSheet.cssText = css;
    } else {
      this.styleEl_.innerHTML = css;
    }
  };

  /**
   * Load the Media Playback Technology (tech)
   * Load/Create an instance of playback technology including element and API methods
   * And append playback element in player div.
   */

  Player.prototype.loadTech = function loadTech(techName, source) {

    // Pause and remove current playback technology
    if (this.tech) {
      this.unloadTech();
    }

    // get rid of the HTML5 video tag as soon as we are using another tech
    if (techName !== 'Html5' && this.tag) {
      _Component3['default'].getComponent('Html5').disposeMediaElement(this.tag);
      this.tag.player = null;
      this.tag = null;
    }

    this.techName = techName;

    // Turn off API access because we're loading a new tech that might load asynchronously
    this.isReady_ = false;

    var techReady = Fn.bind(this, function () {
      this.triggerReady();
    });

    // Grab tech-specific options from player options and add source and parent element to use.
    var techOptions = _assign2['default']({
      source: source,
      playerId: this.id(),
      techId: '' + this.id() + '_' + techName + '_api',
      textTracks: this.textTracks_,
      autoplay: this.options_.autoplay,
      preload: this.options_.preload,
      loop: this.options_.loop,
      muted: this.options_.muted
    }, this.options_[techName.toLowerCase()]);

    if (this.tag) {
      techOptions.tag = this.tag;
    }

    if (source) {
      this.currentType_ = source.type;
      if (source.src === this.cache_.src && this.cache_.currentTime > 0) {
        techOptions.startTime = this.cache_.currentTime;
      }

      this.cache_.src = source.src;
    }

    // Initialize tech instance
    var techComponent = _Component3['default'].getComponent(techName);
    this.tech = new techComponent(techOptions);

    this.on(this.tech, 'ready', this.handleTechReady);
    this.on(this.tech, 'usenativecontrols', this.handleTechUseNativeControls);

    // Listen to every HTML5 events and trigger them back on the player for the plugins
    this.on(this.tech, 'loadstart', this.handleTechLoadStart);
    this.on(this.tech, 'waiting', this.handleTechWaiting);
    this.on(this.tech, 'canplay', this.handleTechCanPlay);
    this.on(this.tech, 'canplaythrough', this.handleTechCanPlayThrough);
    this.on(this.tech, 'playing', this.handleTechPlaying);
    this.on(this.tech, 'ended', this.handleTechEnded);
    this.on(this.tech, 'seeking', this.handleTechSeeking);
    this.on(this.tech, 'seeked', this.handleTechSeeked);
    this.on(this.tech, 'play', this.handleTechPlay);
    this.on(this.tech, 'firstplay', this.handleTechFirstPlay);
    this.on(this.tech, 'pause', this.handleTechPause);
    this.on(this.tech, 'progress', this.handleTechProgress);
    this.on(this.tech, 'durationchange', this.handleTechDurationChange);
    this.on(this.tech, 'fullscreenchange', this.handleTechFullscreenChange);
    this.on(this.tech, 'error', this.handleTechError);
    this.on(this.tech, 'suspend', this.handleTechSuspend);
    this.on(this.tech, 'abort', this.handleTechAbort);
    this.on(this.tech, 'emptied', this.handleTechEmptied);
    this.on(this.tech, 'stalled', this.handleTechStalled);
    this.on(this.tech, 'loadedmetadata', this.handleTechLoadedMetaData);
    this.on(this.tech, 'loadeddata', this.handleTechLoadedData);
    this.on(this.tech, 'timeupdate', this.handleTechTimeUpdate);
    this.on(this.tech, 'ratechange', this.handleTechRateChange);
    this.on(this.tech, 'volumechange', this.handleTechVolumeChange);
    this.on(this.tech, 'texttrackchange', this.onTextTrackChange);
    this.on(this.tech, 'loadedmetadata', this.updateStyleEl_);

    if (this.controls() && !this.usingNativeControls()) {
      this.addTechControlsListeners();
    }

    // Add the tech element in the DOM if it was not already there
    // Make sure to not insert the original video element if using Html5
    if (this.tech.el().parentNode !== this.el() && (techName !== 'Html5' || !this.tag)) {
      Dom.insertElFirst(this.tech.el(), this.el());
    }

    // Get rid of the original video tag reference after the first tech is loaded
    if (this.tag) {
      this.tag.player = null;
      this.tag = null;
    }

    this.tech.ready(techReady);
  };

  Player.prototype.unloadTech = function unloadTech() {
    // Save the current text tracks so that we can reuse the same text tracks with the next tech
    this.textTracks_ = this.textTracks();

    this.isReady_ = false;

    this.tech.dispose();

    this.tech = false;
  };

  Player.prototype.addTechControlsListeners = function addTechControlsListeners() {
    // Some browsers (Chrome & IE) don't trigger a click on a flash swf, but do
    // trigger mousedown/up.
    // http://stackoverflow.com/questions/1444562/javascript-onclick-event-over-flash-object
    // Any touch events are set to block the mousedown event from happening
    this.on(this.tech, 'mousedown', this.handleTechClick);

    // If the controls were hidden we don't want that to change without a tap event
    // so we'll check if the controls were already showing before reporting user
    // activity
    this.on(this.tech, 'touchstart', this.handleTechTouchStart);
    this.on(this.tech, 'touchmove', this.handleTechTouchMove);
    this.on(this.tech, 'touchend', this.handleTechTouchEnd);

    // The tap listener needs to come after the touchend listener because the tap
    // listener cancels out any reportedUserActivity when setting userActive(false)
    this.on(this.tech, 'tap', this.handleTechTap);
  };

  /**
   * Remove the listeners used for click and tap controls. This is needed for
   * toggling to controls disabled, where a tap/touch should do nothing.
   */

  Player.prototype.removeTechControlsListeners = function removeTechControlsListeners() {
    // We don't want to just use `this.off()` because there might be other needed
    // listeners added by techs that extend this.
    this.off(this.tech, 'tap', this.handleTechTap);
    this.off(this.tech, 'touchstart', this.handleTechTouchStart);
    this.off(this.tech, 'touchmove', this.handleTechTouchMove);
    this.off(this.tech, 'touchend', this.handleTechTouchEnd);
    this.off(this.tech, 'mousedown', this.handleTechClick);
  };

  /**
   * Player waits for the tech to be ready
   * @private
   */

  Player.prototype.handleTechReady = function handleTechReady() {
    this.triggerReady();

    // Chrome and Safari both have issues with autoplay.
    // In Safari (5.1.1), when we move the video element into the container div, autoplay doesn't work.
    // In Chrome (15), if you have autoplay + a poster + no controls, the video gets hidden (but audio plays)
    // This fixes both issues. Need to wait for API, so it updates displays correctly
    if (this.tag && this.options_.autoplay && this.paused()) {
      delete this.tag.poster; // Chrome Fix. Fixed in Chrome v16.
      this.play();
    }
  };

  /**
   * Fired when the native controls are used
   * @private
   */

  Player.prototype.handleTechUseNativeControls = function handleTechUseNativeControls() {
    this.usingNativeControls(true);
  };

  /**
   * Fired when the user agent begins looking for media data
   * @event loadstart
   */

  Player.prototype.handleTechLoadStart = function handleTechLoadStart() {
    // TODO: Update to use `emptied` event instead. See #1277.

    this.removeClass('vjs-ended');

    // reset the error state
    this.error(null);

    // If it's already playing we want to trigger a firstplay event now.
    // The firstplay event relies on both the play and loadstart events
    // which can happen in any order for a new source
    if (!this.paused()) {
      this.trigger('loadstart');
      this.trigger('firstplay');
    } else {
      // reset the hasStarted state
      this.hasStarted(false);
      this.trigger('loadstart');
    }
  };

  Player.prototype.hasStarted = (function (_hasStarted) {
    function hasStarted(_x3) {
      return _hasStarted.apply(this, arguments);
    }

    hasStarted.toString = function () {
      return _hasStarted.toString();
    };

    return hasStarted;
  })(function (hasStarted) {
    if (hasStarted !== undefined) {
      // only update if this is a new value
      if (this.hasStarted_ !== hasStarted) {
        this.hasStarted_ = hasStarted;
        if (hasStarted) {
          this.addClass('vjs-has-started');
          // trigger the firstplay event if this newly has played
          this.trigger('firstplay');
        } else {
          this.removeClass('vjs-has-started');
        }
      }
      return this;
    }
    return !!this.hasStarted_;
  });

  /**
   * Fired whenever the media begins or resumes playback
   * @event play
   */

  Player.prototype.handleTechPlay = function handleTechPlay() {
    this.removeClass('vjs-ended');
    this.removeClass('vjs-paused');
    this.addClass('vjs-playing');

    // hide the poster when the user hits play
    // https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-play
    this.hasStarted(true);

    this.trigger('play');
  };

  /**
   * Fired whenever the media begins waiting
   * @event waiting
   */

  Player.prototype.handleTechWaiting = function handleTechWaiting() {
    this.addClass('vjs-waiting');
    this.trigger('waiting');
  };

  /**
   * A handler for events that signal that waiting has ended
   * which is not consistent between browsers. See #1351
   * @event canplay
   */

  Player.prototype.handleTechCanPlay = function handleTechCanPlay() {
    this.removeClass('vjs-waiting');
    this.trigger('canplay');
  };

  /**
   * A handler for events that signal that waiting has ended
   * which is not consistent between browsers. See #1351
   * @event canplaythrough
   */

  Player.prototype.handleTechCanPlayThrough = function handleTechCanPlayThrough() {
    this.removeClass('vjs-waiting');
    this.trigger('canplaythrough');
  };

  /**
   * A handler for events that signal that waiting has ended
   * which is not consistent between browsers. See #1351
   * @event playing
   */

  Player.prototype.handleTechPlaying = function handleTechPlaying() {
    this.removeClass('vjs-waiting');
    this.trigger('playing');
  };

  /**
   * Fired whenever the player is jumping to a new time
   * @event seeking
   */

  Player.prototype.handleTechSeeking = function handleTechSeeking() {
    this.addClass('vjs-seeking');
    this.trigger('seeking');
  };

  /**
   * Fired when the player has finished jumping to a new time
   * @event seeked
   */

  Player.prototype.handleTechSeeked = function handleTechSeeked() {
    this.removeClass('vjs-seeking');
    this.trigger('seeked');
  };

  /**
   * Fired the first time a video is played
   *
   * Not part of the HLS spec, and we're not sure if this is the best
   * implementation yet, so use sparingly. If you don't have a reason to
   * prevent playback, use `myPlayer.one('play');` instead.
   *
   * @event firstplay
   */

  Player.prototype.handleTechFirstPlay = function handleTechFirstPlay() {
    //If the first starttime attribute is specified
    //then we will start at the given offset in seconds
    if (this.options_.starttime) {
      this.currentTime(this.options_.starttime);
    }

    this.addClass('vjs-has-started');
    this.trigger('firstplay');
  };

  /**
   * Fired whenever the media has been paused
   * @event pause
   */

  Player.prototype.handleTechPause = function handleTechPause() {
    this.removeClass('vjs-playing');
    this.addClass('vjs-paused');
    this.trigger('pause');
  };

  /**
   * Fired while the user agent is downloading media data
   * @event progress
   */

  Player.prototype.handleTechProgress = function handleTechProgress() {
    this.trigger('progress');

    // Add custom event for when source is finished downloading.
    if (this.bufferedPercent() === 1) {
      this.trigger('loadedalldata');
    }
  };

  /**
   * Fired when the end of the media resource is reached (currentTime == duration)
   * @event ended
   */

  Player.prototype.handleTechEnded = function handleTechEnded() {
    this.addClass('vjs-ended');
    if (this.options_.loop) {
      this.currentTime(0);
      this.play();
    } else if (!this.paused()) {
      this.pause();
    }

    this.trigger('ended');
  };

  /**
   * Fired when the duration of the media resource is first known or changed
   * @event durationchange
   */

  Player.prototype.handleTechDurationChange = function handleTechDurationChange() {
    this.updateDuration();
    this.trigger('durationchange');
  };

  /**
   * Handle a click on the media element to play/pause
   */

  Player.prototype.handleTechClick = function handleTechClick(event) {
    // We're using mousedown to detect clicks thanks to Flash, but mousedown
    // will also be triggered with right-clicks, so we need to prevent that
    if (event.button !== 0) {
      return;
    } // When controls are disabled a click should not toggle playback because
    // the click is considered a control
    if (this.controls()) {
      if (this.paused()) {
        this.play();
      } else {
        this.pause();
      }
    }
  };

  /**
   * Handle a tap on the media element. It will toggle the user
   * activity state, which hides and shows the controls.
   */

  Player.prototype.handleTechTap = function handleTechTap() {
    this.userActive(!this.userActive());
  };

  Player.prototype.handleTechTouchStart = function handleTechTouchStart() {
    this.userWasActive = this.userActive();
  };

  Player.prototype.handleTechTouchMove = function handleTechTouchMove() {
    if (this.userWasActive) {
      this.reportUserActivity();
    }
  };

  Player.prototype.handleTechTouchEnd = function handleTechTouchEnd(event) {
    // Stop the mouse events from also happening
    event.preventDefault();
  };

  /**
   * Update the duration of the player using the tech
   * @private
   */

  Player.prototype.updateDuration = function updateDuration() {
    // Allows for caching value instead of asking player each time.
    // We need to get the techGet response and check for a value so we don't
    // accidentally cause the stack to blow up.
    var duration = this.techGet('duration');
    if (duration) {
      if (duration < 0) {
        duration = Infinity;
      }
      this.duration(duration);
      // Determine if the stream is live and propagate styles down to UI.
      if (duration === Infinity) {
        this.addClass('vjs-live');
      } else {
        this.removeClass('vjs-live');
      }
    }
  };

  /**
   * Fired when the player switches in or out of fullscreen mode
   * @event fullscreenchange
   */

  Player.prototype.handleFullscreenChange = function handleFullscreenChange() {
    if (this.isFullscreen()) {
      this.addClass('vjs-fullscreen');
    } else {
      this.removeClass('vjs-fullscreen');
    }
  };

  /**
   * native click events on the SWF aren't triggered on IE11, Win8.1RT
   * use stageclick events triggered from inside the SWF instead
   * @private
   */

  Player.prototype.handleStageClick = function handleStageClick() {
    this.reportUserActivity();
  };

  Player.prototype.handleTechFullscreenChange = function handleTechFullscreenChange() {
    this.trigger('fullscreenchange');
  };

  /**
   * Fires when an error occurred during the loading of an audio/video
   * @event error
   */

  Player.prototype.handleTechError = function handleTechError() {
    this.error(this.tech.error().code);
  };

  /**
   * Fires when the browser is intentionally not getting media data
   * @event suspend
   */

  Player.prototype.handleTechSuspend = function handleTechSuspend() {
    this.trigger('suspend');
  };

  /**
   * Fires when the loading of an audio/video is aborted
   * @event abort
   */

  Player.prototype.handleTechAbort = function handleTechAbort() {
    this.trigger('abort');
  };

  /**
   * Fires when the current playlist is empty
   * @event emptied
   */

  Player.prototype.handleTechEmptied = function handleTechEmptied() {
    this.trigger('emptied');
  };

  /**
   * Fires when the browser is trying to get media data, but data is not available
   * @event stalled
   */

  Player.prototype.handleTechStalled = function handleTechStalled() {
    this.trigger('stalled');
  };

  /**
   * Fires when the browser has loaded meta data for the audio/video
   * @event loadedmetadata
   */

  Player.prototype.handleTechLoadedMetaData = function handleTechLoadedMetaData() {
    this.trigger('loadedmetadata');
  };

  /**
   * Fires when the browser has loaded the current frame of the audio/video
   * @event loaddata
   */

  Player.prototype.handleTechLoadedData = function handleTechLoadedData() {
    this.trigger('loadeddata');
  };

  /**
   * Fires when the current playback position has changed
   * @event timeupdate
   */

  Player.prototype.handleTechTimeUpdate = function handleTechTimeUpdate() {
    this.trigger('timeupdate');
  };

  /**
   * Fires when the playing speed of the audio/video is changed
   * @event ratechange
   */

  Player.prototype.handleTechRateChange = function handleTechRateChange() {
    this.trigger('ratechange');
  };

  /**
   * Fires when the volume has been changed
   * @event volumechange
   */

  Player.prototype.handleTechVolumeChange = function handleTechVolumeChange() {
    this.trigger('volumechange');
  };

  /**
   * Fires when the text track has been changed
   * @event texttrackchange
   */

  Player.prototype.onTextTrackChange = function onTextTrackChange() {
    this.trigger('texttrackchange');
  };

  /**
   * Object for cached values.
   */

  Player.prototype.getCache = function getCache() {
    return this.cache_;
  };

  // Pass values to the playback tech

  Player.prototype.techCall = function techCall(method, arg) {
    // If it's not ready yet, call method when it is
    if (this.tech && !this.tech.isReady_) {
      this.tech.ready(function () {
        this[method](arg);
      });

      // Otherwise call method now
    } else {
      try {
        this.tech[method](arg);
      } catch (e) {
        _log2['default'](e);
        throw e;
      }
    }
  };

  // Get calls can't wait for the tech, and sometimes don't need to.

  Player.prototype.techGet = function techGet(method) {
    if (this.tech && this.tech.isReady_) {

      // Flash likes to die and reload when you hide or reposition it.
      // In these cases the object methods go away and we get errors.
      // When that happens we'll catch the errors and inform tech that it's not ready any more.
      try {
        return this.tech[method]();
      } catch (e) {
        // When building additional tech libs, an expected method may not be defined yet
        if (this.tech[method] === undefined) {
          _log2['default']('Video.js: ' + method + ' method not defined for ' + this.techName + ' playback technology.', e);
        } else {
          // When a method isn't available on the object it throws a TypeError
          if (e.name === 'TypeError') {
            _log2['default']('Video.js: ' + method + ' unavailable on ' + this.techName + ' playback technology element.', e);
            this.tech.isReady_ = false;
          } else {
            _log2['default'](e);
          }
        }
        throw e;
      }
    }

    return;
  };

  /**
   * start media playback
   *
   *     myPlayer.play();
   *
   * @return {Player} self
   */

  Player.prototype.play = function play() {
    this.techCall('play');
    return this;
  };

  /**
   * Pause the video playback
   *
   *     myPlayer.pause();
   *
   * @return {Player} self
   */

  Player.prototype.pause = function pause() {
    this.techCall('pause');
    return this;
  };

  /**
   * Check if the player is paused
   *
   *     var isPaused = myPlayer.paused();
   *     var isPlaying = !myPlayer.paused();
   *
   * @return {Boolean} false if the media is currently playing, or true otherwise
   */

  Player.prototype.paused = function paused() {
    // The initial state of paused should be true (in Safari it's actually false)
    return this.techGet('paused') === false ? false : true;
  };

  /**
  * Returns whether or not the user is "scrubbing". Scrubbing is when the user
  * has clicked the progress bar handle and is dragging it along the progress bar.
  * @param  {Boolean} isScrubbing   True/false the user is scrubbing
  * @return {Boolean}               The scrubbing status when getting
  * @return {Object}                The player when setting
  */

  Player.prototype.scrubbing = function scrubbing(isScrubbing) {
    if (isScrubbing !== undefined) {
      this.scrubbing_ = !!isScrubbing;

      if (isScrubbing) {
        this.addClass('vjs-scrubbing');
      } else {
        this.removeClass('vjs-scrubbing');
      }

      return this;
    }

    return this.scrubbing_;
  };

  /**
   * Get or set the current time (in seconds)
   *
   *     // get
   *     var whereYouAt = myPlayer.currentTime();
   *
   *     // set
   *     myPlayer.currentTime(120); // 2 minutes into the video
   *
   * @param  {Number|String=} seconds The time to seek to
   * @return {Number}        The time in seconds, when not setting
   * @return {Player}    self, when the current time is set
   */

  Player.prototype.currentTime = function currentTime(seconds) {
    if (seconds !== undefined) {

      this.techCall('setCurrentTime', seconds);

      return this;
    }

    // cache last currentTime and return. default to 0 seconds
    //
    // Caching the currentTime is meant to prevent a massive amount of reads on the tech's
    // currentTime when scrubbing, but may not provide much performance benefit afterall.
    // Should be tested. Also something has to read the actual current time or the cache will
    // never get updated.
    return this.cache_.currentTime = this.techGet('currentTime') || 0;
  };

  /**
   * Get the length in time of the video in seconds
   *
   *     var lengthOfVideo = myPlayer.duration();
   *
   * **NOTE**: The video must have started loading before the duration can be
   * known, and in the case of Flash, may not be known until the video starts
   * playing.
   *
   * @return {Number} The duration of the video in seconds
   */

  Player.prototype.duration = function duration(seconds) {
    if (seconds !== undefined) {

      // cache the last set value for optimized scrubbing (esp. Flash)
      this.cache_.duration = parseFloat(seconds);

      return this;
    }

    if (this.cache_.duration === undefined) {
      this.updateDuration();
    }

    return this.cache_.duration || 0;
  };

  /**
   * Calculates how much time is left.
   *
   *     var timeLeft = myPlayer.remainingTime();
   *
   * Not a native video element function, but useful
   * @return {Number} The time remaining in seconds
   */

  Player.prototype.remainingTime = function remainingTime() {
    return this.duration() - this.currentTime();
  };

  // http://dev.w3.org/html5/spec/video.html#dom-media-buffered
  // Buffered returns a timerange object.
  // Kind of like an array of portions of the video that have been downloaded.

  /**
   * Get a TimeRange object with the times of the video that have been downloaded
   *
   * If you just want the percent of the video that's been downloaded,
   * use bufferedPercent.
   *
   *     // Number of different ranges of time have been buffered. Usually 1.
   *     numberOfRanges = bufferedTimeRange.length,
   *
   *     // Time in seconds when the first range starts. Usually 0.
   *     firstRangeStart = bufferedTimeRange.start(0),
   *
   *     // Time in seconds when the first range ends
   *     firstRangeEnd = bufferedTimeRange.end(0),
   *
   *     // Length in seconds of the first time range
   *     firstRangeLength = firstRangeEnd - firstRangeStart;
   *
   * @return {Object} A mock TimeRange object (following HTML spec)
   */

  Player.prototype.buffered = (function (_buffered) {
    function buffered() {
      return _buffered.apply(this, arguments);
    }

    buffered.toString = function () {
      return _buffered.toString();
    };

    return buffered;
  })(function () {
    var buffered = this.techGet('buffered');

    if (!buffered || !buffered.length) {
      buffered = _createTimeRange.createTimeRange(0, 0);
    }

    return buffered;
  });

  /**
   * Get the percent (as a decimal) of the video that's been downloaded
   *
   *     var howMuchIsDownloaded = myPlayer.bufferedPercent();
   *
   * 0 means none, 1 means all.
   * (This method isn't in the HTML5 spec, but it's very convenient)
   *
   * @return {Number} A decimal between 0 and 1 representing the percent
   */

  Player.prototype.bufferedPercent = (function (_bufferedPercent) {
    function bufferedPercent() {
      return _bufferedPercent.apply(this, arguments);
    }

    bufferedPercent.toString = function () {
      return _bufferedPercent.toString();
    };

    return bufferedPercent;
  })(function () {
    return _bufferedPercent2.bufferedPercent(this.buffered(), this.duration());
  });

  /**
   * Get the ending time of the last buffered time range
   *
   * This is used in the progress bar to encapsulate all time ranges.
   * @return {Number} The end of the last buffered time range
   */

  Player.prototype.bufferedEnd = function bufferedEnd() {
    var buffered = this.buffered(),
        duration = this.duration(),
        end = buffered.end(buffered.length - 1);

    if (end > duration) {
      end = duration;
    }

    return end;
  };

  /**
   * Get or set the current volume of the media
   *
   *     // get
   *     var howLoudIsIt = myPlayer.volume();
   *
   *     // set
   *     myPlayer.volume(0.5); // Set volume to half
   *
   * 0 is off (muted), 1.0 is all the way up, 0.5 is half way.
   *
   * @param  {Number} percentAsDecimal The new volume as a decimal percent
   * @return {Number}                  The current volume, when getting
   * @return {Player}              self, when setting
   */

  Player.prototype.volume = function volume(percentAsDecimal) {
    var vol = undefined;

    if (percentAsDecimal !== undefined) {
      vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal))); // Force value to between 0 and 1
      this.cache_.volume = vol;
      this.techCall('setVolume', vol);

      return this;
    }

    // Default to 1 when returning current volume.
    vol = parseFloat(this.techGet('volume'));
    return isNaN(vol) ? 1 : vol;
  };

  /**
   * Get the current muted state, or turn mute on or off
   *
   *     // get
   *     var isVolumeMuted = myPlayer.muted();
   *
   *     // set
   *     myPlayer.muted(true); // mute the volume
   *
   * @param  {Boolean=} muted True to mute, false to unmute
   * @return {Boolean} True if mute is on, false if not, when getting
   * @return {Player} self, when setting mute
   */

  Player.prototype.muted = (function (_muted) {
    function muted(_x4) {
      return _muted.apply(this, arguments);
    }

    muted.toString = function () {
      return _muted.toString();
    };

    return muted;
  })(function (muted) {
    if (muted !== undefined) {
      this.techCall('setMuted', muted);
      return this;
    }
    return this.techGet('muted') || false; // Default to false
  });

  // Check if current tech can support native fullscreen
  // (e.g. with built in controls like iOS, so not our flash swf)

  Player.prototype.supportsFullScreen = function supportsFullScreen() {
    return this.techGet('supportsFullScreen') || false;
  };

  /**
   * Check if the player is in fullscreen mode
   *
   *     // get
   *     var fullscreenOrNot = myPlayer.isFullscreen();
   *
   *     // set
   *     myPlayer.isFullscreen(true); // tell the player it's in fullscreen
   *
   * NOTE: As of the latest HTML5 spec, isFullscreen is no longer an official
   * property and instead document.fullscreenElement is used. But isFullscreen is
   * still a valuable property for internal player workings.
   *
   * @param  {Boolean=} isFS Update the player's fullscreen state
   * @return {Boolean} true if fullscreen, false if not
   * @return {Player} self, when setting
   */

  Player.prototype.isFullscreen = function isFullscreen(isFS) {
    if (isFS !== undefined) {
      this.isFullscreen_ = !!isFS;
      return this;
    }
    return !!this.isFullscreen_;
  };

  /**
   * Old naming for isFullscreen()
   * @deprecated for lowercase 's' version
   */

  Player.prototype.isFullScreen = function isFullScreen(isFS) {
    _log2['default'].warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
    return this.isFullscreen(isFS);
  };

  /**
   * Increase the size of the video to full screen
   *
   *     myPlayer.requestFullscreen();
   *
   * In some browsers, full screen is not supported natively, so it enters
   * "full window mode", where the video fills the browser window.
   * In browsers and devices that support native full screen, sometimes the
   * browser's default controls will be shown, and not the Video.js custom skin.
   * This includes most mobile devices (iOS, Android) and older versions of
   * Safari.
   *
   * @return {Player} self
   */

  Player.prototype.requestFullscreen = function requestFullscreen() {
    var fsApi = _FullscreenApi2['default'];

    this.isFullscreen(true);

    if (fsApi.requestFullscreen) {
      // the browser supports going fullscreen at the element level so we can
      // take the controls fullscreen as well as the video

      // Trigger fullscreenchange event after change
      // We have to specifically add this each time, and remove
      // when canceling fullscreen. Otherwise if there's multiple
      // players on a page, they would all be reacting to the same fullscreen
      // events
      Events.on(_document2['default'], fsApi.fullscreenchange, Fn.bind(this, function documentFullscreenChange(e) {
        this.isFullscreen(_document2['default'][fsApi.fullscreenElement]);

        // If cancelling fullscreen, remove event listener.
        if (this.isFullscreen() === false) {
          Events.off(_document2['default'], fsApi.fullscreenchange, documentFullscreenChange);
        }

        this.trigger('fullscreenchange');
      }));

      this.el_[fsApi.requestFullscreen]();
    } else if (this.tech.supportsFullScreen()) {
      // we can't take the video.js controls fullscreen but we can go fullscreen
      // with native controls
      this.techCall('enterFullScreen');
    } else {
      // fullscreen isn't supported so we'll just stretch the video element to
      // fill the viewport
      this.enterFullWindow();
      this.trigger('fullscreenchange');
    }

    return this;
  };

  /**
   * Old naming for requestFullscreen
   * @deprecated for lower case 's' version
   */

  Player.prototype.requestFullScreen = function requestFullScreen() {
    _log2['default'].warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
    return this.requestFullscreen();
  };

  /**
   * Return the video to its normal size after having been in full screen mode
   *
   *     myPlayer.exitFullscreen();
   *
   * @return {Player} self
   */

  Player.prototype.exitFullscreen = function exitFullscreen() {
    var fsApi = _FullscreenApi2['default'];
    this.isFullscreen(false);

    // Check for browser element fullscreen support
    if (fsApi.requestFullscreen) {
      _document2['default'][fsApi.exitFullscreen]();
    } else if (this.tech.supportsFullScreen()) {
      this.techCall('exitFullScreen');
    } else {
      this.exitFullWindow();
      this.trigger('fullscreenchange');
    }

    return this;
  };

  /**
   * Old naming for exitFullscreen
   * @deprecated for exitFullscreen
   */

  Player.prototype.cancelFullScreen = function cancelFullScreen() {
    _log2['default'].warn('player.cancelFullScreen() has been deprecated, use player.exitFullscreen()');
    return this.exitFullscreen();
  };

  // When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.

  Player.prototype.enterFullWindow = function enterFullWindow() {
    this.isFullWindow = true;

    // Storing original doc overflow value to return to when fullscreen is off
    this.docOrigOverflow = _document2['default'].documentElement.style.overflow;

    // Add listener for esc key to exit fullscreen
    Events.on(_document2['default'], 'keydown', Fn.bind(this, this.fullWindowOnEscKey));

    // Hide any scroll bars
    _document2['default'].documentElement.style.overflow = 'hidden';

    // Apply fullscreen styles
    Dom.addElClass(_document2['default'].body, 'vjs-full-window');

    this.trigger('enterFullWindow');
  };

  Player.prototype.fullWindowOnEscKey = function fullWindowOnEscKey(event) {
    if (event.keyCode === 27) {
      if (this.isFullscreen() === true) {
        this.exitFullscreen();
      } else {
        this.exitFullWindow();
      }
    }
  };

  Player.prototype.exitFullWindow = function exitFullWindow() {
    this.isFullWindow = false;
    Events.off(_document2['default'], 'keydown', this.fullWindowOnEscKey);

    // Unhide scroll bars.
    _document2['default'].documentElement.style.overflow = this.docOrigOverflow;

    // Remove fullscreen styles
    Dom.removeElClass(_document2['default'].body, 'vjs-full-window');

    // Resize the box, controller, and poster to original sizes
    // this.positionAll();
    this.trigger('exitFullWindow');
  };

  Player.prototype.selectSource = function selectSource(sources) {
    // Loop through each playback technology in the options order
    for (var i = 0, j = this.options_.techOrder; i < j.length; i++) {
      var techName = _toTitleCase2['default'](j[i]);
      var tech = _Component3['default'].getComponent(techName);

      // Check if the current tech is defined before continuing
      if (!tech) {
        _log2['default'].error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
        continue;
      }

      // Check if the browser supports this technology
      if (tech.isSupported()) {
        // Loop through each source object
        for (var a = 0, b = sources; a < b.length; a++) {
          var source = b[a];

          // Check if source can be played with this technology
          if (tech.canPlaySource(source)) {
            return { source: source, tech: techName };
          }
        }
      }
    }

    return false;
  };

  /**
   * The source function updates the video source
   *
   * There are three types of variables you can pass as the argument.
   *
   * **URL String**: A URL to the the video file. Use this method if you are sure
   * the current playback technology (HTML5/Flash) can support the source you
   * provide. Currently only MP4 files can be used in both HTML5 and Flash.
   *
   *     myPlayer.src("http://www.example.com/path/to/video.mp4");
   *
   * **Source Object (or element):** A javascript object containing information
   * about the source file. Use this method if you want the player to determine if
   * it can support the file using the type information.
   *
   *     myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
   *
   * **Array of Source Objects:** To provide multiple versions of the source so
   * that it can be played using HTML5 across browsers you can use an array of
   * source objects. Video.js will detect which version is supported and load that
   * file.
   *
   *     myPlayer.src([
   *       { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" },
   *       { type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
   *       { type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
   *     ]);
   *
   * @param  {String|Object|Array=} source The source URL, object, or array of sources
   * @return {String} The current video source when getting
   * @return {String} The player when setting
   */

  Player.prototype.src = function src(source) {
    if (source === undefined) {
      return this.techGet('src');
    }

    var currentTech = _Component3['default'].getComponent(this.techName);

    // case: Array of source objects to choose from and pick the best to play
    if (Array.isArray(source)) {
      this.sourceList_(source);

      // case: URL String (http://myvideo...)
    } else if (typeof source === 'string') {
      // create a source object from the string
      this.src({ src: source });

      // case: Source object { src: '', type: '' ... }
    } else if (source instanceof Object) {
      // check if the source has a type and the loaded tech cannot play the source
      // if there's no type we'll just try the current tech
      if (source.type && !currentTech.canPlaySource(source)) {
        // create a source list with the current source and send through
        // the tech loop to check for a compatible technology
        this.sourceList_([source]);
      } else {
        this.cache_.src = source.src;
        this.currentType_ = source.type || '';

        // wait until the tech is ready to set the source
        this.ready(function () {

          // The setSource tech method was added with source handlers
          // so older techs won't support it
          // We need to check the direct prototype for the case where subclasses
          // of the tech do not support source handlers
          if (currentTech.prototype.hasOwnProperty('setSource')) {
            this.techCall('setSource', source);
          } else {
            this.techCall('src', source.src);
          }

          if (this.options_.preload === 'auto') {
            this.load();
          }

          if (this.options_.autoplay) {
            this.play();
          }
        });
      }
    }

    return this;
  };

  /**
   * Handle an array of source objects
   * @param  {[type]} sources Array of source objects
   * @private
   */

  Player.prototype.sourceList_ = function sourceList_(sources) {
    var sourceTech = this.selectSource(sources);

    if (sourceTech) {
      if (sourceTech.tech === this.techName) {
        // if this technology is already loaded, set the source
        this.src(sourceTech.source);
      } else {
        // load this technology with the chosen source
        this.loadTech(sourceTech.tech, sourceTech.source);
      }
    } else {
      // We need to wrap this in a timeout to give folks a chance to add error event handlers
      this.setTimeout(function () {
        this.error({ code: 4, message: this.localize(this.options().notSupportedMessage) });
      }, 0);

      // we could not find an appropriate tech, but let's still notify the delegate that this is it
      // this needs a better comment about why this is needed
      this.triggerReady();
    }
  };

  /**
   * Begin loading the src data.
   * @return {Player} Returns the player
   */

  Player.prototype.load = function load() {
    this.techCall('load');
    return this;
  };

  /**
   * Returns the fully qualified URL of the current source value e.g. http://mysite.com/video.mp4
   * Can be used in conjuction with `currentType` to assist in rebuilding the current source object.
   * @return {String} The current source
   */

  Player.prototype.currentSrc = function currentSrc() {
    return this.techGet('currentSrc') || this.cache_.src || '';
  };

  /**
   * Get the current source type e.g. video/mp4
   * This can allow you rebuild the current source object so that you could load the same
   * source and tech later
   * @return {String} The source MIME type
   */

  Player.prototype.currentType = function currentType() {
    return this.currentType_ || '';
  };

  /**
   * Get or set the preload attribute.
   * @return {String} The preload attribute value when getting
   * @return {Player} Returns the player when setting
   */

  Player.prototype.preload = function preload(value) {
    if (value !== undefined) {
      this.techCall('setPreload', value);
      this.options_.preload = value;
      return this;
    }
    return this.techGet('preload');
  };

  /**
   * Get or set the autoplay attribute.
   * @return {String} The autoplay attribute value when getting
   * @return {Player} Returns the player when setting
   */

  Player.prototype.autoplay = function autoplay(value) {
    if (value !== undefined) {
      this.techCall('setAutoplay', value);
      this.options_.autoplay = value;
      return this;
    }
    return this.techGet('autoplay', value);
  };

  /**
   * Get or set the loop attribute on the video element.
   * @return {String} The loop attribute value when getting
   * @return {Player} Returns the player when setting
   */

  Player.prototype.loop = function loop(value) {
    if (value !== undefined) {
      this.techCall('setLoop', value);
      this.options_.loop = value;
      return this;
    }
    return this.techGet('loop');
  };

  /**
   * get or set the poster image source url
   *
   * ##### EXAMPLE:
   *
   *     // getting
   *     var currentPoster = myPlayer.poster();
   *
   *     // setting
   *     myPlayer.poster('http://example.com/myImage.jpg');
   *
   * @param  {String=} [src] Poster image source URL
   * @return {String} poster URL when getting
   * @return {Player} self when setting
   */

  Player.prototype.poster = function poster(src) {
    if (src === undefined) {
      return this.poster_;
    }

    // The correct way to remove a poster is to set as an empty string
    // other falsey values will throw errors
    if (!src) {
      src = '';
    }

    // update the internal poster variable
    this.poster_ = src;

    // update the tech's poster
    this.techCall('setPoster', src);

    // alert components that the poster has been set
    this.trigger('posterchange');

    return this;
  };

  /**
   * Get or set whether or not the controls are showing.
   * @param  {Boolean} controls Set controls to showing or not
   * @return {Boolean}    Controls are showing
   */

  Player.prototype.controls = function controls(bool) {
    if (bool !== undefined) {
      bool = !!bool; // force boolean
      // Don't trigger a change event unless it actually changed
      if (this.controls_ !== bool) {
        this.controls_ = bool;

        if (this.usingNativeControls()) {
          this.techCall('setControls', bool);
        }

        if (bool) {
          this.removeClass('vjs-controls-disabled');
          this.addClass('vjs-controls-enabled');
          this.trigger('controlsenabled');

          if (!this.usingNativeControls()) {
            this.addTechControlsListeners();
          }
        } else {
          this.removeClass('vjs-controls-enabled');
          this.addClass('vjs-controls-disabled');
          this.trigger('controlsdisabled');

          if (!this.usingNativeControls()) {
            this.removeTechControlsListeners();
          }
        }
      }
      return this;
    }
    return !!this.controls_;
  };

  /**
   * Toggle native controls on/off. Native controls are the controls built into
   * devices (e.g. default iPhone controls), Flash, or other techs
   * (e.g. Vimeo Controls)
   *
   * **This should only be set by the current tech, because only the tech knows
   * if it can support native controls**
   *
   * @param  {Boolean} bool    True signals that native controls are on
   * @return {Player}      Returns the player
   * @private
   */

  Player.prototype.usingNativeControls = function usingNativeControls(bool) {
    if (bool !== undefined) {
      bool = !!bool; // force boolean
      // Don't trigger a change event unless it actually changed
      if (this.usingNativeControls_ !== bool) {
        this.usingNativeControls_ = bool;
        if (bool) {
          this.addClass('vjs-using-native-controls');

          /**
           * player is using the native device controls
           *
           * @event usingnativecontrols
           * @memberof Player
           * @instance
           * @private
           */
          this.trigger('usingnativecontrols');
        } else {
          this.removeClass('vjs-using-native-controls');

          /**
           * player is using the custom HTML controls
           *
           * @event usingcustomcontrols
           * @memberof Player
           * @instance
           * @private
           */
          this.trigger('usingcustomcontrols');
        }
      }
      return this;
    }
    return !!this.usingNativeControls_;
  };

  /**
   * Set or get the current MediaError
   * @param  {*} err A MediaError or a String/Number to be turned into a MediaError
   * @return {MediaError|null}     when getting
   * @return {Player}              when setting
   */

  Player.prototype.error = function error(err) {
    if (err === undefined) {
      return this.error_ || null;
    }

    // restoring to default
    if (err === null) {
      this.error_ = err;
      this.removeClass('vjs-error');
      return this;
    }

    // error instance
    if (err instanceof _MediaError2['default']) {
      this.error_ = err;
    } else {
      this.error_ = new _MediaError2['default'](err);
    }

    // fire an error event on the player
    this.trigger('error');

    // add the vjs-error classname to the player
    this.addClass('vjs-error');

    // log the name of the error type and any message
    // ie8 just logs "[object object]" if you just log the error object
    _log2['default'].error('(CODE:' + this.error_.code + ' ' + _MediaError2['default'].errorTypes[this.error_.code] + ')', this.error_.message, this.error_);

    return this;
  };

  /**
   * Returns whether or not the player is in the "ended" state.
   * @return {Boolean} True if the player is in the ended state, false if not.
   */

  Player.prototype.ended = function ended() {
    return this.techGet('ended');
  };

  /**
   * Returns whether or not the player is in the "seeking" state.
   * @return {Boolean} True if the player is in the seeking state, false if not.
   */

  Player.prototype.seeking = function seeking() {
    return this.techGet('seeking');
  };

  Player.prototype.reportUserActivity = function reportUserActivity(event) {
    this.userActivity_ = true;
  };

  Player.prototype.userActive = function userActive(bool) {
    if (bool !== undefined) {
      bool = !!bool;
      if (bool !== this.userActive_) {
        this.userActive_ = bool;
        if (bool) {
          // If the user was inactive and is now active we want to reset the
          // inactivity timer
          this.userActivity_ = true;
          this.removeClass('vjs-user-inactive');
          this.addClass('vjs-user-active');
          this.trigger('useractive');
        } else {
          // We're switching the state to inactive manually, so erase any other
          // activity
          this.userActivity_ = false;

          // Chrome/Safari/IE have bugs where when you change the cursor it can
          // trigger a mousemove event. This causes an issue when you're hiding
          // the cursor when the user is inactive, and a mousemove signals user
          // activity. Making it impossible to go into inactive mode. Specifically
          // this happens in fullscreen when we really need to hide the cursor.
          //
          // When this gets resolved in ALL browsers it can be removed
          // https://code.google.com/p/chromium/issues/detail?id=103041
          if (this.tech) {
            this.tech.one('mousemove', function (e) {
              e.stopPropagation();
              e.preventDefault();
            });
          }

          this.removeClass('vjs-user-active');
          this.addClass('vjs-user-inactive');
          this.trigger('userinactive');
        }
      }
      return this;
    }
    return this.userActive_;
  };

  Player.prototype.listenForUserActivity = function listenForUserActivity() {
    var mouseInProgress = undefined,
        lastMoveX = undefined,
        lastMoveY = undefined;

    var handleActivity = Fn.bind(this, this.reportUserActivity);

    var handleMouseMove = function handleMouseMove(e) {
      // #1068 - Prevent mousemove spamming
      // Chrome Bug: https://code.google.com/p/chromium/issues/detail?id=366970
      if (e.screenX !== lastMoveX || e.screenY !== lastMoveY) {
        lastMoveX = e.screenX;
        lastMoveY = e.screenY;
        handleActivity();
      }
    };

    var handleMouseDown = function handleMouseDown() {
      handleActivity();
      // For as long as the they are touching the device or have their mouse down,
      // we consider them active even if they're not moving their finger or mouse.
      // So we want to continue to update that they are active
      this.clearInterval(mouseInProgress);
      // Setting userActivity=true now and setting the interval to the same time
      // as the activityCheck interval (250) should ensure we never miss the
      // next activityCheck
      mouseInProgress = this.setInterval(handleActivity, 250);
    };

    var handleMouseUp = function handleMouseUp(event) {
      handleActivity();
      // Stop the interval that maintains activity if the mouse/touch is down
      this.clearInterval(mouseInProgress);
    };

    // Any mouse movement will be considered user activity
    this.on('mousedown', handleMouseDown);
    this.on('mousemove', handleMouseMove);
    this.on('mouseup', handleMouseUp);

    // Listen for keyboard navigation
    // Shouldn't need to use inProgress interval because of key repeat
    this.on('keydown', handleActivity);
    this.on('keyup', handleActivity);

    // Run an interval every 250 milliseconds instead of stuffing everything into
    // the mousemove/touchmove function itself, to prevent performance degradation.
    // `this.reportUserActivity` simply sets this.userActivity_ to true, which
    // then gets picked up by this loop
    // http://ejohn.org/blog/learning-from-twitter/
    var activityCheck = this.setInterval(function () {
      var inactivityTimeout = undefined;

      // Check to see if mouse/touch activity has happened
      if (this.userActivity_) {
        // Reset the activity tracker
        this.userActivity_ = false;

        // If the user state was inactive, set the state to active
        this.userActive(true);

        // Clear any existing inactivity timeout to start the timer over
        this.clearTimeout(inactivityTimeout);

        var timeout = this.options().inactivityTimeout;
        if (timeout > 0) {
          // In <timeout> milliseconds, if no more activity has occurred the
          // user will be considered inactive
          inactivityTimeout = this.setTimeout(function () {
            // Protect against the case where the inactivityTimeout can trigger just
            // before the next user activity is picked up by the activityCheck loop
            // causing a flicker
            if (!this.userActivity_) {
              this.userActive(false);
            }
          }, timeout);
        }
      }
    }, 250);
  };

  /**
   * Gets or sets the current playback rate.  A playback rate of
   * 1.0 represents normal speed and 0.5 would indicate half-speed
   * playback, for instance.
   * @param  {Number} rate    New playback rate to set.
   * @return {Number}         Returns the new playback rate when setting
   * @return {Number}         Returns the current playback rate when getting
   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-playbackrate
   */

  Player.prototype.playbackRate = function playbackRate(rate) {
    if (rate !== undefined) {
      this.techCall('setPlaybackRate', rate);
      return this;
    }

    if (this.tech && this.tech.featuresPlaybackRate) {
      return this.techGet('playbackRate');
    } else {
      return 1;
    }
  };

  /**
   * Gets or sets the audio flag
   *
   * @param  {Boolean} bool    True signals that this is an audio player.
   * @return {Boolean}         Returns true if player is audio, false if not when getting
   * @return {Player}      Returns the player if setting
   * @private
   */

  Player.prototype.isAudio = function isAudio(bool) {
    if (bool !== undefined) {
      this.isAudio_ = !!bool;
      return this;
    }

    return !!this.isAudio_;
  };

  /**
   * Returns the current state of network activity for the element, from
   * the codes in the list below.
   * - NETWORK_EMPTY (numeric value 0)
   *   The element has not yet been initialised. All attributes are in
   *   their initial states.
   * - NETWORK_IDLE (numeric value 1)
   *   The element's resource selection algorithm is active and has
   *   selected a resource, but it is not actually using the network at
   *   this time.
   * - NETWORK_LOADING (numeric value 2)
   *   The user agent is actively trying to download data.
   * - NETWORK_NO_SOURCE (numeric value 3)
   *   The element's resource selection algorithm is active, but it has
   *   not yet found a resource to use.
   * @return {Number} the current network activity state
   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#network-states
   */

  Player.prototype.networkState = function networkState() {
    return this.techGet('networkState');
  };

  /**
   * Returns a value that expresses the current state of the element
   * with respect to rendering the current playback position, from the
   * codes in the list below.
   * - HAVE_NOTHING (numeric value 0)
   *   No information regarding the media resource is available.
   * - HAVE_METADATA (numeric value 1)
   *   Enough of the resource has been obtained that the duration of the
   *   resource is available.
   * - HAVE_CURRENT_DATA (numeric value 2)
   *   Data for the immediate current playback position is available.
   * - HAVE_FUTURE_DATA (numeric value 3)
   *   Data for the immediate current playback position is available, as
   *   well as enough data for the user agent to advance the current
   *   playback position in the direction of playback.
   * - HAVE_ENOUGH_DATA (numeric value 4)
   *   The user agent estimates that enough data is available for
   *   playback to proceed uninterrupted.
   * @return {Number} the current playback rendering state
   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-readystate
   */

  Player.prototype.readyState = function readyState() {
    return this.techGet('readyState');
  };

  /**
   * Text tracks are tracks of timed text events.
   * Captions - text displayed over the video for the hearing impaired
   * Subtitles - text displayed over the video for those who don't understand language in the video
   * Chapters - text displayed in a menu allowing the user to jump to particular points (chapters) in the video
   * Descriptions (not supported yet) - audio descriptions that are read back to the user by a screen reading device
   */

  /**
   * Get an array of associated text tracks. captions, subtitles, chapters, descriptions
   * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks
   * @return {Array}           Array of track objects
   */

  Player.prototype.textTracks = function textTracks() {
    // cannot use techGet directly because it checks to see whether the tech is ready.
    // Flash is unlikely to be ready in time but textTracks should still work.
    return this.tech && this.tech.textTracks();
  };

  Player.prototype.remoteTextTracks = function remoteTextTracks() {
    return this.tech && this.tech.remoteTextTracks();
  };

  /**
   * Add a text track
   * In addition to the W3C settings we allow adding additional info through options.
   * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
   * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata
   * @param {String=} label       Optional label
   * @param {String=} language    Optional language
   */

  Player.prototype.addTextTrack = function addTextTrack(kind, label, language) {
    return this.tech && this.tech.addTextTrack(kind, label, language);
  };

  Player.prototype.addRemoteTextTrack = function addRemoteTextTrack(options) {
    return this.tech && this.tech.addRemoteTextTrack(options);
  };

  Player.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
    this.tech && this.tech.removeRemoteTextTrack(track);
  };

  Player.prototype.videoWidth = function videoWidth() {
    return this.tech && this.tech.videoWidth && this.tech.videoWidth() || 0;
  };

  Player.prototype.videoHeight = function videoHeight() {
    return this.tech && this.tech.videoHeight && this.tech.videoHeight() || 0;
  };

  // Methods to add support for
  // initialTime: function(){ return this.techCall('initialTime'); },
  // startOffsetTime: function(){ return this.techCall('startOffsetTime'); },
  // played: function(){ return this.techCall('played'); },
  // seekable: function(){ return this.techCall('seekable'); },
  // videoTracks: function(){ return this.techCall('videoTracks'); },
  // audioTracks: function(){ return this.techCall('audioTracks'); },
  // defaultPlaybackRate: function(){ return this.techCall('defaultPlaybackRate'); },
  // mediaGroup: function(){ return this.techCall('mediaGroup'); },
  // controller: function(){ return this.techCall('controller'); },
  // defaultMuted: function(){ return this.techCall('defaultMuted'); }

  // TODO
  // currentSrcList: the array of sources including other formats and bitrates
  // playList: array of source lists in order of playback

  /**
   * The player's language code
   *
   * NOTE: The language should be set in the player options if you want the
   * the controls to be built with a specific language. Changing the lanugage
   * later will not update controls text.
   *
   * @param {String} code  The locale string
   * @return {String}      The locale string when getting
   * @return {Player}      self, when setting
   */

  Player.prototype.language = function language(code) {
    if (code === undefined) {
      return this.language_;
    }

    this.language_ = ('' + code).toLowerCase();
    return this;
  };

  /**
   * Get the player's language dictionary
   * Merge every time, because a newly added plugin might call videojs.addLanguage() at any time
   * Languages specified directly in the player options have precedence
   */

  Player.prototype.languages = function languages() {
    return _mergeOptions2['default'](_globalOptions2['default'].languages, this.languages_);
  };

  Player.prototype.toJSON = function toJSON() {
    var options = _mergeOptions2['default'](this.options());
    var tracks = options.tracks;

    options.tracks = [];

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      // deep merge tracks and null out player so no circular references
      track = _mergeOptions2['default'](track);
      track.player = undefined;
      options.tracks[i] = track;
    }

    return options;
  };

  Player.getTagSettings = function getTagSettings(tag) {
    var baseOptions = {
      sources: [],
      tracks: []
    };

    var tagOptions = Dom.getElAttributes(tag);
    var dataSetup = tagOptions['data-setup'];

    // Check if data-setup attr exists.
    if (dataSetup !== null) {
      // Parse options JSON
      // If empty string, make it a parsable json object.

      var _safeParseTuple = _safeParseTuple3['default'](dataSetup || '{}');

      var err = _safeParseTuple[0];
      var data = _safeParseTuple[1];

      if (err) {
        _log2['default'].error(err);
      }
      _assign2['default'](tagOptions, data);
    }

    _assign2['default'](baseOptions, tagOptions);

    // Get tag children settings
    if (tag.hasChildNodes()) {
      var children = tag.childNodes;

      for (var i = 0, j = children.length; i < j; i++) {
        var child = children[i];
        // Change case needed: http://ejohn.org/blog/nodename-case-sensitivity/
        var childName = child.nodeName.toLowerCase();
        if (childName === 'source') {
          baseOptions.sources.push(Dom.getElAttributes(child));
        } else if (childName === 'track') {
          baseOptions.tracks.push(Dom.getElAttributes(child));
        }
      }
    }

    return baseOptions;
  };

  return Player;
})(_Component3['default']);

/**
 * Global player list
 * @type {Object}
 */
Player.players = {};

/**
 * Player instance options, surfaced using options
 * options = Player.prototype.options_
 * Make changes in options, not here.
 * All options should use string keys so they avoid
 * renaming by closure compiler
 * @type {Object}
 * @private
 */
Player.prototype.options_ = _globalOptions2['default'];

/**
 * Fired when the player has initial duration and dimension information
 * @event loadedmetadata
 */
Player.prototype.handleLoadedMetaData;

/**
 * Fired when the player has downloaded data at the current playback position
 * @event loadeddata
 */
Player.prototype.handleLoadedData;

/**
 * Fired when the player has finished downloading the source data
 * @event loadedalldata
 */
Player.prototype.handleLoadedAllData;

/**
 * Fired when the user is active, e.g. moves the mouse over the player
 * @event useractive
 */
Player.prototype.handleUserActive;

/**
 * Fired when the user is inactive, e.g. a short delay after the last mouse move or control interaction
 * @event userinactive
 */
Player.prototype.handleUserInactive;

/**
 * Fired when the current playback position has changed
 *
 * During playback this is fired every 15-250 milliseconds, depending on the
 * playback technology in use.
 * @event timeupdate
 */
Player.prototype.handleTimeUpdate;

/**
 * Fired when the volume changes
 * @event volumechange
 */
Player.prototype.handleVolumeChange;

/**
 * Fired when an error occurs
 * @event error
 */
Player.prototype.handleError;

Player.prototype.flexNotSupported_ = function () {
  var elem = _document2['default'].createElement('i');

  return !('flexBasis' in elem.style || 'webkitFlexBasis' in elem.style || 'mozFlexBasis' in elem.style || 'msFlexBasis' in elem.style);
};

_Component3['default'].registerComponent('Player', Player);
exports['default'] = Player;
module.exports = exports['default'];

},{"./big-play-button.js":50,"./component.js":52,"./control-bar/control-bar.js":53,"./error-display.js":82,"./fullscreen-api.js":85,"./global-options.js":86,"./loading-spinner.js":87,"./media-error.js":88,"./poster-image.js":94,"./tech/html5.js":99,"./tech/loader.js":100,"./tracks/text-track-display.js":103,"./tracks/text-track-settings.js":106,"./utils/browser.js":108,"./utils/buffer.js":109,"./utils/dom.js":110,"./utils/events.js":111,"./utils/fn.js":112,"./utils/guid.js":114,"./utils/log.js":115,"./utils/merge-options.js":116,"./utils/time-ranges.js":118,"./utils/to-title-case.js":119,"global/document":1,"global/window":2,"object.assign":44,"safe-json-parse/tuple":49}],93:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _Player = _dereq_('./player.js');

var _Player2 = _interopRequireWildcard(_Player);

/**
 * The method for registering a video.js plugin
 *
 * @param  {String} name The name of the plugin
 * @param  {Function} init The function that is run when the player inits
 */
var plugin = function plugin(name, init) {
  _Player2['default'].prototype[name] = init;
};

exports['default'] = plugin;
module.exports = exports['default'];

},{"./player.js":92}],94:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Button2 = _dereq_('./button.js');

var _Button3 = _interopRequireWildcard(_Button2);

var _Component = _dereq_('./component.js');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('./utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _import2 = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./utils/browser.js');

var browser = _interopRequireWildcard(_import3);

/* Poster Image
================================================================================ */
/**
 * The component that handles showing the poster image.
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var PosterImage = (function (_Button) {
  function PosterImage(player, options) {
    _classCallCheck(this, PosterImage);

    _Button.call(this, player, options);

    this.update();
    player.on('posterchange', Fn.bind(this, this.update));
  }

  _inherits(PosterImage, _Button);

  /**
   * Clean up the poster image
   */

  PosterImage.prototype.dispose = function dispose() {
    this.player().off('posterchange', this.update);
    _Button.prototype.dispose.call(this);
  };

  /**
   * Create the poster image element
   * @return {Element}
   */

  PosterImage.prototype.createEl = function createEl() {
    var el = Dom.createEl('div', {
      className: 'vjs-poster',

      // Don't want poster to be tabbable.
      tabIndex: -1
    });

    // To ensure the poster image resizes while maintaining its original aspect
    // ratio, use a div with `background-size` when available. For browsers that
    // do not support `background-size` (e.g. IE8), fall back on using a regular
    // img element.
    if (!browser.BACKGROUND_SIZE_SUPPORTED) {
      this.fallbackImg_ = Dom.createEl('img');
      el.appendChild(this.fallbackImg_);
    }

    return el;
  };

  /**
   * Event handler for updates to the player's poster source
   */

  PosterImage.prototype.update = function update() {
    var url = this.player().poster();

    this.setSrc(url);

    // If there's no poster source we should display:none on this component
    // so it's not still clickable or right-clickable
    if (url) {
      this.show();
    } else {
      this.hide();
    }
  };

  /**
   * Set the poster source depending on the display method
   */

  PosterImage.prototype.setSrc = function setSrc(url) {
    if (this.fallbackImg_) {
      this.fallbackImg_.src = url;
    } else {
      var backgroundImage = '';
      // Any falsey values should stay as an empty string, otherwise
      // this will throw an extra error
      if (url) {
        backgroundImage = 'url("' + url + '")';
      }

      this.el_.style.backgroundImage = backgroundImage;
    }
  };

  /**
   * Event handler for clicks on the poster image
   */

  PosterImage.prototype.handleClick = function handleClick() {
    // We don't want a click to trigger playback when controls are disabled
    // but CSS should be hiding the poster to prevent that from happening
    if (this.player_.paused()) {
      this.player_.play();
    } else {
      this.player_.pause();
    }
  };

  return PosterImage;
})(_Button3['default']);

_Component2['default'].registerComponent('PosterImage', PosterImage);
exports['default'] = PosterImage;
module.exports = exports['default'];

},{"./button.js":51,"./component.js":52,"./utils/browser.js":108,"./utils/dom.js":110,"./utils/fn.js":112}],95:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = _dereq_('./utils/events.js');

var Events = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _windowLoaded = false;
var videojs = undefined;

/**
 * @fileoverview Functions for automatically setting up a player
 * based on the data-setup attribute of the video tag
 */

// Automatically set up any tags that have a data-setup attribute
var autoSetup = function autoSetup() {
  // One day, when we stop supporting IE8, go back to this, but in the meantime...*hack hack hack*
  // var vids = Array.prototype.slice.call(document.getElementsByTagName('video'));
  // var audios = Array.prototype.slice.call(document.getElementsByTagName('audio'));
  // var mediaEls = vids.concat(audios);

  // Because IE8 doesn't support calling slice on a node list, we need to loop through each list of elements
  // to build up a new, combined list of elements.
  var vids = _document2['default'].getElementsByTagName('video');
  var audios = _document2['default'].getElementsByTagName('audio');
  var mediaEls = [];
  if (vids && vids.length > 0) {
    for (var i = 0, e = vids.length; i < e; i++) {
      mediaEls.push(vids[i]);
    }
  }
  if (audios && audios.length > 0) {
    for (var i = 0, e = audios.length; i < e; i++) {
      mediaEls.push(audios[i]);
    }
  }

  // Check if any media elements exist
  if (mediaEls && mediaEls.length > 0) {

    for (var i = 0, e = mediaEls.length; i < e; i++) {
      var mediaEl = mediaEls[i];

      // Check if element exists, has getAttribute func.
      // IE seems to consider typeof el.getAttribute == 'object' instead of 'function' like expected, at least when loading the player immediately.
      if (mediaEl && mediaEl.getAttribute) {

        // Make sure this player hasn't already been set up.
        if (mediaEl.player === undefined) {
          var options = mediaEl.getAttribute('data-setup');

          // Check if data-setup attr exists.
          // We only auto-setup if they've added the data-setup attr.
          if (options !== null) {
            // Create new video.js instance.
            var player = videojs(mediaEl);
          }
        }

        // If getAttribute isn't defined, we need to wait for the DOM.
      } else {
        autoSetupTimeout(1);
        break;
      }
    }

    // No videos were found, so keep looping unless page is finished loading.
  } else if (!_windowLoaded) {
    autoSetupTimeout(1);
  }
};

// Pause to let the DOM keep processing
var autoSetupTimeout = function autoSetupTimeout(wait, vjs) {
  videojs = vjs;
  setTimeout(autoSetup, wait);
};

if (_document2['default'].readyState === 'complete') {
  _windowLoaded = true;
} else {
  Events.one(_window2['default'], 'load', function () {
    _windowLoaded = true;
  });
}

var hasLoaded = function hasLoaded() {
  return _windowLoaded;
};

exports.autoSetup = autoSetup;
exports.autoSetupTimeout = autoSetupTimeout;
exports.hasLoaded = hasLoaded;

},{"./utils/events.js":111,"global/document":1,"global/window":2}],96:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component.js');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _roundFloat = _dereq_('../utils/round-float.js');

var _roundFloat2 = _interopRequireWildcard(_roundFloat);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

/* Slider
================================================================================ */
/**
 * The base functionality for sliders like the volume bar and seek bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */

var Slider = (function (_Component) {
  function Slider(player, options) {
    _classCallCheck(this, Slider);

    _Component.call(this, player, options);

    // Set property names to bar and handle to match with the child Slider class is looking for
    this.bar = this.getChild(this.options_.barName);
    this.handle = this.getChild(this.options_.handleName);

    // Set a horizontal or vertical class on the slider depending on the slider type
    this.vertical(!!this.options().vertical);

    this.on('mousedown', this.handleMouseDown);
    this.on('touchstart', this.handleMouseDown);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
    this.on('click', this.handleClick);

    this.on(player, 'controlsvisible', this.update);
    this.on(player, this.playerEvent, this.update);
  }

  _inherits(Slider, _Component);

  Slider.prototype.createEl = function createEl(type) {
    var props = arguments[1] === undefined ? {} : arguments[1];

    // Add the slider element class to all sub classes
    props.className = props.className + ' vjs-slider';
    props = _assign2['default']({
      role: 'slider',
      'aria-valuenow': 0,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      tabIndex: 0
    }, props);

    return _Component.prototype.createEl.call(this, type, props);
  };

  Slider.prototype.handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    Dom.blockTextSelection();
    this.addClass('vjs-sliding');

    this.on(_document2['default'], 'mousemove', this.handleMouseMove);
    this.on(_document2['default'], 'mouseup', this.handleMouseUp);
    this.on(_document2['default'], 'touchmove', this.handleMouseMove);
    this.on(_document2['default'], 'touchend', this.handleMouseUp);

    this.handleMouseMove(event);
  };

  // To be overridden by a subclass

  Slider.prototype.handleMouseMove = function handleMouseMove() {};

  Slider.prototype.handleMouseUp = function handleMouseUp() {
    Dom.unblockTextSelection();
    this.removeClass('vjs-sliding');

    this.off(_document2['default'], 'mousemove', this.handleMouseMove);
    this.off(_document2['default'], 'mouseup', this.handleMouseUp);
    this.off(_document2['default'], 'touchmove', this.handleMouseMove);
    this.off(_document2['default'], 'touchend', this.handleMouseUp);

    this.update();
  };

  Slider.prototype.update = function update() {
    // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
    // execution stack. The player is destroyed before then update will cause an error
    if (!this.el_) {
      return;
    } // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
    // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
    // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();
    var progress = this.getPercent();
    var bar = this.bar;

    // If there's no bar...
    if (!bar) {
      return;
    } // Protect against no duration and other division issues
    if (typeof progress !== 'number' || progress !== progress || progress < 0 || progress === Infinity) {
      progress = 0;
    }

    // Convert to a percentage for setting
    var percentage = _roundFloat2['default'](progress * 100, 2) + '%';

    // Set the new bar width or height
    if (this.vertical()) {
      bar.el().style.height = percentage;
    } else {
      bar.el().style.width = percentage;
    }
  };

  Slider.prototype.calculateDistance = function calculateDistance(event) {
    var el = this.el_;
    var box = Dom.findElPosition(el);
    var boxW = el.offsetWidth;
    var boxH = el.offsetHeight;
    var handle = this.handle;

    if (this.options().vertical) {
      var boxY = box.top;

      var pageY = undefined;
      if (event.changedTouches) {
        pageY = event.changedTouches[0].pageY;
      } else {
        pageY = event.pageY;
      }

      if (handle) {
        var handleH = handle.el().offsetHeight;
        // Adjusted X and Width, so handle doesn't go outside the bar
        boxY = boxY + handleH / 2;
        boxH = boxH - handleH;
      }

      // Percent that the click is through the adjusted area
      return Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
    } else {
      var boxX = box.left;

      var pageX = undefined;
      if (event.changedTouches) {
        pageX = event.changedTouches[0].pageX;
      } else {
        pageX = event.pageX;
      }

      if (handle) {
        var handleW = handle.el().offsetWidth;

        // Adjusted X and Width, so handle doesn't go outside the bar
        boxX = boxX + handleW / 2;
        boxW = boxW - handleW;
      }

      // Percent that the click is through the adjusted area
      return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
    }
  };

  Slider.prototype.handleFocus = function handleFocus() {
    this.on(_document2['default'], 'keydown', this.handleKeyPress);
  };

  Slider.prototype.handleKeyPress = function handleKeyPress(event) {
    if (event.which === 37 || event.which === 40) {
      // Left and Down Arrows
      event.preventDefault();
      this.stepBack();
    } else if (event.which === 38 || event.which === 39) {
      // Up and Right Arrows
      event.preventDefault();
      this.stepForward();
    }
  };

  Slider.prototype.handleBlur = function handleBlur() {
    this.off(_document2['default'], 'keydown', this.handleKeyPress);
  };

  /**
   * Listener for click events on slider, used to prevent clicks
   *   from bubbling up to parent elements like button menus.
   * @param  {Object} event Event object
   */

  Slider.prototype.handleClick = function handleClick(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
  };

  Slider.prototype.vertical = function vertical(bool) {
    if (bool === undefined) {
      return this.vertical_ || false;
    }

    this.vertical_ = !!bool;

    if (this.vertical_) {
      this.addClass('vjs-slider-vertical');
    } else {
      this.addClass('vjs-slider-horizontal');
    }

    return this;
  };

  return Slider;
})(_Component3['default']);

_Component3['default'].registerComponent('Slider', Slider);
exports['default'] = Slider;
module.exports = exports['default'];

},{"../component.js":52,"../utils/dom.js":110,"../utils/round-float.js":117,"global/document":1,"object.assign":44}],97:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
function FlashRtmpDecorator(Flash) {
  Flash.streamingFormats = {
    'rtmp/mp4': 'MP4',
    'rtmp/flv': 'FLV'
  };

  Flash.streamFromParts = function (connection, stream) {
    return connection + '&' + stream;
  };

  Flash.streamToParts = function (src) {
    var parts = {
      connection: '',
      stream: ''
    };

    if (!src) return parts;

    // Look for the normal URL separator we expect, '&'.
    // If found, we split the URL into two pieces around the
    // first '&'.
    var connEnd = src.indexOf('&');
    var streamBegin = undefined;
    if (connEnd !== -1) {
      streamBegin = connEnd + 1;
    } else {
      // If there's not a '&', we use the last '/' as the delimiter.
      connEnd = streamBegin = src.lastIndexOf('/') + 1;
      if (connEnd === 0) {
        // really, there's not a '/'?
        connEnd = streamBegin = src.length;
      }
    }
    parts.connection = src.substring(0, connEnd);
    parts.stream = src.substring(streamBegin, src.length);

    return parts;
  };

  Flash.isStreamingType = function (srcType) {
    return srcType in Flash.streamingFormats;
  };

  // RTMP has four variations, any string starting
  // with one of these protocols should be valid
  Flash.RTMP_RE = /^rtmp[set]?:\/\//i;

  Flash.isStreamingSrc = function (src) {
    return Flash.RTMP_RE.test(src);
  };

  /**
   * A source handler for RTMP urls
   * @type {Object}
   */
  Flash.rtmpSourceHandler = {};

  /**
   * Check Flash can handle the source natively
   * @param  {Object} source  The source object
   * @return {String}         'probably', 'maybe', or '' (empty string)
   */
  Flash.rtmpSourceHandler.canHandleSource = function (source) {
    if (Flash.isStreamingType(source.type) || Flash.isStreamingSrc(source.src)) {
      return 'maybe';
    }

    return '';
  };

  /**
   * Pass the source to the flash object
   * Adaptive source handlers will have more complicated workflows before passing
   * video data to the video element
   * @param  {Object} source    The source object
   * @param  {Flash} tech   The instance of the Flash tech
   */
  Flash.rtmpSourceHandler.handleSource = function (source, tech) {
    var srcParts = Flash.streamToParts(source.src);

    tech.setRtmpConnection(srcParts.connection);
    tech.setRtmpStream(srcParts.stream);
  };

  // Register the native source handler
  Flash.registerSourceHandler(Flash.rtmpSourceHandler);

  return Flash;
}

exports['default'] = FlashRtmpDecorator;
module.exports = exports['default'];

},{}],98:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
/**
 * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API
 * https://github.com/zencoder/video-js-swf
 * Not using setupTriggers. Using global onEvent func to distribute events
 */

var _Tech2 = _dereq_('./tech');

var _Tech3 = _interopRequireWildcard(_Tech2);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/url.js');

var Url = _interopRequireWildcard(_import2);

var _createTimeRange = _dereq_('../utils/time-ranges.js');

var _FlashRtmpDecorator = _dereq_('./flash-rtmp');

var _FlashRtmpDecorator2 = _interopRequireWildcard(_FlashRtmpDecorator);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireWildcard(_Component);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

var navigator = _window2['default'].navigator;
/**
 * Flash Media Controller - Wrapper for fallback SWF API
 *
 * @param {Player} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */

var Flash = (function (_Tech) {
  function Flash(options, ready) {
    _classCallCheck(this, Flash);

    _Tech.call(this, options, ready);

    // If source was supplied pass as a flash var.
    if (options.source) {
      this.ready(function () {
        this.setSource(options.source);
      });
    }

    // Having issues with Flash reloading on certain page actions (hide/resize/fullscreen) in certain browsers
    // This allows resetting the playhead when we catch the reload
    if (options.startTime) {
      this.ready(function () {
        this.load();
        this.play();
        this.currentTime(options.startTime);
      });
    }

    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons
    _window2['default'].videojs = _window2['default'].videojs || {};
    _window2['default'].videojs.Flash = _window2['default'].videojs.Flash || {};
    _window2['default'].videojs.Flash.onReady = Flash.onReady;
    _window2['default'].videojs.Flash.onEvent = Flash.onEvent;
    _window2['default'].videojs.Flash.onError = Flash.onError;
  }

  _inherits(Flash, _Tech);

  Flash.prototype.createEl = function createEl() {
    var options = this.options();

    // Generate ID for swf object
    var objId = options.techId;

    // Merge default flashvars with ones passed in to init
    var flashVars = _assign2['default']({

      // SWF Callback Functions
      readyFunction: 'videojs.Flash.onReady',
      eventProxyFunction: 'videojs.Flash.onEvent',
      errorEventProxyFunction: 'videojs.Flash.onError',

      // Player Settings
      autoplay: options.autoplay,
      preload: options.preload,
      loop: options.loop,
      muted: options.muted

    }, options.flashVars);

    // Merge default parames with ones passed in
    var params = _assign2['default']({
      wmode: 'opaque', // Opaque is needed to overlay controls, but can affect playback performance
      bgcolor: '#000000' // Using bgcolor prevents a white flash when the object is loading
    }, options.params);

    // Merge default attributes with ones passed in
    var attributes = _assign2['default']({
      id: objId,
      name: objId, // Both ID and Name needed or swf to identify itself
      'class': 'vjs-tech'
    }, options.attributes);

    this.el_ = Flash.embed(options.swf, flashVars, params, attributes);
    this.el_.tech = this;

    return this.el_;
  };

  Flash.prototype.play = function play() {
    this.el_.vjs_play();
  };

  Flash.prototype.pause = function pause() {
    this.el_.vjs_pause();
  };

  Flash.prototype.src = (function (_src) {
    function src(_x) {
      return _src.apply(this, arguments);
    }

    src.toString = function () {
      return _src.toString();
    };

    return src;
  })(function (src) {
    if (src === undefined) {
      return this.currentSrc();
    }

    // Setting src through `src` not `setSrc` will be deprecated
    return this.setSrc(src);
  });

  Flash.prototype.setSrc = function setSrc(src) {
    // Make sure source URL is absolute.
    src = Url.getAbsoluteURL(src);
    this.el_.vjs_src(src);

    // Currently the SWF doesn't autoplay if you load a source later.
    // e.g. Load player w/ no source, wait 2s, set src.
    if (this.autoplay()) {
      var tech = this;
      this.setTimeout(function () {
        tech.play();
      }, 0);
    }
  };

  Flash.prototype.setCurrentTime = function setCurrentTime(time) {
    this.lastSeekTarget_ = time;
    this.el_.vjs_setProperty('currentTime', time);
    _Tech.prototype.setCurrentTime.call(this);
  };

  Flash.prototype.currentTime = function currentTime(time) {
    // when seeking make the reported time keep up with the requested time
    // by reading the time we're seeking to
    if (this.seeking()) {
      return this.lastSeekTarget_ || 0;
    }
    return this.el_.vjs_getProperty('currentTime');
  };

  Flash.prototype.currentSrc = function currentSrc() {
    if (this.currentSource_) {
      return this.currentSource_.src;
    } else {
      return this.el_.vjs_getProperty('currentSrc');
    }
  };

  Flash.prototype.load = function load() {
    this.el_.vjs_load();
  };

  Flash.prototype.poster = function poster() {
    this.el_.vjs_getProperty('poster');
  };

  // poster images are not handled by the Flash tech so make this a no-op

  Flash.prototype.setPoster = function setPoster() {};

  Flash.prototype.buffered = function buffered() {
    return _createTimeRange.createTimeRange(0, this.el_.vjs_getProperty('buffered'));
  };

  Flash.prototype.supportsFullScreen = function supportsFullScreen() {
    return false; // Flash does not allow fullscreen through javascript
  };

  Flash.prototype.enterFullScreen = function enterFullScreen() {
    return false;
  };

  return Flash;
})(_Tech3['default']);

// Create setters and getters for attributes
var _api = Flash.prototype;
var _readWrite = 'rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(',');
var _readOnly = 'error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight'.split(',');

function _createSetter(attr) {
  var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
  _api['set' + attrUpper] = function (val) {
    return this.el_.vjs_setProperty(attr, val);
  };
}
function _createGetter(attr) {
  _api[attr] = function () {
    return this.el_.vjs_getProperty(attr);
  };
}

// Create getter and setters for all read/write attributes
for (var i = 0; i < _readWrite.length; i++) {
  _createGetter(_readWrite[i]);
  _createSetter(_readWrite[i]);
}

// Create getters for read-only attributes
for (var i = 0; i < _readOnly.length; i++) {
  _createGetter(_readOnly[i]);
}

/* Flash Support Testing -------------------------------------------------------- */

Flash.isSupported = function () {
  return Flash.version()[0] >= 10;
  // return swfobject.hasFlashPlayerVersion('10');
};

// Add Source Handler pattern functions to this tech
_Tech3['default'].withSourceHandlers(Flash);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Flash.nativeSourceHandler = {};

/**
 * Check Flash can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Flash.nativeSourceHandler.canHandleSource = function (source) {
  var type;

  function guessMimeType(src) {
    var ext = Url.getFileExtension(src);
    if (ext) {
      return 'video/' + ext;
    }
    return '';
  }

  if (!source.type) {
    type = guessMimeType(source.src);
  } else {
    // Strip code information from the type because we don't get that specific
    type = source.type.replace(/;.*/, '').toLowerCase();
  }

  if (type in Flash.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Flash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.setSrc(source.src);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Flash.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Flash.registerSourceHandler(Flash.nativeSourceHandler);

Flash.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV',
  'video/mp4': 'MP4',
  'video/m4v': 'MP4'
};

Flash.onReady = function (currSwf) {
  var el = Dom.getEl(currSwf);
  var tech = el && el.tech;

  // if there is no el then the tech has been disposed
  // and the tech element was removed from the player div
  if (tech && tech.el()) {
    // check that the flash object is really ready
    Flash.checkReady(tech);
  }
};

// The SWF isn't always ready when it says it is. Sometimes the API functions still need to be added to the object.
// If it's not ready, we set a timeout to check again shortly.
Flash.checkReady = function (tech) {
  // stop worrying if the tech has been disposed
  if (!tech.el()) {
    return;
  }

  // check if API property exists
  if (tech.el().vjs_getProperty) {
    // tell tech it's ready
    tech.triggerReady();
  } else {
    // wait longer
    this.setTimeout(function () {
      Flash.checkReady(tech);
    }, 50);
  }
};

// Trigger events from the swf on the player
Flash.onEvent = function (swfID, eventName) {
  var tech = Dom.getEl(swfID).tech;
  tech.trigger(eventName);
};

// Log errors from the swf
Flash.onError = function (swfID, err) {
  var tech = Dom.getEl(swfID).tech;
  var msg = 'FLASH: ' + err;

  if (err === 'srcnotfound') {
    tech.trigger('error', { code: 4, message: msg });

    // errors we haven't categorized into the media errors
  } else {
    tech.trigger('error', msg);
  }
};

// Flash Version Check
Flash.version = function () {
  var version = '0,0,0';

  // IE
  try {
    version = new _window2['default'].ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];

    // other browsers
  } catch (e) {
    try {
      if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
        version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
      }
    } catch (err) {}
  }
  return version.split(',');
};

// Flash embedding method. Only used in non-iframe mode
Flash.embed = function (swf, flashVars, params, attributes) {
  var code = Flash.getEmbedCode(swf, flashVars, params, attributes);

  // Get element by embedding code and retrieving created element
  var obj = Dom.createEl('div', { innerHTML: code }).childNodes[0];

  return obj;
};

Flash.getEmbedCode = function (swf, flashVars, params, attributes) {
  var objTag = '<object type="application/x-shockwave-flash" ';
  var flashVarsString = '';
  var paramsString = '';
  var attrsString = '';

  // Convert flash vars to string
  if (flashVars) {
    Object.getOwnPropertyNames(flashVars).forEach(function (key) {
      flashVarsString += '' + key + '=' + flashVars[key] + '&amp;';
    });
  }

  // Add swf, flashVars, and other default params
  params = _assign2['default']({
    movie: swf,
    flashvars: flashVarsString,
    allowScriptAccess: 'always', // Required to talk to swf
    allowNetworking: 'all' // All should be default, but having security issues.
  }, params);

  // Create param tags string
  Object.getOwnPropertyNames(params).forEach(function (key) {
    paramsString += '<param name="' + key + '" value="' + params[key] + '" />';
  });

  attributes = _assign2['default']({
    // Add swf to attributes (need both for IE and Others to work)
    data: swf,

    // Default to 100% width/height
    width: '100%',
    height: '100%'

  }, attributes);

  // Create Attributes string
  Object.getOwnPropertyNames(attributes).forEach(function (key) {
    attrsString += '' + key + '="' + attributes[key] + '" ';
  });

  return '' + objTag + '' + attrsString + '>' + paramsString + '</object>';
};

// Run Flash through the RTMP decorator
_FlashRtmpDecorator2['default'](Flash);

_Component2['default'].registerComponent('Flash', Flash);
exports['default'] = Flash;
module.exports = exports['default'];

},{"../component":52,"../utils/dom.js":110,"../utils/time-ranges.js":118,"../utils/url.js":120,"./flash-rtmp":97,"./tech":101,"global/window":2,"object.assign":44}],99:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
/**
 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
 */

var _Tech2 = _dereq_('./tech.js');

var _Tech3 = _interopRequireWildcard(_Tech2);

var _Component = _dereq_('../component');

var _Component2 = _interopRequireWildcard(_Component);

var _import = _dereq_('../utils/dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/url.js');

var Url = _interopRequireWildcard(_import2);

var _import3 = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import3);

var _log = _dereq_('../utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _import4 = _dereq_('../utils/browser.js');

var browser = _interopRequireWildcard(_import4);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

var _mergeOptions = _dereq_('../utils/merge-options.js');

var _mergeOptions2 = _interopRequireWildcard(_mergeOptions);

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */

var Html5 = (function (_Tech) {
  function Html5(options, ready) {
    _classCallCheck(this, Html5);

    _Tech.call(this, options, ready);

    var source = options.source;

    // Set the source if one is provided
    // 1) Check if the source is new (if not, we want to keep the original so playback isn't interrupted)
    // 2) Check to see if the network state of the tag was failed at init, and if so, reset the source
    // anyway so the error gets fired.
    if (source && (this.el_.currentSrc !== source.src || options.tag && options.tag.initNetworkState_ === 3)) {
      this.setSource(source);
    }

    if (this.el_.hasChildNodes()) {

      var nodes = this.el_.childNodes;
      var nodesLength = nodes.length;
      var removeNodes = [];

      while (nodesLength--) {
        var node = nodes[nodesLength];
        var nodeName = node.nodeName.toLowerCase();
        if (nodeName === 'track') {
          if (!this.featuresNativeTextTracks) {
            // Empty video tag tracks so the built-in player doesn't use them also.
            // This may not be fast enough to stop HTML5 browsers from reading the tags
            // so we'll need to turn off any default tracks if we're manually doing
            // captions and subtitles. videoElement.textTracks
            removeNodes.push(node);
          } else {
            this.remoteTextTracks().addTrack_(node.track);
          }
        }
      }

      for (var i = 0; i < removeNodes.length; i++) {
        this.el_.removeChild(removeNodes[i]);
      }
    }

    if (this.featuresNativeTextTracks) {
      this.on('loadstart', Fn.bind(this, this.hideCaptions));
    }

    // Determine if native controls should be used
    // Our goal should be to get the custom controls on mobile solid everywhere
    // so we can remove this all together. Right now this will block custom
    // controls on touch enabled laptops like the Chrome Pixel
    if (browser.TOUCH_ENABLED && options.nativeControlsForTouch === true) {
      this.trigger('usenativecontrols');
    }

    this.triggerReady();
  }

  _inherits(Html5, _Tech);

  Html5.prototype.dispose = function dispose() {
    Html5.disposeMediaElement(this.el_);
    _Tech.prototype.dispose.call(this);
  };

  Html5.prototype.createEl = function createEl() {
    var el = this.options_.tag;

    // Check if this browser supports moving the element into the box.
    // On the iPhone video will break if you move the element,
    // So we have to create a brand new element.
    if (!el || this.movingMediaElementInDOM === false) {

      // If the original tag is still there, clone and remove it.
      if (el) {
        var clone = el.cloneNode(false);
        Html5.disposeMediaElement(el);
        el = clone;
      } else {
        el = _document2['default'].createElement('video');

        // determine if native controls should be used
        var tagAttributes = this.options_.tag && Dom.getElAttributes(this.options_.tag);
        var attributes = _mergeOptions2['default']({}, tagAttributes);
        if (!browser.TOUCH_ENABLED || this.options_.nativeControlsForTouch !== true) {
          delete attributes.controls;
        }

        Dom.setElAttributes(el, _assign2['default'](attributes, {
          id: this.options_.techId,
          'class': 'vjs-tech'
        }));
      }

      if (this.options_.tracks) {
        for (var i = 0; i < this.options_.tracks.length; i++) {
          var _track = this.options_.tracks[i];
          var trackEl = _document2['default'].createElement('track');
          trackEl.kind = _track.kind;
          trackEl.label = _track.label;
          trackEl.srclang = _track.srclang;
          trackEl.src = _track.src;
          if ('default' in _track) {
            trackEl.setAttribute('default', 'default');
          }
          el.appendChild(trackEl);
        }
      }
    }

    // Update specific tag settings, in case they were overridden
    var settingsAttrs = ['autoplay', 'preload', 'loop', 'muted'];
    for (var i = settingsAttrs.length - 1; i >= 0; i--) {
      var attr = settingsAttrs[i];
      var overwriteAttrs = {};
      if (typeof this.options_[attr] !== 'undefined') {
        overwriteAttrs[attr] = this.options_[attr];
      }
      Dom.setElAttributes(el, overwriteAttrs);
    }

    return el;
    // jenniisawesome = true;
  };

  Html5.prototype.hideCaptions = function hideCaptions() {
    var tracks = this.el_.querySelectorAll('track');
    var i = tracks.length;
    var kinds = {
      captions: 1,
      subtitles: 1
    };

    while (i--) {
      var _track2 = tracks[i].track;
      if (_track2 && _track2.kind in kinds && !tracks[i]['default']) {
        _track2.mode = 'disabled';
      }
    }
  };

  Html5.prototype.play = function play() {
    this.el_.play();
  };

  Html5.prototype.pause = function pause() {
    this.el_.pause();
  };

  Html5.prototype.paused = function paused() {
    return this.el_.paused;
  };

  Html5.prototype.currentTime = function currentTime() {
    return this.el_.currentTime;
  };

  Html5.prototype.setCurrentTime = function setCurrentTime(seconds) {
    try {
      this.el_.currentTime = seconds;
    } catch (e) {
      _log2['default'](e, 'Video is not ready. (Video.js)');
      // this.warning(VideoJS.warnings.videoNotReady);
    }
  };

  Html5.prototype.duration = function duration() {
    return this.el_.duration || 0;
  };

  Html5.prototype.buffered = function buffered() {
    return this.el_.buffered;
  };

  Html5.prototype.volume = function volume() {
    return this.el_.volume;
  };

  Html5.prototype.setVolume = function setVolume(percentAsDecimal) {
    this.el_.volume = percentAsDecimal;
  };

  Html5.prototype.muted = function muted() {
    return this.el_.muted;
  };

  Html5.prototype.setMuted = function setMuted(muted) {
    this.el_.muted = muted;
  };

  Html5.prototype.width = function width() {
    return this.el_.offsetWidth;
  };

  Html5.prototype.height = function height() {
    return this.el_.offsetHeight;
  };

  Html5.prototype.supportsFullScreen = function supportsFullScreen() {
    if (typeof this.el_.webkitEnterFullScreen === 'function') {
      var userAgent = _window2['default'].navigator.userAgent;
      // Seems to be broken in Chromium/Chrome && Safari in Leopard
      if (/Android/.test(userAgent) || !/Chrome|Mac OS X 10.5/.test(userAgent)) {
        return true;
      }
    }
    return false;
  };

  Html5.prototype.enterFullScreen = function enterFullScreen() {
    var video = this.el_;

    if ('webkitDisplayingFullscreen' in video) {
      this.one('webkitbeginfullscreen', function () {
        this.one('webkitendfullscreen', function () {
          this.trigger('fullscreenchange');
        });

        this.trigger('fullscreenchange');
      });
    }

    if (video.paused && video.networkState <= video.HAVE_METADATA) {
      // attempt to prime the video element for programmatic access
      // this isn't necessary on the desktop but shouldn't hurt
      this.el_.play();

      // playing and pausing synchronously during the transition to fullscreen
      // can get iOS ~6.1 devices into a play/pause loop
      this.setTimeout(function () {
        video.pause();
        video.webkitEnterFullScreen();
      }, 0);
    } else {
      video.webkitEnterFullScreen();
    }
  };

  Html5.prototype.exitFullScreen = function exitFullScreen() {
    this.el_.webkitExitFullScreen();
  };

  Html5.prototype.src = (function (_src) {
    function src(_x) {
      return _src.apply(this, arguments);
    }

    src.toString = function () {
      return _src.toString();
    };

    return src;
  })(function (src) {
    if (src === undefined) {
      return this.el_.src;
    } else {
      // Setting src through `src` instead of `setSrc` will be deprecated
      this.setSrc(src);
    }
  });

  Html5.prototype.setSrc = function setSrc(src) {
    this.el_.src = src;
  };

  Html5.prototype.load = function load() {
    this.el_.load();
  };

  Html5.prototype.currentSrc = function currentSrc() {
    return this.el_.currentSrc;
  };

  Html5.prototype.poster = function poster() {
    return this.el_.poster;
  };

  Html5.prototype.setPoster = function setPoster(val) {
    this.el_.poster = val;
  };

  Html5.prototype.preload = function preload() {
    return this.el_.preload;
  };

  Html5.prototype.setPreload = function setPreload(val) {
    this.el_.preload = val;
  };

  Html5.prototype.autoplay = function autoplay() {
    return this.el_.autoplay;
  };

  Html5.prototype.setAutoplay = function setAutoplay(val) {
    this.el_.autoplay = val;
  };

  Html5.prototype.controls = function controls() {
    return this.el_.controls;
  };

  Html5.prototype.setControls = function setControls(val) {
    this.el_.controls = !!val;
  };

  Html5.prototype.loop = function loop() {
    return this.el_.loop;
  };

  Html5.prototype.setLoop = function setLoop(val) {
    this.el_.loop = val;
  };

  Html5.prototype.error = function error() {
    return this.el_.error;
  };

  Html5.prototype.seeking = function seeking() {
    return this.el_.seeking;
  };

  Html5.prototype.ended = function ended() {
    return this.el_.ended;
  };

  Html5.prototype.defaultMuted = function defaultMuted() {
    return this.el_.defaultMuted;
  };

  Html5.prototype.playbackRate = function playbackRate() {
    return this.el_.playbackRate;
  };

  Html5.prototype.setPlaybackRate = function setPlaybackRate(val) {
    this.el_.playbackRate = val;
  };

  Html5.prototype.networkState = function networkState() {
    return this.el_.networkState;
  };

  Html5.prototype.readyState = function readyState() {
    return this.el_.readyState;
  };

  Html5.prototype.videoWidth = function videoWidth() {
    return this.el_.videoWidth;
  };

  Html5.prototype.videoHeight = function videoHeight() {
    return this.el_.videoHeight;
  };

  Html5.prototype.textTracks = function textTracks() {
    if (!this.featuresNativeTextTracks) {
      return _Tech.prototype.textTracks.call(this);
    }

    return this.el_.textTracks;
  };

  Html5.prototype.addTextTrack = function addTextTrack(kind, label, language) {
    if (!this.featuresNativeTextTracks) {
      return _Tech.prototype.addTextTrack.call(this, kind, label, language);
    }

    return this.el_.addTextTrack(kind, label, language);
  };

  Html5.prototype.addRemoteTextTrack = function addRemoteTextTrack() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    if (!this.featuresNativeTextTracks) {
      return _Tech.prototype.addRemoteTextTrack.call(this, options);
    }

    var track = _document2['default'].createElement('track');

    if (options.kind) {
      track.kind = options.kind;
    }
    if (options.label) {
      track.label = options.label;
    }
    if (options.language || options.srclang) {
      track.srclang = options.language || options.srclang;
    }
    if (options['default']) {
      track['default'] = options['default'];
    }
    if (options.id) {
      track.id = options.id;
    }
    if (options.src) {
      track.src = options.src;
    }

    this.el().appendChild(track);

    if (track.track.kind === 'metadata') {
      track.track.mode = 'hidden';
    } else {
      track.track.mode = 'disabled';
    }

    track.onload = function () {
      var tt = track.track;
      if (track.readyState >= 2) {
        if (tt.kind === 'metadata' && tt.mode !== 'hidden') {
          tt.mode = 'hidden';
        } else if (tt.kind !== 'metadata' && tt.mode !== 'disabled') {
          tt.mode = 'disabled';
        }
        track.onload = null;
      }
    };

    this.remoteTextTracks().addTrack_(track.track);

    return track;
  };

  Html5.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
    if (!this.featuresNativeTextTracks) {
      return _Tech.prototype.removeRemoteTextTrack.call(this, track);
    }

    var tracks, i;

    this.remoteTextTracks().removeTrack_(track);

    tracks = this.el().querySelectorAll('track');

    for (i = 0; i < tracks.length; i++) {
      if (tracks[i] === track || tracks[i].track === track) {
        tracks[i].parentNode.removeChild(tracks[i]);
        break;
      }
    }
  };

  return Html5;
})(_Tech3['default']);

/* HTML5 Support Testing ---------------------------------------------------- */

/**
 * Element for testing browser HTML5 video capabilities
 * @type {Element}
 * @constant
 * @private
 */
Html5.TEST_VID = _document2['default'].createElement('video');
var track = _document2['default'].createElement('track');
track.kind = 'captions';
track.srclang = 'en';
track.label = 'English';
Html5.TEST_VID.appendChild(track);

/**
 * Check if HTML5 video is supported by this browser/device
 * @return {Boolean}
 */
Html5.isSupported = function () {
  // IE9 with no Media Player is a LIAR! (#984)
  try {
    Html5.TEST_VID.volume = 0.5;
  } catch (e) {
    return false;
  }

  return !!Html5.TEST_VID.canPlayType;
};

// Add Source Handler pattern functions to this tech
_Tech3['default'].withSourceHandlers(Html5);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {Html5} tech  The instance of the HTML5 tech
 */
Html5.nativeSourceHandler = {};

/**
 * Check if the video element can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Html5.nativeSourceHandler.canHandleSource = function (source) {
  var match, ext;

  function canPlayType(type) {
    // IE9 on Windows 7 without MediaPlayer throws an error here
    // https://github.com/videojs/video.js/issues/519
    try {
      return Html5.TEST_VID.canPlayType(type);
    } catch (e) {
      return '';
    }
  }

  // If a type was provided we should rely on that
  if (source.type) {
    return canPlayType(source.type);
  } else if (source.src) {
    // If no type, fall back to checking 'video/[EXTENSION]'
    ext = Url.getFileExtension(source.src);

    return canPlayType('video/' + ext);
  }

  return '';
};

/**
 * Pass the source to the video element
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {Html5} tech   The instance of the Html5 tech
 */
Html5.nativeSourceHandler.handleSource = function (source, tech) {
  tech.setSrc(source.src);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Html5.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Html5.registerSourceHandler(Html5.nativeSourceHandler);

/**
 * Check if the volume can be changed in this browser/device.
 * Volume cannot be changed in a lot of mobile devices.
 * Specifically, it can't be changed from 1 on iOS.
 * @return {Boolean}
 */
Html5.canControlVolume = function () {
  var volume = Html5.TEST_VID.volume;
  Html5.TEST_VID.volume = volume / 2 + 0.1;
  return volume !== Html5.TEST_VID.volume;
};

/**
 * Check if playbackRate is supported in this browser/device.
 * @return {[type]} [description]
 */
Html5.canControlPlaybackRate = function () {
  var playbackRate = Html5.TEST_VID.playbackRate;
  Html5.TEST_VID.playbackRate = playbackRate / 2 + 0.1;
  return playbackRate !== Html5.TEST_VID.playbackRate;
};

/**
 * Check to see if native text tracks are supported by this browser/device
 * @return {Boolean}
 */
Html5.supportsNativeTextTracks = function () {
  var supportsTextTracks;

  // Figure out native text track support
  // If mode is a number, we cannot change it because it'll disappear from view.
  // Browsers with numeric modes include IE10 and older (<=2013) samsung android models.
  // Firefox isn't playing nice either with modifying the mode
  // TODO: Investigate firefox: https://github.com/videojs/video.js/issues/1862
  supportsTextTracks = !!Html5.TEST_VID.textTracks;
  if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Html5.TEST_VID.textTracks[0].mode !== 'number';
  }
  if (supportsTextTracks && browser.IS_FIREFOX) {
    supportsTextTracks = false;
  }

  return supportsTextTracks;
};

/**
 * Set the tech's volume control support status
 * @type {Boolean}
 */
Html5.prototype.featuresVolumeControl = Html5.canControlVolume();

/**
 * Set the tech's playbackRate support status
 * @type {Boolean}
 */
Html5.prototype.featuresPlaybackRate = Html5.canControlPlaybackRate();

/**
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 * @type {Boolean}
 */
Html5.prototype.movingMediaElementInDOM = !browser.IS_IOS;

/**
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Html5.prototype.featuresFullscreenResize = true;

/**
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Html5.prototype.featuresProgressEvents = true;

/**
 * Sets the tech's status on native text track support
 * @type {Boolean}
 */
Html5.prototype.featuresNativeTextTracks = Html5.supportsNativeTextTracks();

// HTML5 Feature detection and Device Fixes --------------------------------- //
var canPlayType = undefined;
var mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;
var mp4RE = /^video\/mp4/i;

Html5.patchCanPlayType = function () {
  // Android 4.0 and above can play HLS to some extent but it reports being unable to do so
  if (browser.ANDROID_VERSION >= 4) {
    if (!canPlayType) {
      canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
    }

    Html5.TEST_VID.constructor.prototype.canPlayType = function (type) {
      if (type && mpegurlRE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }

  // Override Android 2.2 and less canPlayType method which is broken
  if (browser.IS_OLD_ANDROID) {
    if (!canPlayType) {
      canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
    }

    Html5.TEST_VID.constructor.prototype.canPlayType = function (type) {
      if (type && mp4RE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }
};

Html5.unpatchCanPlayType = function () {
  var r = Html5.TEST_VID.constructor.prototype.canPlayType;
  Html5.TEST_VID.constructor.prototype.canPlayType = canPlayType;
  canPlayType = null;
  return r;
};

// by default, patch the video element
Html5.patchCanPlayType();

Html5.disposeMediaElement = function (el) {
  if (!el) {
    return;
  }

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  // remove any child track or source nodes to prevent their loading
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  // remove any src reference. not setting `src=''` because that causes a warning
  // in firefox
  el.removeAttribute('src');

  // force the media element to update its loading state by calling load()
  // however IE on Windows 7N has a bug that throws an error so need a try/catch (#793)
  if (typeof el.load === 'function') {
    // wrapping in an iife so it's not deoptimized (#1060#discussion_r10324473)
    (function () {
      try {
        el.load();
      } catch (e) {}
    })();
  }
};

_Component2['default'].registerComponent('Html5', Html5);
exports['default'] = Html5;
module.exports = exports['default'];

// not supported

},{"../component":52,"../utils/browser.js":108,"../utils/dom.js":110,"../utils/fn.js":112,"../utils/log.js":115,"../utils/merge-options.js":116,"../utils/url.js":120,"./tech.js":101,"global/document":1,"global/window":2,"object.assign":44}],100:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireWildcard(_Component2);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _toTitleCase = _dereq_('../utils/to-title-case.js');

var _toTitleCase2 = _interopRequireWildcard(_toTitleCase);

/**
 * The Media Loader is the component that decides which playback technology to load
 * when the player is initialized.
 *
 * @constructor
 */

var MediaLoader = (function (_Component) {
  function MediaLoader(player, options, ready) {
    _classCallCheck(this, MediaLoader);

    _Component.call(this, player, options, ready);

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!player.options_.sources || player.options_.sources.length === 0) {
      for (var i = 0, j = player.options_.techOrder; i < j.length; i++) {
        var techName = _toTitleCase2['default'](j[i]);
        var tech = _Component3['default'].getComponent(techName);

        // Check if the browser supports this technology
        if (tech && tech.isSupported()) {
          player.loadTech(techName);
          break;
        }
      }
    } else {
      // // Loop through playback technologies (HTML5, Flash) and check for support.
      // // Then load the best source.
      // // A few assumptions here:
      // //   All playback technologies respect preload false.
      player.src(player.options_.sources);
    }
  }

  _inherits(MediaLoader, _Component);

  return MediaLoader;
})(_Component3['default']);

_Component3['default'].registerComponent('MediaLoader', MediaLoader);
exports['default'] = MediaLoader;
module.exports = exports['default'];

},{"../component":52,"../utils/to-title-case.js":119,"global/window":2}],101:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
/**
 * @fileoverview Media Technology Controller - Base class for media playback
 * technology controllers like Flash and HTML5
 */

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireWildcard(_Component2);

var _TextTrack = _dereq_('../tracks/text-track');

var _TextTrack2 = _interopRequireWildcard(_TextTrack);

var _TextTrackList = _dereq_('../tracks/text-track-list');

var _TextTrackList2 = _interopRequireWildcard(_TextTrackList);

var _import = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _log = _dereq_('../utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _createTimeRange = _dereq_('../utils/time-ranges.js');

var _bufferedPercent2 = _dereq_('../utils/buffer.js');

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/**
 * Base class for media (HTML5 Video, Flash) controllers
 * @param {Player|Object} player  Central player instance
 * @param {Object=} options Options object
 * @constructor
 */

var Tech = (function (_Component) {
  function Tech() {
    var options = arguments[0] === undefined ? {} : arguments[0];
    var ready = arguments[1] === undefined ? function () {} : arguments[1];

    _classCallCheck(this, Tech);

    // we don't want the tech to report user activity automatically.
    // This is done manually in addControlsListeners
    options.reportTouchActivity = false;
    _Component.call(this, null, options, ready);

    this.textTracks_ = options.textTracks;

    // Manually track progress in cases where the browser/flash player doesn't report it.
    if (!this.featuresProgressEvents) {
      this.manualProgressOn();
    }

    // Manually track timeupdates in cases where the browser/flash player doesn't report it.
    if (!this.featuresTimeupdateEvents) {
      this.manualTimeUpdatesOn();
    }

    this.initControlsListeners();

    if (options.nativeCaptions === false || options.nativeTextTracks === false) {
      this.featuresNativeTextTracks = false;
    }

    if (!this.featuresNativeTextTracks) {
      this.emulateTextTracks();
    }

    this.initTextTrackListeners();

    // Turn on component tap events
    this.emitTapEvents();
  }

  _inherits(Tech, _Component);

  /**
   * Set up click and touch listeners for the playback element
   * On desktops, a click on the video itself will toggle playback,
   * on a mobile device a click on the video toggles controls.
   * (toggling controls is done by toggling the user state between active and
   * inactive)
   *
   * A tap can signal that a user has become active, or has become inactive
   * e.g. a quick tap on an iPhone movie should reveal the controls. Another
   * quick tap should hide them again (signaling the user is in an inactive
   * viewing state)
   *
   * In addition to this, we still want the user to be considered inactive after
   * a few seconds of inactivity.
   *
   * Note: the only part of iOS interaction we can't mimic with this setup
   * is a touch and hold on the video element counting as activity in order to
   * keep the controls showing, but that shouldn't be an issue. A touch and hold on
   * any controls will still keep the user active
   */

  Tech.prototype.initControlsListeners = function initControlsListeners() {
    // if we're loading the playback object after it has started loading or playing the
    // video (often with autoplay on) then the loadstart event has already fired and we
    // need to fire it manually because many things rely on it.
    // Long term we might consider how we would do this for other events like 'canplay'
    // that may also have fired.
    this.ready(function () {
      if (this.networkState && this.networkState() > 0) {
        this.trigger('loadstart');
      }
    });
  };

  /* Fallbacks for unsupported event types
  ================================================================================ */
  // Manually trigger progress events based on changes to the buffered amount
  // Many flash players and older HTML5 browsers don't send progress or progress-like events

  Tech.prototype.manualProgressOn = function manualProgressOn() {
    this.on('durationchange', this.onDurationChange);

    this.manualProgress = true;

    // Trigger progress watching when a source begins loading
    this.trackProgress();
  };

  Tech.prototype.manualProgressOff = function manualProgressOff() {
    this.manualProgress = false;
    this.stopTrackingProgress();

    this.off('durationchange', this.onDurationChange);
  };

  Tech.prototype.trackProgress = function trackProgress() {
    this.progressInterval = this.setInterval(Fn.bind(this, function () {
      // Don't trigger unless buffered amount is greater than last time

      var numBufferedPercent = this.bufferedPercent();

      if (this.bufferedPercent_ !== numBufferedPercent) {
        this.trigger('progress');
      }

      this.bufferedPercent_ = numBufferedPercent;

      if (numBufferedPercent === 1) {
        this.stopTrackingProgress();
      }
    }), 500);
  };

  Tech.prototype.onDurationChange = function onDurationChange() {
    this.duration_ = this.duration();
  };

  Tech.prototype.buffered = function buffered() {
    return _createTimeRange.createTimeRange(0, 0);
  };

  Tech.prototype.bufferedPercent = (function (_bufferedPercent) {
    function bufferedPercent() {
      return _bufferedPercent.apply(this, arguments);
    }

    bufferedPercent.toString = function () {
      return _bufferedPercent.toString();
    };

    return bufferedPercent;
  })(function () {
    return _bufferedPercent2.bufferedPercent(this.buffered(), this.duration_);
  });

  Tech.prototype.stopTrackingProgress = function stopTrackingProgress() {
    this.clearInterval(this.progressInterval);
  };

  /*! Time Tracking -------------------------------------------------------------- */

  Tech.prototype.manualTimeUpdatesOn = function manualTimeUpdatesOn() {
    this.manualTimeUpdates = true;

    this.on('play', this.trackCurrentTime);
    this.on('pause', this.stopTrackingCurrentTime);
  };

  Tech.prototype.manualTimeUpdatesOff = function manualTimeUpdatesOff() {
    this.manualTimeUpdates = false;
    this.stopTrackingCurrentTime();
    this.off('play', this.trackCurrentTime);
    this.off('pause', this.stopTrackingCurrentTime);
  };

  Tech.prototype.trackCurrentTime = function trackCurrentTime() {
    if (this.currentTimeInterval) {
      this.stopTrackingCurrentTime();
    }
    this.currentTimeInterval = this.setInterval(function () {
      this.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true });
    }, 250); // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
  };

  // Turn off play progress tracking (when paused or dragging)

  Tech.prototype.stopTrackingCurrentTime = function stopTrackingCurrentTime() {
    this.clearInterval(this.currentTimeInterval);

    // #1002 - if the video ends right before the next timeupdate would happen,
    // the progress bar won't make it all the way to the end
    this.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true });
  };

  Tech.prototype.dispose = function dispose() {
    // Turn off any manual progress or timeupdate tracking
    if (this.manualProgress) {
      this.manualProgressOff();
    }

    if (this.manualTimeUpdates) {
      this.manualTimeUpdatesOff();
    }

    _Component.prototype.dispose.call(this);
  };

  Tech.prototype.setCurrentTime = function setCurrentTime() {
    // improve the accuracy of manual timeupdates
    if (this.manualTimeUpdates) {
      this.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true });
    }
  };

  Tech.prototype.initTextTrackListeners = function initTextTrackListeners() {
    var textTrackListChanges = Fn.bind(this, function () {
      this.trigger('texttrackchange');
    });

    var tracks = this.textTracks();

    if (!tracks) {
      return;
    }tracks.addEventListener('removetrack', textTrackListChanges);
    tracks.addEventListener('addtrack', textTrackListChanges);

    this.on('dispose', Fn.bind(this, function () {
      tracks.removeEventListener('removetrack', textTrackListChanges);
      tracks.removeEventListener('addtrack', textTrackListChanges);
    }));
  };

  Tech.prototype.emulateTextTracks = function emulateTextTracks() {
    if (!_window2['default'].WebVTT && this.el().parentNode != null) {
      var script = _document2['default'].createElement('script');
      script.src = this.options_['vtt.js'] || '../node_modules/vtt.js/dist/vtt.js';
      this.el().parentNode.appendChild(script);
      _window2['default'].WebVTT = true;
    }

    var tracks = this.textTracks();
    if (!tracks) {
      return;
    }

    var textTracksChanges = function textTracksChanges() {
      var updateDisplay = Fn.bind(this, function () {
        this.trigger('texttrackchange');
      });

      this.trigger('texttrackchange');

      for (var i = 0; i < this.length; i++) {
        var track = this[i];
        track.removeEventListener('cuechange', updateDisplay);
        if (track.mode === 'showing') {
          track.addEventListener('cuechange', updateDisplay);
        }
      }
    };

    tracks.addEventListener('change', textTracksChanges);

    this.on('dispose', Fn.bind(this, function () {
      tracks.removeEventListener('change', textTracksChanges);
    }));
  };

  /**
   * Provide default methods for text tracks.
   *
   * Html5 tech overrides these.
   */

  Tech.prototype.textTracks = function textTracks() {
    this.textTracks_ = this.textTracks_ || new _TextTrackList2['default']();
    return this.textTracks_;
  };

  Tech.prototype.remoteTextTracks = function remoteTextTracks() {
    this.remoteTextTracks_ = this.remoteTextTracks_ || new _TextTrackList2['default']();
    return this.remoteTextTracks_;
  };

  Tech.prototype.addTextTrack = function addTextTrack(kind, label, language) {
    if (!kind) {
      throw new Error('TextTrack kind is required but was not provided');
    }

    return createTrackHelper(this, kind, label, language);
  };

  Tech.prototype.addRemoteTextTrack = function addRemoteTextTrack(options) {
    var track = createTrackHelper(this, options.kind, options.label, options.language, options);
    this.remoteTextTracks().addTrack_(track);
    return {
      track: track
    };
  };

  Tech.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
    this.textTracks().removeTrack_(track);
    this.remoteTextTracks().removeTrack_(track);
  };

  /**
   * Provide a default setPoster method for techs
   *
   * Poster support for techs should be optional, so we don't want techs to
   * break if they don't have a way to set a poster.
   */

  Tech.prototype.setPoster = function setPoster() {};

  return Tech;
})(_Component3['default']);

/**
 * List of associated text tracks
 * @type {Array}
 * @private
 */
Tech.prototype.textTracks_;

var createTrackHelper = function createTrackHelper(self, kind, label, language) {
  var options = arguments[4] === undefined ? {} : arguments[4];

  var tracks = self.textTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new _TextTrack2['default'](options);
  tracks.addTrack_(track);

  return track;
};

Tech.prototype.featuresVolumeControl = true;

// Resizing plugins using request fullscreen reloads the plugin
Tech.prototype.featuresFullscreenResize = false;
Tech.prototype.featuresPlaybackRate = false;

// Optional events that we can manually mimic with timers
// currently not triggered by video-js-swf
Tech.prototype.featuresProgressEvents = false;
Tech.prototype.featuresTimeupdateEvents = false;

Tech.prototype.featuresNativeTextTracks = false;

/**
 * A functional mixin for techs that want to use the Source Handler pattern.
 *
 * ##### EXAMPLE:
 *
 *   Tech.withSourceHandlers.call(MyTech);
 *
 */
Tech.withSourceHandlers = function (_Tech) {
  /**
   * Register a source handler
   * Source handlers are scripts for handling specific formats.
   * The source handler pattern is used for adaptive formats (HLS, DASH) that
   * manually load video data and feed it into a Source Buffer (Media Source Extensions)
   * @param  {Function} handler  The source handler
   * @param  {Boolean}  first    Register it before any existing handlers
   */
  _Tech.registerSourceHandler = function (handler, index) {
    var handlers = _Tech.sourceHandlers;

    if (!handlers) {
      handlers = _Tech.sourceHandlers = [];
    }

    if (index === undefined) {
      // add to the end of the list
      index = handlers.length;
    }

    handlers.splice(index, 0, handler);
  };

  /**
   * Return the first source handler that supports the source
   * TODO: Answer question: should 'probably' be prioritized over 'maybe'
   * @param  {Object} source The source object
   * @returns {Object}       The first source handler that supports the source
   * @returns {null}         Null if no source handler is found
   */
  _Tech.selectSourceHandler = function (source) {
    var handlers = _Tech.sourceHandlers || [];
    var can = undefined;

    for (var i = 0; i < handlers.length; i++) {
      can = handlers[i].canHandleSource(source);

      if (can) {
        return handlers[i];
      }
    }

    return null;
  };

  /**
  * Check if the tech can support the given source
  * @param  {Object} srcObj  The source object
  * @return {String}         'probably', 'maybe', or '' (empty string)
  */
  _Tech.canPlaySource = function (srcObj) {
    var sh = _Tech.selectSourceHandler(srcObj);

    if (sh) {
      return sh.canHandleSource(srcObj);
    }

    return '';
  };

  /**
   * Create a function for setting the source using a source object
   * and source handlers.
   * Should never be called unless a source handler was found.
   * @param {Object} source  A source object with src and type keys
   * @return {Tech} self
   */
  _Tech.prototype.setSource = function (source) {
    var sh = _Tech.selectSourceHandler(source);

    if (!sh) {
      // Fall back to a native source hander when unsupported sources are
      // deliberately set
      if (_Tech.nativeSourceHandler) {
        sh = _Tech.nativeSourceHandler;
      } else {
        _log2['default'].error('No source hander found for the current source.');
      }
    }

    // Dispose any existing source handler
    this.disposeSourceHandler();
    this.off('dispose', this.disposeSourceHandler);

    this.currentSource_ = source;
    this.sourceHandler_ = sh.handleSource(source, this);
    this.on('dispose', this.disposeSourceHandler);

    return this;
  };

  /**
   * Clean up any existing source handler
   */
  _Tech.prototype.disposeSourceHandler = function () {
    if (this.sourceHandler_ && this.sourceHandler_.dispose) {
      this.sourceHandler_.dispose();
    }
  };
};

_Component3['default'].registerComponent('Tech', Tech);
// Old name for Tech
_Component3['default'].registerComponent('MediaTechController', Tech);
exports['default'] = Tech;
module.exports = exports['default'];

},{"../component":52,"../tracks/text-track":107,"../tracks/text-track-list":105,"../utils/buffer.js":109,"../utils/fn.js":112,"../utils/log.js":115,"../utils/time-ranges.js":118,"global/document":1,"global/window":2}],102:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = _dereq_('../utils/browser.js');

var browser = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackcuelist
 *
 * interface TextTrackCueList {
 *   readonly attribute unsigned long length;
 *   getter TextTrackCue (unsigned long index);
 *   TextTrackCue? getCueById(DOMString id);
 * };
 */

var TextTrackCueList = (function (_TextTrackCueList) {
  function TextTrackCueList(_x) {
    return _TextTrackCueList.apply(this, arguments);
  }

  TextTrackCueList.toString = function () {
    return _TextTrackCueList.toString();
  };

  return TextTrackCueList;
})(function (cues) {
  var list = this;

  if (browser.IS_IE8) {
    list = _document2['default'].createElement('custom');

    for (var prop in TextTrackCueList.prototype) {
      list[prop] = TextTrackCueList.prototype[prop];
    }
  }

  TextTrackCueList.prototype.setCues_.call(list, cues);

  Object.defineProperty(list, 'length', {
    get: function get() {
      return this.length_;
    }
  });

  if (browser.IS_IE8) {
    return list;
  }
});

TextTrackCueList.prototype.setCues_ = function (cues) {
  var oldLength = this.length || 0;
  var i = 0;
  var l = cues.length;

  this.cues_ = cues;
  this.length_ = cues.length;

  var defineProp = function defineProp(i) {
    if (!('' + i in this)) {
      Object.defineProperty(this, '' + i, {
        get: function get() {
          return this.cues_[i];
        }
      });
    }
  };

  if (oldLength < l) {
    i = oldLength;

    for (; i < l; i++) {
      defineProp.call(this, i);
    }
  }
};

TextTrackCueList.prototype.getCueById = function (id) {
  var result = null;
  for (var i = 0, l = this.length; i < l; i++) {
    var cue = this[i];
    if (cue.id === id) {
      result = cue;
      break;
    }
  }

  return result;
};

exports['default'] = TextTrackCueList;
module.exports = exports['default'];

},{"../utils/browser.js":108,"global/document":1}],103:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireWildcard(_Component2);

var _Menu = _dereq_('../menu/menu.js');

var _Menu2 = _interopRequireWildcard(_Menu);

var _MenuItem = _dereq_('../menu/menu-item.js');

var _MenuItem2 = _interopRequireWildcard(_MenuItem);

var _MenuButton = _dereq_('../menu/menu-button.js');

var _MenuButton2 = _interopRequireWildcard(_MenuButton);

var _import = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var darkGray = '#222';
var lightGray = '#ccc';
var fontMap = {
  monospace: 'monospace',
  sansSerif: 'sans-serif',
  serif: 'serif',
  monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
  monospaceSerif: '"Courier New", monospace',
  proportionalSansSerif: 'sans-serif',
  proportionalSerif: 'serif',
  casual: '"Comic Sans MS", Impact, fantasy',
  script: '"Monotype Corsiva", cursive',
  smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
};

/**
 * The component for displaying text track cues
 *
 * @constructor
 */

var TextTrackDisplay = (function (_Component) {
  function TextTrackDisplay(player, options, ready) {
    _classCallCheck(this, TextTrackDisplay);

    _Component.call(this, player, options, ready);

    player.on('loadstart', Fn.bind(this, this.toggleDisplay));
    player.on('texttrackchange', Fn.bind(this, this.toggleDisplay));

    // This used to be called during player init, but was causing an error
    // if a track should show by default and the display hadn't loaded yet.
    // Should probably be moved to an external track loader when we support
    // tracks that don't need a display.
    player.ready(Fn.bind(this, function () {
      if (player.tech && player.tech.featuresNativeTextTracks) {
        this.hide();
        return;
      }

      player.on('fullscreenchange', Fn.bind(this, this.updateDisplay));

      var tracks = player.options_.tracks || [];
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        this.player_.addRemoteTextTrack(track);
      }
    }));
  }

  _inherits(TextTrackDisplay, _Component);

  TextTrackDisplay.prototype.toggleDisplay = function toggleDisplay() {
    if (this.player_.tech && this.player_.tech.featuresNativeTextTracks) {
      this.hide();
    } else {
      this.show();
    }
  };

  TextTrackDisplay.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-text-track-display'
    });
  };

  TextTrackDisplay.prototype.clearDisplay = function clearDisplay() {
    if (typeof _window2['default'].WebVTT === 'function') {
      _window2['default'].WebVTT.processCues(_window2['default'], [], this.el_);
    }
  };

  TextTrackDisplay.prototype.updateDisplay = function updateDisplay() {
    var tracks = this.player_.textTracks();

    this.clearDisplay();

    if (!tracks) {
      return;
    }

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.mode === 'showing') {
        this.updateForTrack(track);
      }
    }
  };

  TextTrackDisplay.prototype.updateForTrack = function updateForTrack(track) {
    if (typeof _window2['default'].WebVTT !== 'function' || !track.activeCues) {
      return;
    }

    var overrides = this.player_.textTrackSettings.getValues();

    var cues = [];
    for (var _i = 0; _i < track.activeCues.length; _i++) {
      cues.push(track.activeCues[_i]);
    }

    _window2['default'].WebVTT.processCues(_window2['default'], track.activeCues, this.el_);

    var i = cues.length;
    while (i--) {
      var cueDiv = cues[i].displayState;
      if (overrides.color) {
        cueDiv.firstChild.style.color = overrides.color;
      }
      if (overrides.textOpacity) {
        tryUpdateStyle(cueDiv.firstChild, 'color', constructColor(overrides.color || '#fff', overrides.textOpacity));
      }
      if (overrides.backgroundColor) {
        cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
      }
      if (overrides.backgroundOpacity) {
        tryUpdateStyle(cueDiv.firstChild, 'backgroundColor', constructColor(overrides.backgroundColor || '#000', overrides.backgroundOpacity));
      }
      if (overrides.windowColor) {
        if (overrides.windowOpacity) {
          tryUpdateStyle(cueDiv, 'backgroundColor', constructColor(overrides.windowColor, overrides.windowOpacity));
        } else {
          cueDiv.style.backgroundColor = overrides.windowColor;
        }
      }
      if (overrides.edgeStyle) {
        if (overrides.edgeStyle === 'dropshadow') {
          cueDiv.firstChild.style.textShadow = '2px 2px 3px ' + darkGray + ', 2px 2px 4px ' + darkGray + ', 2px 2px 5px ' + darkGray;
        } else if (overrides.edgeStyle === 'raised') {
          cueDiv.firstChild.style.textShadow = '1px 1px ' + darkGray + ', 2px 2px ' + darkGray + ', 3px 3px ' + darkGray;
        } else if (overrides.edgeStyle === 'depressed') {
          cueDiv.firstChild.style.textShadow = '1px 1px ' + lightGray + ', 0 1px ' + lightGray + ', -1px -1px ' + darkGray + ', 0 -1px ' + darkGray;
        } else if (overrides.edgeStyle === 'uniform') {
          cueDiv.firstChild.style.textShadow = '0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray;
        }
      }
      if (overrides.fontPercent && overrides.fontPercent !== 1) {
        var fontSize = _window2['default'].parseFloat(cueDiv.style.fontSize);
        cueDiv.style.fontSize = fontSize * overrides.fontPercent + 'px';
        cueDiv.style.height = 'auto';
        cueDiv.style.top = 'auto';
        cueDiv.style.bottom = '2px';
      }
      if (overrides.fontFamily && overrides.fontFamily !== 'default') {
        if (overrides.fontFamily === 'small-caps') {
          cueDiv.firstChild.style.fontVariant = 'small-caps';
        } else {
          cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
        }
      }
    }
  };

  return TextTrackDisplay;
})(_Component3['default']);

// Add cue HTML to display
function constructColor(color, opacity) {
  return 'rgba(' +
  // color looks like "#f0e"
  parseInt(color[1] + color[1], 16) + ',' + parseInt(color[2] + color[2], 16) + ',' + parseInt(color[3] + color[3], 16) + ',' + opacity + ')';
}

function tryUpdateStyle(el, style, rule) {
  // some style changes will throw an error, particularly in IE8. Those should be noops.
  try {
    el.style[style] = rule;
  } catch (e) {}
}

_Component3['default'].registerComponent('TextTrackDisplay', TextTrackDisplay);
exports['default'] = TextTrackDisplay;
module.exports = exports['default'];

},{"../component":52,"../menu/menu-button.js":89,"../menu/menu-item.js":90,"../menu/menu.js":91,"../utils/fn.js":112,"global/document":1,"global/window":2}],104:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackmode
 *
 * enum TextTrackMode { "disabled",  "hidden",  "showing" };
 */
var TextTrackMode = {
  disabled: 'disabled',
  hidden: 'hidden',
  showing: 'showing'
};

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrackkind
 *
 * enum TextTrackKind { "subtitles",  "captions",  "descriptions",  "chapters",  "metadata" };
 */
var TextTrackKind = {
  subtitles: 'subtitles',
  captions: 'captions',
  descriptions: 'descriptions',
  chapters: 'chapters',
  metadata: 'metadata'
};

exports.TextTrackMode = TextTrackMode;
exports.TextTrackKind = TextTrackKind;

},{}],105:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _EventEmitter = _dereq_('../event-emitter');

var _EventEmitter2 = _interopRequireWildcard(_EventEmitter);

var _import = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/browser.js');

var browser = _interopRequireWildcard(_import2);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttracklist
 *
 * interface TextTrackList : EventTarget {
 *   readonly attribute unsigned long length;
 *   getter TextTrack (unsigned long index);
 *   TextTrack? getTrackById(DOMString id);
 *
 *   attribute EventHandler onchange;
 *   attribute EventHandler onaddtrack;
 *   attribute EventHandler onremovetrack;
 * };
 */
var TextTrackList = (function (_TextTrackList) {
  function TextTrackList(_x) {
    return _TextTrackList.apply(this, arguments);
  }

  TextTrackList.toString = function () {
    return _TextTrackList.toString();
  };

  return TextTrackList;
})(function (tracks) {
  var list = this;

  if (browser.IS_IE8) {
    list = _document2['default'].createElement('custom');

    for (var prop in TextTrackList.prototype) {
      list[prop] = TextTrackList.prototype[prop];
    }
  }

  tracks = tracks || [];
  list.tracks_ = [];

  Object.defineProperty(list, 'length', {
    get: function get() {
      return this.tracks_.length;
    }
  });

  for (var i = 0; i < tracks.length; i++) {
    list.addTrack_(tracks[i]);
  }

  if (browser.IS_IE8) {
    return list;
  }
});

TextTrackList.prototype = Object.create(_EventEmitter2['default'].prototype);
TextTrackList.prototype.constructor = TextTrackList;

/*
 * change - One or more tracks in the track list have been enabled or disabled.
 * addtrack - A track has been added to the track list.
 * removetrack - A track has been removed from the track list.
*/
TextTrackList.prototype.allowedEvents_ = {
  change: 'change',
  addtrack: 'addtrack',
  removetrack: 'removetrack'
};

// emulate attribute EventHandler support to allow for feature detection
for (var _event in TextTrackList.prototype.allowedEvents_) {
  TextTrackList.prototype['on' + _event] = null;
}

TextTrackList.prototype.addTrack_ = function (track) {
  var index = this.tracks_.length;
  if (!('' + index in this)) {
    Object.defineProperty(this, index, {
      get: function get() {
        return this.tracks_[index];
      }
    });
  }

  track.addEventListener('modechange', Fn.bind(this, function () {
    this.trigger('change');
  }));
  this.tracks_.push(track);

  this.trigger({
    type: 'addtrack',
    track: track
  });
};

TextTrackList.prototype.removeTrack_ = function (rtrack) {
  var result = null;
  var track = undefined;

  for (var i = 0, l = this.length; i < l; i++) {
    track = this[i];
    if (track === rtrack) {
      this.tracks_.splice(i, 1);
      break;
    }
  }

  this.trigger({
    type: 'removetrack',
    track: track
  });
};

TextTrackList.prototype.getTrackById = function (id) {
  var result = null;

  for (var i = 0, l = this.length; i < l; i++) {
    var track = this[i];
    if (track.id === id) {
      result = track;
      break;
    }
  }

  return result;
};

exports['default'] = TextTrackList;
module.exports = exports['default'];

},{"../event-emitter":83,"../utils/browser.js":108,"../utils/fn.js":112,"global/document":1}],106:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = _dereq_('../component');

var _Component3 = _interopRequireWildcard(_Component2);

var _import = _dereq_('../utils/events.js');

var Events = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import2);

var _log = _dereq_('../utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _safeParseTuple2 = _dereq_('safe-json-parse/tuple');

var _safeParseTuple3 = _interopRequireWildcard(_safeParseTuple2);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var TextTrackSettings = (function (_Component) {
  function TextTrackSettings(player, options) {
    _classCallCheck(this, TextTrackSettings);

    _Component.call(this, player, options);
    this.hide();

    Events.on(this.el().querySelector('.vjs-done-button'), 'click', Fn.bind(this, function () {
      this.saveSettings();
      this.hide();
    }));

    Events.on(this.el().querySelector('.vjs-default-button'), 'click', Fn.bind(this, function () {
      this.el().querySelector('.vjs-fg-color > select').selectedIndex = 0;
      this.el().querySelector('.vjs-bg-color > select').selectedIndex = 0;
      this.el().querySelector('.window-color > select').selectedIndex = 0;
      this.el().querySelector('.vjs-text-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-bg-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-window-opacity > select').selectedIndex = 0;
      this.el().querySelector('.vjs-edge-style select').selectedIndex = 0;
      this.el().querySelector('.vjs-font-family select').selectedIndex = 0;
      this.el().querySelector('.vjs-font-percent select').selectedIndex = 2;
      this.updateDisplay();
    }));

    Events.on(this.el().querySelector('.vjs-fg-color > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-bg-color > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.window-color > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-text-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-bg-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-window-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-font-percent select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-edge-style select'), 'change', Fn.bind(this, this.updateDisplay));
    Events.on(this.el().querySelector('.vjs-font-family select'), 'change', Fn.bind(this, this.updateDisplay));

    if (player.options().persistTextTrackSettings) {
      this.restoreSettings();
    }
  }

  _inherits(TextTrackSettings, _Component);

  TextTrackSettings.prototype.createEl = function createEl() {
    return _Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-caption-settings vjs-modal-overlay',
      innerHTML: captionOptionsMenuTemplate()
    });
  };

  TextTrackSettings.prototype.getValues = function getValues() {
    var el = this.el();

    var textEdge = getSelectedOptionValue(el.querySelector('.vjs-edge-style select'));
    var fontFamily = getSelectedOptionValue(el.querySelector('.vjs-font-family select'));
    var fgColor = getSelectedOptionValue(el.querySelector('.vjs-fg-color > select'));
    var textOpacity = getSelectedOptionValue(el.querySelector('.vjs-text-opacity > select'));
    var bgColor = getSelectedOptionValue(el.querySelector('.vjs-bg-color > select'));
    var bgOpacity = getSelectedOptionValue(el.querySelector('.vjs-bg-opacity > select'));
    var windowColor = getSelectedOptionValue(el.querySelector('.window-color > select'));
    var windowOpacity = getSelectedOptionValue(el.querySelector('.vjs-window-opacity > select'));
    var fontPercent = _window2['default'].parseFloat(getSelectedOptionValue(el.querySelector('.vjs-font-percent > select')));

    var result = {
      backgroundOpacity: bgOpacity,
      textOpacity: textOpacity,
      windowOpacity: windowOpacity,
      edgeStyle: textEdge,
      fontFamily: fontFamily,
      color: fgColor,
      backgroundColor: bgColor,
      windowColor: windowColor,
      fontPercent: fontPercent
    };
    for (var _name in result) {
      if (result[_name] === '' || result[_name] === 'none' || _name === 'fontPercent' && result[_name] === 1) {
        delete result[_name];
      }
    }
    return result;
  };

  TextTrackSettings.prototype.setValues = function setValues(values) {
    var el = this.el();

    setSelectedOption(el.querySelector('.vjs-edge-style select'), values.edgeStyle);
    setSelectedOption(el.querySelector('.vjs-font-family select'), values.fontFamily);
    setSelectedOption(el.querySelector('.vjs-fg-color > select'), values.color);
    setSelectedOption(el.querySelector('.vjs-text-opacity > select'), values.textOpacity);
    setSelectedOption(el.querySelector('.vjs-bg-color > select'), values.backgroundColor);
    setSelectedOption(el.querySelector('.vjs-bg-opacity > select'), values.backgroundOpacity);
    setSelectedOption(el.querySelector('.window-color > select'), values.windowColor);
    setSelectedOption(el.querySelector('.vjs-window-opacity > select'), values.windowOpacity);

    var fontPercent = values.fontPercent;

    if (fontPercent) {
      fontPercent = fontPercent.toFixed(2);
    }

    setSelectedOption(el.querySelector('.vjs-font-percent > select'), fontPercent);
  };

  TextTrackSettings.prototype.restoreSettings = function restoreSettings() {
    var _safeParseTuple = _safeParseTuple3['default'](_window2['default'].localStorage.getItem('vjs-text-track-settings'));

    var err = _safeParseTuple[0];
    var values = _safeParseTuple[1];

    if (err) {
      _log2['default'].error(err);
    }

    if (values) {
      this.setValues(values);
    }
  };

  TextTrackSettings.prototype.saveSettings = function saveSettings() {
    if (!this.player_.options().persistTextTrackSettings) {
      return;
    }

    var values = this.getValues();
    try {
      if (Object.getOwnPropertyNames(values).length > 0) {
        _window2['default'].localStorage.setItem('vjs-text-track-settings', JSON.stringify(values));
      } else {
        _window2['default'].localStorage.removeItem('vjs-text-track-settings');
      }
    } catch (e) {}
  };

  TextTrackSettings.prototype.updateDisplay = function updateDisplay() {
    var ttDisplay = this.player_.getChild('textTrackDisplay');
    if (ttDisplay) {
      ttDisplay.updateDisplay();
    }
  };

  return TextTrackSettings;
})(_Component3['default']);

_Component3['default'].registerComponent('TextTrackSettings', TextTrackSettings);

function getSelectedOptionValue(target) {
  var selectedOption = undefined;
  // not all browsers support selectedOptions, so, fallback to options
  if (target.selectedOptions) {
    selectedOption = target.selectedOptions[0];
  } else if (target.options) {
    selectedOption = target.options[target.options.selectedIndex];
  }

  return selectedOption.value;
}

function setSelectedOption(target, value) {
  if (!value) {
    return;
  }

  var i = undefined;
  for (i = 0; i < target.options.length; i++) {
    var option = target.options[i];
    if (option.value === value) {
      break;
    }
  }

  target.selectedIndex = i;
}

function captionOptionsMenuTemplate() {
  var template = '<div class="vjs-tracksettings">\n      <div class="vjs-tracksettings-colors">\n        <div class="vjs-fg-color vjs-tracksetting">\n            <label class="vjs-label">Foreground</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <select>\n                <option value="">---</option>\n                <option value="1">Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n        </div> <!-- vjs-fg-color -->\n        <div class="vjs-bg-color vjs-tracksetting">\n            <label class="vjs-label">Background</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-bg-color -->\n        <div class="window-color vjs-tracksetting">\n            <label class="vjs-label">Window</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-window-color -->\n      </div> <!-- vjs-tracksettings -->\n      <div class="vjs-tracksettings-font">\n        <div class="vjs-font-percent vjs-tracksetting">\n          <label class="vjs-label">Font Size</label>\n          <select>\n            <option value="0.50">50%</option>\n            <option value="0.75">75%</option>\n            <option value="1.00" selected>100%</option>\n            <option value="1.25">125%</option>\n            <option value="1.50">150%</option>\n            <option value="1.75">175%</option>\n            <option value="2.00">200%</option>\n            <option value="3.00">300%</option>\n            <option value="4.00">400%</option>\n          </select>\n        </div> <!-- vjs-font-percent -->\n        <div class="vjs-edge-style vjs-tracksetting">\n          <label class="vjs-label">Text Edge Style</label>\n          <select>\n            <option value="none">None</option>\n            <option value="raised">Raised</option>\n            <option value="depressed">Depressed</option>\n            <option value="uniform">Uniform</option>\n            <option value="dropshadow">Dropshadow</option>\n          </select>\n        </div> <!-- vjs-edge-style -->\n        <div class="vjs-font-family vjs-tracksetting">\n          <label class="vjs-label">Font Family</label>\n          <select>\n            <option value="">Default</option>\n            <option value="monospaceSerif">Monospace Serif</option>\n            <option value="proportionalSerif">Proportional Serif</option>\n            <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n            <option value="proportionalSansSerif">Proportional Sans-Serif</option>\n            <option value="casual">Casual</option>\n            <option value="script">Script</option>\n            <option value="small-caps">Small Caps</option>\n          </select>\n        </div> <!-- vjs-font-family -->\n      </div>\n    </div>\n    <div class="vjs-tracksettings-controls">\n      <button class="vjs-default-button">Defaults</button>\n      <button class="vjs-done-button">Done</button>\n    </div>';

  return template;
}

exports['default'] = TextTrackSettings;
module.exports = exports['default'];

},{"../component":52,"../utils/events.js":111,"../utils/fn.js":112,"../utils/log.js":115,"global/window":2,"safe-json-parse/tuple":49}],107:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _TextTrackCueList = _dereq_('./text-track-cue-list');

var _TextTrackCueList2 = _interopRequireWildcard(_TextTrackCueList);

var _import = _dereq_('../utils/fn.js');

var Fn = _interopRequireWildcard(_import);

var _import2 = _dereq_('../utils/guid.js');

var Guid = _interopRequireWildcard(_import2);

var _import3 = _dereq_('../utils/browser.js');

var browser = _interopRequireWildcard(_import3);

var _import4 = _dereq_('./text-track-enums');

var TextTrackEnum = _interopRequireWildcard(_import4);

var _log = _dereq_('../utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _EventEmitter = _dereq_('../event-emitter');

var _EventEmitter2 = _interopRequireWildcard(_EventEmitter);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _XHR = _dereq_('../xhr.js');

var _XHR2 = _interopRequireWildcard(_XHR);

/*
 * https://html.spec.whatwg.org/multipage/embedded-content.html#texttrack
 *
 * interface TextTrack : EventTarget {
 *   readonly attribute TextTrackKind kind;
 *   readonly attribute DOMString label;
 *   readonly attribute DOMString language;
 *
 *   readonly attribute DOMString id;
 *   readonly attribute DOMString inBandMetadataTrackDispatchType;
 *
 *   attribute TextTrackMode mode;
 *
 *   readonly attribute TextTrackCueList? cues;
 *   readonly attribute TextTrackCueList? activeCues;
 *
 *   void addCue(TextTrackCue cue);
 *   void removeCue(TextTrackCue cue);
 *
 *   attribute EventHandler oncuechange;
 * };
 */
var TextTrack = (function (_TextTrack) {
  function TextTrack() {
    return _TextTrack.apply(this, arguments);
  }

  TextTrack.toString = function () {
    return _TextTrack.toString();
  };

  return TextTrack;
})(function () {
  var options = arguments[0] === undefined ? {} : arguments[0];

  if (!options.tech) {
    throw new Error('A tech was not provided.');
  }

  var tt = this;
  if (browser.IS_IE8) {
    tt = _document2['default'].createElement('custom');

    for (var prop in TextTrack.prototype) {
      tt[prop] = TextTrack.prototype[prop];
    }
  }

  tt.tech_ = options.tech;

  var mode = TextTrackEnum.TextTrackMode[options.mode] || 'disabled';
  var kind = TextTrackEnum.TextTrackKind[options.kind] || 'subtitles';
  var label = options.label || '';
  var language = options.language || options.srclang || '';
  var id = options.id || 'vjs_text_track_' + Guid.newGUID();

  if (kind === 'metadata' || kind === 'chapters') {
    mode = 'hidden';
  }

  tt.cues_ = [];
  tt.activeCues_ = [];

  var cues = new _TextTrackCueList2['default'](tt.cues_);
  var activeCues = new _TextTrackCueList2['default'](tt.activeCues_);

  var changed = false;
  var timeupdateHandler = Fn.bind(tt, function () {
    this.activeCues;
    if (changed) {
      this.trigger('cuechange');
      changed = false;
    }
  });
  if (mode !== 'disabled') {
    tt.tech_.on('timeupdate', timeupdateHandler);
  }

  Object.defineProperty(tt, 'kind', {
    get: function get() {
      return kind;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'label', {
    get: function get() {
      return label;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'language', {
    get: function get() {
      return language;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'id', {
    get: function get() {
      return id;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'mode', {
    get: function get() {
      return mode;
    },
    set: function set(newMode) {
      if (!TextTrackEnum.TextTrackMode[newMode]) {
        return;
      }
      mode = newMode;
      if (mode === 'showing') {
        this.tech_.on('timeupdate', timeupdateHandler);
      }
      this.trigger('modechange');
    }
  });

  Object.defineProperty(tt, 'cues', {
    get: function get() {
      if (!this.loaded_) {
        return null;
      }

      return cues;
    },
    set: Function.prototype
  });

  Object.defineProperty(tt, 'activeCues', {
    get: function get() {
      if (!this.loaded_) {
        return null;
      }

      if (this.cues.length === 0) {
        return activeCues; // nothing to do
      }

      var ct = this.tech_.currentTime();
      var active = [];

      for (var i = 0, l = this.cues.length; i < l; i++) {
        var cue = this.cues[i];
        if (cue.startTime <= ct && cue.endTime >= ct) {
          active.push(cue);
        } else if (cue.startTime === cue.endTime && cue.startTime <= ct && cue.startTime + 0.5 >= ct) {
          active.push(cue);
        }
      }

      changed = false;

      if (active.length !== this.activeCues_.length) {
        changed = true;
      } else {
        for (var i = 0; i < active.length; i++) {
          if (indexOf.call(this.activeCues_, active[i]) === -1) {
            changed = true;
          }
        }
      }

      this.activeCues_ = active;
      activeCues.setCues_(this.activeCues_);

      return activeCues;
    },
    set: Function.prototype
  });

  if (options.src) {
    loadTrack(options.src, tt);
  } else {
    tt.loaded_ = true;
  }

  if (browser.IS_IE8) {
    return tt;
  }
});

TextTrack.prototype = Object.create(_EventEmitter2['default'].prototype);
TextTrack.prototype.constructor = TextTrack;

/*
 * cuechange - One or more cues in the track have become active or stopped being active.
 */
TextTrack.prototype.allowedEvents_ = {
  cuechange: 'cuechange'
};

TextTrack.prototype.addCue = function (cue) {
  var tracks = this.tech_.textTracks();

  if (tracks) {
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i] !== this) {
        tracks[i].removeCue(cue);
      }
    }
  }

  this.cues_.push(cue);
  this.cues.setCues_(this.cues_);
};

TextTrack.prototype.removeCue = function (removeCue) {
  var removed = false;

  for (var i = 0, l = this.cues_.length; i < l; i++) {
    var cue = this.cues_[i];
    if (cue === removeCue) {
      this.cues_.splice(i, 1);
      removed = true;
    }
  }

  if (removed) {
    this.cues.setCues_(this.cues_);
  }
};

/*
 * Downloading stuff happens below this point
 */
var parseCues = (function (_parseCues) {
  function parseCues(_x, _x2) {
    return _parseCues.apply(this, arguments);
  }

  parseCues.toString = function () {
    return _parseCues.toString();
  };

  return parseCues;
})(function (srcContent, track) {
  if (typeof _window2['default'].WebVTT !== 'function') {
    //try again a bit later
    return _window2['default'].setTimeout(function () {
      parseCues(srcContent, track);
    }, 25);
  }

  var parser = new _window2['default'].WebVTT.Parser(_window2['default'], _window2['default'].vttjs, _window2['default'].WebVTT.StringDecoder());

  parser.oncue = function (cue) {
    track.addCue(cue);
  };
  parser.onparsingerror = function (error) {
    _log2['default'].error(error);
  };

  parser.parse(srcContent);
  parser.flush();
});

var loadTrack = function loadTrack(src, track) {
  _XHR2['default'](src, Fn.bind(this, function (err, response, responseBody) {
    if (err) {
      return _log2['default'].error(err);
    }

    track.loaded_ = true;
    parseCues(responseBody, track);
  }));
};

var indexOf = function indexOf(searchElement, fromIndex) {
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }

  var O = Object(this);

  var len = O.length >>> 0;

  if (len === 0) {
    return -1;
  }

  var n = +fromIndex || 0;

  if (Math.abs(n) === Infinity) {
    n = 0;
  }

  if (n >= len) {
    return -1;
  }

  var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    if (k in O && O[k] === searchElement) {
      return k;
    }
    k++;
  }
  return -1;
};

exports['default'] = TextTrack;
module.exports = exports['default'];

},{"../event-emitter":83,"../utils/browser.js":108,"../utils/fn.js":112,"../utils/guid.js":114,"../utils/log.js":115,"../xhr.js":122,"./text-track-cue-list":102,"./text-track-enums":104,"global/document":1,"global/window":2}],108:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var USER_AGENT = _window2['default'].navigator.userAgent;

/**
 * Device is an iPhone
 * @type {Boolean}
 * @constant
 * @private
 */
var IS_IPHONE = /iPhone/i.test(USER_AGENT);
exports.IS_IPHONE = IS_IPHONE;
var IS_IPAD = /iPad/i.test(USER_AGENT);
exports.IS_IPAD = IS_IPAD;
var IS_IPOD = /iPod/i.test(USER_AGENT);
exports.IS_IPOD = IS_IPOD;
var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;

exports.IS_IOS = IS_IOS;
var IOS_VERSION = (function () {
  var match = USER_AGENT.match(/OS (\d+)_/i);
  if (match && match[1]) {
    return match[1];
  }
})();

exports.IOS_VERSION = IOS_VERSION;
var IS_ANDROID = /Android/i.test(USER_AGENT);
exports.IS_ANDROID = IS_ANDROID;
var ANDROID_VERSION = (function () {
  // This matches Android Major.Minor.Patch versions
  // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
  var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
      major,
      minor;

  if (!match) {
    return null;
  }

  major = match[1] && parseFloat(match[1]);
  minor = match[2] && parseFloat(match[2]);

  if (major && minor) {
    return parseFloat(match[1] + '.' + match[2]);
  } else if (major) {
    return major;
  } else {
    return null;
  }
})();
exports.ANDROID_VERSION = ANDROID_VERSION;
// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
var IS_OLD_ANDROID = IS_ANDROID && /webkit/i.test(USER_AGENT) && ANDROID_VERSION < 2.3;

exports.IS_OLD_ANDROID = IS_OLD_ANDROID;
var IS_FIREFOX = /Firefox/i.test(USER_AGENT);
exports.IS_FIREFOX = IS_FIREFOX;
var IS_CHROME = /Chrome/i.test(USER_AGENT);
exports.IS_CHROME = IS_CHROME;
var IS_IE8 = /MSIE\s8\.0/.test(USER_AGENT);

exports.IS_IE8 = IS_IE8;
var TOUCH_ENABLED = !!('ontouchstart' in _window2['default'] || _window2['default'].DocumentTouch && _document2['default'] instanceof _window2['default'].DocumentTouch);
exports.TOUCH_ENABLED = TOUCH_ENABLED;
var BACKGROUND_SIZE_SUPPORTED = ('backgroundSize' in _document2['default'].createElement('video').style);
exports.BACKGROUND_SIZE_SUPPORTED = BACKGROUND_SIZE_SUPPORTED;

},{"global/document":1,"global/window":2}],109:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

/**
 * Compute how much your video has been buffered
 * @param  {Object} Buffered object
 * @param  {Number} Total duration
 * @return {Number} Percent buffered of the total duration
 * @private
 */
exports.bufferedPercent = bufferedPercent;

var _createTimeRange = _dereq_('./time-ranges.js');

function bufferedPercent(buffered, duration) {
  var bufferedDuration = 0,
      start,
      end;

  if (!duration) {
    return 0;
  }

  if (!buffered || !buffered.length) {
    buffered = _createTimeRange.createTimeRange(0, 0);
  }

  for (var i = 0; i < buffered.length; i++) {
    start = buffered.start(i);
    end = buffered.end(i);

    // buffered end can be bigger than duration by a very small fraction
    if (end > duration) {
      end = duration;
    }

    bufferedDuration += end - start;
  }

  return bufferedDuration / duration;
}

},{"./time-ranges.js":118}],110:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

/**
 * Shorthand for document.getElementById()
 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
 * @param  {String} id  Element ID
 * @return {Element}    Element with supplied ID
 */
exports.getEl = getEl;

/**
 * Creates an element and applies properties.
 * @param  {String=} tagName    Name of tag to be created.
 * @param  {Object=} properties Element properties to be applied.
 * @return {Element}
 */
exports.createEl = createEl;

/**
 * Insert an element as the first child node of another
 * @param  {Element} child   Element to insert
 * @param  {[type]} parent Element to insert child into
 * @private
 */
exports.insertElFirst = insertElFirst;

/**
 * Returns the cache object where data for an element is stored
 * @param  {Element} el Element to store data for.
 * @return {Object}
 */
exports.getElData = getElData;

/**
 * Returns whether or not an element has cached data
 * @param  {Element} el A dom element
 * @return {Boolean}
 * @private
 */
exports.hasElData = hasElData;

/**
 * Delete data for the element from the cache and the guid attr from getElementById
 * @param  {Element} el Remove data for an element
 * @private
 */
exports.removeElData = removeElData;

/**
 * Check if an element has a CSS class
 * @param {Element} element Element to check
 * @param {String} classToCheck Classname to check
 */
exports.hasElClass = hasElClass;

/**
 * Add a CSS class name to an element
 * @param {Element} element    Element to add class name to
 * @param {String} classToAdd Classname to add
 */
exports.addElClass = addElClass;

/**
 * Remove a CSS class name from an element
 * @param {Element} element    Element to remove from class name
 * @param {String} classToAdd Classname to remove
 */
exports.removeElClass = removeElClass;

/**
 * Apply attributes to an HTML element.
 * @param  {Element} el         Target element.
 * @param  {Object=} attributes Element attributes to be applied.
 * @private
 */
exports.setElAttributes = setElAttributes;

/**
 * Get an element's attribute values, as defined on the HTML tag
 * Attributes are not the same as properties. They're defined on the tag
 * or with setAttribute (which shouldn't be used with HTML)
 * This will return true or false for boolean attributes.
 * @param  {Element} tag Element from which to get tag attributes
 * @return {Object}
 * @private
 */
exports.getElAttributes = getElAttributes;

// Attempt to block the ability to select text while dragging controls
exports.blockTextSelection = blockTextSelection;

// Turn off text selection blocking
exports.unblockTextSelection = unblockTextSelection;

// Offset Left
// getBoundingClientRect technique from John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
exports.findElPosition = findElPosition;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _import = _dereq_('./guid.js');

var Guid = _interopRequireWildcard(_import);

var _roundFloat = _dereq_('./round-float.js');

var _roundFloat2 = _interopRequireWildcard(_roundFloat);

function getEl(id) {
  if (id.indexOf('#') === 0) {
    id = id.slice(1);
  }

  return _document2['default'].getElementById(id);
}

function createEl() {
  var tagName = arguments[0] === undefined ? 'div' : arguments[0];
  var properties = arguments[1] === undefined ? {} : arguments[1];

  var el = _document2['default'].createElement(tagName);

  Object.getOwnPropertyNames(properties).forEach(function (propName) {
    var val = properties[propName];

    // Not remembering why we were checking for dash
    // but using setAttribute means you have to use getAttribute

    // The check for dash checks for the aria-* attributes, like aria-label, aria-valuemin.
    // The additional check for "role" is because the default method for adding attributes does not
    // add the attribute "role". My guess is because it's not a valid attribute in some namespaces, although
    // browsers handle the attribute just fine. The W3C allows for aria-* attributes to be used in pre-HTML5 docs.
    // http://www.w3.org/TR/wai-aria-primer/#ariahtml. Using setAttribute gets around this problem.
    if (propName.indexOf('aria-') !== -1 || propName === 'role') {
      el.setAttribute(propName, val);
    } else {
      el[propName] = val;
    }
  });

  return el;
}

function insertElFirst(child, parent) {
  if (parent.firstChild) {
    parent.insertBefore(child, parent.firstChild);
  } else {
    parent.appendChild(child);
  }
}

/**
 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
 * Ex. Event listeners are stored here.
 * (also from jsninja.com, slightly modified and updated for closure compiler)
 * @type {Object}
 * @private
 */
var elData = {};

/**
 * Unique attribute name to store an element's guid in
 * @type {String}
 * @constant
 * @private
 */
var elIdAttr = 'vdata' + new Date().getTime();
function getElData(el) {
  var id = el[elIdAttr];

  if (!id) {
    id = el[elIdAttr] = Guid.newGUID();
  }

  if (!elData[id]) {
    elData[id] = {};
  }

  return elData[id];
}

function hasElData(el) {
  var id = el[elIdAttr];

  if (!id) {
    return false;
  }

  return !!Object.getOwnPropertyNames(elData[id]).length;
}

function removeElData(el) {
  var id = el[elIdAttr];

  if (!id) {
    return;
  }

  // Remove all stored data
  delete elData[id];

  // Remove the elIdAttr property from the DOM node
  try {
    delete el[elIdAttr];
  } catch (e) {
    if (el.removeAttribute) {
      el.removeAttribute(elIdAttr);
    } else {
      // IE doesn't appear to support removeAttribute on the document element
      el[elIdAttr] = null;
    }
  }
}

function hasElClass(element, classToCheck) {
  return (' ' + element.className + ' ').indexOf(' ' + classToCheck + ' ') !== -1;
}

function addElClass(element, classToAdd) {
  if (!hasElClass(element, classToAdd)) {
    element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
  }
}

function removeElClass(element, classToRemove) {
  if (!hasElClass(element, classToRemove)) {
    return;
  }

  var classNames = element.className.split(' ');

  // no arr.indexOf in ie8, and we don't want to add a big shim
  for (var i = classNames.length - 1; i >= 0; i--) {
    if (classNames[i] === classToRemove) {
      classNames.splice(i, 1);
    }
  }

  element.className = classNames.join(' ');
}

function setElAttributes(el, attributes) {
  Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
    var attrValue = attributes[attrName];

    if (attrValue === null || typeof attrValue === 'undefined' || attrValue === false) {
      el.removeAttribute(attrName);
    } else {
      el.setAttribute(attrName, attrValue === true ? '' : attrValue);
    }
  });
}

function getElAttributes(tag) {
  var obj, knownBooleans, attrs, attrName, attrVal;

  obj = {};

  // known boolean attributes
  // we can check for matching boolean properties, but older browsers
  // won't know about HTML5 boolean attributes that we still read from
  knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';

  if (tag && tag.attributes && tag.attributes.length > 0) {
    attrs = tag.attributes;

    for (var i = attrs.length - 1; i >= 0; i--) {
      attrName = attrs[i].name;
      attrVal = attrs[i].value;

      // check for known booleans
      // the matching element property will return a value for typeof
      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
        // the value of an included boolean attribute is typically an empty
        // string ('') which would equal false if we just check for a false value.
        // we also don't want support bad code like autoplay='false'
        attrVal = attrVal !== null ? true : false;
      }

      obj[attrName] = attrVal;
    }
  }

  return obj;
}

function blockTextSelection() {
  _document2['default'].body.focus();
  _document2['default'].onselectstart = function () {
    return false;
  };
}

function unblockTextSelection() {
  _document2['default'].onselectstart = function () {
    return true;
  };
}

function findElPosition(el) {
  var box = undefined;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  var docEl = _document2['default'].documentElement;
  var body = _document2['default'].body;

  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollLeft = _window2['default'].pageXOffset || body.scrollLeft;
  var left = box.left + scrollLeft - clientLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var scrollTop = _window2['default'].pageYOffset || body.scrollTop;
  var top = box.top + scrollTop - clientTop;

  // Android sometimes returns slightly off decimal values, so need to round
  return {
    left: _roundFloat2['default'](left),
    top: _roundFloat2['default'](top)
  };
}

},{"./guid.js":114,"./round-float.js":117,"global/document":1,"global/window":2}],111:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

/**
 * Add an event listener to element
 * It stores the handler function in a separate cache object
 * and adds a generic handler to the element's event,
 * along with a unique id (guid) to the element.
 * @param  {Element|Object}   elem Element or object to bind listeners to
 * @param  {String|Array}   type Type of event to bind to.
 * @param  {Function} fn   Event listener.
 */
exports.on = on;

/**
 * Removes event listeners from an element
 * @param  {Element|Object}   elem Object to remove listeners from
 * @param  {String|Array=}   type Type of listener to remove. Don't include to remove all events from element.
 * @param  {Function} fn   Specific listener to remove. Don't include to remove listeners for an event type.
 */
exports.off = off;

/**
 * Trigger an event for an element
 * @param  {Element|Object}      elem  Element to trigger an event on
 * @param  {Event|Object|String} event A string (the type) or an event object with a type attribute
 */
exports.trigger = trigger;

/**
 * Trigger a listener only once for an event
 * @param  {Element|Object}   elem Element or object to
 * @param  {String|Array}   type
 * @param  {Function} fn
 */
exports.one = one;

/**
 * Fix a native event to have standard property values
 * @param  {Object} event Event object to fix
 * @return {Object}
 * @private
 */
exports.fixEvent = fixEvent;
/**
 * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
 * robust as jquery's, so there's probably some differences.
 */

var _import = _dereq_('./dom.js');

var Dom = _interopRequireWildcard(_import);

var _import2 = _dereq_('./guid.js');

var Guid = _interopRequireWildcard(_import2);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

function on(elem, type, fn) {
  if (Array.isArray(type)) {
    return _handleMultipleEvents(on, elem, type, fn);
  }

  var data = Dom.getElData(elem);

  // We need a place to store all our handler data
  if (!data.handlers) data.handlers = {};

  if (!data.handlers[type]) data.handlers[type] = [];

  if (!fn.guid) fn.guid = Guid.newGUID();

  data.handlers[type].push(fn);

  if (!data.dispatcher) {
    data.disabled = false;

    data.dispatcher = function (event) {

      if (data.disabled) return;
      event = fixEvent(event);

      var handlers = data.handlers[event.type];

      if (handlers) {
        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
        var handlersCopy = handlers.slice(0);

        for (var m = 0, n = handlersCopy.length; m < n; m++) {
          if (event.isImmediatePropagationStopped()) {
            break;
          } else {
            handlersCopy[m].call(elem, event);
          }
        }
      }
    };
  }

  if (data.handlers[type].length === 1) {
    if (elem.addEventListener) {
      elem.addEventListener(type, data.dispatcher, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, data.dispatcher);
    }
  }
}

function off(elem, type, fn) {
  // Don't want to add a cache object through getElData if not needed
  if (!Dom.hasElData(elem)) {
    return;
  }var data = Dom.getElData(elem);

  // If no events exist, nothing to unbind
  if (!data.handlers) {
    return;
  }

  if (Array.isArray(type)) {
    return _handleMultipleEvents(off, elem, type, fn);
  }

  // Utility function
  var removeType = function removeType(t) {
    data.handlers[t] = [];
    _cleanUpEvents(elem, t);
  };

  // Are we removing all bound events?
  if (!type) {
    for (var t in data.handlers) {
      removeType(t);
    }return;
  }

  var handlers = data.handlers[type];

  // If no handlers exist, nothing to unbind
  if (!handlers) {
    return;
  } // If no listener was provided, remove all listeners for type
  if (!fn) {
    removeType(type);
    return;
  }

  // We're only removing a single handler
  if (fn.guid) {
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }

  _cleanUpEvents(elem, type);
}

function trigger(elem, event) {
  // Fetches element data and a reference to the parent (for bubbling).
  // Don't want to add a data object to cache for every parent,
  // so checking hasElData first.
  var elemData = Dom.hasElData(elem) ? Dom.getElData(elem) : {};
  var parent = elem.parentNode || elem.ownerDocument;
  // type = event.type || event,
  // handler;

  // If an event name was passed as a string, creates an event out of it
  if (typeof event === 'string') {
    event = { type: event, target: elem };
  }
  // Normalizes the event properties.
  event = fixEvent(event);

  // If the passed element has a dispatcher, executes the established handlers.
  if (elemData.dispatcher) {
    elemData.dispatcher.call(elem, event);
  }

  // Unless explicitly stopped or the event does not bubble (e.g. media events)
  // recursively calls this function to bubble the event up the DOM.
  if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
    trigger(parent, event);

    // If at the top of the DOM, triggers the default action unless disabled.
  } else if (!parent && !event.defaultPrevented) {
    var targetData = Dom.getElData(event.target);

    // Checks if the target has a default action for this event.
    if (event.target[event.type]) {
      // Temporarily disables event dispatching on the target as we have already executed the handler.
      targetData.disabled = true;
      // Executes the default action.
      if (typeof event.target[event.type] === 'function') {
        event.target[event.type]();
      }
      // Re-enables event dispatching.
      targetData.disabled = false;
    }
  }

  // Inform the triggerer if the default was prevented by returning false
  return !event.defaultPrevented;
}

function one(elem, type, fn) {
  if (Array.isArray(type)) {
    return _handleMultipleEvents(one, elem, type, fn);
  }
  var func = (function (_func) {
    function func() {
      return _func.apply(this, arguments);
    }

    func.toString = function () {
      return _func.toString();
    };

    return func;
  })(function () {
    off(elem, type, func);
    fn.apply(this, arguments);
  });
  // copy the guid to the new function so it can removed using the original function's ID
  func.guid = fn.guid = fn.guid || Guid.newGUID();
  on(elem, type, func);
}

function fixEvent(event) {

  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }

  // Test if fixing up is needed
  // Used to check if !event.stopPropagation instead of isPropagationStopped
  // But native events return true for stopPropagation, but don't have
  // other expected methods like isPropagationStopped. Seems to be a problem
  // with the Javascript Ninja code. So we're just overriding all events now.
  if (!event || !event.isPropagationStopped) {
    var old = event || _window2['default'].event;

    event = {};
    // Clone the old object so that we can modify the values event = {};
    // IE8 Doesn't like when you mess with native event properties
    // Firefox returns false for event.hasOwnProperty('type') and other props
    //  which makes copying more difficult.
    // TODO: Probably best to create a whitelist of event props
    for (var key in old) {
      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
      // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
      if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation') {
        // Chrome 32+ warns if you try to copy deprecated returnValue, but
        // we still want to if preventDefault isn't supported (IE8).
        if (!(key === 'returnValue' && old.preventDefault)) {
          event[key] = old[key];
        }
      }
    }

    // The event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || _document2['default'];
    }

    // Handle which other element the event is related to
    event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

    // Stop the default browser action
    event.preventDefault = function () {
      if (old.preventDefault) {
        old.preventDefault();
      }
      event.returnValue = false;
      event.defaultPrevented = true;
    };

    event.defaultPrevented = false;

    // Stop the event from bubbling
    event.stopPropagation = function () {
      if (old.stopPropagation) {
        old.stopPropagation();
      }
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    event.isPropagationStopped = returnFalse;

    // Stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function () {
      if (old.stopImmediatePropagation) {
        old.stopImmediatePropagation();
      }
      event.isImmediatePropagationStopped = returnTrue;
      event.stopPropagation();
    };

    event.isImmediatePropagationStopped = returnFalse;

    // Handle mouse position
    if (event.clientX != null) {
      var doc = _document2['default'].documentElement,
          body = _document2['default'].body;

      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // Handle key presses
    event.which = event.charCode || event.keyCode;

    // Fix button for mouse clicks:
    // 0 == left; 1 == middle; 2 == right
    if (event.button != null) {
      event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
    }
  }

  // Returns fixed-up instance
  return event;
}

/**
 * Clean up the listener cache and dispatchers
 * @param  {Element|Object} elem Element to clean up
 * @param  {String} type Type of event to clean up
 * @private
 */
function _cleanUpEvents(elem, type) {
  var data = Dom.getElData(elem);

  // Remove the events of a particular type if there are none left
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    // data.handlers[type] = null;
    // Setting to null was causing an error with data.handlers

    // Remove the meta-handler from the element
    if (elem.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, data.dispatcher);
    }
  }

  // Remove the events object if there are no types left
  if (Object.getOwnPropertyNames(data.handlers).length <= 0) {
    delete data.handlers;
    delete data.dispatcher;
    delete data.disabled;
  }

  // Finally remove the element data if there is no data left
  if (Object.getOwnPropertyNames(data).length === 0) {
    Dom.removeElData(elem);
  }
}

/**
 * Loops through an array of event types and calls the requested method for each type.
 * @param  {Function} fn   The event method we want to use.
 * @param  {Element|Object} elem Element or object to bind listeners to
 * @param  {String}   type Type of event to bind to.
 * @param  {Function} callback   Event listener.
 * @private
 */
function _handleMultipleEvents(fn, elem, types, callback) {
  types.forEach(function (type) {
    //Call the event method for each one of the types
    fn(elem, type, callback);
  });
}

},{"./dom.js":110,"./guid.js":114,"global/document":1,"global/window":2}],112:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;

var _newGUID = _dereq_('./guid.js');

/**
 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
   It also stores a unique id on the function so it can be easily removed from events
 * @param  {*}   context The object to bind as scope
 * @param  {Function} fn      The function to be bound to a scope
 * @param  {Number=}   uid     An optional unique ID for the function to be set
 * @return {Function}
 * @private
 */
var bind = function bind(context, fn, uid) {
  // Make sure the function has a unique ID
  if (!fn.guid) {
    fn.guid = _newGUID.newGUID();
  }

  // Create the new function that changes the context
  var ret = function ret() {
    return fn.apply(context, arguments);
  };

  // Allow for the ability to individualize this function
  // Needed in the case where multiple objects might share the same prototype
  // IF both items add an event listener with the same function, then you try to remove just one
  // it will remove both because they both have the same guid.
  // when using this, you need to use the bind method when you remove the listener as well.
  // currently used in text tracks
  ret.guid = uid ? uid + '_' + fn.guid : fn.guid;

  return ret;
};
exports.bind = bind;

},{"./guid.js":114}],113:[function(_dereq_,module,exports){
'use strict';

exports.__esModule = true;
/**
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 */
function formatTime(seconds) {
  var guide = arguments[1] === undefined ? seconds : arguments[1];
  return (function () {
    var s = Math.floor(seconds % 60);
    var m = Math.floor(seconds / 60 % 60);
    var h = Math.floor(seconds / 3600);
    var gm = Math.floor(guide / 60 % 60);
    var gh = Math.floor(guide / 3600);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
      // '-' is false for all relational operators (e.g. <, >=) so this setting
      // will add the minimum number of fields specified by the guide
      h = m = s = '-';
    }

    // Check if we need to show hours
    h = h > 0 || gh > 0 ? h + ':' : '';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = s < 10 ? '0' + s : s;

    return h + m + s;
  })();
}

exports['default'] = formatTime;
module.exports = exports['default'];

},{}],114:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

/**
 * Get the next unique ID
 */
exports.newGUID = newGUID;
/**
 * Unique ID for an element or function
 * @type {Number}
 * @private
 */
var _guid = 1;
function newGUID() {
  return _guid++;
}

},{}],115:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

/**
 * Log plain debug messages
 */
var log = function log() {
  _logType(null, arguments);
};

/**
 * Keep a history of log messages
 * @type {Array}
 */
log.history = [];

/**
 * Log error messages
 */
log.error = function () {
  _logType('error', arguments);
};

/**
 * Log warning messages
 */
log.warn = function () {
  _logType('warn', arguments);
};

/**
 * Log messages to the console and history based on the type of message
 *
 * @param  {String} type The type of message, or `null` for `log`
 * @param  {[type]} args The args to be passed to the log
 * @private
 */
function _logType(type, args) {
  // convert args to an array to get array functions
  var argsArray = Array.prototype.slice.call(args);
  // if there's no console then don't try to output messages
  // they will still be stored in log.history
  // Was setting these once outside of this function, but containing them
  // in the function makes it easier to test cases where console doesn't exist
  var noop = function noop() {};

  var console = _window2['default'].console || {
    log: noop,
    warn: noop,
    error: noop
  };

  if (type) {
    // add the type to the front of the message
    argsArray.unshift(type.toUpperCase() + ':');
  } else {
    // default to log with no prefix
    type = 'log';
  }

  // add to history
  log.history.push(argsArray);

  // add console prefix after adding to history
  argsArray.unshift('VIDEOJS:');

  // call appropriate log function
  if (console[type].apply) {
    console[type].apply(console, argsArray);
  } else {
    // ie8 doesn't allow error.apply, but it will just join() the array anyway
    console[type](argsArray.join(' '));
  }
}

exports['default'] = log;
module.exports = exports['default'];

},{"global/window":2}],116:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

/**
 * Merge two options objects, recursively merging **only** plain object
 * properties.  Previously `deepMerge`.
 *
 * @param  {Object} object    The destination object
 * @param  {...Object} source One or more objects to merge into the first
 *
 * @returns {Object}          The updated first object
 */
exports['default'] = mergeOptions;

var _merge = _dereq_('lodash-compat/object/merge');

var _merge2 = _interopRequireWildcard(_merge);

function isPlain(obj) {
  return !!obj && typeof obj === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
}
function mergeOptions() {
  var object = arguments[0] === undefined ? {} : arguments[0];

  // Allow for infinite additional object args to merge
  Array.prototype.slice.call(arguments, 1).forEach(function (source) {

    // Recursively merge only plain objects
    // All other values will be directly copied
    _merge2['default'](object, source, function (a, b) {

      // If we're not working with a plain object, copy the value as is
      if (!isPlain(b)) {
        return b;
      }

      // If the new value is a plain object but the first object value is not
      // we need to create a new object for the first object to merge with.
      // This makes it consistent with how merge() works by default
      // and also protects from later changes the to first object affecting
      // the second object's values.
      if (!isPlain(a)) {
        return mergeOptions({}, b);
      }
    });
  });

  return object;
}

module.exports = exports['default'];

},{"lodash-compat/object/merge":40}],117:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
/**
 * Should round off a number to a decimal place
 * @param  {Number} num Number to round
 * @param  {Number} dec Number of decimal places to round to
 * @return {Number}     Rounded number
 * @private
 */
var roundFloat = function roundFloat(num) {
  var dec = arguments[1] === undefined ? 0 : arguments[1];

  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

exports["default"] = roundFloat;
module.exports = exports["default"];

},{}],118:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
/**
 * Should create a fake TimeRange object
 * Mimics an HTML5 time range instance, which has functions that
 * return the start and end times for a range
 * TimeRanges are returned by the buffered() method
 * @param  {Number} start Start time in seconds
 * @param  {Number} end   End time in seconds
 * @return {Object}       Fake TimeRange object
 * @private
 */
exports.createTimeRange = createTimeRange;

function createTimeRange(start, end) {
  return {
    length: 1,
    start: (function (_start) {
      function start() {
        return _start.apply(this, arguments);
      }

      start.toString = function () {
        return _start.toString();
      };

      return start;
    })(function () {
      return start;
    }),
    end: (function (_end) {
      function end() {
        return _end.apply(this, arguments);
      }

      end.toString = function () {
        return _end.toString();
      };

      return end;
    })(function () {
      return end;
    })
  };
}

},{}],119:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;
/**
 * Uppercase the first letter of a string
 * @param  {String} string String to be uppercased
 * @return {String}
 * @private
 */
function toTitleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports["default"] = toTitleCase;
module.exports = exports["default"];

},{}],120:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

/**
 * Resolve and parse the elements of a URL
 * @param  {String} url The url to parse
 * @return {Object}     An object of url details
 */
var parseUrl = function parseUrl(url) {
  var props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];

  // add the url to an anchor and let the browser parse the URL
  var a = _document2['default'].createElement('a');
  a.href = url;

  // IE8 (and 9?) Fix
  // ie8 doesn't parse the URL correctly until the anchor is actually
  // added to the body, and an innerHTML is needed to trigger the parsing
  var addToBody = a.host === '' && a.protocol !== 'file:';
  var div = undefined;
  if (addToBody) {
    div = _document2['default'].createElement('div');
    div.innerHTML = '<a href="' + url + '"></a>';
    a = div.firstChild;
    // prevent the div from affecting layout
    div.setAttribute('style', 'display:none; position:absolute;');
    _document2['default'].body.appendChild(div);
  }

  // Copy the specific URL properties to a new object
  // This is also needed for IE8 because the anchor loses its
  // properties when it's removed from the dom
  var details = {};
  for (var i = 0; i < props.length; i++) {
    details[props[i]] = a[props[i]];
  }

  // IE9 adds the port to the host property unlike everyone else. If
  // a port identifier is added for standard ports, strip it.
  if (details.protocol === 'http:') {
    details.host = details.host.replace(/:80$/, '');
  }
  if (details.protocol === 'https:') {
    details.host = details.host.replace(/:443$/, '');
  }

  if (addToBody) {
    _document2['default'].body.removeChild(div);
  }

  return details;
};

exports.parseUrl = parseUrl;
/**
 * Get absolute version of relative URL. Used to tell flash correct URL.
 * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 * @param  {String} url URL to make absolute
 * @return {String}     Absolute URL
 * @private
 */
var getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
    var div = _document2['default'].createElement('div');
    div.innerHTML = '<a href="' + url + '">x</a>';
    url = div.firstChild.href;
  }

  return url;
};

exports.getAbsoluteURL = getAbsoluteURL;
/**
 * Returns the extension of the passed file name. It will return an empty string if you pass an invalid path
 *
 * @param {String}    path    The fileName path like '/path/to/file.mp4'
 * @returns {String}          The extension in lower case or an empty string if no extension could be found.
 */
var getFileExtension = function getFileExtension(path) {
  if (typeof path === 'string') {
    var splitPathRe = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i;
    var pathParts = splitPathRe.exec(path);

    if (pathParts) {
      return pathParts.pop().toLowerCase();
    }
  }

  return '';
};
exports.getFileExtension = getFileExtension;

},{"global/document":1}],121:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _document = _dereq_('global/document');

var _document2 = _interopRequireWildcard(_document);

var _import = _dereq_('./setup');

var setup = _interopRequireWildcard(_import);

var _Component = _dereq_('./component');

var _Component2 = _interopRequireWildcard(_Component);

var _globalOptions = _dereq_('./global-options.js');

var _globalOptions2 = _interopRequireWildcard(_globalOptions);

var _Player = _dereq_('./player');

var _Player2 = _interopRequireWildcard(_Player);

var _plugin = _dereq_('./plugins.js');

var _plugin2 = _interopRequireWildcard(_plugin);

var _mergeOptions = _dereq_('../../src/js/utils/merge-options.js');

var _mergeOptions2 = _interopRequireWildcard(_mergeOptions);

var _assign = _dereq_('object.assign');

var _assign2 = _interopRequireWildcard(_assign);

var _log = _dereq_('./utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _import2 = _dereq_('./utils/dom.js');

var Dom = _interopRequireWildcard(_import2);

var _import3 = _dereq_('./utils/browser.js');

var browser = _interopRequireWildcard(_import3);

var _extendsFn = _dereq_('./extends.js');

var _extendsFn2 = _interopRequireWildcard(_extendsFn);

var _merge2 = _dereq_('lodash-compat/object/merge');

var _merge3 = _interopRequireWildcard(_merge2);

// Include the built-in techs

var _Html5 = _dereq_('./tech/html5.js');

var _Html52 = _interopRequireWildcard(_Html5);

var _Flash = _dereq_('./tech/flash.js');

var _Flash2 = _interopRequireWildcard(_Flash);

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
  _document2['default'].createElement('video');
  _document2['default'].createElement('audio');
  _document2['default'].createElement('track');
}

/**
 * Doubles as the main function for users to create a player instance and also
 * the main library object.
 *
 * The `videojs` function can be used to initialize or retrieve a player.
 *
 *     var myPlayer = videojs('my_video_id');
 *
 * @param  {String|Element} id      Video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @param  {Function=} ready        Optional ready callback
 * @return {Player}             A player instance
 * @namespace
 */
var videojs = function videojs(id, options, ready) {
  var tag; // Element of ID

  // Allow for element or ID to be passed in
  // String ID
  if (typeof id === 'string') {

    // Adjust for jQuery ID syntax
    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    // If a player instance has already been created for this ID return it.
    if (_Player2['default'].players[id]) {

      // If options or ready funtion are passed, warn
      if (options) {
        _log2['default'].warn('Player "' + id + '" is already initialised. Options will not be applied.');
      }

      if (ready) {
        _Player2['default'].players[id].ready(ready);
      }

      return _Player2['default'].players[id];

      // Otherwise get element for ID
    } else {
      tag = Dom.getEl(id);
    }

    // ID is a media element
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) {
    // re: nodeName, could be a box div also
    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
  }

  // Element may have a player attr referring to an already created player instance.
  // If not, set up a new player and return the instance.
  return tag.player || new _Player2['default'](tag, options, ready);
};

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
setup.autoSetupTimeout(1, videojs);

/**
 * Current software version (semver)
 * @type {String}
 */
videojs.VERSION = '5.0.0-29';

/**
 * Get the global options object
 *
 * @returns {Object} The global options object
 */
videojs.getGlobalOptions = function () {
  return _globalOptions2['default'];
};

/**
 * Set options that will apply to every player
 *
 *     videojs.setGlobalOptions({
 *       autoplay: true
 *     });
 *     // -> all players will autoplay by default
 *
 * NOTE: This will do a deep merge with the new options,
 * not overwrite the entire global options object.
 *
 * @returns {Object} The updated global options object
 */
videojs.setGlobalOptions = function (newOptions) {
  return _mergeOptions2['default'](_globalOptions2['default'], newOptions);
};

// Set CDN Version of swf
var MINOR_VERSION = '5.0';
var ACCESS_PROTOCOL = 'https:' === _document2['default'].location.protocol ? 'https://' : 'http://';

// The added (+) blocks the replace from changing this _VERSION_NO_PATCH_ string
if (MINOR_VERSION !== '__VERSION_' + 'NO_PATCH__') {
  _globalOptions2['default'].flash.swf = '' + ACCESS_PROTOCOL + 'vjs.zencdn.net/' + MINOR_VERSION + '/video-js.swf';
}

/**
 * Get an object with the currently created players, keyed by player ID
 *
 * @returns {Object} The created players
 */
videojs.getPlayers = function () {
  return _Player2['default'].players;
};

/**
 * Get a component class object by name
 *
 *     var VjsButton = videojs.getComponent('Button');
 *
 *     // Create a new instance of the component
 *     var myButton = new VjsButton(myPlayer);
 *
 */
videojs.getComponent = _Component2['default'].getComponent;

/**
 * Register a component so it can referred to by name
 *
 * Used when adding to other
 * components, either through addChild
 * `component.addChild('myComponent')`
 * or through default children options
 * `{ children: ['myComponent'] }`.
 *
 *     // Get a component to subclass
 *     var VjsButton = videojs.getComponent('Button');
 *
 *     // Subclass the component (see 'extends' doc for more info)
 *     var MySpecialButton = videojs.extends(VjsButton, {});
 *
 *     // Register the new component
 *     VjsButton.registerComponent('MySepcialButton', MySepcialButton);
 *
 *     // (optionally) add the new component as a default player child
 *     myPlayer.addChild('MySepcialButton');
 *
 * NOTE: You could also just initialize the component before adding.
 * `component.addChild(new MyComponent());`
 *
 * @param {String} The class name of the component
 * @param {Component} The component class
 * @returns {Component} The newly registered component
 */
videojs.registerComponent = _Component2['default'].registerComponent;

/**
 * A suite of browser and device tests
 * @type {Object}
 */
videojs.browser = browser;

/**
 * Subclass an existing class
 * Mimics ES6 subclassing with the `extends` keyword
 *
 *     // Create a basic javascript 'class'
 *     function MyClass(name){
 *       // Set a property at initialization
 *       this.myName = name;
 *     }
 *
 *     // Create an instance method
 *     MyClass.prototype.sayMyName = function(){
 *       alert(this.myName);
 *     };
 *
 *     // Subclass the exisitng class and change the name
 *     // when initializing
 *     var MySubClass = videojs.extends(MyClass, {
 *       constructor: function(name) {
 *         // Call the super class constructor for the subclass
 *         MyClass.call(this, name)
 *       }
 *     });
 *
 *     // Create an instance of the new sub class
 *     var myInstance = new MySubClass('John');
 *     myInstance.sayMyName(); // -> should alert "John"
 *
 * @param {Function} The Class to subclass
 * @param {Object} An object including instace methods for the new class
 *                   Optionally including a `constructor` function
 *
 * @returns {Function} The newly created subclass
 */
videojs['extends'] = _extendsFn2['default'];

/**
 * Merge two options objects recursively
 * Performs a deep merge like lodash.merge but **only merges plain objects**
 * (not arrays, elements, anything else)
 * Other values will be copied directly from the second object.
 *
 *     var defaultOptions = {
 *       foo: true,
 *       bar: {
 *         a: true,
 *         b: [1,2,3]
 *       }
 *     };
 *     var newOptions = {
 *       foo: false,
 *       bar: {
 *         b: [4,5,6]
 *       }
 *     };
 *
 *     var result = videojs.mergeOptions(defaultOptions, newOptions);
 *     // result.foo = false;
 *     // result.bar.a = true;
 *     // result.bar.b = [4,5,6];
 *
 * @param {Object} The options object whose values will be overriden
 * @param {Object} The options object with values to override the first
 * @param {Object} Any number of additional options objects
 *
 * @returns {Object} a new object with the merged values
 */
videojs.mergeOptions = _mergeOptions2['default'];

/**
 * Create a Video.js player plugin
 *
 * Plugins are only initialized when options for the plugin are included
 * in the player options, or the plugin function on the player instance is
 * called.
 *
 * **See the plugin guide in the docs for a more detailed example**
 *
 *     // Make a plugin that alerts when the player plays
 *     videojs.plugin('myPlugin', function(myPluginOptions) {
 *       myPluginOptions = myPluginOptions || {};
 *
 *       var player = this;
 *       var alertText = myPluginOptions.text || 'Player is playing!'
 *
 *       player.on('play', function(){
 *         alert(alertText);
 *       });
 *     });
 *
 *     // USAGE EXAMPLES
 *
 *     // EXAMPLE 1: New player with plugin options, call plugin immediately
 *     var player1 = videojs('idOne', {
 *       myPlugin: {
 *         text: 'Custom text!'
 *       }
 *     });
 *     // Click play
 *     // --> Should alert 'Custom text!'
 *
 *     // EXAMPLE 3: New player, initialize plugin later
 *     var player3 = videojs('idThree');
 *     // Click play
 *     // --> NO ALERT
 *     // Click pause
 *     // Initialize plugin using the plugin function on the player instance
 *     player3.myPlugin({
 *       text: 'Plugin added later!'
 *     });
 *     // Click play
 *     // --> Should alert 'Plugin added later!'
 *
 * @param {String} The plugin name
 * @param {Function} The plugin function that will be called with options
 */
videojs.plugin = _plugin2['default'];

/**
 * Adding languages so that they're available to all players.
 *
 *     videojs.addLanguage('es', { 'Hello': 'Hola' });
 *
 * @param  {String} code The language code or dictionary property
 * @param  {Object} data The data values to be translated
 *
 * @return {Object} The resulting language dictionary object
 */
videojs.addLanguage = function (code, data) {
  var _merge;

  code = ('' + code).toLowerCase();
  return _merge3['default'](_globalOptions2['default'].languages, (_merge = {}, _merge[code] = data, _merge))[code];
};

// REMOVING: We probably should add this to the migration plugin
// // Expose but deprecate the window[componentName] method for accessing components
// Object.getOwnPropertyNames(Component.components).forEach(function(name){
//   let component = Component.components[name];
//
//   // A deprecation warning as the constuctor
//   module.exports[name] = function(player, options, ready){
//     log.warn('Using videojs.'+name+' to access the '+name+' component has been deprecated. Please use videojs.getComponent("componentName")');
//
//     return new Component(player, options, ready);
//   };
//
//   // Allow the prototype and class methods to be accessible still this way
//   // Though anything that attempts to override class methods will no longer work
//   assign(module.exports[name], component);
// });

/**
 * Custom Universal Module Definition (UMD)
 *
 * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
 * still support requirejs and browserify. This also needs to be closure
 * compiler compatible, so string keys are used.
 */
if (typeof define === 'function' && define.amd) {
  define('videojs', [], function () {
    return videojs;
  });

  // checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = videojs;
}

exports['default'] = videojs;
module.exports = exports['default'];

},{"../../src/js/utils/merge-options.js":116,"./component":52,"./extends.js":84,"./global-options.js":86,"./player":92,"./plugins.js":93,"./setup":95,"./tech/flash.js":98,"./tech/html5.js":99,"./utils/browser.js":108,"./utils/dom.js":110,"./utils/log.js":115,"global/document":1,"lodash-compat/object/merge":40,"object.assign":44}],122:[function(_dereq_,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = _dereq_('./utils/url.js');

var Url = _interopRequireWildcard(_import);

var _log = _dereq_('./utils/log.js');

var _log2 = _interopRequireWildcard(_log);

var _mergeOptions = _dereq_('./utils/merge-options.js');

var _mergeOptions2 = _interopRequireWildcard(_mergeOptions);

var _window = _dereq_('global/window');

var _window2 = _interopRequireWildcard(_window);

/**
 * Simple http request for retrieving external files (e.g. text tracks)
 *
 * ##### Example
 *
 *     // using url string
 *     videojs.xhr('http://example.com/myfile.vtt', function(error, response, responseBody){});
 *
 *     // or options block
 *     videojs.xhr({
 *       uri: 'http://example.com/myfile.vtt',
 *       method: 'GET',
 *       responseType: 'text'
 *     }, function(error, response, responseBody){
 *       if (error) {
 *         // log the error
 *       } else {
 *         // successful, do something with the response
 *       }
 *     });
 *
 *
 * API is modeled after the Raynos/xhr, which we hope to use after
 * getting browserify implemented.
 * https://github.com/Raynos/xhr/blob/master/index.js
 *
 * @param  {Object|String}  options   Options block or URL string
 * @param  {Function}       callback  The callback function
 * @returns {Object}                  The request
 */
var xhr = function xhr(options, callback) {
  var abortTimeout = undefined;

  // If options is a string it's the url
  if (typeof options === 'string') {
    options = {
      uri: options
    };
  }

  // Merge with default options
  _mergeOptions2['default']({
    method: 'GET',
    timeout: 45 * 1000
  }, options);

  callback = callback || function () {};

  var XHR = _window2['default'].XMLHttpRequest;

  if (typeof XHR === 'undefined') {
    // Shim XMLHttpRequest for older IEs
    XHR = function () {
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e) {}
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (f) {}
      try {
        return new _window2['default'].ActiveXObject('Msxml2.XMLHTTP');
      } catch (g) {}
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  }

  var request = new XHR();
  // Store a reference to the url on the request instance
  request.uri = options.uri;

  var urlInfo = Url.parseUrl(options.uri);
  var winLoc = _window2['default'].location;

  var successHandler = function successHandler() {
    _window2['default'].clearTimeout(abortTimeout);
    callback(null, request, request.response || request.responseText);
  };

  var errorHandler = function errorHandler(err) {
    _window2['default'].clearTimeout(abortTimeout);

    if (!err || typeof err === 'string') {
      err = new Error(err);
    }

    callback(err, request);
  };

  // Check if url is for another domain/origin
  // IE8 doesn't know location.origin, so we won't rely on it here
  var crossOrigin = urlInfo.protocol + urlInfo.host !== winLoc.protocol + winLoc.host;

  // XDomainRequest -- Use for IE if XMLHTTPRequest2 isn't available
  // 'withCredentials' is only available in XMLHTTPRequest2
  // Also XDomainRequest has a lot of gotchas, so only use if cross domain
  if (crossOrigin && _window2['default'].XDomainRequest && !('withCredentials' in request)) {
    request = new _window2['default'].XDomainRequest();
    request.onload = successHandler;
    request.onerror = errorHandler;
    // These blank handlers need to be set to fix ie9
    // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
    request.onprogress = function () {};
    request.ontimeout = function () {};

    // XMLHTTPRequest
  } else {
    (function () {
      var fileUrl = urlInfo.protocol === 'file:' || winLoc.protocol === 'file:';

      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.timedout) {
            return errorHandler('timeout');
          }

          if (request.status === 200 || fileUrl && request.status === 0) {
            successHandler();
          } else {
            errorHandler();
          }
        }
      };

      if (options.timeout) {
        abortTimeout = _window2['default'].setTimeout(function () {
          if (request.readyState !== 4) {
            request.timedout = true;
            request.abort();
          }
        }, options.timeout);
      }
    })();
  }

  // open the connection
  try {
    // Third arg is async, or ignored by XDomainRequest
    request.open(options.method || 'GET', options.uri, true);
  } catch (err) {
    return errorHandler(err);
  }

  // withCredentials only supported by XMLHttpRequest2
  if (options.withCredentials) {
    request.withCredentials = true;
  }

  if (options.responseType) {
    request.responseType = options.responseType;
  }

  // send the request
  try {
    request.send();
  } catch (err) {
    return errorHandler(err);
  }

  return request;
};

exports['default'] = xhr;
module.exports = exports['default'];

},{"./utils/log.js":115,"./utils/merge-options.js":116,"./utils/url.js":120,"global/window":2}]},{},[121])(121)
});


/* vtt.js - v0.11.11 (https://github.com/mozilla/vtt.js) built on 22-01-2015 */

(function(root) {
  var vttjs = root.vttjs = {};
  var cueShim = vttjs.VTTCue;
  var regionShim = vttjs.VTTRegion;
  var oldVTTCue = root.VTTCue;
  var oldVTTRegion = root.VTTRegion;

  vttjs.shim = function() {
    vttjs.VTTCue = cueShim;
    vttjs.VTTRegion = regionShim;
  };

  vttjs.restore = function() {
    vttjs.VTTCue = oldVTTCue;
    vttjs.VTTRegion = oldVTTRegion;
  };
}(this));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, vttjs) {

  var autoKeyword = "auto";
  var directionSetting = {
    "": true,
    "lr": true,
    "rl": true
  };
  var alignSetting = {
    "start": true,
    "middle": true,
    "end": true,
    "left": true,
    "right": true
  };

  function findDirectionSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
  }

  function findAlignSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
  }

  function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
      var cobj = arguments[i];
      for (var p in cobj) {
        obj[p] = cobj[p];
      }
    }

    return obj;
  }

  function VTTCue(startTime, endTime, text) {
    var cue = this;
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
    var baseObj = {};

    if (isIE8) {
      cue = document.createElement('custom');
    } else {
      baseObj.enumerable = true;
    }

    /**
     * Shim implementation specific properties. These properties are not in
     * the spec.
     */

    // Lets us know when the VTTCue's data has changed in such a way that we need
    // to recompute its display state. This lets us compute its display state
    // lazily.
    cue.hasBeenReset = false;

    /**
     * VTTCue and TextTrackCue properties
     * http://dev.w3.org/html5/webvtt/#vttcue-interface
     */

    var _id = "";
    var _pauseOnExit = false;
    var _startTime = startTime;
    var _endTime = endTime;
    var _text = text;
    var _region = null;
    var _vertical = "";
    var _snapToLines = true;
    var _line = "auto";
    var _lineAlign = "start";
    var _position = 50;
    var _positionAlign = "middle";
    var _size = 50;
    var _align = "middle";

    Object.defineProperty(cue,
      "id", extend({}, baseObj, {
        get: function() {
          return _id;
        },
        set: function(value) {
          _id = "" + value;
        }
      }));

    Object.defineProperty(cue,
      "pauseOnExit", extend({}, baseObj, {
        get: function() {
          return _pauseOnExit;
        },
        set: function(value) {
          _pauseOnExit = !!value;
        }
      }));

    Object.defineProperty(cue,
      "startTime", extend({}, baseObj, {
        get: function() {
          return _startTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Start time must be set to a number.");
          }
          _startTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "endTime", extend({}, baseObj, {
        get: function() {
          return _endTime;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("End time must be set to a number.");
          }
          _endTime = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "text", extend({}, baseObj, {
        get: function() {
          return _text;
        },
        set: function(value) {
          _text = "" + value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "region", extend({}, baseObj, {
        get: function() {
          return _region;
        },
        set: function(value) {
          _region = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "vertical", extend({}, baseObj, {
        get: function() {
          return _vertical;
        },
        set: function(value) {
          var setting = findDirectionSetting(value);
          // Have to check for false because the setting an be an empty string.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _vertical = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "snapToLines", extend({}, baseObj, {
        get: function() {
          return _snapToLines;
        },
        set: function(value) {
          _snapToLines = !!value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "line", extend({}, baseObj, {
        get: function() {
          return _line;
        },
        set: function(value) {
          if (typeof value !== "number" && value !== autoKeyword) {
            throw new SyntaxError("An invalid number or illegal string was specified.");
          }
          _line = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "lineAlign", extend({}, baseObj, {
        get: function() {
          return _lineAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _lineAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "position", extend({}, baseObj, {
        get: function() {
          return _position;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Position must be between 0 and 100.");
          }
          _position = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "positionAlign", extend({}, baseObj, {
        get: function() {
          return _positionAlign;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _positionAlign = setting;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "size", extend({}, baseObj, {
        get: function() {
          return _size;
        },
        set: function(value) {
          if (value < 0 || value > 100) {
            throw new Error("Size must be between 0 and 100.");
          }
          _size = value;
          this.hasBeenReset = true;
        }
      }));

    Object.defineProperty(cue,
      "align", extend({}, baseObj, {
        get: function() {
          return _align;
        },
        set: function(value) {
          var setting = findAlignSetting(value);
          if (!setting) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _align = setting;
          this.hasBeenReset = true;
        }
      }));

    /**
     * Other <track> spec defined properties
     */

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
    cue.displayState = undefined;

    if (isIE8) {
      return cue;
    }
  }

  /**
   * VTTCue methods
   */

  VTTCue.prototype.getCueAsHTML = function() {
    // Assume WebVTT.convertCueToDOMTree is on the global.
    return WebVTT.convertCueToDOMTree(window, this.text);
  };

  root.VTTCue = root.VTTCue || VTTCue;
  vttjs.VTTCue = VTTCue;
}(this, (this.vttjs || {})));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, vttjs) {

  var scrollSetting = {
    "": true,
    "up": true,
  };

  function findScrollSetting(value) {
    if (typeof value !== "string") {
      return false;
    }
    var scroll = scrollSetting[value.toLowerCase()];
    return scroll ? value.toLowerCase() : false;
  }

  function isValidPercentValue(value) {
    return typeof value === "number" && (value >= 0 && value <= 100);
  }

  // VTTRegion shim http://dev.w3.org/html5/webvtt/#vttregion-interface
  function VTTRegion() {
    var _width = 100;
    var _lines = 3;
    var _regionAnchorX = 0;
    var _regionAnchorY = 100;
    var _viewportAnchorX = 0;
    var _viewportAnchorY = 100;
    var _scroll = "";

    Object.defineProperties(this, {
      "width": {
        enumerable: true,
        get: function() {
          return _width;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("Width must be between 0 and 100.");
          }
          _width = value;
        }
      },
      "lines": {
        enumerable: true,
        get: function() {
          return _lines;
        },
        set: function(value) {
          if (typeof value !== "number") {
            throw new TypeError("Lines must be set to a number.");
          }
          _lines = value;
        }
      },
      "regionAnchorY": {
        enumerable: true,
        get: function() {
          return _regionAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("RegionAnchorX must be between 0 and 100.");
          }
          _regionAnchorY = value;
        }
      },
      "regionAnchorX": {
        enumerable: true,
        get: function() {
          return _regionAnchorX;
        },
        set: function(value) {
          if(!isValidPercentValue(value)) {
            throw new Error("RegionAnchorY must be between 0 and 100.");
          }
          _regionAnchorX = value;
        }
      },
      "viewportAnchorY": {
        enumerable: true,
        get: function() {
          return _viewportAnchorY;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorY must be between 0 and 100.");
          }
          _viewportAnchorY = value;
        }
      },
      "viewportAnchorX": {
        enumerable: true,
        get: function() {
          return _viewportAnchorX;
        },
        set: function(value) {
          if (!isValidPercentValue(value)) {
            throw new Error("ViewportAnchorX must be between 0 and 100.");
          }
          _viewportAnchorX = value;
        }
      },
      "scroll": {
        enumerable: true,
        get: function() {
          return _scroll;
        },
        set: function(value) {
          var setting = findScrollSetting(value);
          // Have to check for false as an empty string is a legal value.
          if (setting === false) {
            throw new SyntaxError("An invalid or illegal string was specified.");
          }
          _scroll = setting;
        }
      }
    });
  }

  root.VTTRegion = root.VTTRegion || VTTRegion;
  vttjs.VTTRegion = VTTRegion;
}(this, (this.vttjs || {})));

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function(global) {

  var _objCreate = Object.create || (function() {
    function F() {}
    return function(o) {
      if (arguments.length !== 1) {
        throw new Error('Object.create shim only accepts one parameter.');
      }
      F.prototype = o;
      return new F();
    };
  })();

  // Creates a new ParserError object from an errorData object. The errorData
  // object should have default code and message properties. The default message
  // property can be overriden by passing in a message parameter.
  // See ParsingError.Errors below for acceptable errors.
  function ParsingError(errorData, message) {
    this.name = "ParsingError";
    this.code = errorData.code;
    this.message = message || errorData.message;
  }
  ParsingError.prototype = _objCreate(Error.prototype);
  ParsingError.prototype.constructor = ParsingError;

  // ParsingError metadata for acceptable ParsingErrors.
  ParsingError.Errors = {
    BadSignature: {
      code: 0,
      message: "Malformed WebVTT signature."
    },
    BadTimeStamp: {
      code: 1,
      message: "Malformed time stamp."
    }
  };

  // Try to parse input as a time stamp.
  function parseTimeStamp(input) {

    function computeSeconds(h, m, s, f) {
      return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
    }

    var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!m) {
      return null;
    }

    if (m[3]) {
      // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
      return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
    } else if (m[1] > 59) {
      // Timestamp takes the form of [hours]:[minutes].[milliseconds]
      // First position is hours as it's over 59.
      return computeSeconds(m[1], m[2], 0,  m[4]);
    } else {
      // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
      return computeSeconds(0, m[1], m[2], m[4]);
    }
  }

  // A settings object holds key/value pairs and will ignore anything but the first
  // assignment to a specific key.
  function Settings() {
    this.values = _objCreate(null);
  }

  Settings.prototype = {
    // Only accept the first assignment to any key.
    set: function(k, v) {
      if (!this.get(k) && v !== "") {
        this.values[k] = v;
      }
    },
    // Return the value for a key, or a default value.
    // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
    // a number of possible default values as properties where 'defaultKey' is
    // the key of the property that will be chosen; otherwise it's assumed to be
    // a single value.
    get: function(k, dflt, defaultKey) {
      if (defaultKey) {
        return this.has(k) ? this.values[k] : dflt[defaultKey];
      }
      return this.has(k) ? this.values[k] : dflt;
    },
    // Check whether we have a value for a key.
    has: function(k) {
      return k in this.values;
    },
    // Accept a setting if its one of the given alternatives.
    alt: function(k, v, a) {
      for (var n = 0; n < a.length; ++n) {
        if (v === a[n]) {
          this.set(k, v);
          break;
        }
      }
    },
    // Accept a setting if its a valid (signed) integer.
    integer: function(k, v) {
      if (/^-?\d+$/.test(v)) { // integer
        this.set(k, parseInt(v, 10));
      }
    },
    // Accept a setting if its a valid percentage.
    percent: function(k, v) {
      var m;
      if ((m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/))) {
        v = parseFloat(v);
        if (v >= 0 && v <= 100) {
          this.set(k, v);
          return true;
        }
      }
      return false;
    }
  };

  // Helper function to parse input into groups separated by 'groupDelim', and
  // interprete each group as a key/value pair separated by 'keyValueDelim'.
  function parseOptions(input, callback, keyValueDelim, groupDelim) {
    var groups = groupDelim ? input.split(groupDelim) : [input];
    for (var i in groups) {
      if (typeof groups[i] !== "string") {
        continue;
      }
      var kv = groups[i].split(keyValueDelim);
      if (kv.length !== 2) {
        continue;
      }
      var k = kv[0];
      var v = kv[1];
      callback(k, v);
    }
  }

  function parseCue(input, cue, regionList) {
    // Remember the original input if we need to throw an error.
    var oInput = input;
    // 4.1 WebVTT timestamp
    function consumeTimeStamp() {
      var ts = parseTimeStamp(input);
      if (ts === null) {
        throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                              "Malformed timestamp: " + oInput);
      }
      // Remove time stamp from input.
      input = input.replace(/^[^\sa-zA-Z-]+/, "");
      return ts;
    }

    // 4.4.2 WebVTT cue settings
    function consumeCueSettings(input, cue) {
      var settings = new Settings();

      parseOptions(input, function (k, v) {
        switch (k) {
        case "region":
          // Find the last region we parsed with the same region id.
          for (var i = regionList.length - 1; i >= 0; i--) {
            if (regionList[i].id === v) {
              settings.set(k, regionList[i].region);
              break;
            }
          }
          break;
        case "vertical":
          settings.alt(k, v, ["rl", "lr"]);
          break;
        case "line":
          var vals = v.split(","),
              vals0 = vals[0];
          settings.integer(k, vals0);
          settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
          settings.alt(k, vals0, ["auto"]);
          if (vals.length === 2) {
            settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "position":
          vals = v.split(",");
          settings.percent(k, vals[0]);
          if (vals.length === 2) {
            settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
          }
          break;
        case "size":
          settings.percent(k, v);
          break;
        case "align":
          settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
          break;
        }
      }, /:/, /\s/);

      // Apply default values for any missing fields.
      cue.region = settings.get("region", null);
      cue.vertical = settings.get("vertical", "");
      cue.line = settings.get("line", "auto");
      cue.lineAlign = settings.get("lineAlign", "start");
      cue.snapToLines = settings.get("snapToLines", true);
      cue.size = settings.get("size", 100);
      cue.align = settings.get("align", "middle");
      cue.position = settings.get("position", {
        start: 0,
        left: 0,
        middle: 50,
        end: 100,
        right: 100
      }, cue.align);
      cue.positionAlign = settings.get("positionAlign", {
        start: "start",
        left: "start",
        middle: "middle",
        end: "end",
        right: "end"
      }, cue.align);
    }

    function skipWhitespace() {
      input = input.replace(/^\s+/, "");
    }

    // 4.1 WebVTT cue timings.
    skipWhitespace();
    cue.startTime = consumeTimeStamp();   // (1) collect cue start time
    skipWhitespace();
    if (input.substr(0, 3) !== "-->") {     // (3) next characters must match "-->"
      throw new ParsingError(ParsingError.Errors.BadTimeStamp,
                             "Malformed time stamp (time stamps must be separated by '-->'): " +
                             oInput);
    }
    input = input.substr(3);
    skipWhitespace();
    cue.endTime = consumeTimeStamp();     // (5) collect cue end time

    // 4.1 WebVTT cue settings list.
    skipWhitespace();
    consumeCueSettings(input, cue);
  }

  var ESCAPE = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&lrm;": "\u200e",
    "&rlm;": "\u200f",
    "&nbsp;": "\u00a0"
  };

  var TAG_NAME = {
    c: "span",
    i: "i",
    b: "b",
    u: "u",
    ruby: "ruby",
    rt: "rt",
    v: "span",
    lang: "span"
  };

  var TAG_ANNOTATION = {
    v: "title",
    lang: "lang"
  };

  var NEEDS_PARENT = {
    rt: "ruby"
  };

  // Parse content into a document fragment.
  function parseContent(window, input) {
    function nextToken() {
      // Check for end-of-string.
      if (!input) {
        return null;
      }

      // Consume 'n' characters from the input.
      function consume(result) {
        input = input.substr(result.length);
        return result;
      }

      var m = input.match(/^([^<]*)(<[^>]+>?)?/);
      // If there is some text before the next tag, return it, otherwise return
      // the tag.
      return consume(m[1] ? m[1] : m[2]);
    }

    // Unescape a string 's'.
    function unescape1(e) {
      return ESCAPE[e];
    }
    function unescape(s) {
      while ((m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/))) {
        s = s.replace(m[0], unescape1);
      }
      return s;
    }

    function shouldAdd(current, element) {
      return !NEEDS_PARENT[element.localName] ||
             NEEDS_PARENT[element.localName] === current.localName;
    }

    // Create an element for this tag.
    function createElement(type, annotation) {
      var tagName = TAG_NAME[type];
      if (!tagName) {
        return null;
      }
      var element = window.document.createElement(tagName);
      element.localName = tagName;
      var name = TAG_ANNOTATION[type];
      if (name && annotation) {
        element[name] = annotation.trim();
      }
      return element;
    }

    var rootDiv = window.document.createElement("div"),
        current = rootDiv,
        t,
        tagStack = [];

    while ((t = nextToken()) !== null) {
      if (t[0] === '<') {
        if (t[1] === "/") {
          // If the closing tag matches, move back up to the parent node.
          if (tagStack.length &&
              tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
            tagStack.pop();
            current = current.parentNode;
          }
          // Otherwise just ignore the end tag.
          continue;
        }
        var ts = parseTimeStamp(t.substr(1, t.length - 2));
        var node;
        if (ts) {
          // Timestamps are lead nodes as well.
          node = window.document.createProcessingInstruction("timestamp", ts);
          current.appendChild(node);
          continue;
        }
        var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
        // If we can't parse the tag, skip to the next tag.
        if (!m) {
          continue;
        }
        // Try to construct an element, and ignore the tag if we couldn't.
        node = createElement(m[1], m[3]);
        if (!node) {
          continue;
        }
        // Determine if the tag should be added based on the context of where it
        // is placed in the cuetext.
        if (!shouldAdd(current, node)) {
          continue;
        }
        // Set the class list (as a list of classes, separated by space).
        if (m[2]) {
          node.className = m[2].substr(1).replace('.', ' ');
        }
        // Append the node to the current node, and enter the scope of the new
        // node.
        tagStack.push(m[1]);
        current.appendChild(node);
        current = node;
        continue;
      }

      // Text nodes are leaf nodes.
      current.appendChild(window.document.createTextNode(unescape(t)));
    }

    return rootDiv;
  }

  // This is a list of all the Unicode characters that have a strong
  // right-to-left category. What this means is that these characters are
  // written right-to-left for sure. It was generated by pulling all the strong
  // right-to-left characters out of the Unicode data table. That table can
  // found at: http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
  var strongRTLChars = [0x05BE, 0x05C0, 0x05C3, 0x05C6, 0x05D0, 0x05D1,
      0x05D2, 0x05D3, 0x05D4, 0x05D5, 0x05D6, 0x05D7, 0x05D8, 0x05D9, 0x05DA,
      0x05DB, 0x05DC, 0x05DD, 0x05DE, 0x05DF, 0x05E0, 0x05E1, 0x05E2, 0x05E3,
      0x05E4, 0x05E5, 0x05E6, 0x05E7, 0x05E8, 0x05E9, 0x05EA, 0x05F0, 0x05F1,
      0x05F2, 0x05F3, 0x05F4, 0x0608, 0x060B, 0x060D, 0x061B, 0x061E, 0x061F,
      0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0626, 0x0627, 0x0628,
      0x0629, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x062F, 0x0630, 0x0631,
      0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063A,
      0x063B, 0x063C, 0x063D, 0x063E, 0x063F, 0x0640, 0x0641, 0x0642, 0x0643,
      0x0644, 0x0645, 0x0646, 0x0647, 0x0648, 0x0649, 0x064A, 0x066D, 0x066E,
      0x066F, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677, 0x0678,
      0x0679, 0x067A, 0x067B, 0x067C, 0x067D, 0x067E, 0x067F, 0x0680, 0x0681,
      0x0682, 0x0683, 0x0684, 0x0685, 0x0686, 0x0687, 0x0688, 0x0689, 0x068A,
      0x068B, 0x068C, 0x068D, 0x068E, 0x068F, 0x0690, 0x0691, 0x0692, 0x0693,
      0x0694, 0x0695, 0x0696, 0x0697, 0x0698, 0x0699, 0x069A, 0x069B, 0x069C,
      0x069D, 0x069E, 0x069F, 0x06A0, 0x06A1, 0x06A2, 0x06A3, 0x06A4, 0x06A5,
      0x06A6, 0x06A7, 0x06A8, 0x06A9, 0x06AA, 0x06AB, 0x06AC, 0x06AD, 0x06AE,
      0x06AF, 0x06B0, 0x06B1, 0x06B2, 0x06B3, 0x06B4, 0x06B5, 0x06B6, 0x06B7,
      0x06B8, 0x06B9, 0x06BA, 0x06BB, 0x06BC, 0x06BD, 0x06BE, 0x06BF, 0x06C0,
      0x06C1, 0x06C2, 0x06C3, 0x06C4, 0x06C5, 0x06C6, 0x06C7, 0x06C8, 0x06C9,
      0x06CA, 0x06CB, 0x06CC, 0x06CD, 0x06CE, 0x06CF, 0x06D0, 0x06D1, 0x06D2,
      0x06D3, 0x06D4, 0x06D5, 0x06E5, 0x06E6, 0x06EE, 0x06EF, 0x06FA, 0x06FB,
      0x06FC, 0x06FD, 0x06FE, 0x06FF, 0x0700, 0x0701, 0x0702, 0x0703, 0x0704,
      0x0705, 0x0706, 0x0707, 0x0708, 0x0709, 0x070A, 0x070B, 0x070C, 0x070D,
      0x070F, 0x0710, 0x0712, 0x0713, 0x0714, 0x0715, 0x0716, 0x0717, 0x0718,
      0x0719, 0x071A, 0x071B, 0x071C, 0x071D, 0x071E, 0x071F, 0x0720, 0x0721,
      0x0722, 0x0723, 0x0724, 0x0725, 0x0726, 0x0727, 0x0728, 0x0729, 0x072A,
      0x072B, 0x072C, 0x072D, 0x072E, 0x072F, 0x074D, 0x074E, 0x074F, 0x0750,
      0x0751, 0x0752, 0x0753, 0x0754, 0x0755, 0x0756, 0x0757, 0x0758, 0x0759,
      0x075A, 0x075B, 0x075C, 0x075D, 0x075E, 0x075F, 0x0760, 0x0761, 0x0762,
      0x0763, 0x0764, 0x0765, 0x0766, 0x0767, 0x0768, 0x0769, 0x076A, 0x076B,
      0x076C, 0x076D, 0x076E, 0x076F, 0x0770, 0x0771, 0x0772, 0x0773, 0x0774,
      0x0775, 0x0776, 0x0777, 0x0778, 0x0779, 0x077A, 0x077B, 0x077C, 0x077D,
      0x077E, 0x077F, 0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786,
      0x0787, 0x0788, 0x0789, 0x078A, 0x078B, 0x078C, 0x078D, 0x078E, 0x078F,
      0x0790, 0x0791, 0x0792, 0x0793, 0x0794, 0x0795, 0x0796, 0x0797, 0x0798,
      0x0799, 0x079A, 0x079B, 0x079C, 0x079D, 0x079E, 0x079F, 0x07A0, 0x07A1,
      0x07A2, 0x07A3, 0x07A4, 0x07A5, 0x07B1, 0x07C0, 0x07C1, 0x07C2, 0x07C3,
      0x07C4, 0x07C5, 0x07C6, 0x07C7, 0x07C8, 0x07C9, 0x07CA, 0x07CB, 0x07CC,
      0x07CD, 0x07CE, 0x07CF, 0x07D0, 0x07D1, 0x07D2, 0x07D3, 0x07D4, 0x07D5,
      0x07D6, 0x07D7, 0x07D8, 0x07D9, 0x07DA, 0x07DB, 0x07DC, 0x07DD, 0x07DE,
      0x07DF, 0x07E0, 0x07E1, 0x07E2, 0x07E3, 0x07E4, 0x07E5, 0x07E6, 0x07E7,
      0x07E8, 0x07E9, 0x07EA, 0x07F4, 0x07F5, 0x07FA, 0x0800, 0x0801, 0x0802,
      0x0803, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080A, 0x080B,
      0x080C, 0x080D, 0x080E, 0x080F, 0x0810, 0x0811, 0x0812, 0x0813, 0x0814,
      0x0815, 0x081A, 0x0824, 0x0828, 0x0830, 0x0831, 0x0832, 0x0833, 0x0834,
      0x0835, 0x0836, 0x0837, 0x0838, 0x0839, 0x083A, 0x083B, 0x083C, 0x083D,
      0x083E, 0x0840, 0x0841, 0x0842, 0x0843, 0x0844, 0x0845, 0x0846, 0x0847,
      0x0848, 0x0849, 0x084A, 0x084B, 0x084C, 0x084D, 0x084E, 0x084F, 0x0850,
      0x0851, 0x0852, 0x0853, 0x0854, 0x0855, 0x0856, 0x0857, 0x0858, 0x085E,
      0x08A0, 0x08A2, 0x08A3, 0x08A4, 0x08A5, 0x08A6, 0x08A7, 0x08A8, 0x08A9,
      0x08AA, 0x08AB, 0x08AC, 0x200F, 0xFB1D, 0xFB1F, 0xFB20, 0xFB21, 0xFB22,
      0xFB23, 0xFB24, 0xFB25, 0xFB26, 0xFB27, 0xFB28, 0xFB2A, 0xFB2B, 0xFB2C,
      0xFB2D, 0xFB2E, 0xFB2F, 0xFB30, 0xFB31, 0xFB32, 0xFB33, 0xFB34, 0xFB35,
      0xFB36, 0xFB38, 0xFB39, 0xFB3A, 0xFB3B, 0xFB3C, 0xFB3E, 0xFB40, 0xFB41,
      0xFB43, 0xFB44, 0xFB46, 0xFB47, 0xFB48, 0xFB49, 0xFB4A, 0xFB4B, 0xFB4C,
      0xFB4D, 0xFB4E, 0xFB4F, 0xFB50, 0xFB51, 0xFB52, 0xFB53, 0xFB54, 0xFB55,
      0xFB56, 0xFB57, 0xFB58, 0xFB59, 0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D, 0xFB5E,
      0xFB5F, 0xFB60, 0xFB61, 0xFB62, 0xFB63, 0xFB64, 0xFB65, 0xFB66, 0xFB67,
      0xFB68, 0xFB69, 0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D, 0xFB6E, 0xFB6F, 0xFB70,
      0xFB71, 0xFB72, 0xFB73, 0xFB74, 0xFB75, 0xFB76, 0xFB77, 0xFB78, 0xFB79,
      0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D, 0xFB7E, 0xFB7F, 0xFB80, 0xFB81, 0xFB82,
      0xFB83, 0xFB84, 0xFB85, 0xFB86, 0xFB87, 0xFB88, 0xFB89, 0xFB8A, 0xFB8B,
      0xFB8C, 0xFB8D, 0xFB8E, 0xFB8F, 0xFB90, 0xFB91, 0xFB92, 0xFB93, 0xFB94,
      0xFB95, 0xFB96, 0xFB97, 0xFB98, 0xFB99, 0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D,
      0xFB9E, 0xFB9F, 0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3, 0xFBA4, 0xFBA5, 0xFBA6,
      0xFBA7, 0xFBA8, 0xFBA9, 0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD, 0xFBAE, 0xFBAF,
      0xFBB0, 0xFBB1, 0xFBB2, 0xFBB3, 0xFBB4, 0xFBB5, 0xFBB6, 0xFBB7, 0xFBB8,
      0xFBB9, 0xFBBA, 0xFBBB, 0xFBBC, 0xFBBD, 0xFBBE, 0xFBBF, 0xFBC0, 0xFBC1,
      0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6, 0xFBD7, 0xFBD8, 0xFBD9, 0xFBDA, 0xFBDB,
      0xFBDC, 0xFBDD, 0xFBDE, 0xFBDF, 0xFBE0, 0xFBE1, 0xFBE2, 0xFBE3, 0xFBE4,
      0xFBE5, 0xFBE6, 0xFBE7, 0xFBE8, 0xFBE9, 0xFBEA, 0xFBEB, 0xFBEC, 0xFBED,
      0xFBEE, 0xFBEF, 0xFBF0, 0xFBF1, 0xFBF2, 0xFBF3, 0xFBF4, 0xFBF5, 0xFBF6,
      0xFBF7, 0xFBF8, 0xFBF9, 0xFBFA, 0xFBFB, 0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF,
      0xFC00, 0xFC01, 0xFC02, 0xFC03, 0xFC04, 0xFC05, 0xFC06, 0xFC07, 0xFC08,
      0xFC09, 0xFC0A, 0xFC0B, 0xFC0C, 0xFC0D, 0xFC0E, 0xFC0F, 0xFC10, 0xFC11,
      0xFC12, 0xFC13, 0xFC14, 0xFC15, 0xFC16, 0xFC17, 0xFC18, 0xFC19, 0xFC1A,
      0xFC1B, 0xFC1C, 0xFC1D, 0xFC1E, 0xFC1F, 0xFC20, 0xFC21, 0xFC22, 0xFC23,
      0xFC24, 0xFC25, 0xFC26, 0xFC27, 0xFC28, 0xFC29, 0xFC2A, 0xFC2B, 0xFC2C,
      0xFC2D, 0xFC2E, 0xFC2F, 0xFC30, 0xFC31, 0xFC32, 0xFC33, 0xFC34, 0xFC35,
      0xFC36, 0xFC37, 0xFC38, 0xFC39, 0xFC3A, 0xFC3B, 0xFC3C, 0xFC3D, 0xFC3E,
      0xFC3F, 0xFC40, 0xFC41, 0xFC42, 0xFC43, 0xFC44, 0xFC45, 0xFC46, 0xFC47,
      0xFC48, 0xFC49, 0xFC4A, 0xFC4B, 0xFC4C, 0xFC4D, 0xFC4E, 0xFC4F, 0xFC50,
      0xFC51, 0xFC52, 0xFC53, 0xFC54, 0xFC55, 0xFC56, 0xFC57, 0xFC58, 0xFC59,
      0xFC5A, 0xFC5B, 0xFC5C, 0xFC5D, 0xFC5E, 0xFC5F, 0xFC60, 0xFC61, 0xFC62,
      0xFC63, 0xFC64, 0xFC65, 0xFC66, 0xFC67, 0xFC68, 0xFC69, 0xFC6A, 0xFC6B,
      0xFC6C, 0xFC6D, 0xFC6E, 0xFC6F, 0xFC70, 0xFC71, 0xFC72, 0xFC73, 0xFC74,
      0xFC75, 0xFC76, 0xFC77, 0xFC78, 0xFC79, 0xFC7A, 0xFC7B, 0xFC7C, 0xFC7D,
      0xFC7E, 0xFC7F, 0xFC80, 0xFC81, 0xFC82, 0xFC83, 0xFC84, 0xFC85, 0xFC86,
      0xFC87, 0xFC88, 0xFC89, 0xFC8A, 0xFC8B, 0xFC8C, 0xFC8D, 0xFC8E, 0xFC8F,
      0xFC90, 0xFC91, 0xFC92, 0xFC93, 0xFC94, 0xFC95, 0xFC96, 0xFC97, 0xFC98,
      0xFC99, 0xFC9A, 0xFC9B, 0xFC9C, 0xFC9D, 0xFC9E, 0xFC9F, 0xFCA0, 0xFCA1,
      0xFCA2, 0xFCA3, 0xFCA4, 0xFCA5, 0xFCA6, 0xFCA7, 0xFCA8, 0xFCA9, 0xFCAA,
      0xFCAB, 0xFCAC, 0xFCAD, 0xFCAE, 0xFCAF, 0xFCB0, 0xFCB1, 0xFCB2, 0xFCB3,
      0xFCB4, 0xFCB5, 0xFCB6, 0xFCB7, 0xFCB8, 0xFCB9, 0xFCBA, 0xFCBB, 0xFCBC,
      0xFCBD, 0xFCBE, 0xFCBF, 0xFCC0, 0xFCC1, 0xFCC2, 0xFCC3, 0xFCC4, 0xFCC5,
      0xFCC6, 0xFCC7, 0xFCC8, 0xFCC9, 0xFCCA, 0xFCCB, 0xFCCC, 0xFCCD, 0xFCCE,
      0xFCCF, 0xFCD0, 0xFCD1, 0xFCD2, 0xFCD3, 0xFCD4, 0xFCD5, 0xFCD6, 0xFCD7,
      0xFCD8, 0xFCD9, 0xFCDA, 0xFCDB, 0xFCDC, 0xFCDD, 0xFCDE, 0xFCDF, 0xFCE0,
      0xFCE1, 0xFCE2, 0xFCE3, 0xFCE4, 0xFCE5, 0xFCE6, 0xFCE7, 0xFCE8, 0xFCE9,
      0xFCEA, 0xFCEB, 0xFCEC, 0xFCED, 0xFCEE, 0xFCEF, 0xFCF0, 0xFCF1, 0xFCF2,
      0xFCF3, 0xFCF4, 0xFCF5, 0xFCF6, 0xFCF7, 0xFCF8, 0xFCF9, 0xFCFA, 0xFCFB,
      0xFCFC, 0xFCFD, 0xFCFE, 0xFCFF, 0xFD00, 0xFD01, 0xFD02, 0xFD03, 0xFD04,
      0xFD05, 0xFD06, 0xFD07, 0xFD08, 0xFD09, 0xFD0A, 0xFD0B, 0xFD0C, 0xFD0D,
      0xFD0E, 0xFD0F, 0xFD10, 0xFD11, 0xFD12, 0xFD13, 0xFD14, 0xFD15, 0xFD16,
      0xFD17, 0xFD18, 0xFD19, 0xFD1A, 0xFD1B, 0xFD1C, 0xFD1D, 0xFD1E, 0xFD1F,
      0xFD20, 0xFD21, 0xFD22, 0xFD23, 0xFD24, 0xFD25, 0xFD26, 0xFD27, 0xFD28,
      0xFD29, 0xFD2A, 0xFD2B, 0xFD2C, 0xFD2D, 0xFD2E, 0xFD2F, 0xFD30, 0xFD31,
      0xFD32, 0xFD33, 0xFD34, 0xFD35, 0xFD36, 0xFD37, 0xFD38, 0xFD39, 0xFD3A,
      0xFD3B, 0xFD3C, 0xFD3D, 0xFD50, 0xFD51, 0xFD52, 0xFD53, 0xFD54, 0xFD55,
      0xFD56, 0xFD57, 0xFD58, 0xFD59, 0xFD5A, 0xFD5B, 0xFD5C, 0xFD5D, 0xFD5E,
      0xFD5F, 0xFD60, 0xFD61, 0xFD62, 0xFD63, 0xFD64, 0xFD65, 0xFD66, 0xFD67,
      0xFD68, 0xFD69, 0xFD6A, 0xFD6B, 0xFD6C, 0xFD6D, 0xFD6E, 0xFD6F, 0xFD70,
      0xFD71, 0xFD72, 0xFD73, 0xFD74, 0xFD75, 0xFD76, 0xFD77, 0xFD78, 0xFD79,
      0xFD7A, 0xFD7B, 0xFD7C, 0xFD7D, 0xFD7E, 0xFD7F, 0xFD80, 0xFD81, 0xFD82,
      0xFD83, 0xFD84, 0xFD85, 0xFD86, 0xFD87, 0xFD88, 0xFD89, 0xFD8A, 0xFD8B,
      0xFD8C, 0xFD8D, 0xFD8E, 0xFD8F, 0xFD92, 0xFD93, 0xFD94, 0xFD95, 0xFD96,
      0xFD97, 0xFD98, 0xFD99, 0xFD9A, 0xFD9B, 0xFD9C, 0xFD9D, 0xFD9E, 0xFD9F,
      0xFDA0, 0xFDA1, 0xFDA2, 0xFDA3, 0xFDA4, 0xFDA5, 0xFDA6, 0xFDA7, 0xFDA8,
      0xFDA9, 0xFDAA, 0xFDAB, 0xFDAC, 0xFDAD, 0xFDAE, 0xFDAF, 0xFDB0, 0xFDB1,
      0xFDB2, 0xFDB3, 0xFDB4, 0xFDB5, 0xFDB6, 0xFDB7, 0xFDB8, 0xFDB9, 0xFDBA,
      0xFDBB, 0xFDBC, 0xFDBD, 0xFDBE, 0xFDBF, 0xFDC0, 0xFDC1, 0xFDC2, 0xFDC3,
      0xFDC4, 0xFDC5, 0xFDC6, 0xFDC7, 0xFDF0, 0xFDF1, 0xFDF2, 0xFDF3, 0xFDF4,
      0xFDF5, 0xFDF6, 0xFDF7, 0xFDF8, 0xFDF9, 0xFDFA, 0xFDFB, 0xFDFC, 0xFE70,
      0xFE71, 0xFE72, 0xFE73, 0xFE74, 0xFE76, 0xFE77, 0xFE78, 0xFE79, 0xFE7A,
      0xFE7B, 0xFE7C, 0xFE7D, 0xFE7E, 0xFE7F, 0xFE80, 0xFE81, 0xFE82, 0xFE83,
      0xFE84, 0xFE85, 0xFE86, 0xFE87, 0xFE88, 0xFE89, 0xFE8A, 0xFE8B, 0xFE8C,
      0xFE8D, 0xFE8E, 0xFE8F, 0xFE90, 0xFE91, 0xFE92, 0xFE93, 0xFE94, 0xFE95,
      0xFE96, 0xFE97, 0xFE98, 0xFE99, 0xFE9A, 0xFE9B, 0xFE9C, 0xFE9D, 0xFE9E,
      0xFE9F, 0xFEA0, 0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4, 0xFEA5, 0xFEA6, 0xFEA7,
      0xFEA8, 0xFEA9, 0xFEAA, 0xFEAB, 0xFEAC, 0xFEAD, 0xFEAE, 0xFEAF, 0xFEB0,
      0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4, 0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8, 0xFEB9,
      0xFEBA, 0xFEBB, 0xFEBC, 0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0, 0xFEC1, 0xFEC2,
      0xFEC3, 0xFEC4, 0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8, 0xFEC9, 0xFECA, 0xFECB,
      0xFECC, 0xFECD, 0xFECE, 0xFECF, 0xFED0, 0xFED1, 0xFED2, 0xFED3, 0xFED4,
      0xFED5, 0xFED6, 0xFED7, 0xFED8, 0xFED9, 0xFEDA, 0xFEDB, 0xFEDC, 0xFEDD,
      0xFEDE, 0xFEDF, 0xFEE0, 0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4, 0xFEE5, 0xFEE6,
      0xFEE7, 0xFEE8, 0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC, 0xFEED, 0xFEEE, 0xFEEF,
      0xFEF0, 0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4, 0xFEF5, 0xFEF6, 0xFEF7, 0xFEF8,
      0xFEF9, 0xFEFA, 0xFEFB, 0xFEFC, 0x10800, 0x10801, 0x10802, 0x10803,
      0x10804, 0x10805, 0x10808, 0x1080A, 0x1080B, 0x1080C, 0x1080D, 0x1080E,
      0x1080F, 0x10810, 0x10811, 0x10812, 0x10813, 0x10814, 0x10815, 0x10816,
      0x10817, 0x10818, 0x10819, 0x1081A, 0x1081B, 0x1081C, 0x1081D, 0x1081E,
      0x1081F, 0x10820, 0x10821, 0x10822, 0x10823, 0x10824, 0x10825, 0x10826,
      0x10827, 0x10828, 0x10829, 0x1082A, 0x1082B, 0x1082C, 0x1082D, 0x1082E,
      0x1082F, 0x10830, 0x10831, 0x10832, 0x10833, 0x10834, 0x10835, 0x10837,
      0x10838, 0x1083C, 0x1083F, 0x10840, 0x10841, 0x10842, 0x10843, 0x10844,
      0x10845, 0x10846, 0x10847, 0x10848, 0x10849, 0x1084A, 0x1084B, 0x1084C,
      0x1084D, 0x1084E, 0x1084F, 0x10850, 0x10851, 0x10852, 0x10853, 0x10854,
      0x10855, 0x10857, 0x10858, 0x10859, 0x1085A, 0x1085B, 0x1085C, 0x1085D,
      0x1085E, 0x1085F, 0x10900, 0x10901, 0x10902, 0x10903, 0x10904, 0x10905,
      0x10906, 0x10907, 0x10908, 0x10909, 0x1090A, 0x1090B, 0x1090C, 0x1090D,
      0x1090E, 0x1090F, 0x10910, 0x10911, 0x10912, 0x10913, 0x10914, 0x10915,
      0x10916, 0x10917, 0x10918, 0x10919, 0x1091A, 0x1091B, 0x10920, 0x10921,
      0x10922, 0x10923, 0x10924, 0x10925, 0x10926, 0x10927, 0x10928, 0x10929,
      0x1092A, 0x1092B, 0x1092C, 0x1092D, 0x1092E, 0x1092F, 0x10930, 0x10931,
      0x10932, 0x10933, 0x10934, 0x10935, 0x10936, 0x10937, 0x10938, 0x10939,
      0x1093F, 0x10980, 0x10981, 0x10982, 0x10983, 0x10984, 0x10985, 0x10986,
      0x10987, 0x10988, 0x10989, 0x1098A, 0x1098B, 0x1098C, 0x1098D, 0x1098E,
      0x1098F, 0x10990, 0x10991, 0x10992, 0x10993, 0x10994, 0x10995, 0x10996,
      0x10997, 0x10998, 0x10999, 0x1099A, 0x1099B, 0x1099C, 0x1099D, 0x1099E,
      0x1099F, 0x109A0, 0x109A1, 0x109A2, 0x109A3, 0x109A4, 0x109A5, 0x109A6,
      0x109A7, 0x109A8, 0x109A9, 0x109AA, 0x109AB, 0x109AC, 0x109AD, 0x109AE,
      0x109AF, 0x109B0, 0x109B1, 0x109B2, 0x109B3, 0x109B4, 0x109B5, 0x109B6,
      0x109B7, 0x109BE, 0x109BF, 0x10A00, 0x10A10, 0x10A11, 0x10A12, 0x10A13,
      0x10A15, 0x10A16, 0x10A17, 0x10A19, 0x10A1A, 0x10A1B, 0x10A1C, 0x10A1D,
      0x10A1E, 0x10A1F, 0x10A20, 0x10A21, 0x10A22, 0x10A23, 0x10A24, 0x10A25,
      0x10A26, 0x10A27, 0x10A28, 0x10A29, 0x10A2A, 0x10A2B, 0x10A2C, 0x10A2D,
      0x10A2E, 0x10A2F, 0x10A30, 0x10A31, 0x10A32, 0x10A33, 0x10A40, 0x10A41,
      0x10A42, 0x10A43, 0x10A44, 0x10A45, 0x10A46, 0x10A47, 0x10A50, 0x10A51,
      0x10A52, 0x10A53, 0x10A54, 0x10A55, 0x10A56, 0x10A57, 0x10A58, 0x10A60,
      0x10A61, 0x10A62, 0x10A63, 0x10A64, 0x10A65, 0x10A66, 0x10A67, 0x10A68,
      0x10A69, 0x10A6A, 0x10A6B, 0x10A6C, 0x10A6D, 0x10A6E, 0x10A6F, 0x10A70,
      0x10A71, 0x10A72, 0x10A73, 0x10A74, 0x10A75, 0x10A76, 0x10A77, 0x10A78,
      0x10A79, 0x10A7A, 0x10A7B, 0x10A7C, 0x10A7D, 0x10A7E, 0x10A7F, 0x10B00,
      0x10B01, 0x10B02, 0x10B03, 0x10B04, 0x10B05, 0x10B06, 0x10B07, 0x10B08,
      0x10B09, 0x10B0A, 0x10B0B, 0x10B0C, 0x10B0D, 0x10B0E, 0x10B0F, 0x10B10,
      0x10B11, 0x10B12, 0x10B13, 0x10B14, 0x10B15, 0x10B16, 0x10B17, 0x10B18,
      0x10B19, 0x10B1A, 0x10B1B, 0x10B1C, 0x10B1D, 0x10B1E, 0x10B1F, 0x10B20,
      0x10B21, 0x10B22, 0x10B23, 0x10B24, 0x10B25, 0x10B26, 0x10B27, 0x10B28,
      0x10B29, 0x10B2A, 0x10B2B, 0x10B2C, 0x10B2D, 0x10B2E, 0x10B2F, 0x10B30,
      0x10B31, 0x10B32, 0x10B33, 0x10B34, 0x10B35, 0x10B40, 0x10B41, 0x10B42,
      0x10B43, 0x10B44, 0x10B45, 0x10B46, 0x10B47, 0x10B48, 0x10B49, 0x10B4A,
      0x10B4B, 0x10B4C, 0x10B4D, 0x10B4E, 0x10B4F, 0x10B50, 0x10B51, 0x10B52,
      0x10B53, 0x10B54, 0x10B55, 0x10B58, 0x10B59, 0x10B5A, 0x10B5B, 0x10B5C,
      0x10B5D, 0x10B5E, 0x10B5F, 0x10B60, 0x10B61, 0x10B62, 0x10B63, 0x10B64,
      0x10B65, 0x10B66, 0x10B67, 0x10B68, 0x10B69, 0x10B6A, 0x10B6B, 0x10B6C,
      0x10B6D, 0x10B6E, 0x10B6F, 0x10B70, 0x10B71, 0x10B72, 0x10B78, 0x10B79,
      0x10B7A, 0x10B7B, 0x10B7C, 0x10B7D, 0x10B7E, 0x10B7F, 0x10C00, 0x10C01,
      0x10C02, 0x10C03, 0x10C04, 0x10C05, 0x10C06, 0x10C07, 0x10C08, 0x10C09,
      0x10C0A, 0x10C0B, 0x10C0C, 0x10C0D, 0x10C0E, 0x10C0F, 0x10C10, 0x10C11,
      0x10C12, 0x10C13, 0x10C14, 0x10C15, 0x10C16, 0x10C17, 0x10C18, 0x10C19,
      0x10C1A, 0x10C1B, 0x10C1C, 0x10C1D, 0x10C1E, 0x10C1F, 0x10C20, 0x10C21,
      0x10C22, 0x10C23, 0x10C24, 0x10C25, 0x10C26, 0x10C27, 0x10C28, 0x10C29,
      0x10C2A, 0x10C2B, 0x10C2C, 0x10C2D, 0x10C2E, 0x10C2F, 0x10C30, 0x10C31,
      0x10C32, 0x10C33, 0x10C34, 0x10C35, 0x10C36, 0x10C37, 0x10C38, 0x10C39,
      0x10C3A, 0x10C3B, 0x10C3C, 0x10C3D, 0x10C3E, 0x10C3F, 0x10C40, 0x10C41,
      0x10C42, 0x10C43, 0x10C44, 0x10C45, 0x10C46, 0x10C47, 0x10C48, 0x1EE00,
      0x1EE01, 0x1EE02, 0x1EE03, 0x1EE05, 0x1EE06, 0x1EE07, 0x1EE08, 0x1EE09,
      0x1EE0A, 0x1EE0B, 0x1EE0C, 0x1EE0D, 0x1EE0E, 0x1EE0F, 0x1EE10, 0x1EE11,
      0x1EE12, 0x1EE13, 0x1EE14, 0x1EE15, 0x1EE16, 0x1EE17, 0x1EE18, 0x1EE19,
      0x1EE1A, 0x1EE1B, 0x1EE1C, 0x1EE1D, 0x1EE1E, 0x1EE1F, 0x1EE21, 0x1EE22,
      0x1EE24, 0x1EE27, 0x1EE29, 0x1EE2A, 0x1EE2B, 0x1EE2C, 0x1EE2D, 0x1EE2E,
      0x1EE2F, 0x1EE30, 0x1EE31, 0x1EE32, 0x1EE34, 0x1EE35, 0x1EE36, 0x1EE37,
      0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE4D, 0x1EE4E,
      0x1EE4F, 0x1EE51, 0x1EE52, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D,
      0x1EE5F, 0x1EE61, 0x1EE62, 0x1EE64, 0x1EE67, 0x1EE68, 0x1EE69, 0x1EE6A,
      0x1EE6C, 0x1EE6D, 0x1EE6E, 0x1EE6F, 0x1EE70, 0x1EE71, 0x1EE72, 0x1EE74,
      0x1EE75, 0x1EE76, 0x1EE77, 0x1EE79, 0x1EE7A, 0x1EE7B, 0x1EE7C, 0x1EE7E,
      0x1EE80, 0x1EE81, 0x1EE82, 0x1EE83, 0x1EE84, 0x1EE85, 0x1EE86, 0x1EE87,
      0x1EE88, 0x1EE89, 0x1EE8B, 0x1EE8C, 0x1EE8D, 0x1EE8E, 0x1EE8F, 0x1EE90,
      0x1EE91, 0x1EE92, 0x1EE93, 0x1EE94, 0x1EE95, 0x1EE96, 0x1EE97, 0x1EE98,
      0x1EE99, 0x1EE9A, 0x1EE9B, 0x1EEA1, 0x1EEA2, 0x1EEA3, 0x1EEA5, 0x1EEA6,
      0x1EEA7, 0x1EEA8, 0x1EEA9, 0x1EEAB, 0x1EEAC, 0x1EEAD, 0x1EEAE, 0x1EEAF,
      0x1EEB0, 0x1EEB1, 0x1EEB2, 0x1EEB3, 0x1EEB4, 0x1EEB5, 0x1EEB6, 0x1EEB7,
      0x1EEB8, 0x1EEB9, 0x1EEBA, 0x1EEBB, 0x10FFFD];

  function determineBidi(cueDiv) {
    var nodeStack = [],
        text = "",
        charCode;

    if (!cueDiv || !cueDiv.childNodes) {
      return "ltr";
    }

    function pushNodes(nodeStack, node) {
      for (var i = node.childNodes.length - 1; i >= 0; i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }

    function nextTextNode(nodeStack) {
      if (!nodeStack || !nodeStack.length) {
        return null;
      }

      var node = nodeStack.pop(),
          text = node.textContent || node.innerText;
      if (text) {
        // TODO: This should match all unicode type B characters (paragraph
        // separator characters). See issue #115.
        var m = text.match(/^.*(\n|\r)/);
        if (m) {
          nodeStack.length = 0;
          return m[0];
        }
        return text;
      }
      if (node.tagName === "ruby") {
        return nextTextNode(nodeStack);
      }
      if (node.childNodes) {
        pushNodes(nodeStack, node);
        return nextTextNode(nodeStack);
      }
    }

    pushNodes(nodeStack, cueDiv);
    while ((text = nextTextNode(nodeStack))) {
      for (var i = 0; i < text.length; i++) {
        charCode = text.charCodeAt(i);
        for (var j = 0; j < strongRTLChars.length; j++) {
          if (strongRTLChars[j] === charCode) {
            return "rtl";
          }
        }
      }
    }
    return "ltr";
  }

  function computeLinePos(cue) {
    if (typeof cue.line === "number" &&
        (cue.snapToLines || (cue.line >= 0 && cue.line <= 100))) {
      return cue.line;
    }
    if (!cue.track || !cue.track.textTrackList ||
        !cue.track.textTrackList.mediaElement) {
      return -1;
    }
    var track = cue.track,
        trackList = track.textTrackList,
        count = 0;
    for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
      if (trackList[i].mode === "showing") {
        count++;
      }
    }
    return ++count * -1;
  }

  function StyleBox() {
  }

  // Apply styles to a div. If there is no div passed then it defaults to the
  // div on 'this'.
  StyleBox.prototype.applyStyles = function(styles, div) {
    div = div || this.div;
    for (var prop in styles) {
      if (styles.hasOwnProperty(prop)) {
        div.style[prop] = styles[prop];
      }
    }
  };

  StyleBox.prototype.formatStyle = function(val, unit) {
    return val === 0 ? 0 : val + unit;
  };

  // Constructs the computed display state of the cue (a div). Places the div
  // into the overlay which should be a block level element (usually a div).
  function CueStyleBox(window, cue, styleOptions) {
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);
    var color = "rgba(255, 255, 255, 1)";
    var backgroundColor = "rgba(0, 0, 0, 0.8)";

    if (isIE8) {
      color = "rgb(255, 255, 255)";
      backgroundColor = "rgb(0, 0, 0)";
    }

    StyleBox.call(this);
    this.cue = cue;

    // Parse our cue's text into a DOM tree rooted at 'cueDiv'. This div will
    // have inline positioning and will function as the cue background box.
    this.cueDiv = parseContent(window, cue.text);
    var styles = {
      color: color,
      backgroundColor: backgroundColor,
      position: "relative",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "inline"
    };

    if (!isIE8) {
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl";
      styles.unicodeBidi = "plaintext";
    }
    this.applyStyles(styles, this.cueDiv);

    // Create an absolutely positioned div that will be used to position the cue
    // div. Note, all WebVTT cue-setting alignments are equivalent to the CSS
    // mirrors of them except "middle" which is "center" in CSS.
    this.div = window.document.createElement("div");
    styles = {
      textAlign: cue.align === "middle" ? "center" : cue.align,
      font: styleOptions.font,
      whiteSpace: "pre-line",
      position: "absolute"
    };

    if (!isIE8) {
      styles.direction = determineBidi(this.cueDiv);
      styles.writingMode = cue.vertical === "" ? "horizontal-tb"
                                               : cue.vertical === "lr" ? "vertical-lr"
                                                                       : "vertical-rl".
      stylesunicodeBidi =  "plaintext";
    }

    this.applyStyles(styles);

    this.div.appendChild(this.cueDiv);

    // Calculate the distance from the reference edge of the viewport to the text
    // position of the cue box. The reference edge will be resolved later when
    // the box orientation styles are applied.
    var textPos = 0;
    switch (cue.positionAlign) {
    case "start":
      textPos = cue.position;
      break;
    case "middle":
      textPos = cue.position - (cue.size / 2);
      break;
    case "end":
      textPos = cue.position - cue.size;
      break;
    }

    // Horizontal box orientation; textPos is the distance from the left edge of the
    // area to the left edge of the box and cue.size is the distance extending to
    // the right from there.
    if (cue.vertical === "") {
      this.applyStyles({
        left:  this.formatStyle(textPos, "%"),
        width: this.formatStyle(cue.size, "%"),
      });
    // Vertical box orientation; textPos is the distance from the top edge of the
    // area to the top edge of the box and cue.size is the height extending
    // downwards from there.
    } else {
      this.applyStyles({
        top: this.formatStyle(textPos, "%"),
        height: this.formatStyle(cue.size, "%")
      });
    }

    this.move = function(box) {
      this.applyStyles({
        top: this.formatStyle(box.top, "px"),
        bottom: this.formatStyle(box.bottom, "px"),
        left: this.formatStyle(box.left, "px"),
        right: this.formatStyle(box.right, "px"),
        height: this.formatStyle(box.height, "px"),
        width: this.formatStyle(box.width, "px"),
      });
    };
  }
  CueStyleBox.prototype = _objCreate(StyleBox.prototype);
  CueStyleBox.prototype.constructor = CueStyleBox;

  // Represents the co-ordinates of an Element in a way that we can easily
  // compute things with such as if it overlaps or intersects with another Element.
  // Can initialize it with either a StyleBox or another BoxPosition.
  function BoxPosition(obj) {
    var isIE8 = (/MSIE\s8\.0/).test(navigator.userAgent);

    // Either a BoxPosition was passed in and we need to copy it, or a StyleBox
    // was passed in and we need to copy the results of 'getBoundingClientRect'
    // as the object returned is readonly. All co-ordinate values are in reference
    // to the viewport origin (top left).
    var lh, height, width, top;
    if (obj.div) {
      height = obj.div.offsetHeight;
      width = obj.div.offsetWidth;
      top = obj.div.offsetTop;

      var rects = (rects = obj.div.childNodes) && (rects = rects[0]) &&
                  rects.getClientRects && rects.getClientRects();
      obj = obj.div.getBoundingClientRect();
      // In certain cases the outter div will be slightly larger then the sum of
      // the inner div's lines. This could be due to bold text, etc, on some platforms.
      // In this case we should get the average line height and use that. This will
      // result in the desired behaviour.
      lh = rects ? Math.max((rects[0] && rects[0].height) || 0, obj.height / rects.length)
                 : 0;

    }
    this.left = obj.left;
    this.right = obj.right;
    this.top = obj.top || top;
    this.height = obj.height || height;
    this.bottom = obj.bottom || (top + (obj.height || height));
    this.width = obj.width || width;
    this.lineHeight = lh !== undefined ? lh : obj.lineHeight;

    if (isIE8 && !this.lineHeight) {
      this.lineHeight = 13;
    }
  }

  // Move the box along a particular axis. Optionally pass in an amount to move
  // the box. If no amount is passed then the default is the line height of the
  // box.
  BoxPosition.prototype.move = function(axis, toMove) {
    toMove = toMove !== undefined ? toMove : this.lineHeight;
    switch (axis) {
    case "+x":
      this.left += toMove;
      this.right += toMove;
      break;
    case "-x":
      this.left -= toMove;
      this.right -= toMove;
      break;
    case "+y":
      this.top += toMove;
      this.bottom += toMove;
      break;
    case "-y":
      this.top -= toMove;
      this.bottom -= toMove;
      break;
    }
  };

  // Check if this box overlaps another box, b2.
  BoxPosition.prototype.overlaps = function(b2) {
    return this.left < b2.right &&
           this.right > b2.left &&
           this.top < b2.bottom &&
           this.bottom > b2.top;
  };

  // Check if this box overlaps any other boxes in boxes.
  BoxPosition.prototype.overlapsAny = function(boxes) {
    for (var i = 0; i < boxes.length; i++) {
      if (this.overlaps(boxes[i])) {
        return true;
      }
    }
    return false;
  };

  // Check if this box is within another box.
  BoxPosition.prototype.within = function(container) {
    return this.top >= container.top &&
           this.bottom <= container.bottom &&
           this.left >= container.left &&
           this.right <= container.right;
  };

  // Check if this box is entirely within the container or it is overlapping
  // on the edge opposite of the axis direction passed. For example, if "+x" is
  // passed and the box is overlapping on the left edge of the container, then
  // return true.
  BoxPosition.prototype.overlapsOppositeAxis = function(container, axis) {
    switch (axis) {
    case "+x":
      return this.left < container.left;
    case "-x":
      return this.right > container.right;
    case "+y":
      return this.top < container.top;
    case "-y":
      return this.bottom > container.bottom;
    }
  };

  // Find the percentage of the area that this box is overlapping with another
  // box.
  BoxPosition.prototype.intersectPercentage = function(b2) {
    var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
        y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
        intersectArea = x * y;
    return intersectArea / (this.height * this.width);
  };

  // Convert the positions from this box to CSS compatible positions using
  // the reference container's positions. This has to be done because this
  // box's positions are in reference to the viewport origin, whereas, CSS
  // values are in referecne to their respective edges.
  BoxPosition.prototype.toCSSCompatValues = function(reference) {
    return {
      top: this.top - reference.top,
      bottom: reference.bottom - this.bottom,
      left: this.left - reference.left,
      right: reference.right - this.right,
      height: this.height,
      width: this.width
    };
  };

  // Get an object that represents the box's position without anything extra.
  // Can pass a StyleBox, HTMLElement, or another BoxPositon.
  BoxPosition.getSimpleBoxPosition = function(obj) {
    var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
    var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
    var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;

    obj = obj.div ? obj.div.getBoundingClientRect() :
                  obj.tagName ? obj.getBoundingClientRect() : obj;
    var ret = {
      left: obj.left,
      right: obj.right,
      top: obj.top || top,
      height: obj.height || height,
      bottom: obj.bottom || (top + (obj.height || height)),
      width: obj.width || width
    };
    return ret;
  };

  // Move a StyleBox to its specified, or next best, position. The containerBox
  // is the box that contains the StyleBox, such as a div. boxPositions are
  // a list of other boxes that the styleBox can't overlap with.
  function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {

    // Find the best position for a cue box, b, on the video. The axis parameter
    // is a list of axis, the order of which, it will move the box along. For example:
    // Passing ["+x", "-x"] will move the box first along the x axis in the positive
    // direction. If it doesn't find a good position for it there it will then move
    // it along the x axis in the negative direction.
    function findBestPosition(b, axis) {
      var bestPosition,
          specifiedPosition = new BoxPosition(b),
          percentage = 1; // Highest possible so the first thing we get is better.

      for (var i = 0; i < axis.length; i++) {
        while (b.overlapsOppositeAxis(containerBox, axis[i]) ||
               (b.within(containerBox) && b.overlapsAny(boxPositions))) {
          b.move(axis[i]);
        }
        // We found a spot where we aren't overlapping anything. This is our
        // best position.
        if (b.within(containerBox)) {
          return b;
        }
        var p = b.intersectPercentage(containerBox);
        // If we're outside the container box less then we were on our last try
        // then remember this position as the best position.
        if (percentage > p) {
          bestPosition = new BoxPosition(b);
          percentage = p;
        }
        // Reset the box position to the specified position.
        b = new BoxPosition(specifiedPosition);
      }
      return bestPosition || specifiedPosition;
    }

    var boxPosition = new BoxPosition(styleBox),
        cue = styleBox.cue,
        linePos = computeLinePos(cue),
        axis = [];

    // If we have a line number to align the cue to.
    if (cue.snapToLines) {
      var size;
      switch (cue.vertical) {
      case "":
        axis = [ "+y", "-y" ];
        size = "height";
        break;
      case "rl":
        axis = [ "+x", "-x" ];
        size = "width";
        break;
      case "lr":
        axis = [ "-x", "+x" ];
        size = "width";
        break;
      }

      var step = boxPosition.lineHeight,
          position = step * Math.round(linePos),
          maxPosition = containerBox[size] + step,
          initialAxis = axis[0];

      // If the specified intial position is greater then the max position then
      // clamp the box to the amount of steps it would take for the box to
      // reach the max position.
      if (Math.abs(position) > maxPosition) {
        position = position < 0 ? -1 : 1;
        position *= Math.ceil(maxPosition / step) * step;
      }

      // If computed line position returns negative then line numbers are
      // relative to the bottom of the video instead of the top. Therefore, we
      // need to increase our initial position by the length or width of the
      // video, depending on the writing direction, and reverse our axis directions.
      if (linePos < 0) {
        position += cue.vertical === "" ? containerBox.height : containerBox.width;
        axis = axis.reverse();
      }

      // Move the box to the specified position. This may not be its best
      // position.
      boxPosition.move(initialAxis, position);

    } else {
      // If we have a percentage line value for the cue.
      var calculatedPercentage = (boxPosition.lineHeight / containerBox.height) * 100;

      switch (cue.lineAlign) {
      case "middle":
        linePos -= (calculatedPercentage / 2);
        break;
      case "end":
        linePos -= calculatedPercentage;
        break;
      }

      // Apply initial line position to the cue box.
      switch (cue.vertical) {
      case "":
        styleBox.applyStyles({
          top: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "rl":
        styleBox.applyStyles({
          left: styleBox.formatStyle(linePos, "%")
        });
        break;
      case "lr":
        styleBox.applyStyles({
          right: styleBox.formatStyle(linePos, "%")
        });
        break;
      }

      axis = [ "+y", "-x", "+x", "-y" ];

      // Get the box position again after we've applied the specified positioning
      // to it.
      boxPosition = new BoxPosition(styleBox);
    }

    var bestPosition = findBestPosition(boxPosition, axis);
    styleBox.move(bestPosition.toCSSCompatValues(containerBox));
  }

  function WebVTT() {
    // Nothing
  }

  // Helper to allow strings to be decoded instead of the default binary utf8 data.
  WebVTT.StringDecoder = function() {
    return {
      decode: function(data) {
        if (!data) {
          return "";
        }
        if (typeof data !== "string") {
          throw new Error("Error - expected string data.");
        }
        return decodeURIComponent(encodeURIComponent(data));
      }
    };
  };

  WebVTT.convertCueToDOMTree = function(window, cuetext) {
    if (!window || !cuetext) {
      return null;
    }
    return parseContent(window, cuetext);
  };

  var FONT_SIZE_PERCENT = 0.05;
  var FONT_STYLE = "sans-serif";
  var CUE_BACKGROUND_PADDING = "1.5%";

  // Runs the processing model over the cues and regions passed to it.
  // @param overlay A block level element (usually a div) that the computed cues
  //                and regions will be placed into.
  WebVTT.processCues = function(window, cues, overlay) {
    if (!window || !cues || !overlay) {
      return null;
    }

    // Remove all previous children.
    while (overlay.firstChild) {
      overlay.removeChild(overlay.firstChild);
    }

    var paddedOverlay = window.document.createElement("div");
    paddedOverlay.style.position = "absolute";
    paddedOverlay.style.left = "0";
    paddedOverlay.style.right = "0";
    paddedOverlay.style.top = "0";
    paddedOverlay.style.bottom = "0";
    paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
    overlay.appendChild(paddedOverlay);

    // Determine if we need to compute the display states of the cues. This could
    // be the case if a cue's state has been changed since the last computation or
    // if it has not been computed yet.
    function shouldCompute(cues) {
      for (var i = 0; i < cues.length; i++) {
        if (cues[i].hasBeenReset || !cues[i].displayState) {
          return true;
        }
      }
      return false;
    }

    // We don't need to recompute the cues' display states. Just reuse them.
    if (!shouldCompute(cues)) {
      for (var i = 0; i < cues.length; i++) {
        paddedOverlay.appendChild(cues[i].displayState);
      }
      return;
    }

    var boxPositions = [],
        containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
        fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
    var styleOptions = {
      font: fontSize + "px " + FONT_STYLE
    };

    (function() {
      var styleBox, cue;

      for (var i = 0; i < cues.length; i++) {
        cue = cues[i];

        // Compute the intial position and styles of the cue div.
        styleBox = new CueStyleBox(window, cue, styleOptions);
        paddedOverlay.appendChild(styleBox.div);

        // Move the cue div to it's correct line position.
        moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);

        // Remember the computed div so that we don't have to recompute it later
        // if we don't have too.
        cue.displayState = styleBox.div;

        boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
      }
    })();
  };

  WebVTT.Parser = function(window, vttjs, decoder) {
    if (!decoder) {
      decoder = vttjs;
      vttjs = {};
    }
    if (!vttjs) {
      vttjs = {};
    }

    this.window = window;
    this.vttjs = vttjs;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = decoder || new TextDecoder("utf8");
    this.regionList = [];
  };

  WebVTT.Parser.prototype = {
    // If the error is a ParsingError then report it to the consumer if
    // possible. If it's not a ParsingError then throw it like normal.
    reportOrThrowError: function(e) {
      if (e instanceof ParsingError) {
        this.onparsingerror && this.onparsingerror(e);
      } else {
        throw e;
      }
    },
    parse: function (data) {
      var self = this;

      // If there is no data then we won't decode it, but will just try to parse
      // whatever is in buffer already. This may occur in circumstances, for
      // example when flush() is called.
      if (data) {
        // Try to decode the data that we received.
        self.buffer += self.decoder.decode(data, {stream: true});
      }

      function collectNextLine() {
        var buffer = self.buffer;
        var pos = 0;
        while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
          ++pos;
        }
        var line = buffer.substr(0, pos);
        // Advance the buffer early in case we fail below.
        if (buffer[pos] === '\r') {
          ++pos;
        }
        if (buffer[pos] === '\n') {
          ++pos;
        }
        self.buffer = buffer.substr(pos);
        return line;
      }

      // 3.4 WebVTT region and WebVTT region settings syntax
      function parseRegion(input) {
        var settings = new Settings();

        parseOptions(input, function (k, v) {
          switch (k) {
          case "id":
            settings.set(k, v);
            break;
          case "width":
            settings.percent(k, v);
            break;
          case "lines":
            settings.integer(k, v);
            break;
          case "regionanchor":
          case "viewportanchor":
            var xy = v.split(',');
            if (xy.length !== 2) {
              break;
            }
            // We have to make sure both x and y parse, so use a temporary
            // settings object here.
            var anchor = new Settings();
            anchor.percent("x", xy[0]);
            anchor.percent("y", xy[1]);
            if (!anchor.has("x") || !anchor.has("y")) {
              break;
            }
            settings.set(k + "X", anchor.get("x"));
            settings.set(k + "Y", anchor.get("y"));
            break;
          case "scroll":
            settings.alt(k, v, ["up"]);
            break;
          }
        }, /=/, /\s/);

        // Create the region, using default values for any values that were not
        // specified.
        if (settings.has("id")) {
          var region = new (self.vttjs.VTTRegion || self.window.VTTRegion)();
          region.width = settings.get("width", 100);
          region.lines = settings.get("lines", 3);
          region.regionAnchorX = settings.get("regionanchorX", 0);
          region.regionAnchorY = settings.get("regionanchorY", 100);
          region.viewportAnchorX = settings.get("viewportanchorX", 0);
          region.viewportAnchorY = settings.get("viewportanchorY", 100);
          region.scroll = settings.get("scroll", "");
          // Register the region.
          self.onregion && self.onregion(region);
          // Remember the VTTRegion for later in case we parse any VTTCues that
          // reference it.
          self.regionList.push({
            id: settings.get("id"),
            region: region
          });
        }
      }

      // 3.2 WebVTT metadata header syntax
      function parseHeader(input) {
        parseOptions(input, function (k, v) {
          switch (k) {
          case "Region":
            // 3.3 WebVTT region metadata header syntax
            parseRegion(v);
            break;
          }
        }, /:/);
      }

      // 5.1 WebVTT file parsing.
      try {
        var line;
        if (self.state === "INITIAL") {
          // We can't start parsing until we have the first line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          line = collectNextLine();

          var m = line.match(/^WEBVTT([ \t].*)?$/);
          if (!m || !m[0]) {
            throw new ParsingError(ParsingError.Errors.BadSignature);
          }

          self.state = "HEADER";
        }

        var alreadyCollectedLine = false;
        while (self.buffer) {
          // We can't parse a line until we have the full line.
          if (!/\r\n|\n/.test(self.buffer)) {
            return this;
          }

          if (!alreadyCollectedLine) {
            line = collectNextLine();
          } else {
            alreadyCollectedLine = false;
          }

          switch (self.state) {
          case "HEADER":
            // 13-18 - Allow a header (metadata) under the WEBVTT line.
            if (/:/.test(line)) {
              parseHeader(line);
            } else if (!line) {
              // An empty line terminates the header and starts the body (cues).
              self.state = "ID";
            }
            continue;
          case "NOTE":
            // Ignore NOTE blocks.
            if (!line) {
              self.state = "ID";
            }
            continue;
          case "ID":
            // Check for the start of NOTE blocks.
            if (/^NOTE($|[ \t])/.test(line)) {
              self.state = "NOTE";
              break;
            }
            // 19-29 - Allow any number of line terminators, then initialize new cue values.
            if (!line) {
              continue;
            }
            self.cue = new (self.vttjs.VTTCue || self.window.VTTCue)(0, 0, "");
            self.state = "CUE";
            // 30-39 - Check if self line contains an optional identifier or timing data.
            if (line.indexOf("-->") === -1) {
              self.cue.id = line;
              continue;
            }
            // Process line as start of a cue.
            /*falls through*/
          case "CUE":
            // 40 - Collect cue timings and settings.
            try {
              parseCue(line, self.cue, self.regionList);
            } catch (e) {
              self.reportOrThrowError(e);
              // In case of an error ignore rest of the cue.
              self.cue = null;
              self.state = "BADCUE";
              continue;
            }
            self.state = "CUETEXT";
            continue;
          case "CUETEXT":
            var hasSubstring = line.indexOf("-->") !== -1;
            // 34 - If we have an empty line then report the cue.
            // 35 - If we have the special substring '-->' then report the cue,
            // but do not collect the line as we need to process the current
            // one as a new cue.
            if (!line || hasSubstring && (alreadyCollectedLine = true)) {
              // We are done parsing self cue.
              self.oncue && self.oncue(self.cue);
              self.cue = null;
              self.state = "ID";
              continue;
            }
            if (self.cue.text) {
              self.cue.text += "\n";
            }
            self.cue.text += line;
            continue;
          case "BADCUE": // BADCUE
            // 54-62 - Collect and discard the remaining cue.
            if (!line) {
              self.state = "ID";
            }
            continue;
          }
        }
      } catch (e) {
        self.reportOrThrowError(e);

        // If we are currently parsing a cue, report what we have.
        if (self.state === "CUETEXT" && self.cue && self.oncue) {
          self.oncue(self.cue);
        }
        self.cue = null;
        // Enter BADWEBVTT state if header was not parsed correctly otherwise
        // another exception occurred so enter BADCUE state.
        self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
      }
      return this;
    },
    flush: function () {
      var self = this;
      try {
        // Finish decoding the stream.
        self.buffer += self.decoder.decode();
        // Synthesize the end of the current cue or region.
        if (self.cue || self.state === "HEADER") {
          self.buffer += "\n\n";
          self.parse();
        }
        // If we've flushed, parsed, and we're still on the INITIAL state then
        // that means we don't have enough of the stream to parse the first
        // line.
        if (self.state === "INITIAL") {
          throw new ParsingError(ParsingError.Errors.BadSignature);
        }
      } catch(e) {
        self.reportOrThrowError(e);
      }
      self.onflush && self.onflush();
      return this;
    }
  };

  global.WebVTT = WebVTT;

}(this, (this.vttjs || {})));

//# sourceMappingURL=video.js.map