import React, { Component } from 'react';
import './CompanyMainProfile.css';
class CompanyMainProfile extends Component {
    render() {
        return (
            <div className="company-user-mainprofile">
                <div className="company-user-mainprofile-left">
                    <img src="/Image/login_img.png" className="userProfile-img" alt="IMG"></img>
                    <span className="user-name">안녕하세요 루다 입니다.</span>
                    <div className="user-count">
                        <span>■ 14명의 인재가 관심있어 합니다.</span>
                        <span>■ 14명의 인재가 관심있어 합니다.</span>
                        <span>■ 14명의 인재가 관심있어 합니다.</span>
                    </div>
                </div>
                <div className="company-user-mainprofile-right">
                    
                </div>
        </div>
        );
    }
}

export default CompanyMainProfile;