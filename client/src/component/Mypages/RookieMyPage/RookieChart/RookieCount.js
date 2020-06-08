import React, { Component } from 'react';
import './RookieChart.css';
class RookieCount extends Component {
    render() {
        return (
            <div className="RookieCount">
                <span>14명의 기업이 좋아합니다.</span>
                <span>5개의 포트폴리오가 있습니다.</span>
            </div>
        );
    }
}

export default RookieCount;