import React, { Component } from 'react';
import './RookieMypage.css';
import RookieProflie from './RookieProfile/RookieProfile';
import RookiePt from './RookiePortfolio/RookiePt';
import axios from 'axios';
import Msg from '../../MyMenu/Message';
import RookieChart from './RookieChart/RookieChart';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faShareAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons'
class RookieMypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgDisplay : "none",
            likeUser:"none",
            ptbtnClick:"pth-btn",
            profileClick:"profile-btn",
            changePage:true,

            url : new URL(window.location),
        }
    }

    async componentDidMount() {
        await this.setState({ url : this.state.url.pathname.split('/') });
        if(this.state.url[2]) {
            try {
                const result = await axios.get(`http://localhost:5000/users/one?userEmail=${this.state.url[2]}`);
                console.log(result.data)
            } catch(err) {
                console.log(err) 
            }
        }
    }

    ProfilechangePage(){
        this.setState({
            profileClick : "profile-btn",
            ptbtnClick : "pth-btn",
            changePage : true
        });
    }
    PtchangePage(){
        this.setState({
            profileClick : "profileh-btn",
            ptbtnClick : "pt-btn",
            changePage : false
        });
    }

    render() {
        const { msgDisplay } = this.state;
        const { likeUser } = this.state;
        const { ptbtnClick } =this.state;
        const { profileClick } =this.state;
        const { changePage } =this.state;
        return (
            <div className="rookie-main">
                <RookieChart/>
                <Msg display= { msgDisplay } />
                <div className="btn-cont">
                    <div className="rookie-main-bg">
                        <div className="rookie-main-bg-in">
                            { changePage?<RookieProflie/>:<RookiePt/> }
                        </div>
                        <div className="rookie-menu-btn">
                            <button className={profileClick}
                            onClick={this.ProfilechangePage.bind(this)}>프로필</button>
                            <button className={ptbtnClick}
                            onClick={this.PtchangePage.bind(this)}>포트폴리오</button>
                        </div>
                        <div className="rookie-user-btn">
                            <button className="rookie-share-btn">
                                <span className="mypage-icons"><FontAwesomeIcon icon={faShareAlt} size="2x"/></span>
                            </button>
                            <button className="rookie-like-btn"
                            onClick={() => this.setState({ likeUser : likeUser === "none" ? console.log("조아여") : "none"})}>
                                <span className="mypage-icons"><FontAwesomeIcon icon={faHeart} size="2x"/></span>
                            </button>
                            <button className="rookie-message-btn"
                            onClick={() => this.setState({ msgDisplay : msgDisplay === "none" ? "flex" : "none"})}>
                                 <span className="mypage-icons"><FontAwesomeIcon icon={faEnvelope} size="2x"/></span>
                            </button>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieMypage;