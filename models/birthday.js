const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let birthdaySchema = new mongoose.Schema({
    day: String,
    name1: String,
    text1: String,
    name2: String,
    text2: String,
    name3: String,
    text3: String,
    name4: String,
    text4: String,
    name5: String,
    text5: String,

});

birthdaySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Birthday', birthdaySchema);