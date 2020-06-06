import React, { Component } from 'react';
import InputBox from './UserInfoInput';

class UserInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg : null,
            name : "",
            phone1 : "",
            phone2 : "",
            phone3 : "",
            collage : "",
            subject : "",
            intro : "",
            address1 : "",
            address2 : "",
        }
    }
    // 이미지 업로드 할 시
    onChangeImageValue() {

    }
    // 시작하기 버튼 누를 시
    startBtnClick() {

    }
    // 스태이트 변경하게 하는 함수
    onChangeValue(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const { profileImg,name,phone1,phone2,phone3,collage,subject,intro,address1,address2 } = this.state;
        return (
            <div className="userInfo-box">
                <div className="userInfo-margin">
                    <div className="userInfo-imgDiv">
                        <img src={profileImg ? profileImg : "/Images/new_icon.png"} className="userInfo-img" alt="profileIMG"></img>
                        <div className="userInfo-fileDiv">
                            <label htmlFor="avatafile">사진 업로드</label>
                            <input accept="image/*" name="profileImg" value={profileImg ? profileImg : ""} onChange={this.onChangeImageValue.bind(this)} type="file" id="avatafile"></input>
                        </div>
                    </div>
                    <div className="userInfo-profileDiv">
                        <div className="userInfo-profileDiv-Div">
                            <div className="userInfo-inputDiv">
                                <div className="userInfo-span">이름</div>
                                <InputBox name="name" placeholder="이름을 입력해주세요." value={name} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-input"></InputBox>
                            </div>
                            <div className="userInfo-inputDiv">
                                <div className="userInfo-span">번호</div>
                                <InputBox name="phone1" placeholder="010" value={phone1} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputNum"></InputBox>
                                -<InputBox name="phone2" placeholder="1234" value={phone2} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputNum"></InputBox>
                                -<InputBox name="phone3" placeholder="1234" value={phone3} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputNum"></InputBox>
                            </div>
                        </div>
                        <div className="userInfo-profileDiv-Div">
                            <div className="userInfo-inputDiv">
                                <div className="userInfo-span">대학교</div>
                                <InputBox name="collage" placeholder="졸업/재학 대학교를 입력해주세요." value={collage} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-input"></InputBox>
                            </div>
                            <div className="userInfo-inputDiv">
                                <div className="userInfo-span">전공</div>
                                <InputBox name="subject" placeholder="대학교 전공을 입력해주세요." value={subject} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-input"></InputBox>
                            </div>
                        </div>
                    </div>
                    <div className="userInfo-inputDivIntro">
                        <div className="userInfo-span">자기소개</div>
                        <InputBox length={30} name="intro" placeholder="간단한 자기소개를 써주세요. 30자 내" value={intro} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputIntro"></InputBox>
                    </div>
                    <div className="userInfo-inputDivIntro">
                        <div className="userInfo-span">주소</div>
                        <InputBox name="address1" placeholder="주소지를 입력해주세요." value={address1} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputIntro"></InputBox>
                        <InputBox name="address2" placeholder="상세주소를 입력해주세요." value={address2} onChange={this.onChangeValue.bind(this)} type="text" className="userInfo-inputIntro"></InputBox>
                    </div>
                    <div className="userInfo-btnDiv">
                        <button className="userInfo-startBtn">하이루키 시작하기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoBox;