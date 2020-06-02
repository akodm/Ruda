var express = require("express");
var router = express.Router();
let models = require("../models");

// DB Setting --------------------------------------------------------
const CompanyHire = models.companyHire;
const Op = models.sequelize.Op;

// DB CRUD -----------------------------------------------------------

// 전체 채용한 유저 검색
router.get("/all", async (req, res) => {
	try {
		const result = await CompanyHire.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 채용 유저 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 채용 유저 한명 검색
router.get("/one", async (req, res) => {
	try {
		const result = await CompanyHire.findOne({
			where : {
				userId : req.query.userId,      // 유저 아이디를 토대로 검색
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 채용 유저 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 채용 유저 생성
router.post("/create", async(req, res) => {
    let result = false;
    try{
        await CompanyHire.findOrCreate({
            where : {
                companyHireUser : req.body.companyHireUser,
            },
            defaults : {
                companySugeuser: req.body.companySugeuser, 
                companyHireUser: req.body.companyHireUser, 
                userId : req.body.userId,
            }
        }).spread(async(none, created)=>{
            if(created){
                result = true;
            }
        });
    } catch(err) {
		console.log(__filename + " 에서 채용 유저 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 채용 유저 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    try {
        await CompanyHire.update({ 
            companySugeuser: companySugeuser,
            companyHireUser: req.body.companyHireUser, 
            }, {
            where: {
                companyHireUser : req.body.companyHireUser,
                userId : req.body.userId,
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 채용 유저 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 채용 유저 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await CompanyHire.destroy({
            where: {
                companyHireUser: req.query.companyHireUser,
                userId : req.body.userId,
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 채용 유저 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

module.exports = router;
