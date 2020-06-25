const express = require('express'),
      router = express.Router({mergeParams: true}),
      multer = require('multer'),
      path = require('path'),
      fs = require('fs'),
      User = require('../models/user'),
      Day = require('../models/day'),
      Rasee = require('../models/rasee'),
      Yipse = require('../models/yipse'),
      Yipseemonth = require('../models/yipseemonth'),
      Birthday = require('../models/birthday'),
      History = require('../models/histo'),
      Historybirthday = require('../models/histobirthday'),
      Historyrasee = require('../models/historasee'),
      Birthdaydate = require('../models/birthdaydate'),
      Star = require('../models/star'),
      moment = require('moment'),
      middleware = require('../middleware');


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

//โชว์โปรไฟล์
router.get("/",middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id).populate('histoday').populate('historasee').populate('histobirthday').exec(function(err, idUser){
        res.render("fortune/profile", {moment: moment,User: idUser});
    });
});
////////////////////////////////////////////////////////////////

//เก็บค่าดาวรายวัน
router.post("/history/star/:id/day", middleware.isLoggedIn, function(req,res){
    console.log('5');
    Star.create({star: req.body.name}, function(err, star){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            History.findById(req.params.id, function(err, upHis){
                upHis.star.push(star)
                upHis.save();
                console.log('save');
            })
            res.redirect('/fortune/'+req.user._id+'/profile');
        }
    });
});
//เก็บค่าดาวราศี
router.post("/history/star/:id/rasee", middleware.isLoggedIn, function(req,res){
    console.log('6');
    Star.create({star: req.body.name}, function(err, star){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            Historyrasee.findById(req.params.id, function(err, upHis){
                upHis.star.push(star)
                upHis.save();
                console.log('save');
            })
            res.redirect('/fortune/'+req.user._id+'/profile');
        }
    });
});
//เก็บค่าดาววันเกิด
router.post("/history/star/:id/birthday", middleware.isLoggedIn, function(req,res){
    console.log('7');
    Star.create({star: req.body.name}, function(err, star){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            Historybirthday.findById(req.params.id, function(err, upHis){
                upHis.star.push(star)
                upHis.save();
                console.log('save');
            })
            res.redirect('/fortune/'+req.user._id+'/profile');
        }
    });
});
////////////////////////////////////////////////////////////////

//แก้โปรไฟล์
router.get("/:id",middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id).populate('histoday').exec(function(err, foundUser){
        res.render("fortune/edit", {User: foundUser});
    });
});

router.put("/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    console.log(req.params.id);
    let n_name = req.body.name;
    let n_birthday = req.body.birth;
    let n_gender = req.body.gender;
    if(req.file){
        let n_image = req.file.filename;
        User.findById(req.params.id, function(err, found){
            if(err){
                res.redirect('/');
            } else {
                const imagePath = './public/uploads/' + found.image;
                fs.unlink(imagePath, function(err){
                    if(err){
                        console.log(err);
                        res.redirect('/');
                    }
                })
            }
        })
        var n_card = {image:n_image,name: n_name,birthday: n_birthday,gender: n_gender};
    } else {
        var n_card = {name: n_name,birthday: n_birthday,gender: n_gender};
    }
    User.findByIdAndUpdate(req.params.id, n_card, function(err, updatedProfile){
        if(err){
            res.redirect('/frotune');
        } else {
            console.log('update');
            res.redirect('/fortune/'+req.params.id+'/profile');
        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////

//ดูประวัติรายวัน
router.get("/history/:id/showday",middleware.isLoggedIn, function(req,res){
    History.findById(req.params.id, function(err, foundHis){
        res.render("fortune/historyshow", {His: foundHis});
    });
});
router.get("/history/:id/showrasee",middleware.isLoggedIn, function(req,res){
    Historyrasee.findById(req.params.id, function(err, foundHis){
        res.render("fortune/historyshowrasee", {His: foundHis});
    });
});

router.get("/history/:id/showbirthday",middleware.isLoggedIn, function(req,res){
    Historybirthday.findById(req.params.id, function(err, foundHis){
        res.render("fortune/historyshowbirth", {His: foundHis});
    });
});
//////////////////////////////////////////////////////////////////////////////

//ลบประวัติ
router.delete("/history/day/:his_id", middleware.isLoggedIn, function(req,res){
    History.findByIdAndRemove(req.params.his_id, function(err){
        if(err){
            res.redirect('back'); 
        } else {
            res.redirect('/fortune/'+req.params.id+'/profile');
        }
    });
});
router.delete("/history/rasee/:his_id", middleware.isLoggedIn, function(req,res){
    Historyrasee.findByIdAndRemove(req.params.his_id, function(err){
        if(err){
            res.redirect('back'); 
        } else {
            res.redirect('/fortune/'+req.params.id+'/profile');
        }
    });
});
router.delete("/history/birthday/:his_id", middleware.isLoggedIn, function(req,res){
    Historybirthday.findByIdAndRemove(req.params.his_id, function(err){
        if(err){
            res.redirect('back'); 
        } else {
            res.redirect('/fortune/'+req.params.id+'/profile');
        }
    });
});
////////////////////////////////////////////////////////////////////////////

//บันทึกวัน
router.post("/histo/day/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    console.log('1');
    Day.findById(req.params.id, function(err, oneDay){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            let n_day = {name1:'ดวงรายวันคนเกิด '+oneDay.name, image1: oneDay.image, text1: oneDay.text1, text2: oneDay.text2,
                text3: oneDay.text3, text4: oneDay.text4, text5: oneDay.text5, text6: oneDay.text6}
            History.create(n_day, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.histoday.push(his)
                        newHis.save();
                        console.log('#');
                    })
                    res.redirect('/fortune/today');
                }
            });
        }
    });
});
//////////////////////////////////////////////////////////////////////////

//บันทึกราศี
router.post("/histo/rasee/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    Rasee.findById(req.params.id, function(err, onera){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            let n_rasee = {name1:'ดวง'+onera.name+'ปี 2563',name: onera.name, image1: onera.image, text1: onera.text1, text2: onera.text2,
                text3: onera.text3, text4: onera.text4, text5: onera.text5, text6: onera.text6, text7: onera.text7}
            Historyrasee.create(n_rasee, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.historasee.push(his)
                        newHis.save();
                        console.log('save');
                    })
                    res.redirect('/fortune/rasee');
                }
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//บันทึกวันเกิด
router.post("/histo/birthday/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    Birthdaydate.findById(req.params.id, function(err, onebirth){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            let n_birth = {name1:'ดวงคนเกิดวันที่'+onebirth.day, text1: onebirth.text1, text2: onebirth.text2,year: onebirth.year,
                text3: onebirth.text3, text4: onebirth.text4, text5: onebirth.text5, name2: onebirth.name1,month: onebirth.month,
                name3: onebirth.name2, name4: onebirth.name3, name5: onebirth.name4, name6: onebirth.name5, day: onebirth.day}
            Historybirthday.create(n_birth, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.histobirthday.push(his)
                        newHis.save();
                        console.log('save');
                    })
                    res.redirect('/fortune/birthday');
                }
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//บันทึกยิปซีรายวัน
router.post("/histo/yipsee/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    console.log('1');
    Yipse.findById(req.params.id, function(err, yip){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            console.log(yip.name);
            let n_yip = {name1:'คำทำนายไพ่ยิปซีรายวัน  ไพ่'+yip.name, image1: yip.image, text1: yip.dataday,}
            History.create(n_yip, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.histo.push(his)
                        newHis.save();
                        console.log('save');
                    })
                    res.redirect('/fortune/yipseeday');
                }
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/histo/yipseelove", middleware.isLoggedIn, upload.single('image'), function(req,res){
    console.log('1');
    Yipse.find({}, function(err, yip){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            console.log(yip.name);
            console.log('save');
            let n_yip = {name1:'คำทำนายไพ่ยิปซีรายเดือน ไพ่'+yip.name, image1: yip.image, text1: yip.dataday,}
            History.create(n_yip, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.histo.push(his)
                        newHis.save();
                        console.log('save');
                    })
                    res.redirect('/fortune/yipseeday');
                }
            });
        }
    });
});

//บันทึกรายเดือน
router.post("/histo/yipseemonth/:id", middleware.isLoggedIn, upload.single('image'), function(req,res){
    console.log('1');
    Yipseemonth.findById(req.params.id, function(err, yip){
        if(err){
            console.log(err);
            res.redirect('/fortune');
        } else {
            let n_yip = {name1:'คำทำนายไพ่ยิปซีรายเดือน', image1: yip.image1, image2: yip.image2, image3: yip.image3, image4: yip.image4, image5: yip.image5,
                         image6: yip.image6, image7: yip.image7, image8: yip.image8, image9: yip.image9, image10: yip.image10, text1: yip.text1,
                         text2: yip.text2, text3: yip.text3, text4: yip.text4, text5: yip.text5, text6: yip.text6, text7: yip.text7, text8: yip.text8,
                         text9: yip.text9, text10: yip.text10, name2: yip.name1, name3: yip.name2, name4: yip.name3, name5: yip.name4, name6: yip.name5,
                         name7: yip.name6,name8: yip.name7,name9: yip.name8, name10: yip.name9, name: yip.name10}
            History.create(n_yip, function(err,his){
                if(err){
                    console.log(err);
                } else {
                    User.findById(req.user._id, function(err, newHis){
                        newHis.histo.push(his)
                        newHis.save();
                        console.log('save');
                    })
                    res.redirect('/fortune/yipseeday');
                }
            });
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;