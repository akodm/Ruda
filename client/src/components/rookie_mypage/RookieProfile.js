import React, { Component } from 'react';
import RookieMainProfile from './RookieMainProfile';
import RookieInfo from './RookieInfo';
import RookieAwards from './RookieAwards';
import RookieCertificate from './RookieCertificate'

class RookieProflie extends Component {
    render() {
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>홍길동의 프로필</span>
                </div>
                <RookieMainProfile/>
                <RookieInfo/>
                <RookieAwards/>
                <RookieCertificate/>
                <RookieCertificate/>
                <RookieCertificate/>
                <div className="addprofile">
                    <span> + 프로필 정보 추가</span>
                </div>
            </div>
        );
    }
}

export default RookieProflie;