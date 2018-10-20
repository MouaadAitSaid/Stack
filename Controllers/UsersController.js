let Response = require('../Services/ResponseBuilder'),
    _ = require('lodash'),
    prefix = 'Users',
    _u = require('../Services/Utilities');


routes = [
    {
        path: '/' + prefix,
        httpMethod: 'Get',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req,true);
            return Response.build(res, 200, {status: true, message: "Welcome to Users page"});


        }]
    }
]

module.exports = function (app) {

    _.each(routes, function (route) {
        /* route.middleware.unshift(function (req, res, next) {
             AuthCtrl.ensureAuthorizedApi(req, res, next, routesApiUser)
         });*/
        let args = _.flatten([route.path, route.middleware]);

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
                throw new Error('Invalid HTTP method specified for route ' + route.path);

        }
    });

}
