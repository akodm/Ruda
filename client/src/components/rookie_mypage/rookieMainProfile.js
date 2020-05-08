import React, { Component } from 'react';
import './RookieMypage.css';

class rookieMainProfile extends Component {
    render() {
        return (
            <div className="rookie-user-mainprofile">
                <div className="rookie-user-mainprofile-left">
                    <img src="/Image/login_img.png" className="userProfile-img"></img>
                    <span className="user-name">안녕하세요 홍길동 입니다.</span>
                    <div className="user-count">
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                    </div>
                </div>
                <div className="rookie-user-mainprofile-right">
                    그래프 영역
                </div>
            </div>
        );
    }
}

export default rookieMainProfile;