module.exports = (mongoose) => {
    //getting the scheme object
    let scheme = mongoose.Schema;
    // defining the model
    let modelBody = {
        serverConfig : {

        },
        clientConfig : {

        }
    };
    // linking the model to the scheme
    let model = new scheme(modelBody);

    //exporting model to mongoose
    module.exports = mongoose.model('Config', model);

};