import React, { Component } from 'react';
import axios from 'axios';

class Insert_company extends Component {
    constructor(props){
        super(props);
            this.state={
            //input value state
            comEmail : "",
            comPw : "",
            comPwck : "",
            comName : "",
            comPhonenum : "",
            comCheckbox :false,

            //미입력 오류 항목 state
            comEmailStyle : "none",
            comPwStyle : "none",
            comPwckStyle : "none",
            comNameStyle :"none",
            comPhonenumStyle : "none",
            comCheckboxStyle :"none",

            //email 중복체크
            comEmailck : false,
        }
    }
    comChangeInput(e) {
        this.setState({
            [e.target.name] : e.target.value, 
        })
        console.log(e.target.name);
    }
    async comInsertCheck(){
        const { comEmail,comPw,comPwck,comName,comPhonenum,comEmailck,comCheckbox}=this.state;
        let count = 0;

        //email
        if(!(/[a-z0-9]+@[a-z]+.[a-z]{2,8}/.test(comEmail))){
            this.setState({
                comEmailStyle : "flex",
            })
            count = 1;
        }else{
            this.setState({
                comEmailStyle : "none",
            })
        }
        //pw
        if(!(/^[a-z0-9A-Z~!@#$%<>^&()\-=+_’]{8,}$/.test(comPw))){
            this.setState({
                comPwStyle : "flex",
            })
            count = 1 ;
        }else{
            this.setState({
                comPwStyle : "none",
            })
        }
        //pwck
        if(!(comPw.match(comPwck)) || comPwck.length < 8) {
            await this.setState({
                comPwckStyle : "flex",
            })
            count = 1;
        }else{
            this.setState({
                comPwckStyle:"none",
            })
        }
        //name
        if(/[~!@#$%<>^&()\-=+_’0-9]/.test(comName) ||comName.length<2){
            this.setState({
                comPwckStyle:"none",
                comNameStyle:"flex",
            })
            count = 1;
        }else {
            this.setState({
                comNameStyle : "none",
            })
        }
        //phonenum
        if(!(/^[0-9]{9,11}$/.test(comPhonenum))) {
            await this.setState({
                comPhonenumStyle : "flex",
            })
            count = 1;
        } else {
            this.setState({
                comPhonenumStyle : "none",
            })
        }
        //checkbox
        if(!comCheckbox){
            this.setState({
                comCheckboxStyle : "flex",
            })
            count = 1;
        }else{
            this.setState({
                comCheckboxStyle : "none",
            }) 
        }
        //emailck
        if(!comEmailck){
            alert("이메일 중복 체크를 해주세요.");
            return;
        }
        if(count > 0) {
            count = 0;
            return;
        }
        try {
            const result = await axios.get(`http://localhost:5000/companys/one?companyEmail=${comEmail}`);
            if(result.data){
                alert("이미 존재하는 이메일 입니다. 다시 확인해주세요.");
                this.setState({
                    comEmailck : false,
                })
                return;
            }
            const companyCreate = await axios.post("http://localhost:5000/companys/create", {
                companyEmail : comEmail,    
                companyPass : comPw,
            })
            if(companyCreate.data){
                console.log("user insert create success : " + comEmail, comPw)
                alert("가입되었습니다.");
            } else {
                console.log("user insert create fail");
            }
        } catch (err) {
            console.log("user insert create err : " + err);
        }
     
    }
    //email 중복 체크
    async comEmailckBtn (){
        const result = await axios.get(`http://localhost:5000/companys/one?companyEmail=${this.state.comEmail}`)
        if(result.data){
            alert("이미 존재하는 이메일 입니다.");
            console.log(result);
            return;
        }
        if(!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.state.comEmail))) {
            this.setState({
                comEmailStyle : "flex",
            })
            return;
        } else {
            this.setState({
                comEmailStyle : "none",
            })
        }
        alert("사용 가능한 이메일 입니다.");
        this.setState({
            comEmailck : true,
        })
    }
    //checkbox 체크
    ckbox(e){
        this.setState({
            comCheckbox : e.target.checked,
        })
    }
    render() {
        const {comEmailStyle,comPwStyle,comPwckStyle,comNameStyle,comPhonenumStyle,comCheckboxStyle}=this.state;
        return (
            <div className="insert-c-main">
                <div className="insert-c-mainDiv">
                    <img src="/Image/insert_company.png" alt="LoginIMG"></img>
                    <span className="insert-c-title">기업 회원가입</span>
                    <div className="insert-c-form">
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">이메일</div>
                            <input type="text" name="comEmail" onChange={this.comChangeInput.bind(this)} className="insert-c-form-input" placeholder="ex)abc@abc.com"></input>
                            <button className="insert-c-form-auth" onClick={this.comEmailckBtn.bind(this)}>중복확인</button>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comEmailStyle
                        }}>잘못된 이메일 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호</div>
                            <input type="password" name="comPw" onChange={this.comChangeInput.bind(this)} className="insert-c-form-input" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comPwStyle
                        }}>잘못된 비밀번호 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">비밀번호 확인</div>
                            <input type="password" name="comPwck" onChange={this.comChangeInput.bind(this)} className="insert-c-form-input" placeholder="비밀번호를 확인해주세요."></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comPwckStyle
                        }}>비밀번호가 다릅니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">기업이름</div>
                            <input type="text" name="comName" onChange={this.comChangeInput.bind(this)} className="insert-c-form-input" placeholder="이름을 입력해주세요."></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comNameStyle
                        }}>잘못된 형식입니다.</div>
                        <div className="insert-c-formDiv">
                            <div className="insert-c-formSpan">기업번호</div>
                            <input type="text" name="comPhonenum" onChange={this.comChangeInput.bind(this)} className="insert-c-form-input" placeholder="01012345678"></input>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comPhonenumStyle
                        }}>잘못된 입력 형식입니다.</div>
                        <div className="insert-c-form-etc">
                            <div className="insert-c-etc-save">
                                <input type="checkbox" className="insert-c-etc-chbox"  onChange={this.ckbox.bind(this)}></input>
                                <span className="insert-c-etc-span">개인정보 약관동의</span>
                            </div>
                        </div>
                        <div className="validationErr-"
                         style={{
                            display :comCheckboxStyle
                        }}>약관에 동의하여야 합니다.</div>
                        <button className="insert-c-form-loginBtn" name="comCheckbox"  onClick={this.comInsertCheck.bind(this)}>가입하기</button>
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

export default Insert_company;