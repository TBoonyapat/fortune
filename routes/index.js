const express = require('express'),
      router = express.Router();
      passport = require('passport'),
      multer = require('multer'),
      path = require('path'),
      Birthdaydate = require('../models/birthdaydate'),
      User = require('../models/user');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb){
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg'){
        return cb(new Error('Only image is allowed'), false)
        }
        cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFilter});

router.get('/', function(req,res){
    res.render('landing');
});

router.get('/login', function(req,res){
    res.render('login');
});

router.post('/login', passport.authenticate('local',{
    successRedirect: '/fortune',
    failureRedirect: 'login',
    successFlash: true,
    failureFlash: true,
    // successFlash: 'Successfully log in!',
    failureFlash: 'Invalid username or password!'
}),function(req, res){
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success','You log out successfully');
    res.redirect('/fortune');
});

router.get('/signup', function(req,res){
    res.render('signup');
});

router.post('/signup',upload.single('image'), function(req,res){
    User.register(new User({username: req.body.username,name: req.body.name, birthday: req.body.birthday, gender: req.body.gender, image: req.file.filename}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req,res,function(){
            /*req.flash('success','Welcome to EduTarot, ' + user.username);*/
            res.redirect('/fortune');
        });
    });
});




module.exports = router;