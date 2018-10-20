let Response = require('../Factories/ResponseBuilder'),
    _ = require('lodash'),
    _u = require('../Factories/Utilities');


routes = [
    {
        path: '',
        httpMethod: 'Get',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, false);
            return Response.build(res, 200, {status: true, message: "Welcome to home page"});


        }]
    }
]
module.exports = function (app,routePrefix) {

    _.each(routes, function (route) {
        /* route.middleware.unshift(function (req, res, next) {
             AuthCtrl.ensureAuthorizedApi(req, res, next, routesApiUser)
         });*/
        let goodPath = `/${routePrefix}${(route.path.trim().length!==0)?"/"+route.path:''}`;
        let args = _.flatten([goodPath, route.middleware]);

        switch (route.httpMethod) {
            case 'Get':
                app.get.apply(app, args);
                break;
            case 'Post':
                app.post.apply(app, args);
                break;
            case 'Put':
                app.put.apply(app, args);
                break;
            case 'Del':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error(`Invalid HTTP method specified for route : "${goodPath}"`);

        }
    });

}
