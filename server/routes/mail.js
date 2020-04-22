var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Mail = models.mail;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 유저 메일 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await Mail.findAll({
			include : [
				{ model: User }
			]
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 메일 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 메일 한명 조회
router.get("/one", async (req, res) => {
	try {
		const result = await Mail.findOne({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 메일 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

module.exports = router;
