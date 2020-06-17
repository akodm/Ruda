import React, { Component } from 'react';
import './Main.css';
import MainNotice from './MainNotice';
import MainWith from './MainWith';

import { Link } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <div className="Main-new-Div">
                    <div className="Main-new-right">
                        <span className="Main-new-title">당신의 첫 시작을 하이루키와 함께하세요</span>
                        <span className="Main-new-subTitle">사회초년생, 졸업예정자, 학교실습생</span>
                        <span className="Main-new-text">경력없는 신입들간의 구인구직사이트 하이루키에서<br></br> 지금 바로 당신의 능력을 어필해보세요.</span>
                        <div className="Main-new-loginDiv">
                            <Link to ="/insert"><button className="Main-new-insert">회원가입</button></Link>
                            <Link to ="/login"><button className="Main-new-login">로그인</button></Link>
                        </div>
                        <div className="Main-new-line"></div>
                        <Link to ="/easy"><span className="Main-new-es">간편하게 회원가입/로그인하기</span></Link>
                    </div>
                    <div className="Main-new-left">
                        <img src="/images/mainimg.png" alt="Liu" className="liu"></img>
                    </div>
                </div>
                <MainNotice />
                <MainWith />
            </div>
        );
    }
}

export default Main;