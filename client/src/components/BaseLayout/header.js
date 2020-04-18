import React, { userState } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import headerlogo from './Images/RUDA_title.png';

export default function Header() {
    return <div className="headerMain">
                <div className="header_nav">
                    <div className="header_menu">
                        <Link to ="/"><img src={headerlogo}/></Link> 
                        <Link to="/company"><span className="menu">기업찾기</span></Link>
                        <Link to="/rookie"><span className="menu">인재찾기</span></Link>
                        <Link to="/trainee"><span className="menu">실습생찾기</span></Link>
                        <Link to="/success"><span className="menu">성공사례</span></Link>
                    </div>
                    <div className="header_Btns">
                        <button className="company">추천기업</button>
                        {/* <button className="rookie">추천인재</button>
                        <button className="trainee">추천실습생</button> */}
                    </div> 
                </div>            
            </div>
};