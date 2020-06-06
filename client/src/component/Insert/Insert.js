import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Insert.css';
import axios from 'axios';

import InputTag from '../Login/InputTag';

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "", // 이메일
            emailcode : "", // 이메일 인증 코드
            password : "", // 패스워드
            passwordconfirm : "", // 패스워드 확인
            emailcode:"",
            emailck : false,

            emailValid : { state : true, result : false }, // 이메일 밸리데이션
            emailcodeValid : { state : true, result : false }, // 이메일 인증 코드 밸리데이션
            passwordValid : { state : true, result : false }, // 패스워드 밸리데이션
            passwordconfirmValid : { state : true, result : false }, // 패스워드 확인 밸리데이션
        
        }
    }

    async insertBtn() {
        const { emailValid, emailcodeValid, passwordValid, passwordconfirmValid, password, passwordconfirm } = this.state;
        const {email,emailcode}=this.state;
        let emailAuth = await axios.post("http://localhost:5000/emailAuth/emailauth", {
            token : emailcode
        })
        if(!emailAuth.data || !emailValid.result || !emailcodeValid || !passwordValid.result || !passwordconfirmValid.result ||password !== passwordconfirm) {
            alert("값이 없거나 잘못된 값이 있습니다. 다시 확인해주세요.");
            return;
        }
        const userCreate = await axios.post("http://localhost:5000/users/create",{
            userEmail:email,
            userPass:password,
        })
        alert("회원가입이 완료되었습니다.");
        window.location.href="/login";
        console.log("Success !!");
        console.log(userCreate);
    }

    validSet(name, boolstate, boolresult) {
        if([name+"Valid"]) this.setState({ [name+"Valid"] : { state : boolstate, result : boolresult } });
    }

    async emailCheck(){
        const {email,emailck}=this.state;
        console.log("뿌야");
        if(!email){
            alert("이메일을 입력해주세요.");
            this.setState({ emailck : false });
            return;
        }
        try {
            let result = await axios.get(`http://localhost:5000/users/oneemail?userEmail=${email}&authCate=highrookie`);
            if(result.data){
                alert("이미 존재하는 이메일 입니다.");
                this.setState({ emailck : false, })
                return;
            }
            this.setState({ emailck : true, });
            this.emailAuth();
        } catch (err) {
            console.log("user insert create err : " + err);
        }
    }
    
    async emailAuth() {
        const { email } = this.state;
        try {
            await axios.get(`http://localhost:5000/nodemailer?userEmail=${email}`);
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