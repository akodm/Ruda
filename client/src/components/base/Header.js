import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    searchUser() {
        const user = this.props.user;
        if(!user.user)
            return alert("로그인 후 사용 가능합니다.");
        // 현재 사용자가 유저인 경우
        if(user.cate === "user") {

        // 현재 사용자가 기업인 경우
        } else {

        }
    }

    render() {
        const user = this.props.user;
        return (
            <div className="header-main" id="Header">
                <div className="header-logoDiv">
                    <Link to="/"><img src="/Image/base_header_logo.png" alt="RUDA-LOGO" className="header-logo"></img></Link>
                    <Link to="/companyboard"><span className="header-logo-span">기업</span></Link>
                    <Link to="/usersboard"><span className="header-logo-span">인재</span></Link>
                </div>
                <div className="header-buttonDiv">
                    <button className="header-btn" onClick={this.searchUser.bind(this)}>{ user.cate === "user" ? "추천기업" : (user.cate === "company" ? "추천인재" : "추천보기")}</button>
                </div>
            </div>
        );
    }
}