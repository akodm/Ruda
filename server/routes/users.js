var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const User = models.user;

// DB CRUD -----------------------------------------------------------

// 전체 유저 검색
router.get("/all", async (req, res) => {
	try {
		const result = await User.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 한명 검색
router.get("/one", async (req, res) => {
	try {
		const result = await User.findOne({
			where : {
				id : req.query.userId,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 생성
router.post("/create", async(req, res) => {
    let result = false;
    try{
        await User.findOrCreate({
            where : {
                id : req.body.userId,
            },
            defaults : {
                id : req.body.userId,
                userPass: req.body.userPass, 
                userName: req.body.userName, 
                userEmail: req.body.userEmail, 
                userPhone: req.body.userPhone, 
                userAdd: req.body.userAdd, 
                userCate: req.body.userCate, 
            }
        }).spread(async(none, created)=>{
            if(created){
                result = true;
            }
        });
    } catch(err) {
		console.log(__filename + " 에서 유저 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await User.update({ 
            userPass: req.body.userPass,
            userName: req.body.userName, 
            userEmail : req.body.userEmail,
            userPhone : req.body.userPhone,
            userAdd : req.body.userAdd,
            userCate : req.body.userCate,
            }, {
            where: {
                id : req.body.userId
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await User.destroy({
            where: {
                id: req.query.userId
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;