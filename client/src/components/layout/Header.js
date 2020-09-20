import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
        }
    }

    logout() {
        localStorage.removeItem("users");
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
    }

    headerMedia() {
        const { user } = this.props;
        if(!user.email) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        this.setState({ open : true });
    }

    render() {
        const { user, openClose, msgOpenClose, unReadMsg } = this.props;
        const { open } = this.state;
        return (
            <div className="Header">
                <nav  className="Header-nav">
                    <div className="Header-nav-menu">
                        <a href="/"><img src="/Images/RUDALogore.png" alt="IMG" className="Header-logo" /></a>
                        <Link to="/company"><div className="Header-nav-menu-span">기업</div></Link>
                        <Link to="/rookie"><div className="Header-nav-menu-span">인재</div></Link>
                    </div>
                    <div className="Header-right">
                        {
                            user.cate === "user" ?
                            <div className="Header-nav-layout">
                                { user.email && <div className="Header-nav-recommendbtn" onClick={() => msgOpenClose(true)}>
                                        <Badge color="secondary" badgeContent={unReadMsg}>
                                            메일함
                                        </Badge>
                                    </div>
                                }
                                <div className="Header-nav-recommendbtn" onClick={() => user.email ? openClose(true, "user") : alert("로그인 후 이용해주세요.")}>추천기업</div>
                                { user.email && <div className="Header-logout" onClick={this.logout.bind(this)}>로그아웃</div> }
                            </div>
                            :
                            <div className="Header-nav-layout">
                                { user.email && <div className="Header-nav-recommendbtn" onClick={() => msgOpenClose(true)}>
                                        <Badge color="secondary" badgeContent={unReadMsg}>
                                            메일함
                                        </Badge>
                                    </div>}
                                <div className="Header-nav-recommendbtn" onClick={() => user.email ? openClose(true, "company") : alert("로그인 후 이용해주세요.")}>추천인재</div>
                                { user.email && <div className="Header-logout" onClick={this.logout.bind(this)}>로그아웃</div> }
                            </div>
                        }
                    </div>
                    <div className="Header-right-media">
                        <MenuIcon onClick={this.headerMedia.bind(this)} style={{cursor:"pointer"}} />
                        {
                            open &&
                            <div className="Header-right-media-layout">
                                <div className="Header-right-media-overlay" onClick={() => this.setState({ open : false })}></div>
                                <div className="Header-right-media-content">
                                    <div onClick={() => msgOpenClose(true)} className="Header-right-media-list-li">
                                        <Badge color="secondary" badgeContent={unReadMsg}>
                                            메일함
                                        </Badge>
                                    </div>
                                    <div onClick={() => user.cate === "user" ? openClose(true, "user") : openClose(true, "company")} className="Header-right-media-list-li">추천목록</div>
                                    <div onClick={this.logout.bind(this)} className="Header-right-media-list-li">로그아웃</div>
                                </div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;