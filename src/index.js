var GuineaPig = (function() {
    'use strict';

    var test = '',
        variants = [],
        randInt = 0;

    var init = function(name, variants) {
        this.test = name.toToken(),
        this.variants = variants,
        this.randInt = randomInt(0, this.variants.length);

        if (typeof get(this.test) == 'undefined') {
            set(this.test, this.variants[this.randInt].name.toToken(), 30);
        }
        return this;
    };

    var run = function() {
        var variant = get(this.test);
        for (var i = 0; i < this.variants.length; i++) {
            var obj = this.variants[i];
            if (Object.keys(obj).includes('name') && obj.name.toToken() === variant.toToken()) {
                runExperiment(obj);
            }
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
