/*
 * Sample script
 */
define(['./cookie'], function (cookie) {
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
});
