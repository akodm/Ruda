import React, { Component } from 'react';
import axios from 'axios';

class Insert_rookie extends Component {
    constructor(props){
        super(props);
            this.state={
            //input value state
            email : "",
            pw : "",
            pwck : "",
            name : "",
            phonenum : "",
            emailauth : "",
            checkbox :false,

            //미입력 오류 항목 state
            emailStyle : "none",
            emailckStyle :"none",
            pwStyle : "none",
            pwckStyle : "none",
            nameStyle :"none",
            phonenumStyle : "none",
            checkboxStyle :"none",

            //email 중복체크
            emailck : false,
        }
    }

    ChangeInput(e) {
        this.setState({
            [e.target.name] : e.target.value, 
        })
    }
    async InsertCheck(){
        const { email,pw,pwck,name,phonenum,emailck,checkbox,emailauth }=this.state;
        let count = 0;

        //email
        if(!(/[a-z0-9]+@[a-z]+.[a-z]{2,8}/.test(email))){
            this.setState({ emailStyle : "flex", })
            count = 1;
        }else{
            this.setState({ emailStyle : "none", })
        }
        if(emailauth.length < 4) {
            this.setState({ emailckStyle : "flex" })
        } else {
            this.setState({ emailckStyle : "none" })
        }
        //pw
        if(!(/^[a-z0-9A-Z~!@#$%<>^&()\-=+_’]{8,}$/.test(pw))){
            this.setState({ pwStyle : "flex", })
            count = 1 ;
        }else{
            this.setState({ pwStyle : "none", })
        }
        //pwck
        if(!(pw.match(pwck)) || pwck.length < 8) {
            this.setState({ pwckStyle : "flex", })
            count = 1;
        }else{
            this.setState({ pwckStyle:"none", })
        }
        //name
        if(/[~!@#$%<>^&()\-=+_’0-9]/.test(name) ||name.length<2){
            this.setState({
                pwckStyle:"none",
                nameStyle:"flex",
            })
            count = 1;
        }else {
            this.setState({ nameStyle : "none", })
        }
        //phonenum
        if(!(/^[0-9]{9,11}$/.test(phonenum))) {
            this.setState({ phonenumStyle : "flex", })
            count = 1;
        } else {
            this.setState({ phonenumStyle : "none", })
        }
        if(!checkbox){
            this.setState({ checkboxStyle : "flex", })
            count = 1;
        }else{
            this.setState({ checkboxStyle : "none", }) 
        }
        //emailck
        if(!emailck){
            alert("이메일 중복 체크를 해주세요.");
            return;
        }
        if(count > 0) {
            count = 0;
            return;
        }
        try {
            let result = await axios.get(`http://localhost:5000/users/one?userEmail=${email}`);
            let emailAuth = await axios.post("http://localhost:5000/emailAuth/emailauth", {
                token : emailauth
            })
            await Promise.all([result, emailAuth]).then(value => {
                result = value[0];
                emailAuth = value[1];
            });
            if(result.data){
                alert("이미 존재하는 이메일 입니다.");
                this.setState({ emailck : false, })
                return;
            }
            if(!emailAuth.data) {
                alert("잘못된 인증코드입니다. 다시 확인해주세요.");
                this.setState({ emailckStyle : "flex"});
                return;
            }
            const userCreate = await axios.post("http://localhost:5000/users/create", {
                userEmail : email,    
                userPass : pw,
                userName : name,
                userPhone : phonenum,
                userCate : "user",
            })
            if(userCreate.data){
                console.log("user insert create success : " + email, pw)
                alert("가입되었습니다.");
                window.location.href="http://localhost:3000/login";
            } else {
                console.log("user insert create fail");
            }
        } catch (err) {
            console.log("user insert create err : " + err);
        }
     
    }
    async emailckBtn (){
        const result = await axios.get(`http://localhost:5000/users/one?userEmail=${this.state.email}`)
        if(result.data){
            alert("이미 존재하는 이메일 입니다.");
            console.log(result);
            return;
        }
        if(!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.state.email))) {
            this.setState({ emailStyle : "flex", })
            return;
        } else {
            this.setState({ emailStyle : "none", })
        }
        alert("사용 가능한 이메일 입니다.");
        this.setState({ emailck : true, })
    }
    ckbox(e){
        this.setState({ checkbox : e.target.checked, })
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
        const {emailStyle,pwStyle,pwckStyle,nameStyle,phonenumStyle,checkboxStyle,emailckStyle}=this.state;
        return (
            <div className="insert-c-main">
                <div className="insert-c-mainDiv">
                    <img src="/Image/insert_rookie.png" alt="LoginIMG"></img>
                    <span className="insert-c-title">신입 회원가입</span>
                    <div className="insert-c-form">
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이메일</div>
                            <input type="text" name="email" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="ex)abc@abc.com"></input>
                            <button className="insert-c-form-auth" onClick={this.emailckBtn.bind(this)}>중복확인</button>
                        </div>
                        <div className="validationErr-"
                        style={{
                            display : emailStyle
                        }}>잘못된 이메일 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이메일인증</div>
                            <input type="text" name="emailauth" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="인증번호를 입력해주세요"></input>
                            <button className="insert-c-form-auth" onClick={this.emailAuth.bind(this)}>인증받기</button>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display : emailckStyle
                        }}>잘못된 인증번호입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호</div>
                            <input type="password" name="pw" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :pwStyle
                        }}>잘못된 비밀번호 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호 확인</div>
                            <input type="password" name="pwck" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="비밀번호를 확인해주세요."></input>
                        </div>
                        <div className="validationErr-"
                          style={{
                            display : pwckStyle
                        }}>비밀번호가 다릅니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이름</div>
                            <input type="text" name="name" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="이름을 입력해주세요."></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display : nameStyle
                        }}>잘못된 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">휴대폰번호</div>
                            <input type="text" name="phonenum" onChange={this.ChangeInput.bind(this)} className="insert-c-form-input" placeholder="01012345678"></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display : phonenumStyle
                        }}>잘못된 입력 형식입니다.</div>
                        <div className="insert-c-form-etc">
                            <div className="insert-c-etc-save">
                                <label>
                                    <input type="checkbox" name="checkbox" onChange={this.ckbox.bind(this)} className="insert-c-etc-chbox"></input>
                                    <span className="insert-c-etc-span">개인정보 약관동의</span>
                                </label>
                            </div>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display : checkboxStyle
                        }}>>약관에 동의하여야 합니다.</div>
                        <button className="insert-c-form-loginBtn" onClick={this.InsertCheck.bind(this)}>가입하기</button>
                    </div>
                </div>
                <div className="insert-c-mainDivBottom">
                    <span className="insert-c-mainDivBottom-span">간편하게 로그인하기</span>
                    <div className="insert-c-mainDivBottom-btns">
                        <img src="/Image/google.png" alt="google" className="insert-c-oauth"></img>
                        <img src="/Image/facebook.png" alt="facebook" className="insert-c-oauth"></img>
                        <img src="/Image/git32.png" alt="github" className="insert-c-oauth"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Insert_rookie;