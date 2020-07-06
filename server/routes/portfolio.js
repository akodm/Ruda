var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Portfolio = models.portfolio;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// ---------------------------- 유저 메일 --------------------------------//

// 유저 포트폴리오 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await Portfolio.findAll({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 포트폴리오 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 포트폴리오 한개 조회
router.get("/one", async (req, res) => {
	try {
		const result = await Portfolio.findOne({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 포트폴리오 한개 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 포트폴리오 생성
router.post("/create", async(req, res) => {
	let result = null;
    try{
        result = await Portfolio.create({
			title : req.body.title,
			content : req.body.content,
			tag : req.body.tag,
			startDate : req.body.startDate,
			endDate : req.body.endDate,
			partner : req.body.partner,
			projectCate : req.body.projectCate,
			projectUrl : req.body.projectUrl,
			position : req.body.position,
			imagesUrl : req.body.imagesUrl,
			userId : req.body.userId,
		});
    } catch(err) {
		console.log(__filename + " 에서 유저 포트폴리오 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 포트폴리오 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        result = await Portfolio.update({ 
			title : req.body.title,
			content : req.body.content,
			tag : req.body.tag,
			startDate : req.body.startDate,
			endDate : req.body.endDate,
			partner : req.body.partner,
			projectCate : req.body.projectCate,
			projectUrl : req.body.projectUrl,
			position : req.body.position,
			imagesUrl : req.body.imagesUrl,
            }, {
            where: {
				userId : req.body.userId,
				id : req.body.id,
            }
        });
    } catch(err) {
        console.log(__filename + " 에서 유저 포트폴리오 업데이트 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 포트폴리오 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Portfolio.destroy({
            where: {
				id : req.query.id,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 포트폴리오 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;