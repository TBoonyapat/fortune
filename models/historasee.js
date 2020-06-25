const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let historyraseeSchema = new mongoose.Schema({
   text1: String,
   text2: String,
   text3: String,
   text4: String,
   text5: String,
   text6: String,
   text7: String, 
   name1: String,
   name: String,
   image1: String,
   star: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Star'
    }],
   Timestamp : { type: Date, default: Date.now },
});

historyraseeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Historyrasee', historyraseeSchema);
