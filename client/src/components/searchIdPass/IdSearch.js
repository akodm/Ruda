import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IdSearch extends Component {
    render() {
        return (
            <div>
                <div className="login-mainDiv">
                    <span className="login-title">아이디 찾기</span>
                    <div className="login-form">
                        <input type="text" className="login-form-input" placeholder="아이디를 입력해주세요."></input>
                        <input type="password" className="login-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        <button className="login-form-loginBtn">로그인</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default IdSearch;