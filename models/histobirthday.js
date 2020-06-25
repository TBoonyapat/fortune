const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let historybirthdaySchema = new mongoose.Schema({
   text1: String,
   text2: String,
   text3: String,
   text4: String,
   text5: String,
   month: String,
   day: String,
   year: String,
   name1: String,
   name2: String,
   name3: String,
   name4: String,
   name5: String,
   star: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Star'
    }],
   Timestamp : { type: Date, default: Date.now },
});

historybirthdaySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Historybirthday', historybirthdaySchema);
