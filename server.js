let _ = require('lodash'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _config = require('./Config/Config.js'),// getting th config file
    path = require('path'),
    app = express(),
    async = require("async");

//seeting the root path to global variable
global.appRoot = path.resolve(__dirname);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({limit: '10mb'})); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users*/
// setting the evironnement :
process.env.NODE_ENV = 'dev';


// injecting Models

_.forEach(global.injectionData.Models, (prefix) => {
    try {
        require("./Models/" + prefix)(mongoose);
    } catch (e) {
        console.log(`Failed to load Model "${prefix}" ${e}`, true);
    }
});


// injecting Routes :


_.forEach(global.injectionData.Routes, (route) => {
    try {
        require("./Controllers/" + route.name + "Controller")(app);
    } catch (e) {
        console.log(`Failed to load route "${route.name}" : ${e}`, true);
    }

});

// When Route is 404 (Not working Yet)
/*app.use(function(req, res, next) {
    res.status(404);
});*/
/*app.get('/', function (req, res) {
    res.send(global.gConfig);
})*/
mongoose.set('useCreateIndex', true); //  Version warning problem resolution (  collection.ensureIndex is deprecated. )
let dbHost = global.gConfig.database.host;
let dbName = global.gConfig.database.name;
let dbPort = global.gConfig.database.port;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {useNewUrlParser: true}, (err) => {
    if (err) console.log(`Database not connected "mongodb://${dbHost}:${dbPort}/${dbName}\n ${err}"`, true);
    else console.log(`Database connected "mongodb://${dbHost}:${dbPort}/${dbName}"`, true);

});

app.listen(global.gConfig.port, function () {
    let port = global.gConfig.port
    let host = global.gConfig.server

    console.log(`app listening at "http://${host}:${port}"`, true)
});