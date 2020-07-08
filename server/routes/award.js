var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Award = models.award;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// ---------------------------- 유저 메일 --------------------------------//

// 유저 Award 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await Award.findAll({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Award 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 Award 한개 조회
router.get("/one", async (req, res) => {
	try {
		const result = await Award.findOne({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Award 한개 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 Award 생성
router.post("/create", async(req, res) => {
	let result = null;
    try{
        result = await Award.create({
			awardCate : req.body.awardCate,
			awardName : req.body.awardName,
			awardDate : req.body.awardDate,
			userId : req.body.userId,
		});
    } catch(err) {
		console.log(__filename + " 에서 유저 Award 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 Award 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        result = await Award.update({ 
			awardCate : req.body.awardCate,
			awardName : req.body.awardName,
			awarDate : req.body.awarDate,
		}, {
            where: {
				id : req.body.id,
            }
        });
    } catch(err) {
        console.log(__filename + " 에서 유저 Award 업데이트 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 Award 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Award.destroy({
            where: {
				id : req.query.id,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 Award 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;