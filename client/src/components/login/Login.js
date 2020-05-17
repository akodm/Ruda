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
            token : "",
            }
        }
        async LoginChecked(){
            const {email,pass} = this.state;
            try{
                const result = await axios.post(`http://localhost:5000/users/loginuser`,{
                    userEmail : email,
                    userPass : pass,
                })
                console.log(result);
                console.log(email,pass);
                if(result.data){
                    try{
                        const tokenresult = await axios.get(`http://localhost:5000/tokenpub?userEmail=${email}`)
                        this.setState({
                            token : tokenresult.data,
                        })
                        localStorage.setItem("users",this.state.token);
                        this.usersVerify();
                        console.log("token들어감꾸");
                        window.location.href="http://localhost:3000/usermypage";
                    }catch(err){
                        console.log("user login token err : " + err);
                    }
                }else{
                    alert("아이디 또는 비밀번호가 틀렸습니다.");
                }
                
            }catch(err){
                console.log("user login err : " + err);
            }
        }

        async usersVerify(){
            const result = await axios(`http://localhost:5000/verify`,{
                method : "get",
                headers : {
                    'content-type' : 'text/json',
                    'x-access-token' : localStorage.getItem("users")
                }
            
            });
            console.log(result.data);
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