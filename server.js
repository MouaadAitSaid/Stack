let _ = require('lodash'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    _config = require('./Config/Config.js'),// getting th config file
    app = express();


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({limit: '10mb'})); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
// setting the evironnement :
process.env.NODE_ENV = 'dev';

// defining Controllers :
const Routes = ['Home','Users'];

_.forEach(Routes, (prefix) => {
    try {
        require("./Controllers/" + prefix + "Controller")(app);
        console.log(`success to load route "${prefix}"`);
    } catch (e) {
        console.log(`Failed to load route "${prefix}" : ${e}`);
    }

});
// defining Models
const Models = ['User'];
_.forEach(Models, (prefix) => {
    try {
        require("./Models/" + prefix)(mongoose);
    } catch (e) {
        console.log(`Failed to load Model ${e.message}`);
    }
});


/*app.get('/', function (req, res) {
    res.send(global.gConfig);
})*/

app.listen(global.gConfig.port, function () {
    let port = global.gConfig.port
    let host = global.gConfig.server

    console.log("app listening at http://%s:%s", host, port)
});