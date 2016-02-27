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
