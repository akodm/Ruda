let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let nodemailer = require('nodemailer');
let moment = require('moment');
let passport = require('passport');
 
// 각 라우터들
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let companyHireRouter = require('./routes/companyHire');
let companyInfoRouter = require('./routes/companyInfo');
let hireBoardRouter = require('./routes/hireBoard');
let mailRouter = require('./routes/mail');
let userInfoRouter = require('./routes/userInfo');
let emailAuth = require('./routes/emailAuth');
let portfolioRouter = require('./routes/portfolio');
let awardRouter = require('./routes/award');
let certificateRouter = require('./routes/certificate');
let activityRouter = require('./routes/activity');
let likeRouter = require('./routes/like');

let configs = {};
process.env.NODE_ENV === "development" ? configs = require('./server-configs') : configs = require('./server-configs');

const models = require('./models');
const EmailAuth = models.emailAuth;

let app = express();

const cors = require("cors");
app.use(cors({
  origin: configs.app.c_local,
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// 각 라우터들 URL
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companyHires', companyHireRouter);
app.use('/companyInfos', companyInfoRouter);
app.use('/hireBoards', hireBoardRouter);
app.use('/mails', mailRouter);
app.use('/userInfos', userInfoRouter);
app.use('/emailAuth', emailAuth);
app.use('/portfolios', portfolioRouter);
app.use('/awards', awardRouter);
app.use('/certificates', certificateRouter);
app.use('/activitys', activityRouter);
app.use('/likes', likeRouter);
require('./passport.js')(passport);

// --------------------------- 노드 메일러 이메일 인증 -------------------
/**
 * 사용방법
 * 1. (로컬 회원가입의 경우만 사용) 사이트 내 이메일 인증 클릭
 * 2. 노드 메일러 전송 및 해당 인증 코드 디비에 생성 - 이미 해당 이메일 존재 시 코드 업뎃
 * 3. 인증 코드 및 이메일 작성 후 가입하기 버튼 클릭
 * 4. 도중 이메일이나 인증 코드를 변경할 시 체크를 위한 디비 조회 -> 이메일, 코드
 * 5. 조회 결과 이메일과 코드가 사이트 내 인풋 값과 일치할 시 성공 - 아닐 시 실패
 */
app.get("/nodemailer", async(req,res) => {
  try {
    let nowDatePlusMt = moment().add(5, 'minutes').format();

    const transport = nodemailer.createTransport({
      service : configs.app.type,
      host : configs.app.mailHost,
      port : configs.app.mailPort,
      secure : configs.app.secure,
      auth : {
        type : "OAuth2",
        user : configs.app.emailUser,
        clientId : configs.app.mailClient,
        clientSecret : configs.app.mailSecret,
        refreshToken : configs.app.refresh,
        accessToken : configs.app.access,
        expire : configs.app.mailExp,
      }
    });

    let ranStr = Math.random().toString(36).substr(3,9);
    ranStr = ranStr.toUpperCase();

    let mailOption = {
      from : configs.app.emailUser,
      to : req.query.userEmail,
      subject : "하이루키에서 이메일 인증 메일을 발송하였습니다.",
      html : `<img style="width:'80px'; height:40px;" src='cid:logo@cid'/><br><br>`+ 
      `<span>신입 구직자, 사회 초년생, 실습생들의 구직 사이트</span><br><br>` +
      `<span>비경력직간의 경쟁으로 더 자신을 어필해보세요!</span><br><br>` +
      `<strong><span>아래의 해당 코드를 복사 붙여넣기 하여주세요.</span></strong><p></p><br>`+
      `[ <span>${ranStr}</span> ]<p></p><br>`+
      `<img style="width:'400px'; height:400px;" src='cid:bg@cid'/>`,
      attachments: [{
        filename: 'Logo.png',
        path: __dirname +'/public/images/RUDALogore.png',
        cid: 'logo@cid'
      },{
        filename: 'Bg.png',
        path: __dirname +'/public/images/mainimg.png',
        cid: 'bg@cid'
      }],
    }

    await transport.sendMail(mailOption, (err, info) => {
      if(err) {
        console.log(err);
      } else {
        console.log("노드 메일러 정보 --------------------");
        console.log(info);
      }
    });

    const userFind = await EmailAuth.findOne({ where : { email : req.query.userEmail } });
    console.log(userFind && userFind.dataValues);
    
    if(userFind && userFind.dataValues) {
      let updatDate = moment().add(5, 'minutes').format();
      await EmailAuth.update({
        token : ranStr,
        use : "false",
        expire : updatDate,
      }, {
        where : { 
          email : req.query.userEmail
        }
      });
    } else {
      await EmailAuth.findOrCreate({
        where : {
          email : req.query.userEmail
        }, 
        defaults : {
          email : req.query.userEmail,
          token: ranStr,
          expire: nowDatePlusMt,
          use : "false",
        }
      });
    }

    res.send(true);
  } catch(err) {
    console.log(__filename + "에서 노드 메일러 에러 발생 : " + err);
    res.send(false);
  }
});

module.exports = app;