import React, { Component } from 'react';
import './RookieCertificate.css'

class RookieCertificate extends Component {
    render() {
        return (
            <div className="rookieCertificate">
            <div className="rookieCertificate-title">
                <span className="rookieCertificate-title-text">자격증</span>
                <span className="rookieCertificate-relayout">[편집]</span>
            </div>
            <div className="rookieCertificate-content">
                <div className="rookieCertificate-content-title">
                    <span>취득년도</span>
                    <span>취득내역</span>
                    <span>자격증주최</span>
                </div>
                <div className="rookieCertificate-content-info">
                    <span>2019</span>
                    <span>대림대학교</span>
                    <span>대림테크페어</span>
                </div>
                <div className="rookieCertificate-content-info">
                    <span>2020</span>
                    <span>대림대학교</span>
                    <span>대림테크페어</span> 
                </div>
           </div>
        </div>
        );
    }
}

export default RookieCertificate;