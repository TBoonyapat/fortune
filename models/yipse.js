const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let yipseSchema = new mongoose.Schema({
    name: String,
    image: String,
    dataday: String,
    datalove: String,
});

yipseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Yipse', yipseSchema);