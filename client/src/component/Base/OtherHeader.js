import React, { Component } from 'react';
import './Base.css';
import { Link } from 'react-router-dom';

class OtherHeader extends Component {
    render() {
        return (
            <div className="OtherHeader">
                <div className="Header">
                    <nav  className="Header-nav">
                        <div className="Header-nav-menu">
                            <Link to="/"><img src="/Images/header_logo.png"/></Link>
                            <Link to="/company"><span className="Header-nav-menu-span">기업</span></Link>
                            <Link to="/rookie"><span className="Header-nav-menu-span">인재</span></Link>
                        </div>
                        <div className="Header-nav-recommendbtn"> 
                            <span>추천기업</span>
                            <span>추천인재</span>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default OtherHeader;