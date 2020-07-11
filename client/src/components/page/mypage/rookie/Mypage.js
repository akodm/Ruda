import React, { Component } from 'react';
import '../../../css/mypage.css';   
import config from '../../../../client-configs';

import axios from 'axios';

import Profile from './Profile';
import Portfolio from './Portfolio';
import Setting from './Setting';
import EditProfile from './EditProfile';


class mypage extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnNum:0,
            portfolioData : [],
            awardData:[],
            certificateData:[],
            load : false,

            
        }
    }

  
  
   

    async componentDidMount() {
        try {
            const result = await axios.get(`${config.app.s_url}/portfolios/all?userId=${this.props.userInfo.userId}`);
            this.setState({ portfolioData : result.data });

            const award = await axios.get(`${config.app.s_url}/awards/all?userId=${this.props.userInfo.userId}`);
            this.setState({ awardData : award.data });
            console.log(award.data);
            
            const certificate = await axios.get(`${config.app.s_url}/cerfiticates/all?userId=${this.props.userInfo.userId}`);
            this.setState({ certificateData : certificate.data });
            console.log(certificate.data);
        } catch(err) {
            console.log("rookie mypage data load err : " + err);
        }
        this.setState({ load : true });
    }

    MenuClick(num){ this.setState({ btnNum:num }) }

    portfolioConcat(data) { this.setState(current => ({ portfolioData : current.portfolioData.concat(data) })) }

    awardConcat(data) { this.setState(current => ({ portfolioData : current.awardData.concat(data) })) }

    certificateConcat(data) { this.setState(current => ({ portfolioData : current.certificateData.concat(data) })) }


    
    render() {
        const {btnNum,portfolioData,load,awardData,certificateData}=this.state;
        const { userInfo, user, loginState } = this.props;
        return (
            <div className="Mypage">
               
                <div className="Mypage-frame">
                    <div className="Mypage-pages">
                        <div className="Mypage-content">
                            {/* 0 => 기본 정보 프로필
                            1 => 포트폴리오
                            2 => 마이페이지 수정 ( 개인화면 ) */}
                            {
                                btnNum === 0 ?
                                <Profile
                                userId={userInfo.userId}
                                userInfo={userInfo}
                                awardData={awardData}
                                certificateData={certificateData}
                                addAward={this.awardConcat.bind(this)} /> :
                                btnNum === 1 ?
                                load && <Portfolio 
                                    load={load} 
                                    loginState={loginState}
                                    userEmail={user.email} 
                                    userId={userInfo.userId} 
                                    userName={userInfo.userName} 
                                    portfolio={portfolioData} 
                                    addPortfolio={this.portfolioConcat.bind(this)} />
                                :
                                loginState && <Setting userInfo={userInfo}/>
                            }
                        </div>
                        
                        <div className="Mypage-btns">
                            <button className={btnNum === 0?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                            <button className={btnNum === 1?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>포트폴리오</button>
                            {
                                loginState &&
                                <button className={btnNum === 2?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,2)}>마이페이지</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mypage;