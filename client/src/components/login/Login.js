import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="login-main">
                <div className="login-mainDiv">
                    <img src="/Image/login_img.png" alt="LoginIMG"></img>
                    <span className="login-title">로그인</span>
                    <form className="login-form">
                        <input type="text" className="login-form-input" placeholder="아이디를 입력해주세요."></input>
                        <input type="password" className="login-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        <button className="login-form-loginBtn">로그인</button>
                        <div className="login-form-etc">
                            <div className="login-etc-save">
                                <input type="checkbox" className="login-etc-chbox"></input>
                                <span className="login-etc-span">아이디저장</span>
                            </div>
                            <div className="login-etc-search">
                                <Link to="/useridpass" className="login-etc-span">아이디/비밀번호 찾기</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="login-mainDivBottom">
                    <span className="login-mainDivBottom-span">간편하게 로그인하기</span>
                    <div className="login-mainDivBottom-btns">
                        <img src="/Image/google.png" alt="google" className="login-oauth"></img>
                        <img src="/Image/google.png" alt="facebook" className="login-oauth"></img>
                        <img src="/Image/google.png" alt="github" className="login-oauth"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;