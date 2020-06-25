const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    fs = require('fs'),
    Day = require('../models/day'),
    Yipse = require('../models/yipse'),
    Rasee = require('../models/rasee'),
    Birthday = require('../models/birthday'),
    Birthdaydate = require('../models/birthdaydate'),
    Lottery = require('../models/lottery'),
    Dream = require('../models/dream'),
    mongoose = require('mongoose'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb+srv://admin:boonyapat_17@fortune-qauvw.gcp.mongodb.net/MYDATA?retryWrites=true&w=majority";


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only image is allowed'), false)
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

router.get("/", function (req, res) {
    res.render("landing");
});

// ดูดวงรายวัน 
router.get("/today", function (req, res) {
    Day.find({}, function (error, oneDay) {
        if (error) {
            console.log("Error!");
        } else {
            console.log("1");
            res.render("fortune/day", { Day: oneDay });
        }
    })
});
////////////////////////////////////////////////////////////////

//ดูดวงราศี
router.get("/rasee", function (req, res) {
    res.render("fortune/rasee");
});

router.post("/rasee", function (req, res) {
    let day = req.body.day;
    let month = req.body.month;
    if (month == 2 && day >= 13 || month == 3 && day <= 13) { //กุมภ์
        Rasee.find({ _id: '5eebf9c6a415d05218abe684' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 3 && day >= 14 || month == 4 && day <= 12) { // มีน
        Rasee.find({ _id: '5eebfa29a415d05218abe685' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 4 && day >= 13 || month == 5 && day <= 13) { //เมษ
        Rasee.find({ _id: '5eebfc132a8d2e4784092b62' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 1 && day >= 14 || month == 2 && day <= 12) { //มังกร
        Rasee.find({ _id: '5eebf94da415d05218abe682' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 5 && day >= 14 || month == 6 && day <= 13) { //พฤษภ
        Rasee.find({ _id: '5eed09ce2a8d2e4784092b65' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 6 && day >= 14 || month == 7 && day <= 14) { // เมถุน
        Rasee.find({ _id: '5eed0c6e2a8d2e4784092b66' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 7 && day >= 15 || month == 8 && day <= 16) { // กรกฎ
        Rasee.find({ _id: '5eed0cca2a8d2e4784092b67' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 8 && day >= 17 || month == 9 && day <= 16) { //สิง
        Rasee.find({ _id: '5eed0f442a8d2e4784092b68' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 9 && day >= 17 || month == 10 && day <= 16) { //กัน
        Rasee.find({ _id: '5eed24bffc1f513e0d1334d8' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 10 && day >= 17 || month == 11 && day <= 15) { //ตุล
        Rasee.find({ _id: '5eed2536fc1f513e0d1334d9' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 11 && day >= 16 || month == 12 && day <= 15) { //พิจิก
        Rasee.find({ _id: '5eed25bafc1f513e0d1334da' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else if (month == 12 && day >= 16 || month == 1 && day <= 13) { //ธนู
        Rasee.find({ _id: '5eed2621fc1f513e0d1334db' }, function (error, allRasee) {
            if (error) {
                console.log("Error!");
            } else {
                res.render("fortune/raseeshow", { Rasee: allRasee });
            }
        })
    } else {
        console.log("คุณใส่ข้อมูลไม่ถูกต้อง !." + day);
        res.redirect("/fortune");
    }

});
///////////////////////////////////////////////////////////////////////////////

//ดูวันเกิด
router.get("/birthday", function (req, res) {
    res.render("fortune/birthday");
});

router.post("/birthday", function (req, res) {
    let n_day = req.body.day1;
    let n_month = req.body.month1;
    let n_year = req.body.year1;
    
        Birthday.findOne({ day: ''+n_day }, function (error, oneDay) {
            if (error) {
                console.log("Error!");
            } else {
                Birthdaydate.create({day: n_day, month: n_month, year: n_year, name1: oneDay.name1, name2: oneDay.name2,name3: oneDay.name3,
                                     name4: oneDay.name4,name5: oneDay.name5,text1: oneDay.text1,text2: oneDay.text2,text3: oneDay.text3,
                                     text4: oneDay.text4,text5: oneDay.text5}, function(err, onedate){
                    if(err){
                        console.log(err)
                    }else{
                        console.log('save');
                    }
                    res.render("fortune/birthdayshow", {birthday: onedate}); //{,}
                })  
            }
        })

});
////////////////////////////////////////////////////////////////////////////////////////

//ดูยิปซีรายวัน
router.get("/yipseeday", function (req, res) {
    res.render("fortune/yipseeday");
});
router.get("/yipseeday/show", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("MYDATA");
        var random = Math.floor(Math.random() * 21);
        dbo.collection("yipses").find().skip(random).limit(1).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.render("fortune/yipseedayshow", { Yipse: result });
            db.close();
        })
    })
});
//////////////////////////////////////////////////////////////////////////////

//ดูยิปซีรายเดือน
router.get("/yipseemonth", function (req, res) {
    res.render("fortune/yipseemonth");
});

router.get("/yipseemonth/show", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("MYDATA");
        var random = Math.floor(Math.random() * 9);
        dbo.collection("yipseemonths").find().skip(random).limit(1).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render("fortune/yipseemonthshow", { Yipseemonth: result });
            db.close();
        })
    })
});
///////////////////////////////////////////////////////////////////////////////

//ดูยิปซีความรัก
router.get("/yipseelove", function (req, res) {
    res.render("fortune/yipseelove");
});

router.get("/yipseelove/show", function (req, res) {
    Yipse.find({}, function (error, allYipse) {
        if (error) {
            console.log("Error!");
        } else {
            res.render("fortune/yipseeloveshow", { Yipse: allYipse });
        }
    })
});
///////////////////////////////////////////////////////////////////////////

//โหวตเลขเด็ด
router.get("/lottery", function (req, res) {
    Lottery.findById('5eefe8f7166713b67bff6b33').populate('dream').exec(function (err, lot) {
        res.render("fortune/lottery", { Lottery: lot });
    });
});
router.put("/lottery/:id", function (req, res) {
    Lottery.findById('5eefe8f7166713b67bff6b33').populate('dream').exec(function (error, lot) {
        switch (req.body.up) {
            case 'no':
                console.log('no value');
                break;
            case 'zero':
                lot.zero++
                lot.save();
                break;
            case 'one':
                lot.one++
                lot.save();
                break;
            case 'two':
                lot.two++
                lot.save();
                break;
            case 'three':
                lot.three++
                lot.save();
                break;
            case 'four':
                lot.four++
                lot.save();
                break;
            case 'five':
                lot.five++
                lot.save();
                break;
            case 'six':
                lot.six++
                lot.save();
                break;
            case 'seven':
                lot.seven++
                lot.save();
                break;
            case 'eight':
                lot.eight++
                lot.save();
                break;
            case 'nine':
                lot.nine++
                lot.save();
                break;
        }
        switch (req.body.dow) {
            case 'no':
                console.log('no value');
                break;
            case 'zero1':
                lot.zero1++
                lot.save();
                break;
            case 'one1':
                lot.one1++
                lot.save();
                break;
            case 'two1':
                lot.two1++
                lot.save();
                break;
            case 'three1':
                lot.three1++
                lot.save();
                break;
            case 'four1':
                lot.four1++
                lot.save();
                break;
            case 'five1':
                lot.five1++
                lot.save();
                break;
            case 'six1':
                lot.six1++
                lot.save();
                break;
            case 'seven1':
                lot.seven1++
                lot.save();
                break;
            case 'eight1':
                lot.eight1++
                lot.save();
                break;
            case 'nine1':
                lot.nine1++
                lot.save();
                break;
        }
        console.log('*****save****');
        res.render("fortune/lottery", { Lottery: lot });
    })
});


module.exports = router;