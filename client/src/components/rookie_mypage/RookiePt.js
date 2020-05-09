import React, { Component } from 'react';

class RookiePt extends Component {
    render() {
        return (
            <div className="rookie-pt-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>홍길동의 포트폴리오</span>
                </div>
                <div className="addpt">
                    <span> + 포트폴리오 추가</span>
                </div>
            </div>
        );
    }
}

export default RookiePt;