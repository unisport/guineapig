/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 */
	var sampler = __webpack_require__(1);

	// Polyfill
	var $ = document.querySelector.bind(document);

	sampler.setUp([
	    {
	        name: 'test_kitty', test: function() {
	            $('#butt').style.backgroundColor = 'yellow'; 
	        }, scope: '#test_kitty',
	        target: 'A'
	    },
	    {
	        name: 'test_pussy', test: function() {
	            $('body').style.backgroundColor = 'silver';
	        }, scope: '*'
	    },
	    {
	        name: 'test_world', test: function() {
	            console.log('Hello World');
	        }, scope: '#test_world',
	        target: 'A'
	    }
	])
	    .createSample()
	    .runTests(location.hash);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Sample script
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (cookie) {
	    var _cookie = null,
	        _tests = [],
	        _sample = null;

	    return {
	        setUp: function(tests) {
	            this._tests = tests;
	            this._cookie = cookie;

	            return this;
	        },
	        createSample: function() {
	            var spread = ['a', 'b'],
	                self = this;

	            this._tests.forEach(function(test) {
	                if (!self._cookie.get(test.name)) {
	                    var r = Math.floor(Math.random() * spread.length);
	                    self._cookie.set(test.name, spread[r]);
	                }
	            });
	            return this;
	        },
	        runTests: function(scope) {
	            var self = this;

	            this._tests.forEach(function(test) {
	                if (test.scope === scope) {
	                    var sample = self._cookie.get(test.name);
	                    if ( sample === test.target.toLowerCase() ) {
	                        test.test();
	                    }
	                }
	                if ( test.scope === '*' ) {
	                    test.test();
	                }
	            });
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * CookieJS
	 */
	var Cookie = (function() {

	    var _getValue = function (name) {
	        var val = [],
	            _cookie = document.cookie.split(';') || [],

	        name = RegExp("^\\s*"+ name +"=\\s*(.*?)\\s*$");
	        for (var i = 0; i < _cookie.length; i++) {
	            var f = _cookie[i].match(name);
	            f&&val.push(f[1]);
	        }

	        return val.pop();
	    };
	    var _hasCookie = function (key) {
	        var _params = document.cookie.split('=') || [];

	        return document.cookie.split('=').indexOf(key); 
	    };
	    var _setValue = function (key, val, expires, path) {
	        var _key = key || null,
	            _val = val || null,
	            _expires = expires || null,
	            _path = path || '/';

	        if (_expires) {
	            var date = new Date();
	            date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
	            _expires = date.toGMTString();
	        }

	        document.cookie = _key +'='+ _val +'; expires='+ _expires +'; path='+ _path;
	    };
	    /* Public methods */
	    return {
	        get: _getValue,
	        set: _setValue,
	        has: _hasCookie
	    };
	})();

	module.exports = Cookie;


/***/ }
/******/ ]);