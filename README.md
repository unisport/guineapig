# silver-palm-tree
Javascript based split test script

```javascript
var sampler = require('./sample');
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
        target: 'B'
    }
])
    .createSample()
    .runTests(location.hash);
```
