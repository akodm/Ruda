import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../../client-configs';  // 컨피그 파일
import '../../css/Easy.css';

class Easy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : new URL(window.location),
        }
    }

    async componentDidMount() {
        try {
            const {url}=this.state;
            let urls = url;
            const value = urls.searchParams.get("value") || null;
            const tag = urls.searchParams.get("tag") || null;
            
            if(value && tag) {
                let authLogin = axios.get(`${config.app.s_url}/users/oauthlogin?tag=${tag}&email=${value}`);
                let userId = axios.get(`${config.app.s_url}/users/oneemail?userEmail=${value}&authCate=${tag}`);
                
                await Promise.all([authLogin, userId]).then(data => {
                    authLogin = data[0];
                    userId = data[1];
                })

                let userdata = JSON.stringify(authLogin.data);
                localStorage.setItem("users",userdata);
                
                this.props.set({
                    id : userId.data.id,
                    tag : userId.data.authCate,
                    email : userId.data.email,
                    cate : userId.data.userCate
                });
                this.props.history.push("/");
                this.props.loginMount(true);
            }
        } catch(err) {
            console.log("소셜 로그인 에러");
            alert("서버에러가 발생하였습니다. 다시 시도해주세요.");
            localStorage.removeItem("users");
        }
    }

    oauthClick(tags) {
        let href = "";
        switch(tags) {
            case 0 : href = `${config.app.s_url}/users/google`; break;
            case 1 : href = `${config.app.s_url}/users/facebook`; break;
            case 2 : href = `${config.app.s_url}/users/naver`; break;
            default : href = ``; break;
        }
        if(href) { window.location.href = href; }
    }

    render() {
        return (
            <div className="easy-main">
                <div className="easy-div">
                    <span className="easy-title">간편로그인 / 회원가입</span>
                    <div className="easy-oauthDiv">
                        <div className="easy-btn" onClick={this.oauthClick.bind(this,0)} ><img alt="img" src="/Images/btn_google_signin_light_normal_web.png" className="oauth-img" /></div>
                        <div className="easy-btn" onClick={this.oauthClick.bind(this,1)} ><img alt="img"  src="/Images/facelogin.png" width="185px" height="40px" className="oauth-img"/></div>
                        <div className="easy-btn" onClick={this.oauthClick.bind(this,2)} ><img alt="img"  src="/Images/naverlogin.png" className="oauth-img" /></div>
                    </div>
                    <div className="easy-bottom">
                        <div className="easy-line"></div>
                        <span className="easy-text">또는</span>
                        <div className="easy-line"></div>
                    </div>
                    <span className="easy-easy"><Link to="/login">하이루키 계정으로 로그인하기</Link></span>
                    <span className="easy-easyb"><Link to="/insert">하이루키 계정으로 회원가입하기</Link></span>
                </div>
            </div>
        );
    }
}

export default Easy;