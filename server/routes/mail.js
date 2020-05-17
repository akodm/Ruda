var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Mail = models.mail;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// ---------------------------- 유저 메일 --------------------------------//

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
				userEmail : req.query.userEmail
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 메일 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 메일 생성
router.post("/create", async(req, res) => {
	let result = null;
    try{
        result = await Mail.create({
				title : req.body.title,
				content : req.body.content,
				files : req.body.files,
				userEmail : req.body.userEmail,
				targetUser : req.body.targetUser,
			});
    } catch(err) {
		console.log(__filename + " 에서 유저 메일 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 메일 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await Mail.update({ 
            title : req.body.title,
			content : req.body.content,
			files : req.body.files,
            }, {
            where: {
				id : req.body.id,
				userEmail : req.body.userEmail,
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 메일 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 메일 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Mail.destroy({
            where: {
				id: req.query.id,
				userEmail : req.query.userEmail,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 메일 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;