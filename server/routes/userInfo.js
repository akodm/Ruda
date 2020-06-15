var express = require("express");
var router = express.Router();
let models = require("../models");
let multer = require('multer');

// multer setting ----------------------------------------------------

const upload = multer({
	storage: multer.diskStorage({
	  destination: function (req, file, cb) {
		cb(null, 'public/upload/');
	  },
	  filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.extname(file.originalname));
	  }
	}),
  });
router.post("/upload", upload.single("img"), async(req,res) => {
	try {
		console.log(req.file);
		console.log(req.body);
	} catch(err) {
		console.log(err);
	}
});

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
router.post("/create", async (req, res) => {
	let result = false;
	try {
		await UserInfo.findOrCreate({
			where : {
				userId : req.body.userId
			},
			defaults : {
				userId : req.body.userId,
				userName: req.body.userName,
				userPhone: req.body.userPhone,
				userAdd: req.body.userAdd,
				userImage : req.body.userImage,
				userTraning: req.body.userTraning,
				userUnvcity: req.body.userUnvcity, 
				userSubject : req.body.userSubject,
				userAttend: req.body.userAttend, 
				userField: req.body.userField,
				userIntro : req.body.userIntro,
				userKeyword : req.body.userKeyword,
				userTags : req.body.userTags,
				userSpecialty : req.body.userSpecialty,
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
	console.log(req.body);
    try {
        await UserInfo.update({ 
			userName: req.body.userName,
			userPhone: req.body.userPhone,
			userAdd: req.body.userAdd,
			userIamge : req.body.userIamge,
			userTraning: req.body.userTraning,
            userUnvcity: req.body.userUnvcity, 
			userSubject : req.body.userSubject,
			userAttend: req.body.userAttend, 
			userField: req.body.userField,
			userAwards : req.body.userAwards,
			userCertification : req.body.userCertification,
			userIntro : req.body.userIntro,
            userKeyword : req.body.userKeyword,
			userTags : req.body.userTags,
            userLike : req.body.userLike,
            userSuggestion : req.body.userSuggestion,
            userClick : req.body.userClick,
            userSpecialty : req.body.userSpecialty,
            userTraningDate : req.body.userTraningDate,
            userWorkDate : req.body.userWorkDate,
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