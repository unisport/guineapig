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
/***/ function(module, exports) {

	var GuineaPig = (function() {
	    'use strict';

	    var test = '',
	        variants = [];

	    var init = function(name, variants, distribution) {
	        this.test = name.toToken(),
	        this.variants = variants;

	        console.log( this.test );
	        http( this.test ).then( function ( resp ) {
	            
	        }).catch( function ( reason ) {
	            console.log( reason );
	        });
	    };

	    var http = function ( experiment ) {
	        return new Promise ( function ( resolve, reject ) {
	            var xhr = new XMLHttpRequest();
	                xhr.open( 'GET', '/distribution/'+ experiment );
	                xhr.send();
	                xhr.onload = function () {
	                    console.log( 'loading' );
	                    if ( this.status >= 200 && this.status < 300 ) {
	                        resolve( JSON.parse( this.response ) );
	                    } else {
	                        reject( this.statusText );
	                    }
	                };
	                xhr.onerror = function () {
	                    reject( this.statusText );
	                };
	        });
	    };
	    var run = function() {
	        var variant = get(this.test);
	        for (var i = 0; i < this.variants.length; i++) {
	            var obj = this.variants[i];
	            /*
	            if (Object.keys(obj).includes('name') && obj.name.toToken() === variant.toToken()) {
	                runExperiment(obj);
	            }
	            */
	        }
	    };

	    var runExperiment = function(experiment) {
	        var obj = experiment;

	        if (obj.test(experiment)) {
	            obj.experiment(experiment);
	        }
	    };

	    var randomInt = function(low, high) {
	        return Math.floor(Math.random() * (high - low) + low);
	    };

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

	    var set = function(k, v, d, p) {
	        var key = k,
	            val = v,
	            days = d || 1,
	            path = p || '/',
	            expires = '',
	            date = new Date();
	            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	            expires = '; expires='+ date.toGMTString();

	        document.cookie = key +'='+ val + expires  +'; path='+ path;
	    };

	    var del = function() {
	        set(this.test, '', -1);
	    };

	    String.prototype.toToken = function() {
	        return this.toLowerCase().replace(/[^a-z0-9]/g, '_');
	    };

	    return {
	        experiment: init,
	        go: run,
	        reset: del
	    }
	})();

	module.exports = GuineaPig;


/***/ }
/******/ ])
});
;