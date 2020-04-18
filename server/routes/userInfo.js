var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const UserInfo = models.userInfo;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 전체 유저 정보 가져오기
router.get("/all", async (req, res) => {
	try {
		const result = await UserInfo.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 등록 및 수정하기


module.exports = router;