import React, { Component } from 'react';
import '../../../css/companypage.css';
import config from '../../../../client-configs';

import axios from 'axios';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import Profile from './Profile';
import Hire from './Hire';
import Setting from './Setting';

class Mypage extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnNum:0,
            likeBtn:"none",
            shareAlert:"none",
            url :new URL(window.location.href),
            success:"none",

            
            likeCount:"",            
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

    /*likeClick(){
      
    }*/

    savepdf(){
        document.title = '이름님의 이력서';
        window.print();
    }

    copyCodeToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        console.log(dummy);
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.setState({
            success:"flex",
        })
    }

    shareLink(){
        this.setState({
            shareAlert:"flex",
        })
    }
    
    close(){
        this.setState({
            shareAlert:"none",
        })
    }

    render() {
        const {btnNum,likeBtn,shareAlert,success,portfolioData,load}=this.state;
        const { companyInfo, user } = this.props;
        return (
            <div className="Mypage">
                <div className="Mypage-frame">
                    <div className="Mypage-pages">
                        <div className="shareAlert" style={{display:shareAlert}}>
                            <span className="close-shareAlert" onClick={this.close.bind(this)}>X</span>
                            <p>더 많은 사람이 볼 수 있도록 공유해보세요!</p>
                            <div style={{width:"80%"}}>
                                <div className="shareAlert-input">
                                    <input className="shareAlert-input-box" readOnly value={window.location.href} ></input>
                                    <button className="shareAlert-btn" onClick={() => this.copyCodeToClipboard()}>링크복사</button>    
                                </div>
                                <p style={{display:success,fontSize:"14px",color:"#11addd"}}>복사가 완료되었습니다.</p> 
                            </div>
                        </div>
                        <div className="Mypage-pages-title-frame">
                            <img src = "/Image/hochi.png" className="hochi" alt="img"></img>
                            <div className="Mypage-pages-title">
                                <p>{companyInfo.companyName}님의 {btnNum === 0 ?"프로필 입니다." : "" || 
                                              btnNum === 1 ?"채용공고 입니다." : "" ||
                                              btnNum === 2 ?"마이페이지 입니다." : "" } </p>
                                <div className="Mypage-pages-title-icon">
                                    <div className="Mypage-pages-title-icon-icon">
                                        <PrintIcon onClick={this.savepdf.bind(this)}/>
                                    </div>
                                    <div className="Mypage-pages-title-icon-icon">
                                        <ShareIcon onClick={this.shareLink.bind(this)}/>
                                    </div>
                                    <div className="Mypage-pages-title-icon-icon">
                                        {likeBtn==="none"?<FavoriteBorderIcon />:<FavoriteIcon style={{ color : "#11addd"}}/>}
                                    </div>
                                    <div className="Mypage-pages-title-icon-icon">
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
                                <Profile companyInfo={companyInfo} /> :
                                btnNum === 1 ?
                                load && <Hire load={load} userEmail={user.email} userId={companyInfo.userId} userName={companyInfo.companyName}/>
                                :
                                user.email && <Setting />
                            }
                        </div>
                    </div>
                    <div className="Mypage-btns">
                        <button className={btnNum === 0?"Mypage-menu-clicks":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                        <button className={btnNum === 1?"Mypage-menu-clicks":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>채용공고</button>
                        {
                            user.email &&
                            <button className={btnNum === 2?"Mypage-menu-clicks":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,2)}>마이페이지</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Mypage;