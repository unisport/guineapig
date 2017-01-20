
var http = require('./http');

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
