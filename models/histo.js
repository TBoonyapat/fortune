const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let historySchema = new mongoose.Schema({
   text1: String,
   text2: String,
   text3: String,
   text4: String,
   text5: String,
   text6: String,
   name1: String,
   image1: String,
   star: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Star'
    }],
   Timestamp : { type: Date, default: Date.now },
});

historySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('History', historySchema);
