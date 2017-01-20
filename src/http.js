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
