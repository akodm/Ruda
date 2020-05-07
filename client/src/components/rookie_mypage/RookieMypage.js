import React, { Component } from 'react';
import './RookieMypage.css';

class RookieMypage extends Component {
    render() {
        return (
            <div className="rookie-main">
                <div className="rookie-main-bg"></div>
                <div className="rookie-main-bg-in">
                    
                </div>
                <div className="rookie-menu-btn">
                    <button className="profile-btn">프로필</button>
                    <button className="pt-btn">포트폴리오</button>
                </div>
            </div>
        );
    }
}

export default RookieMypage;