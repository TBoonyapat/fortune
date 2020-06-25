const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let starSchema = new mongoose.Schema({
    star: {
        type: Number,
    },
});

starSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Star', starSchema);
