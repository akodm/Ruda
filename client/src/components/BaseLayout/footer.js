import React, { userState } from 'react';
import './layout.css';
import footerlogo from './Images/RUDA.png';


export default function Footer() {
    return <div className="footerMain">        
                <div className="footer_logo">
                    <img src= {footerlogo}/>
                </div>
                <div className="footer_text">
                    <p><span>경기도 안양시 동안구 비산동 임곡로 29 대림대학교</span></p>
                    <p><span>이메일 </span>|<span>rmeodprp0856@naver.com</span>|<span>a8456452@naver.com </span></p>
                    <p><span><a href="#">고객센터</a></span>|<span><a href="#">광고문의</a></span>|<span><a href="#">문의하기</a></span></p>
                </div>
        </div>
    };