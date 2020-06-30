import React, { Component } from 'react';
import '../../../css/mypage.css';
import config from '../../../../client-configs';

import axios from 'axios';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Profile from './Profile';
import Portfolio from './Portfolio';
import Setting from './Setting';

class mypage extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnNum:1,
            likeBtn: false,

            portfolioData : [],

            load : false,
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.get(`${config.app.s_url}/portfolios/all?userId=${this.props.userInfo.userId}`);
            this.setState({ portfolioData : result.data });
        } catch(err) {
            console.log("rookie mypage data load err : " + err);
        }
        this.setState({ load : true });
    }

    MenuClick(num){ this.setState({ btnNum:num }) }

    savepdf(){
        document.title = '이름님의 이력서';
        window.print();
    }

    portfolioConcat(data) { this.setState(current => ({ portfolioData : current.portfolioData.concat(data) })) }

    render() {
        const { btnNum, likeBtn, portfolioData, load }=this.state;
        const { userInfo, user } = this.props;
        return (
            <div className="Mypage">
                <div className="Mypage-frame">
                    <div className="Mypage-pages">
                        <div className="Mypage-pages-title-frame">
                            <img src = "/Image/hochi.png" className="hochi" alt="img"></img>
                            <div className="Mypage-pages-title">
                                <p>{userInfo.userName}님의 {btnNum === 0 ?"프로필 입니다." : "" || 
                                              btnNum === 1 ?"포트폴리오 입니다." : "" ||
                                              btnNum === 2 ?"마이페이지 입니다." : "" } </p>
                                <div className="Mypage-pages-title-icons">
                                    <div className="Mypage-pages-title-icons-icon">
                                        <PrintIcon onClick={this.savepdf.bind(this)}/>
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon">
                                        <ShareIcon />
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon" onClick={() => this.setState({ likeBtn : likeBtn ? false : true })}>
                                        {!likeBtn ? <FavoriteBorderIcon/>:<FavoriteIcon style={{ color : "#11addd"}}/>}
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon">
                                        <MailOutlineIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Mypage-content">
                            {/* 0 => 기본 정보 프로필
                            1 => 포트폴리오
                            2 => 마이페이지 수정 ( 개인화면 ) */}
                            {
                                btnNum === 0 ?
                                <Profile /> :
                                btnNum === 1 ?
                                load && <Portfolio load={load} userEmail={user.email} userId={userInfo.userId} userName={userInfo.userName} portfolio={portfolioData} addPortfolio={this.portfolioConcat.bind(this)} />
                                :
                                user.email && <Setting />
                            }
                        </div>
                    </div>
                    <div className="Mypage-btns">
                        <button className={btnNum === 0 ? "Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                        <button className={btnNum === 1 ? "Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>포트폴리오</button>
                        {
                            user.email &&
                            <button className={btnNum === 2 ? "Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,2)}>프로필수정</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default mypage;