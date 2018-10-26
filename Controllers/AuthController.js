let _ = require('lodash'),
    _u = require('../Factories/Utilities'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


routesAuths = [
    {
        path: `/api/Auth/login`,
        httpMethod: 'POST',
        require: {},
        middleware: [(req, res) => {
            _u.PrintReq(req, true);
            try {
                switch (req.body.username) {
                    case global.gConfig.sAdmin.username :
                        if (global.gConfig.sAdmin.password !== req.body.password) {
                            return _u.build(res, 200, {
                                status: true,
                                message: "Invalid credentiels",
                                data: null
                            });
                        }
                        let saData = global.gConfig.sAdmin;
                        saData.username = null;
                        saData.password = null;
                        return _u.getToken(saData, (token) => {
                            return _u.build(res, 200, {
                                status: true,
                                message: "Login Done. Welcome Super Admin. :) .",
                                token: token
                            });
                        });
                    default :
                        return User.findOne({username: req.body.username}).select('+password').exec((err, user) => {
                            if (err) return _u.build(res, 508, {status: false, message: "Oups, something went wrong"});
                            if (!user) return _u.build(res, 200, {
                                status: true,
                                message: "Invalid credentiels",
                                data: null
                            });
                            return _u.comparePasswords(user.password, req.body.password, (isGoodPassword) => {
                                if (!isGoodPassword) return _u.build(res, 200, {
                                    status: true,
                                    message: "Invalid credentiels",
                                    data: null
                                });
                                user.password = null;
                                user.salt = null;
                                _u.getToken({
                                    _id: user._id,
                                    firstName: user.firstName,
                                    email: user.email,
                                    lastName: user.lastName,
                                    role: user.role,
                                    otherInfos: user.otherInfos
                                }, (token) => {
                                    return _u.build(res, 200, {
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
                return _u.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }
        }]
    }
]

module.exports = (app) => {


    _.each(routesAuths,  (route) =>{
        route.middleware.unshift((req, res, next) => {
            _u.verifyToken(req, res, next, routesAuths);
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
