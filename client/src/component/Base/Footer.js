import React, { Component } from 'react';
import './Base.css';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
            <div className="Footer-logo">
                <img src="/Images/footer_logo.png" alt="FOOTERIMG"></img>
            </div>
            <div className="Footer_notice">
                <span className="Footer_text">ADD   |  경기도 안양시  |  TELL  |  032)1234-1234</span>
                <span className="Footer_text">EMAIL   |  rmeodprp0856@naver.com  | a8456452@naver.com</span>
                <span className="Footer_text">고객센터  |  회사소개  |  광고문의 </span>
            </div>
        </div>
        );
    }
}

export default Footer;