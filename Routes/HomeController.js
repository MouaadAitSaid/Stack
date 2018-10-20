let Response = require('../Services/ResponseBuilder');
let _ = require('lodash');
let prefix = '';


routes = [
    {
        path: '/' + prefix,
        httpMethod: 'Get',
        require: {},
        middleware: [function (req, res) {

            return Response.build(res, 200, {status :true, message : "Welcome to home page"});


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

