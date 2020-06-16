var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const CompanyInfo = models.companyInfo;
const User = models.user;
const Op = models.sequelize.Op;

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
				companyName: req.body.companyName,
				companyPhone: req.body.companyPhone,
				companyAdd: req.body.companyAdd,
				companyField: req.body.companyField,
				companyTags: req.body.companyTags,
				companyAwards: req.body.companyAwards,
				companyImageUrl: req.body.companyImageUrl,
				companyCEO: req.body.companyCEO,
				companyQuestion: req.body.companyQuestion,
				companyRule: req.body.companyRule,
				companyOccupation : req.body.companyOccupation,
				companyIntro : req.body.companyIntro,
				companyAgeAvg : req.body.companyAgeAvg,
				companyRequest : req.body.companyRequest,
				companySince : req.body.companySince,
				companyWorkDate : req.body.companyWorkDate,
				companyWelfare : req.body.companyWelfare,
				companyLike : 0,
				companyClick : 0,
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
			companyName: req.body.companyName,
			companyPhone: req.body.companyPhone,
			companyAdd: req.body.companyAdd,
			companyImageUrl: req.body.companyImageUrl,
			companyField: req.body.companyField,
			companyCEO: req.body.companyCEO,
            companyQuestion: req.body.companyQuestion,
			companyTags: req.body.companyTags,
			companyRule: req.body.companyRule,
            companyAwards: req.body.companyAwards, 
            companyOccupation : req.body.companyOccupation,
            companyIntro : req.body.companyIntro,
            companyAgeAvg : req.body.companyAgeAvg,
            companyRequest : req.body.companyRequest,
            companySince : req.body.companySince,
            companyFile : req.body.companyFile,
            companyPortfolio : req.body.companyPortfolio,
            companyLike : req.body.companyLike,
            companyClick : req.body.companyClick,
            companyWorkDate : req.body.companyWorkDate,
            companyWelfare : req.body.companyWelfare,
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
