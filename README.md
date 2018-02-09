# GuineaPig
Running multivariant test on your UI can improve conversion and userexperience.

The tests Array contains objects that each represent a single experiment to be performed depending on the sample. Inside each experiment you can use the test() function to perform additional testing for different criteria, by default it should return true if you just want to perform the experiment.

```javascript
var GuineaPigExperiment = 1;
var tests = [
{
  name: 'Hello Kitty',
  experiment: function(obj) {
    var metrics = Object.assign(obj, {
      appVersion: navigator.appVersion
    });
    document.querySelector('#butt').style = 'color: red';
    document.querySelector('#butt').addEventListener('click', function(event) {
      GuineaPig.store(metrics);
    });
  }
},
{
  name: 'Hello Pussy',
  experiment: function(obj) {
    var metrics = Object.assign(obj, {
      appVersion: navigator.appVersion
    });
    document.querySelector('#butt').style = 'color: orange';
    document.querySelector('#butt').addEventListener('click', function(event) {
      GuineaPig.store(metrics);
    });
  }
},
],
name = 'Super Awesome Kickass UX Experiment';

GuineaPig.setup({
    backend: '/backend',
     cookieExpire: 30
}).experiment(name, tests);
```
