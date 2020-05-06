import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header-main">
                <div className="header-logoDiv">
                    <Link to="/"><img src="/Image/base_header_logo.png" alt="RUDA-LOGO" className="header-logo"></img></Link>
                    <Link to="/board"><span className="header-logo-span">기업</span></Link>
                    <Link to="/board"><span className="header-logo-span">인재</span></Link>
                    <Link to="/board"><span className="header-logo-span">실습생</span></Link>
                </div>
                <div className="header-buttonDiv">
                    <button className="header-btn">추천기업</button>
                    <button className="header-btn">추천기업</button>
                </div>
            </div>
        );
    }
}