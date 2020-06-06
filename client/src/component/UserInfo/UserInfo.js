import React, { Component } from 'react';
import './UserInfo.css';
class UserInfo extends Component {
    render() {
        return (
            <div className="UserInfo">
                <div className="UserInfo-content">
                    <div className="UserInfo-purpose">
                        <span className="UserInfo-title">이용목적</span>
                        <div className="UserInfo-purpose-btn">
                            <div>
                                <span>기업</span>
                                <span>신입 인재들을 필요로하는 기업</span>
                            </div>
                            <div>
                                <span>신입</span>
                                <span>대학교 졸업생 또는 사회초년생</span>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        );
    }
}

export default UserInfo;