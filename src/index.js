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