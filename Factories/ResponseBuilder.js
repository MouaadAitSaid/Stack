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

module.exports = {

    build: BuildResponse
};