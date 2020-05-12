import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PassSearch extends Component {
    render() {
        return (
            <div className="search-mainDiv">
                <span className="search-title">비밀번호 찾기</span>
                <div className="search-form">
                    <input type="text" className="search-form-input" placeholder="이메일을 입력해주세요."></input>
                    <input type="password" className="search-form-input" placeholder="이름을 입력해주세요."></input>
                    <input type="password" className="search-form-input" placeholder="핸드폰 번호를 입력해주세요."></input>
                    <button className="search-form-loginBtn">찾기</button>
                </div>
            </div>
        );
    }
}

export default PassSearch;