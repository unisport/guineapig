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
/*
 * Faking the backend
 */
function retVal(low, high) {
    return Math.floor(Math.random() * (high - low +1) + low);
}

app.get('/distribution/:experiment', function (req, res) {
    res.send(JSON.stringify({ 'variant': retVal(0, 3), 'experiment': req.params.experiment }));
});
