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
                                <img src="/Image/usermypage_hochi.png"></img>
                                <div className="profile-title"> 홍길동 님의 프로필</div>
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