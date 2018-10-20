let bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

tokenFactory = (payload,cb)=>{
    return jwt.sign(payload,global.gConfig.secretKey,global.gConfig.jwtOptions,(err,token)=>{
        if(err){
            printInConsole('e',true,"Error generation Token" + err);
            return null;
        }
        cb(token);
    })
};

hashPassword = (user,cb)=>{
  return bcrypt.genSalt(global.gConfig.bcrypt.saltRounds,(err, salt) =>{
        return bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                printInConsole('e',true,"Error generation hash for password");
                return null;
            }
            this.printInConsole('w',false,{"password" : hash,"salt" : salt});
            cb({"password" : hash,"salt" : salt ,"user" : user});
        });
    });
};

comparePasswords = (hashedPass,incmingpass,cb)=>{

    return  bcrypt.compare(incmingpass,hashedPass,(err,res)=>{
        if(err){
            printInConsole('e',true,"Error Comparing passwords");
            return null;
        }

        cb(res);
    });
};

getReq = (req, val) => {
    switch (val) {
        case true :
            let url = req.protocol + '://' + req.get('host') + req.originalUrl;
            let body = JSON.stringify(req.body);
            let params = JSON.stringify(req.params);
            let zwaqa = `\n${"*".repeat(30)}\n`;
            console.info(`${zwaqa}Route Activated :\n - URL : "${url}".\n - PARAMS : "${params}".\n - BODY :\n ${body}.${zwaqa}`);
            break;
        case false :
            return null;
    }
};



printInConsole = (type, val, message) => {
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

};
module.exports = {
    PrintReq: getReq,
    console: printInConsole,
    hashPassword : hashPassword,
    comparePasswords : comparePasswords,
    getToken : tokenFactory
};