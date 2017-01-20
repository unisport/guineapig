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
/***/ function(module, exports, __webpack_require__) {

	
	var http = __webpack_require__(1);

	var GuineaPig = (function() {
	    'use strict';

	    var init = function(name, variants) {
	        var test = name.toToken(),
	            experiments = variants,
	            experiment = null;

	        return new Promise( function ( resolve, reject ) {
	            if ( get( 'guineapig_'+ test ) ) {
	                experiment = experiments[ parseInt( get( 'guineapig_'+ test ) ) ];
	                experiment['token'] = experiment.name.toToken();
	                experiment['title'] = test;

	                experiment.experiment( {'name': experiment.name, 'title': experiment.title} );

	                return resolve ();
	            } else {
	                http().get( '/distribution/'+ test )
	                    .then( function ( resp ) {
	                        var json = JSON.parse ( resp );
	                        set( 'guineapig_'+ json.experiment, json.variant );
	                        experiment = experiments[ parseInt ( json.variant ) ];
	                        experiment['token'] = experiment.name.toToken();
	                        experiment['title'] = test;
	                        
	                        experiment.experiment( {'name': experiment.name, 'title': experiment.title} );

	                        return resolve ();
	                    } ).catch ( function ( reason ) {
	                        return reject ( reason );
	                    } );
	            }
	        });
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
	        reset: del
	    }
	})();

	module.exports = GuineaPig;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var http = function () {
	    "use strict";
	    var core = {
	        xhr: function ( method, url, args, headers ) {
	            return new Promise ( function ( resolve, reject ) {
	                var client = new XMLHttpRequest(),
	                    uri = url;
	                if ( args && ( method == 'POST' ) ) {
	                    uri += '?';
	                    var argcount = 0;
	                    for ( var key in args ) {
	                        if ( args.hasOwnProperty ( key ) ) {
	                            if ( argcount++ ) {
	                                uri += '&';
	                            }
	                            uri += encodeURIComponent ( key ) + '=' + encodeURIComponent( args[ key ] );
	                        }
	                    }
	                }
	                client.open ( method, uri );
	                if ( headers !== undefined ) {
	                    for ( var key in headers ) {
	                        client.setRequestHeader ( key.toUpperCase(), headers[ key ] );
	                    }
	                }
	                client.send();
	                client.onload = function () {
	                    console.log(this);
	                    if ( this.status == 200) {
	                        resolve ( this.response );
	                    } else {
	                        reject ( Error ( this.statusText ) );
	                    }
	                };
	                client.onerror = function () {
	                    reject ( this.statusText );
	                }
	            } );
	        }
	    };

	    return {
	        'get': function ( url, args, headers) {
	            return core.xhr ( 'GET', url, args, headers );
	        },
	        'post': function ( url, args) {
	            return core.xhr ( 'POST', url, args, headers );
	        }
	    };
	};

	module.exports = http;


/***/ }
/******/ ])
});
;