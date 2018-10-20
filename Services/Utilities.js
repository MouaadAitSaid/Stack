getReq = (req, val) => {
    switch (val) {
        case true :
            let url = req.protocol + '://' + req.get('host') + req.originalUrl;
            let body = JSON.stringify(req.body);
            let zwaqa = `\n${"*".repeat(30)}\n`;
            console.info(`${zwaqa}Route Activated :\n - URL : "${url}".\n - BODY :\n ${body}.${zwaqa}`);
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
    console: printInConsole
};