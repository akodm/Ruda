import React, { Component } from 'react';
//import '../../../css/companypage.css';
import config from '../../../../client-configs';

import axios from 'axios';

import Profile from './Profile';
import Hire from './Hire';
import Setting from './Setting';

class Mypage extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnNum:0,
            load : false,
        }
    }

    async componentDidMount() {
        try {
        } catch(err) {
        }
        this.setState({ load : true });
    }

    MenuClick(num){ this.setState({ btnNum:num }) }

    render() {
        const {btnNum,load}=this.state;
        const { companyInfo, user } = this.props;
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
                                <Profile companyInfo={companyInfo} /> :
                                btnNum === 1 ?
                                load && <Hire load={load} userEmail={user.email} userId={companyInfo.userId} userName={companyInfo.companyName}/>
                                :
                                user.email && <Setting />
                            }
                    </div>
                    <div className="Mypage-btns">
                        <button className={btnNum === 0?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                        <button className={btnNum === 1?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>채용공고</button>
                        {
                            user.email &&
                            <button className={btnNum === 2?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,2)}>마이페이지</button>
                        }
                    </div>
                </div>
            </div>
         </div>
        );
    }
}

export default Mypage;