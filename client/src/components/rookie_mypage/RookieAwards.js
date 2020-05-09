import React, { Component } from 'react';
import './RookieAwards.css'

class RookieAwards extends Component {
    render() {
        return (
            <div className="rookieAwards">
                <div className="rookieAwards-title">
                    <span className="rookieAwards-title-text">수상내역</span>
                    <span className="rookieAwards-relayout">[편집]</span>
                </div>
                <div className="rookieAwards-content">
                    <div className="rookieAwards-content-title">
                        <span>수상년도</span>
                        <span>수상내역</span>
                        <span>수상주최</span>
                        <span>수상결과</span>  
                    </div>
                    <div className="rookieAwards-content-info">
                        <span>2019</span>
                        <span>대림대학교</span>
                        <span>대림테크페어</span>
                        <span>대상</span>  
                    </div>
                    <div className="rookieAwards-content-info">
                        <span>2020</span>
                        <span>대림대학교</span>
                        <span>대림테크페어</span>
                        <span>대상</span>  
                    </div>
               </div>
            </div>
        );
    }
}

export default RookieAwards;