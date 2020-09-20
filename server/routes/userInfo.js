var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const UserInfo = models.userInfo;
const CompanyInfo = models.companyInfo;
const User = models.user;
const Op = models.Sequelize.Op;

// DB CRUD -----------------------------------------------------------

const sct = require("../security");
const security = new sct();

function sctFuncNext(req, res, next) {
	const sct_result = security.originCheck(req);

	if(!sct_result) {
		res.send(false);
		return;
	}

	next();
}

// 유저 정보 전체 조회
router.get("/all", sctFuncNext, async (req, res) => {
	try {
		const result = await UserInfo.findAll({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }	
			],
			attributes: [
				"id", "userName", "userImageUrl", "userIntro",
				"userKeyword", "userTags", "userField", 
				"userWorkDateState", "userLike", "userId"
			]
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 구직 및 실습 중 정보 전체 조회
router.get("/yall", sctFuncNext, async (req, res) => {
	try {
		const result = await UserInfo.findAll({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
			],
			attributes: [
				"id", "userName", "userImageUrl", "userIntro",
				"userKeyword", "userTags", "userField", 
				"userWorkDateState", "userLike", "userId"
			],
			where : {
				userWorkDateState : {
					[Op.or] : [
						{ [Op.like] : "%취업%" }, 
						{ [Op.like] : "%실습%" }
					]
				},
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 게시판 가져오기 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 한명 조회
router.get("/one", sctFuncNext, async (req, res) => {
	try {
		const result = await UserInfo.findOne({
			include : [
				{ model: User, attributes: ["id", "email", "userCate", "authCate"] }
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

// 유저 정보 이메일 찾기
// userName, userPhone <- 참고 쿼리 스트링
router.get("/emailfind", sctFuncNext, async (req, res) => {
	// 응답할 데이터
	let sendData = null;
	let user = null;
	let company = null;
	try {
		user = UserInfo.findOne({
			include : [ { model: User } ],
			where : {
				userName : req.query.userName,
				userPhone : req.query.userPhone
			},
		});
		company = CompanyInfo.findOne({
			include : [ { model: User } ],
			where : {
				companyName : req.query.userName,
				companyPhone : req.query.userPhone
			}
		});

		await Promise.all([user, company]).then(data => {
			user = data[0];
			company = data[1];
		});

		let result = company || user;
		// 조회 결과가 있다면
		if(result && result.user && result.user.dataValues) {
			result = result.user.dataValues;
			// 조회 결과가 하이루키 가입 이메일일 경우 데이터 대입
			if(result.authCate === "highrookie") {
				sendData = result.email;
			}
		}

		// 조회 결과가 있다면 해당 이메일값 반환
		// 조회 결과가 없다면 null 값 반환 => 하이루키 가입이 아닐 경우에도 null
		res.send(sendData);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 한명 검색 에러 발생 내용= " + err);
		res.send(false);	// 에러 발생시 false 값
	}
});

// 유저 정보 비밀번호 찾기
// userName, userPhone, email <- 참고 쿼리 스트링
router.get("/passwordfind", sctFuncNext, async (req, res) => {
	// 응답할 데이터
	let sendData = null;
	let user = null;
	let company = null;
	try {
		user = UserInfo.findOne({
			include : [ { model: User } ],
			where : {
				userName : req.query.userName,
				userPhone : req.query.userPhone
			},
		});
		company = CompanyInfo.findOne({
			include : [ { model: User } ],
			where : {
				companyName : req.query.userName,
				companyPhone : req.query.userPhone
			}
		});

		await Promise.all([user, company]).then(data => {
			user = data[0];
			company = data[1];
		});

		let result = company || user;
		// 조회 결과가 있다면
		if(result && result.user && result.user.dataValues) {
			result = result.user.dataValues;
			// 조회 결과가 하이루키 가입 이메일일 경우 데이터 대입
			// 이메일만 비교 추가 그리고 비밀번호 찾기 성공 시 -> 유저 객체 자체 반환
			// 유저 객체에서 아이디 전달해준 값 중 아이디 값을 통해서 유저 업데이트 실행해야됨
			if(result.authCate === "highrookie" && result.email === req.query.email) {
				sendData = result;
			}
		}

		// 조회 결과가 있다면 해당 이메일값 반환
		// 조회 결과가 없다면 null 값 반환 => 하이루키 가입이 아닐 경우에도 null
		res.send(sendData);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 한명 검색 에러 발생 내용= " + err);
		res.send(false);	// 에러 발생시 false 값
	}
});

// 유저 정보 생성
router.post("/create", sctFuncNext, async(req, res) => {
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
router.put("/update", sctFuncNext, async(req, res) => {
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
			userWorkDateState : req.body.userWorkDateState,
			userWorkDate : req.body.userWorkDate,
			userTraningDate : req.body.userTraningDate,

			userSuggestion : req.body.userSuggestion,
            userHireBool : req.body.userHireBool,
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

// 좋아요 수 1씩 감소시키기
router.get("/decrement", sctFuncNext, async(req, res) => {
	let result = null;
    try {
		await UserInfo.decrement('userLike', { where : {
			userId : req.query.userId
		}})
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 좋아요 감소 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 좋아요 수 1씩 증가시키기
router.get("/increment", sctFuncNext, async(req, res) => {
	let result = null;
    try {
		await UserInfo.increment('userLike', { where : {
			userId : req.query.userId
		}})
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 좋아요 증가 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 정보 삭제
router.delete("/delete", sctFuncNext, async(req, res) => {
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

// ======================== 검색 부분 ======================== //

// 게시판 필터
router.post("/search", sctFuncNext, async (req, res) => {
	let filter = req.body.data;
	let queryAdd = [];
	let queryField = [];
	let queryTags = [];

	let text = "empty";
	let add = "";
	let field = "";
	let tag = "";

	if(filter && filter[0]) {
		filter.forEach((data,i) => {
			switch(data.row) {
				case "userAdd" : 
					queryAdd.push(`${data.row} like '%${data.data}%'`); break;
				case "userField" : 
					queryField.push(`${data.row} like '%${data.data}%'`); break;
				case "userTags" : 
					queryTags.push(`${data.row} like '%${data.data}%'`); break;
				default : text = data.data;
			}
		});

		queryAdd.forEach((data,i) => {
			add += (i + 1 === queryAdd.length) ? data : data + " or ";
		});

		queryField.forEach((data,i) => {
			field += (i + 1 === queryField.length) ? data : data + " or ";
		});

		queryTags.forEach((data,i) => {
			tag += (i + 1 === queryTags.length) ? data : data + " or ";
		});
	}

	try {
		const result = await UserInfo.findAll({
			where : {
				[Op.or] : [
					{ userName : { [Op.like] : "%" + text + "%" }},
					{ userAdd : models.Sequelize.literal(add) },
					{ userTags : models.Sequelize.literal(tag) },
					{ userField : models.Sequelize.literal(field)},
				],
				userWorkDateState : {
					[Op.or] : [
						{ [Op.like] : "%취업%" },
						{ [Op.like] : "%실습%" }
					]
				},
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 필터 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 정보 필터 검색
/**
 *  필터 검색 기준
 *  유저 주소지의 구 기준 => 구로구, 안양시, 등
 *  유저 희망 직종
 *  유저가 가지고 있는 태그 중 일치하는 문자열
 */
router.post("/popup", sctFuncNext, async (req, res) => {
	let address = (req.body.add).split(" ");
	let tagQuery = "";
	let addQuery = `userAdd like '%${address[1]}%'`;

	if(req.body.tag && req.body.tag[0]) {
		req.body.tag.forEach((data,i) => {
			if(i + 1 === req.body.tag.length) {
				tagQuery += "userTags like '%" + data + "%'";
			} else {
				tagQuery += "userTags like '%" + data + "%' or ";
			}
		});
	}

	try {
		const result = await UserInfo.findAll({
			where : {
				[Op.or] : [
					{ userTags : models.Sequelize.literal(tagQuery) },
					{ userAdd : models.Sequelize.literal(addQuery) },
					{ userField : { [Op.like] : "%" + req.body.field + "%" } },
					{ userField : { [Op.like] : "%" + req.body.occupation + "%" } },
				],
				userWorkDateState : {
					[Op.or] : [
						{ [Op.like] : "%취업%" },
						{ [Op.like] : "%실습%" }
					]
				},
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 정보 필터 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

module.exports = router;