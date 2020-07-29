import React, { Component } from 'react';
import axios from 'axios';

import config from '../../../client-configs';  // 컨피그 파일
import '../../css/searchuser.css';

import InputTag from '../../component/InputTag';
import PassPopup from './PassPopup';

class Searchuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
           email:"",
           name:"",
           name2:"",
           phone:"",
           phone2:"",

           emailValid : { state : true, result : false },
           nameValid:{ state : true, result : false },
           phoneValid:{ state : true, result : false },
           nameValid2:{ state : true, result : false },
           phoneValid2:{ state : true, result : false },

           data : [],
           open : false,
        }
    }

    // id찾기 버튼을 누를경우
    async shearchId() {
        const {name,phone}=this.state;
        try{
        let result =await axios.get(`${config.app.s_url}/userinfos/emailfind?userName=${name}&&userPhone=${phone}`);
        if(result.data){
            let email = (result.data).split("@");
            let email_text = email[0];
            let email_domain = email[1];
            let text_len = email_text.length;
            let domain_len = email_domain.length;
            let text_rs = "";
            let domain_rs = "";

            for(let i=0; i<text_len; i++) {
                if(i > 2) text_rs += "*";
                else text_rs += email_text[i];
            }

            for(let i=0; i<domain_len; i++) {
                if(i > 2) domain_rs += "*";
                else domain_rs += email_domain[i];
            }

            alert(text_rs + "@" + domain_rs);
        }else{
           alert("일치하는 정보가 없습니다.") ;
        }
       }catch(err){
           console.log("아이디 찾기 오류 "+err);
       }
    }
    // pw 찾기 버튼을 누를경우
    async shearchPw() {
        const {email,name2,phone2}=this.state;
        try{
            let result = await axios.get(`${config.app.s_url}/userinfos/passwordfind?email=${email}&userName=${name2}&userPhone=${phone2}`);
        if(result.data){
            console.log(result.data);
            await this.setState({ data : result.data.id });
            this.openClose(true);
        }else{
           alert("일치하는 정보가 없습니다.") ;
        }
       }catch(err){
           console.log("비밀번호 찾기 오류 "+err);
       }
    }

    // props로 넘겨줄 함수, 매개변수로 들어오는 값 세 가지를 셋 스태이트 시킴
    // [name]+Valid 스태이트에 해당 불 값들 대입
    validSet(name, boolstate, boolresult) {
        if([name]) this.setState({ [name] : { state : boolstate, result : boolresult } });
    }

    openClose(bool) { this.setState({ open : bool }); }

    render() {
        const { email, name, phone,name2,phone2} = this.state; // 인풋에 들어갈 스태이트
        const { emailValid, nameValid ,phoneValid,nameValid2,phoneValid2,open,data } = this.state; // 인풋값의 정규식 및 값을 체크할 스태이트
        return (
            <div className="shearchuser-main">

                {/* 비밀번호 변경하는 팝업 창 */}
                { open &&  <PassPopup id={data} openClose={this.openClose.bind(this)} /> }

                <div className="shearchuser-row" >
                    <div className="shearchuser-div">
                        <span className="shearchuser-title">아이디 찾기</span>
                        {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                        <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={nameValid} 
                            value={name} 
                            onChange={(e) => this.setState({ name : e.target.value })}  
                            regSpan="이름을 입력해주세요" 
                            name="name" 
                            type="text" 
                            placeholder="이름을 입력해주세요."
                        ></InputTag>
                        {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                        <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={phoneValid} 
                            value={phone} 
                            onChange={(e) => this.setState({ phone : e.target.value })} 
                            regExp={/^[0-9]+$/} 
                            regSpan="숫자만 입력해주세요." 
                            name="phone" 
                            type="text" 
                            placeholder="전화번호를 입력해주세요."
                        ></InputTag>
                        {/*로그인 체크*/}
                        <button className="shearchuser-btn" onClick={this.shearchId.bind(this)}>아이디찾기</button>
                    </div>
                    <div className="shearchuser-div">
                        <span className="shearchuser-title">비밀번호 찾기</span>
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
                       {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                       <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={nameValid2} 
                            value={name2} 
                            onChange={(e) => this.setState({ name2 : e.target.value })}  
                            regSpan="이름을 입력해주세요" 
                            name="name2" 
                            type="text" 
                            placeholder="이름을 입력해주세요."
                        ></InputTag>
                        {/*정규식(regExp) 제외 모두 필수 props 옵션*/}
                        <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={phoneValid2} 
                            value={phone2} 
                            onChange={(e) => this.setState({ phone2 : e.target.value })} 
                            regExp={/^[0-9]+$/} 
                            regSpan="숫자만 입력해주세요." 
                            name="phone2" 
                            type="text" 
                            placeholder="전화번호를 입력해주세요."
                        ></InputTag>
                        {/*로그인 체크*/}
                        <button className="shearchuser-btn" onClick={this.shearchPw.bind(this)}>비밀번호찾기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Searchuser;