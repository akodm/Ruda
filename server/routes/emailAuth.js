let express = require("express");
let router = express.Router();
let models = require("../models");
let moment = require('moment');

// DB Setting --------------------------------------------------------
const EmailAuth = models.emailAuth;

// DB CRUD -----------------------------------------------------------

// 전체 오스 검색
router.get("/all", async (req, res) => {
	try {
		const result = await EmailAuth.findAll();
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 오스 전체 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 오스 하나 검색
router.get("/one", async (req, res) => {
	try {
		const result = await EmailAuth.findOne({
			where : {
				token : req.query.token,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 오스 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 오스 생성
router.post("/create", async(req, res) => {
    let result = false;
    try{
        await EmailAuth.create({
                token: req.body.token, 
                expire: req.body.expire, 
            });
    } catch(err) {
		console.log(__filename + " 에서 오스 생성 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 오스 삭제
router.delete("/delete", async(req, res) => {
	let result = false;
    try {
        await EmailAuth.destroy({
            where: {
                token: req.query.token
            }
		});
		result = true;
    } catch(err) {
		console.log(__filename + " 에서 오스 삭제 에러 발생 내용= " + err);
	}
	res.send(result);
});

// ------------------------------------- 기본 CURD 외의 라우터 및 함수 --------------------------//

// 오스 인증 체크
router.post("/emailauth", async (req, res) => {
    let check = false;
	try {
		const result = await EmailAuth.findOne({
			where : {
                token : req.body.token,
			}
		});
		console.log(result)
        if(result && result.dataValues.expire && result.dataValues.use === "false") {
            const nowDate = moment().format();
            const dbDate = result.dataValues.expire;
            if(moment(nowDate).diff(dbDate, 'minutes') <= 0) {
				EmailAuth.update({
					use: "true",
					}, {
					where: {
						token : req.body.token
					}
				});
				check = true;
            }
		}
	} catch (err) {
		console.log(__filename + " 에서 오스 체크 에러 발생 내용= " + err);
	}
    res.send(check);
});

module.exports = router;