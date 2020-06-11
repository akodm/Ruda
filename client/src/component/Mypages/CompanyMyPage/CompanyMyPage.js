import React, { Component } from 'react';
import CompanyProject from './CompanyProject/CompanyProject';
import CompanyProfile from './CompanyProfile/CompanyProfile';
import Msg from '../../MyMenu/Message';
import axios from 'axios';
import './CompanyMypage.css';

class CompanyMyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgDisplay : "none",
            likeUser:"none",
            ptbtnClick:"pth-btn",
            profileClick:"profile-btn",
            hireClick:"hire-btn",
            changePage:true,
            user : this.props.user,
        
            load : false,
        }
    }

    async componentDidMount() {
        const {user} = this.state;
        console.log(this.props);
        this.setState({ load : true });
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
    HirechangePage(){
        this.setState({

        });
    }

    render() {
        const { load } = this.state;
        const { msgDisplay,likeUser,ptbtnClick,profileClick,changePage,hireClick } = this.state;
        return load ? (
            <div className="company-main">
                <div className="btn-cont">
                    <Msg display= { msgDisplay } />
                    <div className="company-main-bg">
                        <div className="company-main-bg-in">
                            { changePage?<CompanyProfile/>:<CompanyProject/> }
                        </div>
                        <div className="company-menu-btn">
                            <button className={profileClick}
                            onClick={this.ProfilechangePage.bind(this)}>프로필</button>
                            <button className={ptbtnClick}
                            onClick={this.PtchangePage.bind(this)}>채용공고</button>
                        </div>
                        <div className="company-user-btn">
                            <button className="company-message-btn"
                            onClick={() => this.setState({ msgDisplay : msgDisplay === "none" ? "flex" : "none"})}>
                                <img src="/Image/usermypage_message.png" alt="IMG"></img>메세지 보내기
                            </button>
                            <button className="company-like-btn"
                            onClick={() => this.setState({ likeUser : likeUser === "none" ? console.log("조아여") : "none"})}>
                                <img src="/Image/usermypage_hart.png" alt="IMG"></img>관심있어요
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (<div style={{width:"100%", height:"800px",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>로드 마스크</div>);
    }
}

export default CompanyMyPage;