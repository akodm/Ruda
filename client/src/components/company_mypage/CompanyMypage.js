import React, { Component } from 'react';
import './CompanyMypage.css';
import CompanyProject from './CompanyProject/CompanyProject';
import CompanyProfile from './CompanyProfile/CompanyProfile';
import Msg from '../mypopup/Message';
import axios from 'axios';

class CompanyMypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgDisplay : "none",
            likeUser:"none",
            ptbtnClick:"pth-btn",
            profileClick:"profile-btn",
            hireClick:"hire-btn",
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
    HirechangePage(){
        this.setState({

        });
    }

    render() {
        const { msgDisplay,likeUser,ptbtnClick,profileClick,changePage,hireClick } = this.state;
        return (
            <div className="company-main">
                <div className="btn-cont">
                    <Msg display= { msgDisplay } />
                    <div className="company-main-bg">
                        <div className="company-main-bg-in">
                            { changePage?<CompanyProfile/>:<CompanyH/> }
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
        );
    }
}

export default CompanyMypage;