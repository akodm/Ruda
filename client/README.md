# 하이루키 웹 서비스 ( React Client )

```js
npx create-react-app client
npm start
npm run build
```

-   파이어 베이스 파일 저장소 이용
-   카카오 주소 찾기 Api 이용
-   첫 베이스 파일에서 대부분의 데이터 불러오기 ( 자주 변하지 않는 데이터 )
-   잘못된 주소 입력은 NotFound Page 이동

### 클라이언트 폴더 구조

```
|-- src
    |-- components
            |-- component
                    |-- *.js ( 재사용 컴포넌트들 )
            |-- css
                    |-- *.css
            |-- layout
                    |-- Base.js
                    |-- Footer.js
                    |-- Header.js
                    |-- NotFound.js
            |-- page
                    |-- board
                            |-- company ...
                            |-- rookie ...
                    |-- info
                            |-- Company.js
                            |-- Info.js
                            |-- Rookie.js
                    |-- insert
                            |-- Insert.js
                    |-- login
                            |-- Easy.js
                            |-- Login.js
                    |-- main
                            |-- Main.js ...
                    |-- mypage
                            |-- company
                                    |-- *.js
                            |-- rookie
                                    |-- *.js
                            |-- MypageRoute.js
                    |-- searchuser
                            |-- *.js
```
