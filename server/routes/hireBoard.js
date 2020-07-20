var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const HireBoard = models.hireBoard;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 전체 채용 게시판 검색
router.get("/all", async (req, res) => {
	try {
		const result = await HireBoard.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 채용 게시판 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 채용 게시판 하나 검색
router.get("/one", async (req, res) => {
	try {
		const result = await HireBoard.findOne({
			where : {
                userId : req.query.userId,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 채용 게시판 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 채용 게시판 생성
router.post("/create", async(req, res) => {
    let result = null;
    try{
        result = await HireBoard.create({
            title : req.body.title,
            content: req.body.content, 
            files: req.body.files, 
            boardTag: req.body.boardTag,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            field : req.body.field,
            userId : req.body.userId,
        });
    } catch(err) {
		console.log(__filename + " 에서 채용 게시판 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 채용 게시판 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await HireBoard.update({ 
            title: req.body.title,
            content: req.body.content, 
            files : req.body.files,
            boardTag : req.body.boardTag,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            field : req.body.field,
            }, {
            where: {
                userId : req.body.userId,
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 채용 게시판 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 채용 게시판 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await HireBoard.destroy({
            where: {
                userId : req.query.userId,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 채용 게시판 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;
