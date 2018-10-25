let _ = require('lodash'),
    _u = require('../Factories/Utilities'),
    mongoose = require('mongoose'),
    Config = mongoose.model('Config');


routesConfig = [
    {  // removing  the record
        path: '/Config',
        httpMethod: 'POST',
        require: {
            superAdmin: true,
            token: true,
            roles: ["Admin"]
        },
        middleware: [(req, res) => {
            _u.PrintReq(req, true);
            try {
                return _u.build(res, 200, {status: true, message: "Config Posted"});
            } catch (e) {
                _u.console("e", true, e);
                return _u.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }


        }]
    }
];


module.exports = function (app) {

    _.each(routesConfig, (route) =>{
        route.middleware.unshift((req, res, next) => {
            _u.verifyToken(req, res, next, routesConfig);
        });
        let goodPath = route.path;
        let args = _.flatten([goodPath, route.middleware]);

        switch (route.httpMethod) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error(`Invalid HTTP method specified for route : "${goodPath}"`);

        }
    });

};
