let Response = require('../Services/ResponseBuilder'),
    _ = require('lodash'),
    _u = require('../Services/Utilities'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


routes = [
    {
        path: `login`,
        httpMethod: 'Post',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);
            try {
                switch (req.body.username) {
                    case global.gConfig.sAdmin.username :
                        if(global.gConfig.sAdmin.password!==req.body.password){
                            return Response.build(res, 200, {
                                status: true,
                                message: "Invalid credentiels",
                                data: null
                            });
                        }
                        let saData = global.gConfig.sAdmin;
                        saData.username = null;
                        saData.password = null;
                        return _u.getToken(saData, (token) => {
                            return Response.build(res, 200, {
                                status: true,
                                message: "Login Done. Welcome Super Admin. :) .",
                                token: token
                            });
                        });
                    default :
                        return User.findOne({username: req.body.username}).select('+password').exec((err, user) => {
                            if (err) return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
                            if (!user) return Response.build(res, 200, {status: true, message: "Invalid credentiels", data: null});
                            return _u.comparePasswords(user.password, req.body.password, (isGoodPassword) => {
                                if (!isGoodPassword) return Response.build(res, 200, {
                                    status: true,
                                    message: "Invalid credentiels",
                                    data: null
                                });
                                user.password = null;
                                user.salt = null;
                                _u.getToken({
                                    firstName: user.firstName,
                                    email: user.email,
                                    lastName: user.lastName,
                                    role: user.role,
                                    otherInfos: user.otherInfos
                                }, (token) => {
                                    return Response.build(res, 200, {
                                        status: true,
                                        message: "Login Done. Welcome :) .",
                                        token: token
                                    });
                                });

                            })
                        })
                }

            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }
        }]
    }
]

module.exports = function (app, routePrefix) {

    _.each(routes, function (route) {
        /* route.middleware.unshift(function (req, res, next) {
             AuthCtrl.ensureAuthorizedApi(req, res, next, routesApiUser)
         });*/
        let goodPath = `/${routePrefix}${(route.path.trim().length !== 0) ? "/" + route.path : ''}`;
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
