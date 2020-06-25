const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    birthday: Date,
    gender: String,
    password: String,
    image: String,
    histoday: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ],
    histobirthday: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Historybirthday'
        }
    ],
    historasee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Historyrasee'
        }
    ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
