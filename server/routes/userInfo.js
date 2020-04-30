var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const UserInfo = models.userInfo;
const User = models.user;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 유저 정보 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await UserInfo.findAll({
			include : [
				{ model: User }
			]
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 한명 조회
router.get("/one", async (req, res) => {
	try {
		const result = await UserInfo.findOne({
			include : [
				{ model: User }
			],
			where : {
				userEmail : req.query.userEmail
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 생성
router.post("/create", async (req, res) => {
	let result = false;
	try {
		await UserInfo.findOrCreate({
			where : {
				userEmail : req.body.userEmail
			},
			defaults : {
				userEmail : req.body.userEmail
			}
		}).spread((none, created)=>{
			if(created)
				result = true;
		})
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 생성 에러 발생 내용= " + err);
	}
	res.send(result);
});

// 유저 정보 수정
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await UserInfo.update({ 
            userTraning: req.body.userTraning,
            userUnvcity: req.body.userUnvcity, 
            userSubject : req.body.userSubject,
            userAwards : req.body.userAwards,
            userCertification : req.body.userCertification,
            userKeyword : req.body.userKeyword,
            userTemplete : req.body.userTemplete,
            userGraph : req.body.userGraph,
            userFile : req.body.userFile,
            userPortfolio : req.body.userPortfolio,
            userLike : req.body.userLike,
            userSuggestion : req.body.userSuggestion,
            userClick : req.body.userClick,
            userSpecialty : req.body.userSpecialty,
            userWorkDate : req.body.userWorkDate,
            userHireBool : req.body.userHireBool,
            userState : req.body.userState,
            }, {
            where: {
                userEmail : req.body.userEmail
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 정보 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 정보 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await UserInfo.destroy({
            where: {
                userEmail: req.query.userEmail
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 정보 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;