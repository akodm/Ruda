import React, { Component } from 'react';
import './CompanyMypage.css';
import CompanyProject from './CompanyProject/CompanyProject';
import CompanyProfile from './CompanyProfile/CompanyProfile';
import Msg from '../mypopup/Message';

class CompanyMypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgDisplay : "none",
            likeUser:"none",
            ptbtnClick:"pth-btn",
            profileClick:"profile-btn",
            changePage:true,
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
                <div className="btn-cont">
                    <Msg display= { msgDisplay } />
                    <div className="rookie-main-bg">
                        <div className="rookie-main-bg-in">
                            { changePage?<CompanyProfile/>:<CompanyProject/> }
                        </div>
                        <div className="rookie-menu-btn">
                            <button className={profileClick}
                            onClick={this.ProfilechangePage.bind(this)}>프로필</button>
                            <button className={ptbtnClick}
                            onClick={this.PtchangePage.bind(this)}>포트폴리오</button>
                        </div>
                        <div className="rookie-user-btn">
                            <button className="rookie-message-btn"
                            onClick={() => this.setState({ msgDisplay : msgDisplay === "none" ? "flex" : "none"})}>
                                <img src="/Image/usermypage_message.png" alt="IMG"></img>메세지 보내기
                            </button>
                            <button className="rookie-like-btn"
                            onClick={() => this.setState({ likeUser : likeUser === "none" ? console.log("조아여") : "none"})}>
                                <img src="/Image/usermypage_hart.png" alt="IMG"></img>관심있어요
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyMypage;