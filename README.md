# silver-palm-tree
Running multivariant test on your UI can improve conversion and userexperience.

The tests Array contains objects that each represent a single experiment to be performed depending on the sample. Inside each experiment you can use the test() function to perform additional testing for different criteria, by default it should return true if you just want to perform the experiment.

```javascript
var tests = [
    {
        name: 'Add to Cart',
        experiment: function(obj) {
            // Manipulate the DOM as much as you like here
        }
    },
    {
        name: 'Subscribe to our Newsletter',
        experiment: function(obj) {
            // Manipulate the DOM as much as you like here
        }
    },
    {
        name: 'Run Forest, Run',
        experiment: function(obj) {
            // Manipulate the DOM as much as you like here
        }
    },
],
name = 'Super Awesome Kickass UX Experiment';

// Run the GuineaPig
GuineaPig
    .experiment(name, tests)
    .then(function () {
        console.log('Hello Kitty');    
    });
```
