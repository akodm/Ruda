import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            pass : "",
        }
    }

    async componentDidMount() {
        if(localStorage.getItem("users")) {
            const userToken = await this.usersVerify();
            if(userToken) {
                const path = userToken.userCate === "user" ? "/usermypage" : "/companymyapge";
                window.location.href = path;
            }
        }
    }

    async LoginChecked(){
        const {email,pass} = this.state;
        try{
            const result = await axios.post(`http://localhost:5000/users/loginuser`,{
                userEmail : email,
                userPass : pass,
            })

            if(result.data){
                try{
                    const resultUser = await axios.get(`http://localhost:5000/users/one?userEmail=${email}`);
                    console.log(resultUser.data)
                    const tokenresult = await axios.get(`http://localhost:5000/tokenpub?userEmail=${resultUser.data.email}&userCate=${resultUser.data.userCate}`)
                    localStorage.setItem("users", tokenresult.data);

                    this.props.userVerify(tokenresult.data);
                    
                    const path = resultUser.data.userCate === "user" ? "/usermypage" : "/companymypage";
                    window.location.href = path;
                }catch(err){
                    console.log("user login token err : " + err);
                    localStorage.removeItem("users");
                }
            }else{
                alert("아이디 또는 비밀번호가 틀렸습니다.");
            }
        }catch(err){
            console.log("user login err : " + err);
            localStorage.removeItem("users");
        }
    }

    // 로컬스토리지에 저장된 토큰을 검증 및 결과를 리턴하는 함수
    // 해당 리턴 값 -> 로그인 시의 유저 이메일 -> 이메일로 원하는 작업 수행
    async usersVerify(){
        try {
            const result = await axios.get(`http://localhost:5000/verify?token=${localStorage.getItem("users")}`);
            return result.data;
        } catch(err) {
            console.log("user token verify err : " + err);
            localStorage.removeItem("users");
        }
    }

    onChangeInputLogin(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    render() {
        return (
            <div className="login-main">
                <div className="login-mainDiv">
                    <img src="/Image/login_img.png" alt="LoginIMG"></img>
                    <span className="login-title">로그인</span>
                    <div className="login-form">
                        <input type="text" name="email" onChange={this.onChangeInputLogin.bind(this)} className="login-form-input" placeholder="아이디를 입력해주세요."></input>
                        <input type="password" name="pass" onChange={this.onChangeInputLogin.bind(this)} className="login-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        <button className="login-form-loginBtn" onClick={this.LoginChecked.bind(this)}>로그인</button>
                        <div className="login-form-etc">
                            <div className="login-etc-save">
                                <input type="checkbox" className="login-etc-chbox"></input>
                                <span className="login-etc-span">아이디저장</span>
                            </div>
                            <div className="login-etc-search">
                                <Link to="/search" className="login-etc-span">아이디/비밀번호 찾기</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="login-mainDivBottom">
                    <span className="login-mainDivBottom-span">간편하게 로그인하기</span>
                    <div className="login-mainDivBottom-btns">
                        <img src="/Image/google.png" alt="google" className="login-oauth"></img>
                        <img src="/Image/facebook.png" alt="facebook" className="login-oauth"></img>
                        <img src="/Image/git32.png" alt="github" className="login-oauth"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;