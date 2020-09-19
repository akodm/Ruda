var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Activity = models.activity;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// ---------------------------- 유저 메일 --------------------------------//

// 유저 Activity 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await Activity.findAll({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Activity 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 Activity 한개 조회
router.get("/one", async (req, res) => {
	try {
		const result = await Activity.findOne({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Activity 한개 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 Activity 생성
router.post("/create", async(req, res) => {
	let result = null;
    try{
        result = await Activity.create({
			activityCate : req.body.activityCate,
			activityName : req.body.activityName,
			activityStartDate : req.body.activityStartDate,
			activityEndDate : req.body.activityEndDate,
			userId : req.body.userId,
		});
    } catch(err) {
		console.log(__filename + " 에서 유저 Activity 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 Activity 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        result = await Activity.update({ 
			activityCate : req.body.activityCate,
			activityName : req.body.activityName,
			activityStartDate : req.body.activityStartDate,
			activityEndDate : req.body.activityEndDate,
		}, {
            where: {
				id : req.body.id,
            }
        });
    } catch(err) {
        console.log(__filename + " 에서 유저 Activity 업데이트 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 Activity 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Activity.destroy({
            where: {
				id : req.query.id,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 Activity 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;