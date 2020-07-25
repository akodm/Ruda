import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../css/Insert.css';
import InputTag from '../../component/InputTag';
import config from '../../../client-configs';

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "", // 이메일
            emailcode : "", // 이메일 인증 코드
            password : "", // 패스워드
            passwordconfirm : "", // 패스워드 확인
            emailck : false,

            emailValid : { state : true, result : false }, // 이메일 밸리데이션
            emailcodeValid : { state : true, result : false }, // 이메일 인증 코드 밸리데이션
            passwordValid : { state : true, result : false }, // 패스워드 밸리데이션
            passwordconfirmValid : { state : true, result : false }, // 패스워드 확인 밸리데이션
        
        }
    }

    // 가입하기 버튼 누를 시
    async insertBtn() {
        const { emailValid, emailcodeValid, passwordValid, passwordconfirmValid, password, passwordconfirm } = this.state;
        const {email,emailcode}=this.state;
        try {
            if(!emailValid.result || !emailcodeValid || !passwordValid.result || !passwordconfirmValid.result ||password !== passwordconfirm) {
                alert("값이 없거나 잘못된 값이 있습니다. 다시 확인해주세요.");
                return;
            }

            let emailAuth = axios.post(`${config.app.s_url}/emailAuth/emailauth`, { token : emailcode });
            let authResult = axios.get(`${config.app.s_url}/emailAuth/one?token=${emailcode}&email=${email}`);

            await Promise.all([emailAuth, authResult]).then((data) => {
                console.log(data)
                emailAuth = data[0];
                authResult = data[1];
            });

            if(!authResult.data || !emailAuth.data) {
                alert("이메일 인증에 실패했습니다. 다시 인증코드를 발급 받아주세요.");
                return;
            }

            await axios.post(`${config.app.s_url}/users/create`,{
                userEmail:email,
                userPass:password,
            })

            const authLogin = await axios.get(`${config.app.s_url}/users/oauthlogin?tag=highrookie&email=${email}`);
            let userdata = JSON.stringify(authLogin.data);
            localStorage.setItem("users",userdata);
    
            alert("회원가입이 완료되었습니다.");
            this.props.history.push("/login");
        } catch(err) {
            console.log("insert save or insert to login err : ");
            alert("서버에러로 회원가입에 실패하였습니다.");
        }
    }

    // 각 인풋 태그의 밸리데이션 체크
    validSet(name, boolstate, boolresult) {
        if([name]) this.setState({ [name] : { state : boolstate, result : boolresult } });
    }

    // 이미 존재하는지 이메일 체크
    async emailCheck(){
        const {email}=this.state;
        if(!email){
            alert("이메일을 입력해주세요.");
            this.setState({ emailck : false });
            return;
        }
        try {
            let result = await axios.get(`${config.app.s_url}/users/oneemail?userEmail=${email}&authCate=highrookie`);
            if(result.data){
                alert("이미 존재하는 이메일 입니다.");
                this.setState({ emailck : false, })
                return;
            }
            this.setState({ emailck : true, });
            this.emailAuth();
        } catch (err) {
            console.log("user insert create err : ");
        }
    }
    
    // 인증 메일 발송 함수
    async emailAuth() {
        const { email } = this.state;
        try {
            await axios.get(`${config.app.s_url}/nodemailer?userEmail=${email}`);
            alert("이메일 인증을 발송하였습니다.");
            
        } catch(err) {
            console.log("email auth err : " + err)
        }
    }

    render() {
        const { email, emailcode, password, passwordconfirm } = this.state
        const { emailValid, emailcodeValid, passwordValid, passwordconfirmValid } = this.state
        return (
            <div className="insert-main">
                <div className="insert-div">
                    <span className="insert-title">회원가입</span>
                    <div className="insert-inputBox">
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
                        <button className="insert-box" onClick={this.emailCheck.bind(this)}>인증</button>
                    </div>
                    <InputTag 
                        validation={this.validSet.bind(this)} 
                        valid={emailcodeValid} 
                        value={emailcode} 
                        onChange={(e) => this.setState({ emailcode : e.target.value })} 
                        regSpan="인증 코드를 입력하세요." 
                        name="emailcode" 
                        type="text" 
                        placeholder="인증 코드를 입력하세요."
                    ></InputTag>
                    <InputTag 
                        validation={this.validSet.bind(this)} 
                        valid={passwordValid} 
                        value={password} 
                        onChange={(e) => this.setState({ password : e.target.value })} 
                        regExp={/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[*!@#$%^&+=/]).*$/} 
                        regSpan="잘못된 비밀번호 형식입니다." 
                        name="password" 
                        type="password" 
                        placeholder="특수문자,문자,숫자 포함 8~15자리 이내"
                    ></InputTag>
                    <InputTag 
                        validation={this.validSet.bind(this)} 
                        valid={passwordconfirmValid} 
                        value={passwordconfirm} 
                        custom={{ first : password, second : passwordconfirm }}
                        onChange={(e) => this.setState({ passwordconfirm : e.target.value })} 
                        regSpan="비밀번호가 다릅니다." 
                        name="passwordconfirm" 
                        type="password" 
                        placeholder="비밀번호를 확인해주세요."
                    ></InputTag>
                    <button className="insert-btn" onClick={this.insertBtn.bind(this)}>회원가입</button>
                    <div className="insert-bottom">
                        <div className="insert-line"></div>
                        <span className="insert-text">또는</span>
                        <div className="insert-line"></div>
                    </div>
                    <span className="insert-easy"><Link to="/easy">간편하게 회원가입하기</Link></span>
                </div>
            </div>
        );
    }
}

export default Insert;