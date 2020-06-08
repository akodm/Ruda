import React, { Component } from 'react';
// import axios from 'axios';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

class UserInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg : null,
            name : "",
            phone1 : "",
            phone2 : "",
            phone3 : "",
            intro : "",
            address1 : "",
            address2 : "",

            collage : "",
            subject : "",
            attending1 : "",
            attending2 : "",
            attendTag : "",
            menupopupControl : false,

            tags : [],
            keywords : [],
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
        const { profileImg,name,phone1,phone2,phone3,collage,subject,intro,address1,address2,attending1,attending2,attendTag,tags,keywords,menupopupControl } = this.state;
        return (
            <div className="userInfo-user">
                {/* 프로필 사진, 이름, 번호, 주소 등의 개인정보 */}
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 개인정보</span>
                </div>
                <div className="userInfo-box">
                    <div className="userInfo-margin">
                        <div className="userInfo-imgDiv">
                            <img src={profileImg ? profileImg : "/Images/new_icon.png"} className="userInfo-img" alt="profileIMG"></img>
                            <div className="userInfo-fileDiv">
                                <label htmlFor="avatafile">사진 업로드</label>
                                <input accept="image/*" name="profileImg" value={profileImg ? profileImg : ""} onChange={this.onChangeImageValue.bind(this)} type="file" id="avatafile"></input>
                            </div>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">이름</div>
                            <input value={name} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="name" placeholder="이름을 입력하세요." type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">전화번호</div>
                            <input value={phone1} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone1" placeholder="010" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone2} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone2" placeholder="0000" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone3} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone3" placeholder="0000" type="text" className="userInfo-inputNum"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">주소</div>
                            <input value={address1} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="address1" placeholder="거주지를 입력하세요." type="text" className="userInfo-input"></input>-
                            <input value={address2} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="address2" placeholder="상세주소" type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">자기소개</div>
                            <input value={intro} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="intro" maxLength={30} placeholder="간단한 자기 소개를 30자 내로 해주세요." type="text" className="userInfo-inputIntro"></input>
                        </div>
                    </div>
                </div>
                {/* 대학, 전공 등의 학력정보 */}
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 학력</span>
                </div>
                <div className="userInfo-box">
                    <div className="userInfo-margin">
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-spanCollage1">대학교</div>
                            <input value={collage} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="collage" placeholder="대학교를 입력하세요." type="text" className="userInfo-input"></input>
                            <div className="userInfo-spanCollage2">전공</div>
                            <input value={subject} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="subject" placeholder="전공을 선택하세요." type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">재학기간</div>
                            <input value={attending1} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="attending1" placeholder="입학년도" type="text" className="userInfo-inputDate"></input>
                            ~<input value={attending2} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="attending2" placeholder="졸업년도" type="text" className="userInfo-inputDate"></input>
                            <div className="userInfo-selectDiv">
                                <div className="userInfo-select" style={{display : menupopupControl && "none"}} onClick={() => { this.setState({ menupopupControl : true }) }}>{ !menupopupControl && attendTag ? attendTag : "구분"}</div>
                                { menupopupControl && <div className="select-menu">
                                    <div className="select-item" onClick={() => this.setState({ attendTag : "재학", menupopupControl : false })}>재학</div>
                                    <div className="select-item" onClick={() => this.setState({ attendTag : "졸업", menupopupControl : false })}>졸업</div>
                                    <div className="select-item" onClick={() => this.setState({ attendTag : "휴학", menupopupControl : false })}>휴학</div>
                                    <div className="select-item" onClick={() => this.setState({ attendTag : "중퇴", menupopupControl : false })}>중퇴</div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 부가정보</span>
                </div>
                {/* 태그, 키워드 등의 부가정보 */}
                <div className="userInfo-box">
                    <div className="userInfo-margin">
                        <div className="userInfo-comentDiv">
                            <span className="userInfo-coment">태그 검색</span>
                        </div>
                        <div className="userInfo-tagInput">
                            
                        </div>
                        <div className="userInfo-comentDiv">
                            <span className="userInfo-coment">나의 태그</span>
                        </div>
                        <div className="userInfo-tagBox"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoBox;