let express = require("express");
let router = express.Router();
let models = require("../models");
let crypto = require("crypto");
let configs = require("../server-configs");

// DB Setting --------------------------------------------------------
const Company = models.company;

// DB CRUD -----------------------------------------------------------

// 전체 기업 검색
router.get("/all", async (req, res) => {
	try {
		const result = await Company.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 한명 검색
router.get("/one", async (req, res) => {
	try {
		const result = await Company.findOne({
			where : {
				email : req.query.companyEmail,      // 기업 아이디를 토대로 검색
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 기업 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 기업 생성
router.post("/create", async(req, res) => {
    let result = false;
    let companyPass = await hashFunc(req.body.companyPass);
    try{
        await Company.findOrCreate({
            where : {
                email : req.body.companyEmail,   // 동일한 아이디로는 생성 불가
            },
            defaults : {
                email : req.body.companyEmail,
                companyPass: companyPass, 
                companyName: req.body.companyName, 
                companyAdd: req.body.companyAdd, 
            }
        }).spread(async(none, created)=>{
            if(created){
                result = true;
            }
        });
    } catch(err) {
		console.log(__filename + " 에서 기업 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 기업 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    let companyPass = await hashFunc(req.body.companyPass);
    try {
        await Company.update({ 
            companyPass: companyPass,
            companyName: req.body.companyName, 
            companyPhone : req.body.companyPhone,
            companyAdd : req.body.companyAdd,
            companyCate : req.body.companyCate,
            }, {
            where: {
                email : req.body.companyEmail
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 기업 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 기업 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await Company.destroy({
            where: {
                email: req.query.companyEmail
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 기업 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

// ------------------------------------- 기본 CURD 외의 라우터 및 함수 --------------------------//

// 기업 로그인 체크
router.post("/logincompany", async (req, res) => {
    let check = false;
    let companyPass = await hashFunc(req.body.companyPass);
	try {
		const result = await Company.findOne({
			where : {
                email : req.body.companyEmail,
                companyPass : companyPass,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 기업 로그인 체크 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 기업 이메일 찾기
router.get("/companyid", async (req, res) => {
    let check = false;
	try {
		const result = await Company.findOne({
			where : {
                companyName : req.query.companyName,
                companyPhone :  req.query.companyPhone,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 기업 이메일 찾기 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 기업 비밀번호 찾기
router.get("/companypass", async (req, res) => {
    let check = false;
	try {
		const result = await Company.findOne({
			where : {
                companyName : req.query.companyName,
                email :  req.query.companyEmail,
                companyPhone :  req.query.companyPhone,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 기업 비밀번호 찾기 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 기업 중복 이메일 검색
router.get("/dup", async (req, res) => {
    let result = false;
	try {
		const data = await Company.findOne({
			where : {
				email : req.query.companyEmail,
			}
        });
        if(data) result = true;
	} catch (err) {
        console.log(__filename + " 에서 기업 중복 검색 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 크립토 모듈을 이용한 해싱 암호화 함수
async function hashFunc(pass) {
    let hash = null;
    try {
        hash = await crypto.createHmac(configs.app.sha, configs.app.salt).update(pass).digest(configs.app.base); 
    } catch(err) {
        console.log(__filename + " 에서 크립토 모듈 에러 : " + err);
    }
    return hash;
}

module.exports = router;