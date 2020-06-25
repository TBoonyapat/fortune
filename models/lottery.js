const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let lotterySchema = new mongoose.Schema({
    nameup: String,
    zero: String,
    one: String,
    two: String,
    three: String,
    four: String,
    five: String,
    six: String,
    seven: String,
    eight: String,
    nine: String,
    namedow: String,
    zero1: String,
    one1: String,
    two1: String,
    three1: String,
    four1: String,
    five1: String,
    six1: String,
    seven1: String,
    eight1: String,
    nine1: String,
    dream: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dream'
        }
    ],
});

lotterySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Lottery', lotterySchema);