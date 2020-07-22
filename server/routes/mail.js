var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Mail = models.mail;
const User = models.user;
const Op = models.Sequelize.Op;

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

// 유저 받은 메일 전체 조회
router.get("/receive", async (req, res) => {
	try {
		const result = await Mail.findAll({
			include : [
				{ model: User }
			],
			where : {
				target : req.query.target,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 받은 메일 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 보낸 메일 전체 조회
router.get("/send", async (req, res) => {
	try {
		const result = await Mail.findAll({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 보낸 메일 전체 검색 에러 발생 내용= " + err);
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
			target : req.body.target,
			userId : req.body.userId,
			readState : false
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
			readState : req.body.readState,
            }, {
            where: {
				id : req.body.id,
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
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 메일 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;