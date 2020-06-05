import React, { Component } from 'react';
import './Easy.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Easy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:new URL(window.location),
            user:{
                tag:"",
                email:""
            }
        }
    }

    async componentDidMount() {
        try {
            const {url,user}=this.state;
            let urls = url;
            const value = urls.searchParams.get("value");
            const tag = urls.searchParams.get("tag");
            if(value && tag) {
                const authLogin = await axios.get(`http://localhost:5000/users/oauthlogin?tag=${tag}&email=${value}`);
                let userdata = JSON.stringify(authLogin.data);
                localStorage.setItem("users",userdata);
    
                let getUser = JSON.parse(localStorage.getItem("users"));
                const verify = await axios.get(`http://localhost:5000/users/verify/`,{
                    headers:{
                        "Authorization":getUser.token, 
                    }
                })
                console.log(verify.data);
                await this.setState({
                    user:{
                        tag:verify.data.tag,
                        email:verify.data.email,
                    }
                })
                console.log(this.state.user);
                window.location="/";
            }
        } catch(err) {
            console.log("소셜 로그인 에러" + err);
        }
    }

    render() {
        const {  } = this.state;
        return (
            <div className="easy-main">
                <div className="easy-div">
                    <span className="easy-title">간편로그인 / 회원가입</span>
                    <div className="easy-btn"><a href="http://localhost:5000/users/google"><img src="/Images/btn_google_signin_light_normal_web.png"/></a></div>
                    <div className="easy-btn"><a href="http://localhost:5000/users/facebook">facebook</a></div>
                    <div className="easy-btn"><a href="http://localhost:5000/users/naver"><img src="/Images/naverlogin.png"/></a></div>
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