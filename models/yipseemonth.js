const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let yipseemonthSchema = new mongoose.Schema({
    name1: String,
    image1: String,
    text1: String, 
    name2: String,
    image2: String,
    text2: String,
    name3: String,
    image3: String,
    text3: String,
    name4: String,
    image4: String,
    text4: String,
    name5: String,
    image5: String,
    text5: String,
    name6: String,
    image6: String,
    text6: String,
    name7: String,
    image7: String,
    text7: String,
    name8: String,
    image8: String,
    text8: String,
    name9: String,
    image9: String,
    text9: String,
    name10: String,
    image10: String,
    text0: String,
});

yipseemonthSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Yipseemonth', yipseemonthSchema);