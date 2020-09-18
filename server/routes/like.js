var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Like = models.like;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 유저 Like 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await Like.findAll({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
			],
			where : {
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Like 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

router.get("/one", async (req, res) => {
	try {
		const result = await Like.findOne({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
			],
			where : {
				userId : req.query.userId,
				infoUserId : req.query.infoUserId,
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 Like 하나 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 Like 생성
// userId => 좋아요를 누른 사용자 아이디
// infoUserId => 좋아요 누른 페이지의 유저 아이디
router.post("/create", async(req, res) => {
	let result = null;
    try{
        result = await Like.findOrCreate({
			where : {
				infoUserId : req.body.infoUserId,
				userId : req.body.userId,
			},
			defaults : {
				infoUserId : req.body.infoUserId,
				userId : req.body.userId,
			}
		});
    } catch(err) {
		console.log(__filename + " 에서 유저 Like 생성 에러 발생 내용= " + err);
		res.send(false);
    }
    res.send(result);
});

// 유저 Like 삭제
// 디비의 고유값으로 검색
router.delete("/remove", async(req, res) => {
	let result = false;
    try {
        await Like.destroy({
            where: {
				id : req.query.id,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 Like 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

// 유저 Like 삭제
// 사용자 아이디 검색 & 해당 페이지의 사용자 아이디 검색 => 1개의 결과 추출
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Like.destroy({
            where: {
				userId : req.query.userId,
				infoUserId : req.query.infoUserId,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 Like 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;