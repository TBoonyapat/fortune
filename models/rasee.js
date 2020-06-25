const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let raseeSchema = new mongoose.Schema({
    name: String,
    text1: String,
    text2: String,
    text3: String,
    text4: String,
    text5: String,
    text6: String,
    text7: String,
    image: String,
});

raseeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Rasee', raseeSchema);