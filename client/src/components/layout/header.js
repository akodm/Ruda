import React, { userState } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

export default function Header() {
    return <div className="headerMain">
        <Link to="/"><span className="header-logo">RUDA</span></Link>
        <Link to="/userBoard"><span className="header-menuSpan">인재찾기</span></Link>
        <Link to="/companyBoard"><span className="header-menuSpan">기업찾기</span></Link>
        <Link to="/userStBoard"><span className="header-menuSpan">실습생찾기</span></Link>
        <Link to="/successBoard"><span className="header-menuSpan">성공사례</span></Link>
        <Link to="/help"><span className="header-menuSpan">사이트 도움말</span></Link>
    </div>
};