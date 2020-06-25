const   express = require("express"),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        flash = require('connect-flash'),
        passport = require('passport'),
        passportLocal = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        methodOverride = require('method-override'),
        User = require('./models/user'),
        fortuneRoutes = require('./routes/fortune'),
        profileRoutes = require('./routes/profile'),
        indexRoutes = require('./routes/index');
     
const port=process.env.PORT || 3000;
var mongo_uri = "mongodb+srv://admin:boonyapat_17@fortune-qauvw.gcp.mongodb.net/MYDATA?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

const   app = express();

mongoose.set('useUnifiedTopology',true);
mongoose.connect('mongodb://localhost:27017/fortune', {useNewUrlParser: true});
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
app.use(express.static("public"));
app.use(bodyParser.json());  // คำสั่งสำหรับแปลงค่า JSON ให้สามารถดึงและส่งค่าไปยัง MongoDB Atlas ได้
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));
// seedDB();

app.use(require('express-session')({
    secret: 'CSS227',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/',indexRoutes);
app.use('/fortune',fortuneRoutes);
app.use('/fortune/:id/profile',profileRoutes);


app.listen(3000,function(req,res){
    console.log('TeeTeeFortune has started!');
});