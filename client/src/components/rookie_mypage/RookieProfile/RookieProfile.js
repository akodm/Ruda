import React, { Component } from 'react';
import RookieMainProfile from './ProfileComponent/RookieMainProfile/RookieMainProfile';
import RookieInfo from './ProfileComponent/RookieInfo/RookieInfo';
import RookieAwards from './ProfileComponent/RookieAwards/RookieAwards';
import RookieCertificate from './ProfileComponent/RookieCertificate/RookieCertificate';
import RookieTag from './ProfileComponent/RookieTag/RookieTag';
class RookieProflie extends Component {
    render() {
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>홍길동의 프로필</span>
                </div>
                <div className="rookie-user-content">
                <RookieMainProfile/>
                <RookieInfo/>
                <RookieAwards/>
                <RookieCertificate/>
                <RookieTag/>
                </div>
            </div>
        );
    }
}

export default RookieProflie;