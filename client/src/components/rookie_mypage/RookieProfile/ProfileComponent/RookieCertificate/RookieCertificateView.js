import React, { Component } from 'react';

class RookieCertificateView extends Component {
    setCertificate(){
        this.props.certificatechanges(true)
    }
    render() {
        return (
            <div>
            <div className="rookieCertificate-title">
                <span className="rookieCertificate-title-text">자격증</span>
                <span className="rookieCertificate-relayout" onClick={this.setCertificate.bind(this)} >[편집]</span>
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

export default RookieCertificateView;