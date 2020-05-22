import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export default class Main extends Component {
    render() {
        const user = this.props.user;
        const path = user.user ? (user.cate === "user" ? "/usermypage" : "companymypage") : "/insert";
        return (
            <div className="main-main">
                <div className="main-title">
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <span className="title_text">당신의 첫 직장을 RUDA와 함께하세요!</span><br></br>
                        <span className="title_text2">사회초년생, 졸업예정자, 학교실습생을 위한 구인구직 사이트</span><br></br>
                        <span className="title_text2">웹, 게임, 모바일 S/W, H/W 등 개발자, 퍼블리셔, 디자이너</span>
                    </div>
                    <div className="main_btn">
                        <Link to={path}><button className="main_btn_insert">{ user.user ? "마이페이지" : "회원가입"}</button></Link>
                        <Link to="/login"><button className="main_btn_login">{ user.user ? "로그아웃" : "로그인"}</button></Link>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}