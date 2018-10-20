let Response = require('../Factories/ResponseBuilder'),
    _ = require('lodash'),
    _u = require('../Factories/Utilities'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _a = require('async'),
    _mailer = require("../Factories/EmailSender");


routes = [
    {  // Saving the record
        path: '',
        httpMethod: 'Post',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);
            try {
                let user = new User(req.body);
                return user.save((err) => {
                    if (!err) {
                        let emailData = {
                            lastName: req.body.lastName,
                            firstName: req.body.firstName,
                            username: req.body.username,
                            password: req.body.password
                        };
                        let attachements = [
                            {path: "C:\\Users\\lenovo\\Pictures\\z.png",filename : "z.png"},
                            {path: "C:\\Users\\lenovo\\Pictures\\a.png",filename : "a.png"},
                            {path: "C:\\Users\\lenovo\\Pictures\\s.png",filename : "s.png"}
                        ];

                        _mailer.sendEmail(emailData, global.gConfig.tmplsPath + "UserCreation.html", attachements, [req.body.email], "Account Created",
                            (response) => {
                                _u.console("w", true, `Response Email : ${JSON.stringify(response)}`);
                            });
                        return Response.build(res, 200, {status: true, message: "Welcome to Users page"});
                    }
                    return Response.build(res, 508, {status: false, message: "User not saved"});

                });
            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }


        }]
    },
    {  // getting the list
        path: '',
        httpMethod: 'Get',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);
            try {
                return User.find({}, (err, users) => {
                    return Response.build(res, 200, {status: true, message: "Users Loaded", data: users});
                })

            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }
        }]
    },
    {  // getting the record
        path: ':id',
        httpMethod: 'Get',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);
            try {
                return User.findById(req.params.id, (err, user) => {
                    return Response.build(res, 200, {status: true, message: "User Loaded", data: user});
                })

            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }
        }]
    },
    {  // modifying the record
        path: ':id',
        httpMethod: 'Put',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);

            try {
                return User.findById(req.params.id, (err, user) => {
                    if (err) return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
                    updateUser(user, req.body, (newUser) => {
                        newUser.save((err) => {
                            if (err) return Response.build(res, 508, {
                                status: false,
                                message: "Oups, something went wrong"
                            });
                            return Response.build(res, 200, {status: true, message: "User Updated", data: newUser});
                        });
                    });
                })

            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }


        }]
    },
    {  // removing  the record
        path: ':id',
        httpMethod: 'Del',
        require: {},
        middleware: [function (req, res) {
            _u.PrintReq(req, true);
            try {
                return User.findById(req.params.id, (err, user) => {
                    if (err) return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
                    user.remove((err) => {
                        if (err) return Response.build(res, 508, {
                            status: false,
                            message: "Oups, something went wrong"
                        });
                        return Response.build(res, 200, {status: true, message: "User Deleted"});
                    })
                })

            } catch (e) {
                _u.console("e", true, e);
                return Response.build(res, 508, {status: false, message: "Oups, something went wrong"});
            }


        }]
    }
]

updateUser = (old, user, cb) => {
    old.firstName = user.firstName;
    old.lastName = user.lastName;
    old.email = user.email;
    old.username = user.username;
    old.password = user.password;
    cb(old);
};
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
