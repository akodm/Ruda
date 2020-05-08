import React, { Component } from 'react';
import './RookieMypage.css';

class RookieMypage extends Component {
    render() {
        return (
            <div className="rookie-main">
                <div className="rookie-mypage-bg">
                    <div className="rookie-mypage-profile">
                        <div className="rookie-mypage-profile-content">
                            <div className="profile-content-title">
                                <img src="/Image/usermypage_hochi.png" alt="HoChi"></img>
                                <div className="profile-title">
                                    <span className="pofile-title-span">홍길동 님의 프로필</span>
                                </div>
                                <div className="mypage-post">
                                    <div className="mypage-postBtn1">
                                        <div className="frontBg1"></div>
                                        <div className="backBg1">프로필</div>
                                    </div>
                                    <div className="mypage-postBtn2">
                                        <div className="frontBg2"></div>
                                        <div className="backBg2">포트폴리오</div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content">
                                <div className="profile-info">
                                    <div>

                                    </div>
                                </div>
                            </div>                     
                        </div>
                    </div>
                </div>       
            </div>
        );
    }
}

export default RookieMypage;