const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let dreamSchema = new mongoose.Schema({
    name: String,
    text1: String,
    text2: String,
    text3: String,
    text4: String,
    text5: String,
    text6: String,
    text7: String,
    text8: String,
});

dreamSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Dream', dreamSchema);