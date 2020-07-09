var express = require("express");
var router = express.Router();
let models = require("../models");

// let multer = require('multer');
// let path = require('path');

// multer setting ----------------------------------------------------

// const upload = multer({
// 	storage: multer.diskStorage({
// 	  	destination: function (req, file, cb) {
// 			cb(null, 'public/upload/');
// 	  	},
// 	  	filename: function (req, file, cb) {
// 			cb(null, new Date().valueOf() + path.extname(file.originalname));
// 	  	}
// 	}),
// });
// router.post("/upload", upload.single("profile"), async(req,res) => {
// 	console.log(req.body.userId);
// 	console.log(req.file.filename)
// });

// DB Setting --------------------------------------------------------
const UserInfo = models.userInfo;
const User = models.user;
const Op = models.Sequelize.Op;

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

// 유저 구직 및 실습 중 정보 전체 조회
router.get("/yall", async (req, res) => {
	try {
		const result = await UserInfo.findAll({
			include : [
				{ model: User }
			],
			where : {
				userState : {
					[Op.or] : ["구직","구직/실습","실습"]
				},
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 검색 필터에 해당하는 유저 조회
router.get("/searchAll", async (req, res) => {
	try {
		const result = await UserInfo.findAll({
			include : [
				{ model: User }
			],
			where : {
				userState : {
					[Op.or] : ["구직","구직/실습","실습"]
				},
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 필터 검색 에러 발생 내용= " + err);
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
				userId : req.query.userId
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 생성
router.post("/create", async(req, res) => {
	let result = false;
	try {
		await UserInfo.findOrCreate({
			where : {
				userId : req.body.userId
			},
			defaults : {
				userId : req.body.userId,
				userImageUrl : req.body.userImageUrl,

				userName: req.body.userName,
				userPhone: req.body.userPhone,
				userAdd: req.body.userAdd,
				
				userUnivercityCate : req.body.userUnivercityCate,
				userUnvcity: req.body.userUnvcity, 
				userSubject : req.body.userSubject,
				userAttendStartDate: req.body.userAttendStartDate, 
				userAttendEndDate: req.body.userAttendEndDate, 
				userAttend: req.body.userAttend,
				userMilitary : req.body.userMilitary,

				userKeyword : req.body.userKeyword,
				userTags : req.body.userTags,
				userIntro : req.body.userIntro,
				userSpecialty : req.body.userSpecialty,
				userUrl : req.body.userUrl,

				userField: req.body.userField,
				userTraningDateState : req.body.userTraningDateState,
				userWorkDateState : req.body.userWorkDateState,
				userWorkDate : req.body.userWorkDate,
				userTraningDate : req.body.userTraningDate,
				userLike : 0,
				userClick : 0,
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
			userImageUrl : req.body.userImageUrl,

			userName: req.body.userName,
			userPhone: req.body.userPhone,
			userAdd: req.body.userAdd,
			
			userUnivercityCate : req.body.userUnivercityCate,
			userUnvcity: req.body.userUnvcity, 
			userSubject : req.body.userSubject,
			userAttendStartDate: req.body.userAttendStartDate, 
			userAttendEndDate: req.body.userAttendEndDate, 
			userAttend: req.body.userAttend, 
			userMilitary : req.body.userMilitary,

			userKeyword : req.body.userKeyword,
			userTags : req.body.userTags,
			userIntro : req.body.userIntro,
			userSpecialty : req.body.userSpecialty,
			userUrl : req.body.userUrl,

			userField: req.body.userField,
			userTraningDateState : req.body.userTraningDateState,
			userWorkDateState : req.body.userWorkDateState,
			userWorkDate : req.body.userWorkDate,
			userTraningDate : req.body.userTraningDate,

			userSuggestion : req.body.userSuggestion,
            userHireBool : req.body.userHireBool,
            userState : req.body.userState,
            }, {
            where: {
                userId : req.body.userId
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 정보 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 좋아요 1씩 증가 혹은 감소
router.put("/countupdate", async(req, res) => {
	let result = null;
	let likeClick = req.body.likeClick;
    try {
		let like = null;
		if(likeClick) {
			// 좋아요 1 증가
			like = UserInfo.increment('userlike', { where : {
				userId : req.body.userId
			}})
		} else {
			// 좋아요 1 감소
			like = UserInfo.decrement('userlike', { where : {
				userId : req.body.userId
			}})
		}
		// 좋아요를 누른 사람 리스트 변경 ( 중복 방지 )
		const list = UserInfo.update({
			userLikeList : rqe.body.userLikeList
		}, { 
			where : {
				userId : req.body.userId 
			}
		})

		await Promise.all([like,list]).then((data) => {
			if(data)
			result = true;
		});
    } catch(err) {
        console.log(__filename + " 에서 유저 정보 좋아요 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 클릭 수 1씩 증가시키기
router.put("/clickupdate", async(req, res) => {
	let result = null;
    try {
		await UserInfo.increment('userClick', { where : {
			userId : req.body.userId
		}})
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 정보 클릭 업데이트 에러 발생 내용= " + err);
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
                userId: req.query.userId
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 정보 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;