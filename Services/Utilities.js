getReq = (req,val) => {
    switch (val) {
        case true :
            let url =  req.protocol + '://' + req.get('host') + req.originalUrl;
            let body = JSON.stringify(req.body);
            let zwaqa = `\n${"*".repeat(30)}\n`;
            console.info( `${zwaqa}Route Activated :\n - URL : "${url}".\n - BODY :\n ${body}.${zwaqa}`);
            break;
        case false :
            return null;
    }
};


module.exports = {
    PrintReq: getReq
};