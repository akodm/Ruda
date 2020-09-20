let express = require("express");
let router = express.Router();
let models = require("../models");
let moment = require('moment');

// DB Setting --------------------------------------------------------
const EmailAuth = models.emailAuth;

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

// 오스 하나 검색
router.get("/one", sctFuncNext, async (req, res) => {
	try {
		const result = await EmailAuth.findOne({
			where : {
				token : req.query.token,
				email : req.query.email,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 오스 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// ------------------------------------- 기본 CURD 외의 라우터 및 함수 --------------------------//

// 오스 인증 체크
router.post("/emailauth", sctFuncNext, async (req, res) => {
    let check = false;
	try {
		const result = await EmailAuth.findOne({
			where : {
                token : req.body.token,
			}
		});
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