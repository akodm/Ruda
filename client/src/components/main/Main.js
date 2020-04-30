import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export default class Main extends Component {
    render() {
        return (
            <div className="main-main">
                <div className="main-title">
                    <div>
                        <span className="title_text">당신의 첫 직장을 RUDA와 함께하세요</span>
                    </div>
                    <div className="main_btn">
                        <button className="main_btn_insert"><Link to="/insert">회원가입</Link></button>
                        <button className="main_btn_login"><Link to="/login">로그인</Link></button>
                    </div>
                </div>
            </div>
        );
    }
}