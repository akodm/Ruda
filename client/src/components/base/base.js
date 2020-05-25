import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './base.css';

import Header from './Header';
import Footer from './Footer';

import Main from '../main/Main';
import Insert from '../insert/Insert_main';
import InsertRookie from '../insert/Insert_rookie';
import InsertCompany from '../insert/Insert_company';
import Login from '../login/Login';
import RookieMypage from '../rookie_mypage/RookieMypage';
import CompanyMypage from '../company_mypage/CompanyMypage';
import Board from '../board/Board';
import MyPopup from '../mypopup/MyPopup';
import UpandDown from './UpandDown';
import Search from '../searchIdPass/Search';

import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:5000');

class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken : {
                user : "",
                cate : "",
            },
        }
    }
    // 페이지 로드 시 인증하기
    async componentDidMount() {
        try {
            if(localStorage.getItem("users")) {
                const userToken = await this.usersVerify();
                const userCate = await axios.get(`http://localhost:5000/users/one?userEmail=${userToken.userEmail}`);

                this.setState({ userToken : {
                    user : userToken.userEmail,
                    cate : userCate.data.userCate,
                } });
            }
        } catch(err) {
            console.log("main user Token err : " + err)
        }
    }
    // 유저 인증 처리
    async usersVerify(){
        try {
            const result = await axios.get(`http://localhost:5000/verify?token=${localStorage.getItem("users")}`);
            if(!result.data.userEmail) {
                localStorage.removeItem("users");
                return "";
            }
            return result.data;
        } catch(err) {
            console.log("user token verify err : " + err);
            localStorage.removeItem("users");
            return "";
        }
    }
    // 로그인 시 유저 토큰에 값을 할당
    userTokenUpdate(token) {
        this.setState({ userToken : {
            user : token.userEmail,
            cate : token.userCate,
        }})
    }

    render() {
        // 유저 토큰이 있다면 토큰 값을 없다면 빈 값을 할당
        const userToken = this.state.userToken || "";
        console.log(userToken)
        return (
            <div className="base-main">
                <Router>
                    {/* 상단 */}
                    <Header user={userToken} />
                    {/* 메인페이지 */}
                    <Route exact path="/">{ userToken.user ? <RookieMypage/> : <Main user={userToken} />}</Route>
                    {/* 회원가입 페이지들 */}
                    <Route exact path="/insert"><Insert /></Route>
                    <Route path="/insert/rookie"><InsertRookie /></Route>
                    <Route path="/insert/company"><InsertCompany /></Route>
                    {/* 로그인 페이지 */}
                    <Route path="/login"><Login userVerify={this.userTokenUpdate.bind(this)}/></Route>
                    {/* 게시판 페이지 */}
                    <Route path="/companyboard"><Board /></Route>
                    <Route path="/usersboard"><Board /></Route>
                    {/* 마이 페이지 */}
                    {
                        userToken.user ? (userToken.cate === "user" ?
                        <Route path="/usermypage"><RookieMypage /></Route>:
                        <Route path="/companymypage"><CompanyMypage /></Route>) : ""
                    }
                    {/* 아이디 비번 찾기 */}
                    <Route path="/search"><Search /></Route>
                    {/* 팝업창 */}
                    { userToken.user ? <MyPopup /> : ""}
                    {/* 화면 제어 */}
                    <UpandDown/>
                    {/* 하단 */}
                    <Footer />
                </Router>
            </div>
        );
    }
}
export default Base;