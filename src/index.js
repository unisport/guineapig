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
