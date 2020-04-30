let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let jwt = require('jsonwebtoken');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let companyRouter = require('./routes/userInfo');
let companyHireRouter = require('./routes/companyHire');
let companyInfoRouter = require('./routes/companyInfo');
let hireBoardRouter = require('./routes/hireBoard');
let mailRouter = require('./routes/mail');
let userInfoRouter = require('./routes/userInfo');
const configs = require('./server-configs.js');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companys', companyRouter);
app.use('/companyHires', companyHireRouter);
app.use('/companyInfos', companyInfoRouter);
app.use('/hireBoards', hireBoardRouter);
app.use('/mails', mailRouter);
app.use('/userInfos', userInfoRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", configs.app.c_local);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

// -------------------- 토큰 생성 및 검증 함수 --------------------
function getToken(data){
  try {
      const getToken = jwt.sign({
          userId : data,
      },
          configs.app.secretKey,
      {
          expiresIn : '1200m'
      });
      return getToken;
  } catch(err) {
      console.log(__filename + " : 토큰 생성 에러 : " + err);
  }
}

app.get('/verify', (req,res)=>{
  try {
      const token = req.headers['x-access-token'] || req.query.token;
      const getToken = jwt.verify(token, configs.app.secretKey);
      console.log("토큰 인증 완료");
      res.send(getToken);
  } catch(err) {
      console.log(__filename + " : 토큰 검증 에러 : " + err);
      res.send("err");
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
