import React, { Component } from 'react';
//import '../../../css/companypage.css';
import config from '../../../../client-configs';
import '../../../css/companypage.css';
import axios from 'axios';

import Profile from './Profile';
import Hire from './Hire';

class Mypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnNum : 0,
           
            awardData : [],
            activityData : [],
            hireData : [],

            like : false,

            load : false,
        }
    }

    async componentDidMount() {
        const { companyInfo, user } = this.props;
        try {
            let award = axios.get(`${config.app.s_url}/awards/all?userId=${companyInfo.userId}`);
            let activity = axios.get(`${config.app.s_url}/activitys/all?userId=${companyInfo.userId}`);
            let hire = axios.get(`${config.app.s_url}/hireBoards/one?userId=${companyInfo.userId}`);
            let like = axios.get(`${config.app.s_url}/likes/one?userId=${user.id}&infoUserId=${companyInfo.userId}`);

            await Promise.all([award,activity, hire, like]).then(data => {
                award = data[0].data;
                activity = data[1].data;
                hire = data[2].data;
                like = data[3].data;
            });

            this.setState({ 
                awardData : award, 
                activityData : activity,
                hireData : hire,
                like : like ? true : false,
            });

        } catch(err) {
            console.log("company mypage data load err : ");
        }
        this.setState({ load : true });
    }

    MenuClick(num){ this.setState({ btnNum:num }) }

    hireSet(data) { this.setState({ hireData : data }); }

    likeToggle(data) { this.setState({ like : data })}

    render() {
        const { btnNum, load, awardData, activityData, hireData, like } = this.state;
        const { companyInfo, user, loginState, infoMount, boardMount, mailReload } = this.props;
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
                                companyInfo={companyInfo} 
                                awardData={awardData}
                                activityData={activityData}
                                like={like}
                                user={user}
                                loginState={loginState}
                                likeToggle={this.likeToggle.bind(this)}
                                infoMount={() => infoMount()}
                                boardMount={() => boardMount()}
                                mailReload={() => mailReload()}
                                /> :
                                load && 
                                <Hire 
                                    loginState={loginState} 
                                    load={load} 
                                    userEmail={user.email} 
                                    userId={companyInfo.userId} 
                                    userName={companyInfo.companyName} 
                                    hireData={hireData}
                                    hireSet={this.hireSet.bind(this)}
                                />
                            }
                    </div>
                    <div className="Mypage-btns">
                        <button className={!btnNum ? "cMypage-menu-click":"cMypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                        <button className={btnNum ? "cMypage-menu-click":"cMypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>채용공고</button>
                    </div>
                </div>
            </div>
         </div>
        );
    }
}

export default Mypage;