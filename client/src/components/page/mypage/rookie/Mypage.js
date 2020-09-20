import React, { Component } from 'react';
import '../../../css/mypage.css';   
import config from '../../../../client-configs';

import axios from 'axios';

import Profile from './Profile';
import Portfolio from './Portfolio';

class mypage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnNum:0,

            portfolioData : [],
            awardData:[],
            certificateData:[],
            activityData:[],

            like : false,

            load : false,

        }
    }

    async componentDidMount() {
        const { userInfo, user } = this.props;
      
        try {
            // 서로 관련이 없는 경우 아래와 같은 방식으로 전부 다 한번에 처리 가능.
            let result = axios.get(`${config.app.s_url}/portfolios/all?userId=${userInfo.userId}`);
            let award = axios.get(`${config.app.s_url}/awards/all?userId=${userInfo.userId}`);
            let certificate = axios.get(`${config.app.s_url}/certificates/all?userId=${userInfo.userId}`);
            let activity = axios.get(`${config.app.s_url}/activitys/all?userId=${userInfo.userId}`);
            let like = axios.get(`${config.app.s_url}/likes/one?userId=${user.id}&infoUserId=${userInfo.userId}`);
            
            // 배열에 위의 실행할 값들을 넣음.
            // 해당 배열들이 모두 실행되면 콜백으로 결과값을 받고, 배열 순서대로 전달해줌.
            await Promise.all([result, award, certificate, activity, like]).then(data => {
                result = data[0].data;
                award = data[1].data;
                certificate = data[2].data;
                activity = data[3].data;
                like = data[4].data;
            });
      
            // 실행 결과 값들을 스태이트에 반영.
            this.setState({ 
                portfolioData : result, 
                awardData : award, 
                certificateData : certificate ,
                activityData : activity,
                like : like ? true : false,
            });
        } catch(err) {
            console.log("rookie mypage data load err : ");
        }
        this.setState({ load : true })
    }



    MenuClick(num){ this.setState({ btnNum:num }) }

    portfolioConcat(data) { this.setState(current => ({ portfolioData : current.portfolioData.concat(data) })) }

    likeToggle(data) { this.setState({ like : data })}
    
    render() {
        const { btnNum, portfolioData, load, awardData, certificateData,activityData,like }=this.state;
        const { userInfo, user, loginState, infoMount, boardMount, mailReload } = this.props;

        return (
            <div className="Mypage">
                <div className="Mypage-frame">
                    <div className="Mypage-pages">
                        <div className="Mypage-content">
                            {/* 0 => 기본 정보 프로필
                            1 => 포트폴리오
                            2 => 마이페이지 수정 ( 개인화면 ) */}
                            {
                                !btnNum ?
                                load && <Profile
                                user={user}
                                loginState={loginState}
                                userInfo={userInfo}
                                awardData={awardData}
                                certificateData={certificateData}
                                activityData={activityData}
                                portfolioData={portfolioData} 
                                like={like}
                                likeToggle={this.likeToggle.bind(this)}
                                infoMount={() => infoMount()}
                                boardMount={() => boardMount()}
                                mailReload={() => mailReload()}
                                /> 
                                :
                                load && <Portfolio 
                                load={load} 
                                loginState={loginState}
                                userEmail={user.email} 
                                userId={userInfo.userId} 
                                userName={userInfo.userName} 
                                portfolio={portfolioData} 
                                activityData={activityData}
                                addPortfolio={this.portfolioConcat.bind(this)} />
                            }
                        </div>
                        <div className="Mypage-btns">
                            <button className={!btnNum ? "Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                            <button className={btnNum ? "Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>포트폴리오</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default mypage;