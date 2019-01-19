let mailer = require("nodemailer"),
    handlebars = require('handlebars'),
    fs = require('fs'),
    _u = require("./Utilities");

sendEmail = (data, htmlTemplatePath, attachements, receivers, subject, cb) => {
    let transporter = mailer.createTransport(global.gConfig.emailData);
    let templateEntirePath = global.appRoot + htmlTemplatePath;
    _u.console("w", true, `PAAATH TMP :${templateEntirePath}`);
    return readHTMLFile(templateEntirePath, (err, html) => {
        let template = handlebars.compile(html);
        let htmlToSend = template(data);
        let mailOptions = {
            from: '"Mouaad AIT SAID 👻" <global.gConfig.emailData.auth.user>', // sender address
            to: receivers, // list of receivers
            subject: subject, // Subject linec
            //text: 'Hello world?', // plain text body
            html: htmlToSend, // html body
            attachments : attachements // mail attachements
        };
        transporter.sendMail(mailOptions, function (error, response) {
            cb(response);
        });
    });
};

readHTMLFile = (path, callback) => {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

module.exports = {
    sendEmail: sendEmail
}