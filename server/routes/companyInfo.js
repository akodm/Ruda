var express = require("express");
var router = express.Router();
let models = require("../models");
const { add } = require("lodash");

// DB Setting --------------------------------------------------------
const CompanyInfo = models.companyInfo;
const User = models.user;
const Op = models.Sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 기업 정보 전체 조회
router.get("/all", async (req, res) => {
	try {
		const result = await CompanyInfo.findAll({
			include : [
				{ model: User }
			]
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 정보 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 정보 한명 조회
router.get("/yall", async (req, res) => {
	try {
		const result = await CompanyInfo.findAll({
			include : [
				{ model: User }
			],
			where : {
				companyState : {
					[Op.or] : ["채용"]
				}
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 게시판 가져오기 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 정보 한명 조회
router.get("/one", async (req, res) => {
	try {
		const result = await CompanyInfo.findOne({
			include : [
				{ model: User }
			],
			where : {
				userId : req.query.userId,
			},
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 정보 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 정보 필터 검색
/**
 *  필터 검색 기준
 *  기업 주소지의 구 기준 => 구로구, 안양시, 등
 *  기업이 찾는 희망 직종 또는 기업의 분야
 *  기업이 가지고 있는 태그 중 일치하는 문자열
 */
router.post("/popup", async (req, res) => {
	let address = (req.body.add).split(" ");
	let tagQuery = "";
	let addQuery = "";

	if(address[1]) {
		address.forEach((data,i) => {
			if(i >= 2) return;
			else if(i !== 0) {
				addQuery += `companyAdd like '%${data}%'`;
			}
		});
	}

	if(req.body.tag && req.body.tag[0]) {
		req.body.tag.forEach((data,i) => {
			if(i + 1 === req.body.tag.length) {
				tagQuery += "companyTags like '%" + data + "%'";
			} else {
				tagQuery += "companyTags like '%" + data + "%' or ";
			}
		});
	}

	try {
		const result = await CompanyInfo.findAll({
			where : {
				[Op.or] : {
					companyTags : models.Sequelize.literal(tagQuery),
					companyAdd : models.Sequelize.literal(addQuery),
					companyField : { [Op.like] : "%" + req.body.add + "%" },
					companyOccupation : { [Op.like] : "%" + req.body.add + "%" },
				}
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 정보 필터 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 정보 생성
router.post("/create", async (req, res) => {
	let result = false;
	try {
		await CompanyInfo.findOrCreate({
			where : {
				userId : req.body.userId
			},
			defaults : {
				userId : req.body.userId,

				companyImageUrl: req.body.companyImageUrl,

				companyName: req.body.companyName,
				companyCEO: req.body.companyCEO,
				companyPhone: req.body.companyPhone,
				companyAdd: req.body.companyAdd,
				companyUrl: req.body.companyUrl,

				companyField: req.body.companyField,
				companyTags: req.body.companyTags,
				companySince : req.body.companySince,
				companyRule: req.body.companyRule,
				companyAgeAvg : req.body.companyAgeAvg,
				companyIntro : req.body.companyIntro,
				companyWelfare : req.body.companyWelfare,

				companyRequest : req.body.companyRequest,
				companyOccupation : req.body.companyOccupation,
				
				companyWorkCate : req.body.companyWorkCate,
				companyWorkDate : req.body.companyWorkDate,
				companyWorkDateState : req.body.companyWorkDateState,

				companyQuestion: req.body.companyQuestion,
				companyHistory : req.body.companyHistory,

				companyLike : 0,
			}
		}).spread((none, created)=>{
			if(created)
				result = true;
		})
	} catch (err) {
		console.log(__filename + " 에서 기업 정보 생성 에러 발생 내용= " + err);
	}
	res.send(result);
});

// 기업 정보 수정
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await CompanyInfo.update({ 
			companyImageUrl: req.body.companyImageUrl,

			companyName: req.body.companyName,
			companyCEO: req.body.companyCEO,
			companyPhone: req.body.companyPhone,
			companyAdd: req.body.companyAdd,
			companyUrl: req.body.companyUrl,

			companyField: req.body.companyField,
			companyTags: req.body.companyTags,
			companyRule: req.body.companyRule,
            companyAwards: req.body.companyAwards, 
            companySince : req.body.companySince,
            companyIntro : req.body.companyIntro,
			companyAgeAvg : req.body.companyAgeAvg,
			
            companyOccupation : req.body.companyOccupation,
			companyRequest : req.body.companyRequest,

			companyWorkCate : req.body.companyWorkCate,
			companyWorkDate : req.body.companyWorkDate,
			companyWorkDateState : req.body.companyWorkDateState,
			companyWelfare : req.body.companyWelfare,
			
			companyQuestion: req.body.companyQuestion,
			companyHistory : req.body.companyHistory,
			
            companyLike : req.body.companyLike,
			
            companyState : req.body.companyState,
		}, {
            where: {
                userId : req.body.userId
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 기업 정보 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 좋아요 수 1씩 감소시키기
router.get("/decrement", async(req, res) => {
	let result = null;
    try {
		await CompanyInfo.decrement('companyLike', { where : {
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
router.get("/increment", async(req, res) => {
	let result = null;
    try {
		await CompanyInfo.increment('companyLike', { where : {
			userId : req.query.userId
		}})
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 좋아요 증가 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 기업 정보 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await CompanyInfo.destroy({
            where: {
                userId: req.query.userId
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 기업 정보 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;
