let express = require("express");
let router = express.Router();
let models = require("../models");
let crypto = require("crypto");
let configs = require("../server-configs");

// DB Setting --------------------------------------------------------
const User = models.user;

// DB CRUD -----------------------------------------------------------

// 전체 유저 검색
router.get("/all", async (req, res) => {
	try {
		const result = await User.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 한명 검색
router.get("/one", async (req, res) => {
	try {
		const result = await User.findOne({
			where : {
				email : req.query.userEmail,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 생성
router.post("/create", async(req, res) => {
    let result = false;
    let userPass = await hashFunc(req.body.userPass);
    try{
        await User.findOrCreate({
            where : {
                email : req.body.userEmail,
            },
            defaults : {
                email : req.body.userEmail,
                userPass: userPass, 
                userName: req.body.userName, 
                userAdd: req.body.userAdd, 
            }
        }).spread(async(none, created)=>{
            if(created){
                result = true;
            }
        });
    } catch(err) {
		console.log(__filename + " 에서 유저 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 업데이트
router.put("/update", async(req, res) => {
    let result = null;
    let userPass = await hashFunc(req.body.userPass);
    try {
        await User.update({ 
            userPass: userPass,
            userName: req.body.userName, 
            userPhone : req.body.userPhone,
            userAdd : req.body.userAdd,
            userCate : req.body.userCate,
            }, {
            where: {
                email : req.body.userEmail
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await User.destroy({
            where: {
                email: req.query.userEmail
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 유저 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

// ------------------------------------- 기본 CURD 외의 라우터 및 함수 --------------------------//

// 유저 로그인 체크
router.post("/loginuser", async (req, res) => {
    let check = false;
    let userPass = await hashFunc(req.body.userPass);
	try {
		const result = await User.findOne({
			where : {
                email : req.body.userEmail,
                userPass : userPass,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 유저 로그인 체크 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 유저 이메일 찾기
router.get("/useremail", async (req, res) => {
    let check = false;
	try {
		const result = await User.findOne({
			where : {
                userName : req.query.userName,
                userPhone :  req.query.userPhone,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 유저 이메일 찾기 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 유저 비밀번호 찾기
router.get("/userpass", async (req, res) => {
    let check = false;
	try {
		const result = await User.findOne({
			where : {
                userName : req.query.userName,
                email :  req.query.userEmail,
                userPhone :  req.query.userPhone,
			}
        });
        if(result && result.dataValues) {
            check = true;
        }
	} catch (err) {
		console.log(__filename + " 에서 유저 비밀번호 찾기 에러 발생 내용= " + err);
    }
    res.send(check);
});

// 유저 중복 이메일 검색
router.get("/dup", async (req, res) => {
    let result = false;
	try {
		const data = await User.findOne({
			where : {
				email : req.query.userEmail,
			}
        });
        if(data) result = true;
	} catch (err) {
        console.log(__filename + " 에서 유저 중복 검색 에러 발생 내용= " + err);
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