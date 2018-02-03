(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EasyQuery"] = factory();
	else
		root["EasyQuery"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EasyQuery = function () {
  function EasyQuery() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EasyQuery);

    this.options = options;
  }

  _createClass(EasyQuery, [{
    key: 'parse',
    value: function parse(queryString) {
      return EasyQuery._parse(queryString, this.options);
    }
  }], [{
    key: '_parse',
    value: function _parse(query, options) {

      var keys = [];
      /* Go over every keyword */
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var _EasyQuery$_stringToK = EasyQuery._stringToKeyValues(query, key),
              matches = _EasyQuery$_stringToK.matches,
              queryString = _EasyQuery$_stringToK.queryString;

          query = queryString;
          if (Object.keys(matches).length > 0) {
            keys.push({ key: key, matches: matches });
          }
        }

        /* Finally run default over the remaining string */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      query = query.trim();
      if (query.length > 0) {
        keys.push({
          key: options.default,
          matches: [{
            field: options.default.field, values: [query] }] });
      }

      /* Convert key -> values to selectors */
      var selectors = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var km = _step2.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = km.matches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var match = _step3.value;

              var selector = EasyQuery._keyValueToSelector(match, km.key);
              if (Object.keys(selector).length > 0) {
                selectors.push(selector);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (selectors.length == 1) {
        return selectors[0];
      } else if (selectors.length == 0) {
        return {};
      } else {
        return { $and: selectors };
      }
    }
  }, {
    key: '_stringToKeyValues',
    value: function _stringToKeyValues(queryString, key) {

      var remainingQuery = queryString;

      var matches = [];

      /* Map alias a to non-capturing groups */
      var names = key.alias.map(function (a) {
        return '(?:' + a + ')';
      });

      /* Create regex list of the different key names */
      names = key.alias.join('|');

      /* Regex to get the key value pairs, allow either quoted or non-quoted values. */
      var regex = new RegExp('(?:\\s*(?:' + names + '):\\s?"([^"]*)"\\s*|\\s*(?:' + names + '):\\s?([^\\s]*)\\s*)', 'gi');

      var m = null;
      while (m = regex.exec(queryString)) {
        if (m.index === regex.lastIndex) {
          /* Avoids infinite loops with zero-width matches */
          regex.lastIndex++;
        }

        /* Check if group 1 or 2 matches */
        var value = m[1] ? m[1] : m[2];

        value = EasyQuery._splitMultiValues(value);

        /* Save the match and remove from the queryString */
        matches.push({ field: key.field, values: value });
        remainingQuery = remainingQuery.replace(m[0], '');
      }

      return { matches: matches, queryString: remainingQuery };
    }
  }, {
    key: '_splitMultiValues',
    value: function _splitMultiValues(value) {
      /* Splits a value string in to multiple using the delimitor */
      return value.split(';');
    }
  }, {
    key: '_keyValueToSelector',
    value: function _keyValueToSelector(keyValue, key) {

      switch (key.type) {

        case 'number':
          return EasyQuery._numberKeyValueToSelector(keyValue, key);

        case 'text':
          return EasyQuery._textKeyValueToSelector(keyValue, key);

        default:
          return EasyQuery._stringKeyValueToSelector(keyValue, key);

      }
    }
  }, {
    key: '_stringKeyValueToSelector',
    value: function _stringKeyValueToSelector(keyValue, key) {

      var values = [];
      var options = key.opts.caseSensitive ? 'g' : 'gi';

      var field = key.field;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = keyValue.values[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var value = _step4.value;

          /* Escape regex characters */
          value = EasyQuery._escapeRegExp(value);

          /* Generate pattern */
          var pattern = key.opts.fuzzy ? '.*' + value + '.*' : value;

          /* Create selector */
          var v = {};
          v[field] = { $regex: pattern, $options: options };

          values.push(v);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (values.length == 1) {
        return values[0];
      } else {
        return { $or: values };
      }
    }
  }, {
    key: '_escapeRegExp',
    value: function _escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
  }, {
    key: '_numberKeyValueToSelector',
    value: function _numberKeyValueToSelector(keyValue, key) {

      var values = [];

      var field = key.field;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = keyValue.values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var value = _step5.value;


          var operator = "$eq";
          if (value.startsWith('>=')) {
            operator = '$gte';
            value = value.substring(2);
          } else if (value.startsWith('<=')) {
            operator = '$lte';
            value = value.substring(2);
          } else if (value.startsWith('>')) {
            operator = '$gt';
            value = value.substring(1);
          } else if (value.startsWith('<')) {
            operator = '$lt';
            value = value.substring(1);
          } else if (value.startsWith('!')) {
            operator = '$ne';
            value = value.substring(1);
          }

          var tryValue = Number(value);
          if (!isNaN(tryValue)) {
            value = tryValue;
          }

          /* Create selector */
          var v = {};
          v[field] = {};
          v[field][operator] = value;

          values.push(v);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (values.length == 1) {
        return values[0];
      } else {
        return { $or: values };
      }
    }
  }, {
    key: '_textKeyValueToSelector',
    value: function _textKeyValueToSelector(keyValue, key) {

      var searchString = keyValue.values.join(' ');
      return {
        $text: {
          $search: searchString,
          $caseSensitive: key.opts.caseSensitive,
          $diacriticSensitive: key.opts.diacriticSensitive
        }
      };
    }
  }]);

  return EasyQuery;
}();

exports.default = EasyQuery;

/***/ })
/******/ ]);
});
//# sourceMappingURL=easy-query-dsl.js.map