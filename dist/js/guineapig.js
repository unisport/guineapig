(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GuineaPig"] = factory();
	else
		root["GuineaPig"] = factory();
})(this, function() {
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
/***/ (function(module, exports) {

/**
 *
 */
var GuineaPig = (function() {
    'use strict';

    var config = {
      backend: '/experiments',
      cookieExpire: 40,
      cookiePath: '/'
    };
    // Runs the experiment and stores it in a cookie
    var experiment = function(name, variants) {
        var test = name.toToken(),
            experiments = variants,
            experiment = null,
            variant = window.GuineaPigExperiment || 0;

            if (get('guineapig_'+ test)) {
              variant = parseInt(get('guineapig_'+ test));
            } else {
              set('guineapig_'+ test, variant, 365);
            }

            experiment = experiments[variant];
            experiment.experiment({
              name: experiment.name,
              variant: variant
            });
            
    };
    // Setup
    var setup = function(obj) {
      Object.assign(config, obj);
      return this;
    };
    // Posts data to the backend
    var store = function(obj) {
      fetch(config.backend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
    };
    // Reading cookie value based on cookie name
    var get = function(key) {
        var val = [],
            cookie = document.cookie.split(';') || [],
            name = RegExp("^\\s*"+ key +"=\\s*(.*?)\\s*$");
        for (var i = 0; i < cookie.length; i++) {
            var f = cookie[i].match(name);
                f&&val.push(f[1]);
        }
        return val.pop();
    };
    // Set cookie with name, value, days and path
    var set = function(k, v, d, p) {
        var key = k,
            val = v,
            days = d || config.cookieExpire,
            path = p || config.cookiePath,
            expires = '',
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires='+ date.toGMTString();

        document.cookie = key +'='+ val + expires  +'; path='+ path;
    };
    // Delete cookie
    var del = function() {
        set(this.test, '', -1);
    };
    // Helper function to tokenize a string
    String.prototype.toToken = function() {
        return this.toLowerCase().replace(/[^a-z0-9]/g, '_');
    };
    // Public methods
    return {
        experiment: experiment,
        reset: del,
        store: store,
        setup: setup
    }
})();

module.exports = GuineaPig;

/***/ })
/******/ ]);
});