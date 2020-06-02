let express = require("express");
let router = express.Router();
let models = require("../models");
let crypto = require("crypto");
let configs = require("../server-configs");
let passport = require('passport');

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
router.get("/oneemail", async (req, res) => {
	try {
		const result = await User.findOne({
			where : {
                email : req.query.userEmail,
                authCate : req.query.authCate,
			}
		});
		res.send(result);
	} catch (err) {
		console.log(__filename + " 에서 유저 한명 검색 에러 발생 내용= " + err);
		res.send(false);
	}
});

// 유저 한명 검색
router.get("/oneid", async (req, res) => {
	try {
		const result = await User.findOne({
			where : {
                id : req.query.userId,
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
                authCate : "highrookie",
            },
            defaults : {
                email : req.body.userEmail,
                userPass: userPass, 
                userName: req.body.userName, 
                userPhone : req.body.userPhone,
                userAdd: req.body.userAdd,
                userCate : req.body.userCate,
                authCate : "highrookie",
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
router.put("/updateemail", async(req, res) => {
    let result = null;
    let userPass = await hashFunc(req.body.userPass);
    try {
        await User.update({ 
            userPass: userPass,
            userName: req.body.userName, 
            userPhone : req.body.userPhone,
            userAdd : req.body.userAdd,
            }, {
            where: {
                email : req.body.userEmail,
                authCate : req.body.authCate,
            }
        });
        result = true;
    } catch(err) {
        console.log(__filename + " 에서 유저 업데이트 에러 발생 내용= " + err);
        result = false;
    }
    res.send(result);
});

// 유저 업데이트
router.put("/updateid", async(req, res) => {
    let result = null;
    let userPass = await hashFunc(req.body.userPass);
    try {
        await User.update({ 
            userPass: userPass,
            userName: req.body.userName, 
            userPhone : req.body.userPhone,
            userAdd : req.body.userAdd,
            }, {
            where: {
                id : req.body.userId,
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
    let wheres = req.query.id ? 
    { where: { id: req.query.userId } }
     : 
    { where: { email: req.query.userEmail, authCate : req.query.authCate } }
    try {
        await User.destroy({
            wheres
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
    let result = null;
	try {
		result = await User.findOne({
			where : {
                userName : req.query.userName,
                userPhone :  req.query.userPhone,
			}
        });
	} catch (err) {
		console.log(__filename + " 에서 유저 이메일 찾기 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 비밀번호 찾기
router.get("/userpass", async (req, res) => {
    let result = null;
	try {
		result = await User.findOne({
			where : {
                userName : req.query.userName,
                email :  req.query.userEmail,
                userPhone :  req.query.userPhone,
			}
        });
	} catch (err) {
		console.log(__filename + " 에서 유저 비밀번호 찾기 에러 발생 내용= " + err);
    }
    res.send(result);
});

// 유저 중복 이메일 검색
router.get("/dup", async (req, res) => {
    let result = false;
	try {
		const data = await User.findOne({
			where : {
                email : req.query.userEmail,
                authCate : "highrookie"
			}
        });
        if(data) result = true;
	} catch (err) {
        console.log(__filename + " 에서 유저 중복 검색 에러 발생 내용= " + err);
    }
    res.send(result);
});

// ------------------------------------------------------------------------------ //
// Passport Google / Facebook / Naver / JWT (OAuth) //
/**
 * 사용방법
 * 1. 로컬 혹은 소셜 로그인/회원가입
 * 2. 유저 및 authCate 생성 / highrookie / google / facebook / naver
 * 3. 소셜 로그인의 경우 해당 콜백 수행 및 리다이렉트
 * 4. 로컬 및 소셜 둘다 users/oaughlogin api 호출 수행 및 결과 값 반환 ( 토큰 )
 * 5. 반환받은 결과값 로컬 스토리지에 저장
 * 6. 로컬 스토리지에 토큰 값 검증 -> /users/verify -> 결과값 { authCate , user}
 */

// 구글로 로그인 -> 이메일 받아서 유저 생성
router.get('/google/callback',
    passport.authenticate('google', { scope: ['email'], session : false, failureRedirect: 'http://localhost:3000/' }),
    async(req, res) => {
		let state = false;
		console.log(req.user._json)
		try{
			const result = await User.findOrCreate({
				where : {
                    email : req.user._json.email,
                    authCate: "google",
				},
				defaults : {
					email : req.user._json.email,
					authCate: "google", 
				}
			})
			if(result[0].dataValues) {
				state = true;
			}
		} catch(err) {
			console.log(__filename + " 에서 유저 생성 에러 발생 내용= " + err);
		}
        res.redirect(`http://localhost:3000?state=${state}&value=${req.user._json.email}&tag=google`);
	}
);

// 페이스북으로 로그인 -> 이메일이 없어서 아이디를 받아서 유저 생성
router.get('/facebook/callback', 
  	passport.authenticate('facebook', { scope: ['public_profile','email'], session : false, failureRedirect: 'http://localhost:3000/' }),
  	async(req, res) => {
		console.log(req.user._json)
		let state = false;
		try{
			const result = await User.findOrCreate({
				where : {
					email : req.user._json.id,
					authCate: "facebook", 
				},
				defaults : {
					email : req.user._json.id,
					authCate: "facebook", 
				}
			})
			if(result[0].dataValues) {
				state = true;
			}
		} catch(err) {
			console.log(__filename + " 에서 유저 생성 에러 발생 내용= " + err);
		}
        res.redirect(`http://localhost:3000?state=${state}&value=${req.user._json.id}&tag=facebook`);
	}
);

// 네이버로 로그인 -> 이메일 받아서 유저 생성
router.get('/naver/callback', passport.authenticate('naver', { session : false, failureRedirect: 'http://localhost:3000/' }),
	async(req,res) => {
		console.log(req.user._json);
		let state = false;
		try{
			const result = await User.findOrCreate({
				where : {
					email : req.user._json.email,
					authCate: "naver", 
				},
				defaults : {
					email : req.user._json.email,
					authCate: "naver", 
				}
			})
			if(result[0].dataValues) {
				state = true;
			}
		} catch(err) {
			console.log(__filename + " 에서 유저 생성 에러 발생 내용= " + err);
		}
        res.redirect(`http://localhost:3000?state=${state}&value=${req.user._json.email}&tag=naver`);
    }
);

// 로컬 스토리지에 있는 태그와 토큰값을 검증해서 되돌려줌
router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		tag : req.user.authCate,
        email: req.user.email,
    });
});

// 구글, 페이스북, 네이버
router.get('/google', passport.authenticate('google', { scope: ['email'], session : false }));
router.get('/facebook', passport.authenticate('facebook', { scope : ['public_profile'], session : false}));
router.get('/naver', passport.authenticate('naver', { session : false }));

// oauth로 로그인 시 토큰값을 돌려줌 -> 로컬 스토리지에 저장
router.get("/oauthlogin" , async(req,res) => {
	const user = req.query;
	const payload = {
		tag : user.tag,
		email : user.email
	};
	const token = await oauthLogin(payload);
	console.log(token)
	if(token) {
		res.send(token);
	} else {
		res.send(false);
	}
})

// JWT 생성기
function oauthLogin(payload) {
	// payload : {
	//	email : user.email 
	//} = json type obj (require)
	let result = null;
	result = jwt.sign(payload, configs.app.secretKey, { expiresIn: 1 });
	result = {
		tag : payload.tag,
		token : "Bearer " + result
	}
	return result;
}

// ------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------ //

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