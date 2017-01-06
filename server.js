/**
 * Static server and gun server
 */
var port = process.argv[2] || process.env.PORT || 8080,
    express = require('express'),
    app = express(),
    join = require('path').join;

var dist = join(__dirname, 'dist');
app.use(express.static('dist'));

app.listen(port, function () {
    console.log('Server running on port %s', port);
});

app.get('/distribution/:experiment', function (req, res) {
    var r = Math.floor( Math.random() * 3 );
    res.send(JSON.stringify({ 'variant': r, 'experiment': req.params.experiment }));
});
