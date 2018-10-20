let mp = require("mongoose-paginate"),
    _u = require("../Factories/Utilities");

// exporting model to server
module.exports = (mongoose) => {
    //getting the scheme object
    let scheme = mongoose.Schema;
    // defining the model
    let modelBody = {
        firstName: {type: String, required: true, unique: false},
        lastName: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true,select: false},
        role: {type: String, required: true},
        otherInfos: {},
        salt: { type : String,select: false},
        created_at: {type: Date, default: Date.now()},
        updated_at: Date
    };


    // linking the model to the scheme
    let model = new scheme(modelBody);

    // setting new Date when updating
    model.pre('save', function (next) {
        _u.hashPassword(this,(res)=>{
            res.user.updated_at = Date.now();
            res.user.salt = res.salt;
            res.user.password = res.password;
            next();
        });
    });
    // defining methods


    // linking plugins (ssentielly the paginate one)
    model.plugin(mp); // the pagination plugin

    //exporting model to mongoose
    module.exports = mongoose.model('User', model);
    // assoc
};