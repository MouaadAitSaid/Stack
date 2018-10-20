let _ = require('lodash'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _config = require('./Config/Config.js'),// getting th config file
    _u = require("./Services/Utilities"),
    app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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


// Connecting MongoDB database :


// defining Models
const Models = ['User'];
_.forEach(Models, (prefix) => {
    try {
        require("./Models/" + prefix)(mongoose);
    } catch (e) {
        _u.console('w',true,`Failed to load Model "${prefix}" ${e}`);
    }
});

// defining Controllers :
const Routes = ['Home','Users'];

_.forEach(Routes, (prefix) => {
    try {
        require("./Controllers/" + prefix + "Controller")(app);
    } catch (e) {
        _u.console('w',true,`Failed to load route "${prefix}" : ${e}`);
    }

});
/*app.get('/', function (req, res) {
    res.send(global.gConfig);
})*/
mongoose.set('useCreateIndex', true); //  Version warning problem resolution (  collection.ensureIndex is deprecated. )
let dbHost = global.gConfig.database.host;
let dbName = global.gConfig.database.name;
let dbPort = global.gConfig.database.port;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,{ useNewUrlParser: true },(err)=>{
    if(err)_u.console('w',true,`Database not connected "mongodb://${dbHost}:${dbPort}/${dbName}\n ${err}"`);
    else _u.console('i',true,`Database connected "mongodb://${dbHost}:${dbPort}/${dbName}"`);

});

app.listen(global.gConfig.port, function () {
    let port = global.gConfig.port
    let host = global.gConfig.server

    _u.console('i',true,`app listening at "http://${host}:${port}"`)
});