import React, { Component } from 'react';
import './Login.css'

import { Link } from 'react-router-dom';
import InputTag from './InputTag';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 로그인에 필요한 스태이트
            email : "",
            password : "",
            // 스태이트에 값이 올바른지 체크 해줄 불 값 json type
            // state = 입력 정규식 텍스트 입출력 제어, result = 입력값이 정규식에 올바를 경우
            emailValid : { state : true, result : false },
            passwordValid : { state : true, result : false },
            
            user : { 
                tag :"",
                email:"",
            }
        }
    }
    // 로그인 버튼을 누를 경우
    loginBtn() {
        const { emailValid, passwordValid } = this.state;
        // 정규식이 틀리거나 해당 인풋에 값이 없을 경우
        if(!emailValid.result || !passwordValid.result) {
            alert("값이 없거나 잘못된 값이 있습니다. 다시 확인해주세요.");
        // 올바른 체크의 경우
        } else {
            console.log("login users");
            this.LoginChecked();
        }
    }
    async LoginChecked(e){
        const {email,password}=this.state;
        try{
            const result = await axios.post(`http://localhost:5000/users/loginuser`,{
                userEmail : email,
                userPass : password,
            })
         
            if(!result.data){
                alert("이메일 또는 패스워드가 다릅니다.")
                return;
            }
            const authLogin = await axios.get(`http://localhost:5000/users/oauthlogin?tag=highrookie&email=${email}`);
            let userdata = JSON.stringify(authLogin.data);
            localStorage.setItem("users",userdata);

            let getUser = JSON.parse(localStorage.getItem("users"));
            const verify = await axios.get(`http://localhost:5000/users/verify/`,{
                headers:{
                    "Authorization":getUser.token, 
                }
            })
            await this.setState({
                user:{
                    tag:verify.data.tag,
                    email:verify.data.email,
                }
            })
            window.location="/userinfo";
        } catch(err){
            console.log("user login err : " + err);
            localStorage.removeItem("users");
        }
    }
    // props로 넘겨줄 함수, 매개변수로 들어오는 값 세 가지를 셋 스태이트 시킴
    // [name]+Valid 스태이트에 해당 불 값들 대입
    validSet(name, boolstate, boolresult) {
        if([name+"Valid"]) this.setState({ [name+"Valid"] : { state : boolstate, result : boolresult } });
    }

    render() {
        const { email, password } = this.state; // 인풋에 들어갈 스태이트
        const { emailValid, passwordValid } = this.state; // 인풋값의 정규식 및 값을 체크할 스태이트
        return (
            <div className="login-main">
                <div className="login-div">
                    <span className="login-title">로그인</span>
                    {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                    <InputTag 
                        validation={this.validSet.bind(this)} 
                        valid={emailValid} 
                        value={email} 
                        onChange={(e) => this.setState({ email : e.target.value })} 
                        regExp={/[a-z0-9]+@[a-z]+\.[a-z]{2,8}.*/} 
                        regSpan="잘못된 이메일 형식입니다." 
                        name="email" 
                        type="text" 
                        placeholder="이메일을 입력해주세요."
                    ></InputTag>
                    {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                    <InputTag 
                        validation={this.validSet.bind(this)} 
                        valid={passwordValid} 
                        value={password} 
                        onChange={(e) => this.setState({ password : e.target.value })} 
                        regSpan="비밀번호를 입력해주세요." 
                        name="password" 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요."
                    ></InputTag>
                    {/*로그인 체크*/}
                    <button className="login-btn" onClick={this.loginBtn.bind(this)}>로그인</button>
                    <span className="login-search"><Link to="/searchuser">이메일 또는 비밀번호가 생각나지 않으세요? 이곳을 클릭하세요.</Link></span>
                    <div className="login-bottom">
                        <div className="login-line"></div>
                        <span className="login-text">또는</span>
                        <div className="login-line"></div>
                    </div>
                    <span className="login-easy"><Link to="/easy">간편하게 로그인하기</Link></span>
                </div>
            </div>
        );
    }
}

export default Login;