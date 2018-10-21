let bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    _ = require("lodash"),
    _score = require("underscore"),
    async = require("async"),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

tokenFactory = (payload, cb) => {
    return jwt.sign(payload, global.gConfig.secretKey, global.gConfig.jwtOptions, (err, token) => {
        if (err) {
            printInConsole('e', true, "Error generation Token" + err);
            return null;
        }
        cb("Bearer " + token);
    })
};

BuildResponse = (res, code, msg) => {

    switch (code) {
        case 500 :
            console.log('Internal error (500): %s', msg);
            return res.status(500).json({error: msg});

        default :
            if (msg) {
                return res.status(code).json(msg);
            } else {
                return res.sendStatus(code);
            }

    }
};




comparePasswords = (hashedPass, incmingpass, cb) => {

    return bcrypt.compare(incmingpass, hashedPass, (err, res) => {
        if (err) {
            printInConsole('e', true, "Error Comparing passwords");
            return null;
        }

        cb(res);
    });
};

getReq = (req, val, headerVal) => {
    switch (val) {
        case true :
            let url = req.protocol + '://' + req.get('host') + req.originalUrl;
            let body = JSON.stringify(req.body);
            let params = JSON.stringify(req.params);
            let zwaqa = `\n${"*".repeat(30)}\n`;
            let header;
            if (headerVal) header = JSON.stringify(headerVal)
            printInConsole("w", true, `${zwaqa}Route Activated :\n - URL : "${url}".\n - PARAMS :\n "${params}".\n - BODY :\n ${body}\n  ${(headerVal) ? '- Header : \n' + header : ''}${zwaqa}.`);
            break;
        case false :
            return null;
    }
};


printInConsole = (type, val, message, serverLogsShow) => {
    if (global.gConfig.activateConsoles || serverLogsShow !== undefined) {
        switch (val) {
            case true :
                switch (type) {
                    case `i` :
                        console.info(message);
                        break;
                    case `l` :
                        console.log(message);
                        break;
                    case `w`:
                        console.warn(message);
                        break;
                    case `e`:
                        console.error(message);

                        break;
                    default :
                        console.log(message);
                }
                break;
            case false:
                break;
        }
    }


};

verifyToken = (req, res, next, routes) => {
    /***************/
    getTokenFromHeader = (headers,cb) => {
        if (headers == null) throw new Error('Header is null');
        if (headers.authorization == null) {
            printInConsole("w",true,'Authorization header is null');
            return BuildResponse(res, 401, {message: "No Authorization"});
        }

        var authorization = headers.authorization;
        var authArr = authorization.split(' ');
        if (authArr.length !== 2){
            printInConsole("w",true,'Authorization header value is not of length 2');
            return BuildResponse(res, 401, {message: "No Authorization"});
        }
        // retrieve token
        cb( authArr[1]);
    };

    sanitize = (object) => {
        _.each(object, function (value, key) {
            if (_.isObject(value)) {
                object[key] = sanitize(value);
            }
        });
        return object;
    };

    let route = _score.findWhere(routes, {
        path:  req.route.path,
        httpMethod: req.route.stack[0].method.toUpperCase()
    });

    sanitize(req.body);
    if (route.require && route.require.token) {
        if (req.headers == null) return BuildResponse(res, 401, {message: "No Authorization"});


         getTokenFromHeader(req.headers,(token)=>{
             if (!token) return BuildResponse(res, 401, {message: "No Authorization"});
             jwt.verify(token, global.gConfig.secretKey, (err, decodedData) => {
                 if (err) {
                     printInConsole("w", true, err.message);
                     return BuildResponse(res, 401, {message: "No Authorization"});
                 }
                 if (decodedData.role === global.gConfig.sAdmin.role && decodedData.ActiveSuperAdmin && decodedData.ActiveSuperAdmin === global.gConfig.sAdmin.ActiveSuperAdmin) {
                     req.cUser = decodedData;
                     return next();
                 }
                 printInConsole("w", false, "Routes Roles : " + JSON.stringify(route) + decodedData.role);
                 printInConsole("w", true, "Routes Roles : " +JSON.stringify(decodedData));
                 let requiredRoletest = _score.contains(route.require.roles, decodedData.role);
                 printInConsole("w", false, "requiredRoletest : " + requiredRoletest);
                 if (requiredRoletest) {
                     return User.findById(decodedData._id).select("-password -salt")
                         .lean()
                         .exec(function (err, user) {
                             if (!err) {
                                 req.cUser = user;
                                 return next();
                             }
                         });
                 }
                 return BuildResponse(res, 401, {message: "No Authorization"});

             });
         });

    } else {
        return next();
    }

};


module.exports = {
    PrintReq: getReq,
    console: printInConsole,
    comparePasswords: comparePasswords,
    getToken: tokenFactory,
    verifyToken: verifyToken,
    build: BuildResponse
};