import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Insert_company extends Component {
    render() {
        return (
            <div className="insert-c-main">
                <div className="insert-c-mainDiv">
                    <img src="/Image/insert_company.png" alt="LoginIMG"></img>
                    <span className="insert-c-title">기업 회원가입</span>
                    <div className="insert-c-form">
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이메일</div>
                            <input type="text" className="insert-c-form-input" placeholder="ex)abc@abc.com"></input>
                            <button className="insert-c-form-auth">인증</button>
                        </div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호</div>
                            <input type="password" className="insert-c-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호 확인</div>
                            <input type="text" className="insert-c-form-input" placeholder="비밀번호를 확인해주세요."></input>
                        </div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">기업이름</div>
                            <input type="text" className="insert-c-form-input" placeholder="이름을 입력해주세요."></input>
                        </div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">휴대폰번호</div>
                            <input type="text" className="insert-c-form-input" placeholder="01012345678"></input>
                        </div>
                        <div className="insert-c-form-etc">
                            <div className="insert-c-etc-save">
                                <input type="checkbox" className="insert-c-etc-chbox"></input>
                                <span className="insert-c-etc-span">개인정보 약관동의</span>
                            </div>
                        </div>
                        <button className="insert-c-form-loginBtn">가입하기</button>
                    </div>
                </div>
                <div className="insert-c-mainDivBottom">
                    <span className="insert-c-mainDivBottom-span">간편하게 로그인하기</span>
                    <div className="insert-c-mainDivBottom-btns">
                        <img src="/Image/google.png" alt="google" className="insert-c-oauth"></img>
                        <img src="/Image/facebook.png" alt="facebook" className="insert-c-oauth"></img>
                        <img src="/Image/git32.png" alt="github" className="insert-c-oauth"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Insert_company;