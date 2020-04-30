var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const Mail = models.mail;
const User = models.user;
const Company = models.company;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// ---------------------------- 유저 메일 --------------------------------//

// 유저 메일 전체 조회
router.get("/allusers", async (req, res) => {
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
router.get("/oneusers", async (req, res) => {
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
router.post("/createusers", async(req, res) => {
	let result = false;
    try{
        await Mail.create({
				title : req.body.title,
				content : req.body.content,
				files : req.body.files,
				userEmail : req.body.userEmail,
			});
    } catch(err) {
		console.log(__filename + " 에서 유저 메일 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 메일 업데이트
router.put("/updateusers", async(req, res) => {
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
router.delete("/deleteusers", async(req, res) => {
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

// ------------------------------ 기업 메일 ------------------------------//

// 기업 메일 전체 조회
router.get("/allcompanys", async (req, res) => {
	try {
		const result = await Mail.findAll({
			include : [
				{ model: Company }
			]
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 메일 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 메일 한명 조회
router.get("/onecompanys", async (req, res) => {
	try {
		const result = await Mail.findOne({
			include : [
				{ model: Company }
			],
			where : {
				companyEmail : req.query.companyEmail
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 메일 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 메일 생성
router.post("/createcompany", async(req, res) => {
	let result = false;
    try{
        await Mail.create({
			title : req.body.title,
			content : req.body.content,
			files : req.body.files,
			companyEmail : req.body.companyEmail,
		});
    } catch(err) {
		console.log(__filename + " 에서 기업 메일 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 기업 메일 업데이트
router.put("/updatecompany", async(req, res) => {
    let result = null;
    try {
        await Mail.update({ 
            title : req.body.title,
			content : req.body.content,
			files : req.body.files,
            }, {
            where: {
				id : req.body.id,
				companyEmail : req.body.companyEmail,
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 기업 메일 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 기업 메일 삭제
router.delete("/deletecompany", async(req, res) => {
	let result = false;
    try {
        await Mail.destroy({
            where: {
				id: req.query.id,
				companyEmail : req.query.companyEmail,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 기업 메일 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;