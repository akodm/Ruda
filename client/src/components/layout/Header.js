import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const { user, openClose } = this.props;
        return (
            <div className="Header">
                <nav  className="Header-nav">
                    <div className="Header-nav-menu">
                        <Link to="/"><img src="/Images/RUDALogore.png" alt="IMG" className="Header-logo" /></Link>
                        <Link to="/company"><div className="Header-nav-menu-span">기업</div></Link>
                        <Link to="/rookie"><div className="Header-nav-menu-span">인재</div></Link>
                    </div>
                    <div className="Header-nav-recommendbtn">
                        {
                            user.cate === "user" ?
                            <div onClick={() => user.email ? openClose(true, "user") : alert("로그인 후 이용해주세요.")}>추천기업</div>
                            :
                            <div onClick={() => user.email ? openClose(true, "company") : alert("로그인 후 이용해주세요.")}>추천인재</div>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;