let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let jwt = require('jsonwebtoken');
let nodemailer = require('nodemailer');
let crypto = require("crypto");
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
const configs = require('./server-configs.js');

const models = require('./models');
const EmailAuth = models.emailAuth;

let app = express();

// 앱 설정
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", configs.app.c_local);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
      auth : {
        user : configs.app.emailUser,
        pass : configs.app.emailPass,
      }
    });
    let ranStr = Math.random().toString(36).substr(3,9);
    ranStr = ranStr.toUpperCase();

    let mailOption = {
      from : configs.app.user,
      to : req.query.userEmail,
      subject : "하이루키에서 이메일 인증 메일을 발송하였습니다.",
      html : `<img style="width:'80px'; height:40px;" src='cid:logo@cid'/><br><br>`+ 
      `<span>신입 구직자, 사회 초년생, 실습생들의 구직 사이트</span><br><br>` +
      `<span>비경력직간의 경쟁으로 더 자신을 어필해보세요!</span><br><br>` +
      `<strong><span>아래의 해당 코드를 복사 붙여넣기 하여주세요.</span></strong><p></p><br>`+
      `[ <span>${ranStr}</span> ]<p></p><br>`+
      `<img style="width:'400px'; height:200px;" src='cid:bg@cid'/>`,
      attachments: [{
        filename: 'Logo.png',
        path: __dirname +'/public/images/base_header_logo.png',
        cid: 'logo@cid'
      },{
        filename: 'Bg.png',
        path: __dirname +'/public/images/main_title_bg4.png',
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
    console.log(userFind);
    if(userFind.dataValues) {
      await EmailAuth.update({
        token : ranStr,
        use : "false",
      }, {
        where : req.query.userEmail
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;