import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-main">
                <div className="footer_logo">
                    <img src="/Image/base_footer_logo.png" alt="FOOTERIMG"></img>
                </div>
                <div className="footer_notice">
                    <span className="footer_text">ADD   |  경기도 안양시  |  TELL  |  032)1234-1234</span>
                    <span className="footer_text">EMAIL   |  rmeodprp0856@naver.com  | a8456452?@naver,com</span>
                    <span className="footer_text">고객센터  |  회사소개  |  광고문의 </span>
                </div>
            </div>
        );
    }
}