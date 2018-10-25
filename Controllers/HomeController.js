let _ = require('lodash'),
    _u = require('../Factories/Utilities');


routesHome = [
    {
        path: '',
        httpMethod: 'GET',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, false);
            return _u.build(res, 200, {status: true, message: "Welcome to home page"});


        }]
    }
]
module.exports = (app) => {

    _.each(routesHome, (route) =>{
        route.middleware.unshift((req, res, next) => {
            _u.verifyToken(req, res, next, routesHome);
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

}
