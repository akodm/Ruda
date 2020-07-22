import React, { Component } from 'react';
import axios from 'axios';

import config from '../../../client-configs';

import Rookie from './rookie/Mypage';  // rookie mypage

import Company from './company/Mypage'; // company mypage

import NotFound from '../../layout/NotFound';

class MypageRoute extends Component {
    constructor(props) {
        super(props);
        let id = parseInt(this.props.match.params.id) || null;
        this.state = {
            id : id,
            rookie : null,
            company : null,

            load : false,
        }
    }

    async componentDidMount() {
        try {
            // 주소에 id가 있을경우
            if(this.state.id) {
                let rookie = axios.get(`${config.app.s_url}/userInfos/one?userId=${this.state.id}`);
                let company = axios.get(`${config.app.s_url}/companyInfos/one?userId=${this.state.id}`);

                await Promise.all([rookie, company]).then(data => {
                    rookie = data[0].data;
                    company = data[1].data;
                });

                this.setState({
                    rookie : (await rookie),
                    company : (await company),
                })
            // 로그인 후 기본 주소로 들어온 경우
            } else {
                const { user } = this.props;
                let rookie = axios.get(`${config.app.s_url}/userInfos/one?userId=${user.id}`);
                let company = axios.get(`${config.app.s_url}/companyInfos/one?userId=${user.id}`);

                await Promise.all([rookie, company]).then(data => {
                    rookie = data[0].data;
                    company = data[1].data;
                });

                this.setState({
                    rookie : (await rookie),
                    company : (await company),
                })
            }
        } catch(err) {
            console.log("mypage load err : " + err);
        }
        this.setState({ load : true })
    }

    render() {
        const { rookie, company, load } = this.state;
        const { user } = this.props;
        let userInfo = rookie || company || null;
        let loginState = false;
        if(userInfo && userInfo.userId) { loginState = (user.id === userInfo.userId); }
        return (
            <div style={{width:"100%"}}>
                {
                    userInfo ? 
                    (userInfo.user.userCate === "user" ? 
                    <Rookie userInfo={userInfo} {...this.props} loginState={loginState} /> 
                    : 
                    <Company companyInfo={userInfo} {...this.props} loginState={loginState} /> 
                    ) 
                    : load ? <NotFound /> : ""
                }
            </div>
        );
    }
}

export default MypageRoute;