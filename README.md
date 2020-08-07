# HighRookie Project

### Jo junmyeong & Ko yuri

##### - Daelim Project -

-   url : http://ec2-35-170-167-129.compute-1.amazonaws.com/
-   React-Express
-   Client-Server
-   v. 1.0 (beta)

## HighRookie Project란 ? ( beta )

경력없는 신입들만을 위한 신입 구직구직 웹 서비스 입니다.

시범단계이고, 대림대학교 학생들 중 모바일인터넷과 학생만을 수용합니다.

### 기술 스택

```js
-CLIENT-
React.js
React-Router
Material UI
Fortawesome
Apexcharts Graph
Socket.io-client ( ing ... )
Firebase-Storage => File Upload/Save

-SERVER-
Node.js - Express
API
Sequelize ORM
Mysql, Redis    => Database Caching
Axios
JWT             => Session
Nodemailer      => Email Auth
Passport        => Google, Facebook, Naver
Pm2
Socket.io ( ing ... )

-TOOLS-
VsCode
Workvench
Zeplin
Postman
Sourcetree

-Cloud-
Aws Educate ( ubuntu 18.04 )
client => pm2 ( /build ) ( serve )
server => pm2 ( --env production )
```

### 흐름도

```
Insert or oAuth -> Login ->
basic Info Set -> Profile Confirm -> Board or Recommend Popup
```

-   현재 테스트 중으로 도메인 및 https가 없어 소셜 로그인이 불가합니다. ( 구글, 페이스북, 네이버 )

### 부족한 사항

-   크롬 외 브라우저에서 소셜 로그인이 제대로 동작하지 않음.
-   모바일 반응형 페이지 ( 마이페이지 ) 아직 부족.
