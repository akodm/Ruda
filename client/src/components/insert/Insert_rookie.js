import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            checkbox : false,
            
            //미입력 오류 항목 state
            emailstyle : "",
            pwStyle : "",
            pwckStyle : "",
            nameStyle :"",
            phonenumStyle : "",
            checkboxStyle :"",

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
        const { email,pw,pwck,name,phonenum,checkbox,emailck}=this.state;
        let count = 0;

        //email
        if(!(/([a-z0-9_.-]+)@([a-z.-]+)\.([a-z]{2,6})/.test(email))){
            this.setState({
                emailStyle : "flex",
            })
            count = 1;
        }else{
            this.setState({
                emailStyle : "none",
            })
        }
        //pw
        if(!(/^[a-z0-9A-Z~!@#$%<>^&()\-=+_’]{8,}$/.test(pw))){
            this.setState({
                pwStyle : "flex",
            })
            count = 1 ;
        }else{
            this.setState({
                pwStyle : "none",
            })
        }
        //pwck
        if(!(pw.match(pwck)) || pwck.length < 8) {
            await this.setState({
                pwckStyle : "flex",
            })
            count = 1;
        }else{
            this.setState({
                pwckStyle:"none",
            })
        }
        //name
        if(/[~!@#$%<>^&()\-=+_’0-9]/.test(name) ||name.length<2){
            this.setState({
                pwckStyle:"none",
                nameStyle:"flex",
            })
            count = 1;
        }else {
            this.setState({
                nameStyle : "none",
            })
        }
        //phonenum
        if(!(/^[0-9]{9,11}$/.test(phonenum))) {
            await this.setState({
                phonenumStyle : "flex",
            })
            count = 1;
        } else {
            this.setState({
                phonenumStyle : "none",
            })
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
            const result = await axios.get(`http://localhost:5000/users/one?useremail=${email}`);
            if(result.data){
                alert("이미 존재하는 이메일 입니다. 다시 확인해주세요.");
                this.setState({
                    emailck : false,
                })
                return;
            }
            const userCreate = await axios.post("http://localhost:5000/users/insert", {
                email : email,    
                userPass : pw,
                userPhone : phonenum,
            })
            alert("가입되었습니다.");
            if(userCreate.data){
                console.log("user insert create success : " + email, pw)
            } else {
                console.log("user insert create fail");
            }
        } catch (err) {
            console.log("user insert create err : " + err);
        }
    }
    async emailckBtn (){
        const result = await axios.get(`http://localhost:5000/users/one?userId=${this.state.email}`)
        if(result.data){
            alert("이미 존재하는 이메일 입니다.");
            return;
        }
        if(!(/([a-z0-9_.-]+)@([a-z.-]+)\.([a-z]{2,6})/.test(this.state.email))) {
            this.setState({
                emailStyle : "flex",
            })
            return;
        } else {
            this.setState({
                emailStyle : "none",
            })
        }
        alert("사용 가능한 이메일 입니다.");
        this.setState({
            emailck : true,
        })
    }

    render() {
        const {emailStyle,pwStyle,pwckStyle,nameStyle,phonenumStyle,checkboxStyle}=this.state;
        return (
            <div className="insert-c-main">
                <div className="insert-c-mainDiv">
                    <img src="/Image/insert_rookie.png" alt="LoginIMG"></img>
                    <span className="insert-c-title">신입 회원가입</span>
                    <div className="insert-c-form">
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이메일</div>
                            <input type="text" name="email" className="insert-c-form-input" placeholder="ex)abc@abc.com"></input>
                            <button className="insert-c-form-auth">중복확인</button>
                        </div>
                        <div className="validationErr-"
                        style={{
                            display : emailStyle
                        }}>잘못된 이메일 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호</div>
                            <input type="password" name="pw" className="insert-c-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                        <div className="validationErr-">잘못된 비밀번호 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호 확인</div>
                            <input type="text" name="pwck" className="insert-c-form-input" placeholder="비밀번호를 확인해주세요."></input>
                        </div>
                        <div className="validationErr-">비밀번호가 다릅니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이름</div>
                            <input type="text" name="name" className="insert-c-form-input" placeholder="이름을 입력해주세요."></input>
                        </div>
                        <div className="validationErr-">잘못된 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">휴대폰번호</div>
                            <input type="text" name="phonenum" className="insert-c-form-input" placeholder="01012345678"></input>
                        </div>
                        <div className="validationErr-">잘못된 입력 형식입니다.</div>
                        <div className="insert-c-form-etc">
                            <div className="insert-c-etc-save">
                                <input type="checkbox" name="checkbox" className="insert-c-etc-chbox"></input>
                                <span className="insert-c-etc-span">개인정보 약관동의</span>
                            </div>
                        </div>
                        <div className="validationErr-">약관에 동의하여야 합니다.</div>
                        <button className="insert-c-form-loginBtn" onclick={this.InsertCheck.bind(this)}>가입하기</button>
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