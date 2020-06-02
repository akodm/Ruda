import React, { Component } from 'react';
import './Login.css'

import { Link } from 'react-router-dom';
import InputTag from './InputTag';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
        }
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="login-main">
                <div className="login-div">
                    <span className="login-title">로그인</span>
                    <InputTag onChange={(e) => this.setState({ email : e.target.value })} value={email} regExp={"/[a-z0-9]+@[a-z]+.[a-z]{2,8}/"} validation={false} regSpan="잘못된 이메일 형식입니다." name="email" type="text" placeholder="이메일을 입력해주세요."></InputTag>
                    <InputTag onChange={(e) => this.setState({ password : e.target.value })} value={password} validation={false} regSpan="잘못된 형식입니다." name="password" type="password" placeholder="비밀번호를 입력해주세요."></InputTag>
                    <button className="login-btn">로그인</button>
                    <span className="login-search"><Link to="/">아이디 또는 비밀번호가 생각나지 않으세요? 이곳을 클릭하세요.</Link></span>
                    <div className="login-bottom">
                        <div className="login-line"></div>
                        <span className="login-text">또는</span>
                        <div className="login-line"></div>
                    </div>
                    <span className="login-easy"><Link to="/easy">간편하게 로그인하기</Link></span>
                </div>
            </div>
        );
    }
}

export default Login;