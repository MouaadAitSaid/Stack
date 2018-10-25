let _ = require('lodash'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _config = require('./Config/Config.js'),// getting th config file
    path = require('path'),
    app = express(),
    async = require("async"),
    fs = require("fs");

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
var files = fs.readdirSync('./Models/').filter( (x)=> {
    return x.substr(-3) === ".js";
});
for (var i = 0; i !== files.length; ++i) {
    try {
        require('./Models/'+ files[i])(mongoose);
    } catch (e) {
        console.log(`Failed to load Model "${files[i]}" ${e}`);
    }
}

// injecting Routes :
files = fs.readdirSync('./Controllers/').filter( (x)=> {
    return x.substr(-3) === ".js";
});
for (var k = 0; k !== files.length; ++k) {
    try {
        require('./Controllers/'+ files[k])(app);
    } catch (e) {
        console.log(`Failed to load Route "${files[k]}" ${e}`);
    }
}


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
    else console.log(`Database connected "mongodb://${dbHost}:${dbPort}/${dbName}"`);

});

app.listen(global.gConfig.port, function () {
    let port = global.gConfig.port
    let host = global.gConfig.server

    console.log(`app listening at "http://${host}:${port}"`)
});