import React, { Component } from 'react';
import axios from 'axios';
import Chip from './TagChip';
import TagChip from './TagChip';

class UserInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg : null,
            priviewURL:"",
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

            tag : "",
            tags : [],
            keywords : [],
            
            
        }
    }

    // 이미지 업로드 할 시
    onChangeImageValue = (event)=> {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
       
        reader.onloadend = () => {
            this.setState({
                file : file,
                previewURL : reader.result,    
            })
        }
        reader.readAsDataURL(file);
    }

    // 시작하기 버튼 누를 시
    async saveUserInfoBtn() {
        const user = this.props.user;
        const { profileImg,name,
            phone1,phone2,phone3,
            intro,address1,address2,
            collage,subject,attendTag,attending1,attending2,
            tags,keywords} = this.state;
        try {
            // 구직자 시
            let userCateUpdat = axios.put("http://localhost:5000/users/updatecate", {
                userCate : "user",
                id : user.id
            })
            let phone = phone1+"-"+phone2+"-"+phone3;
            let address = address1+"-"+address2;
            let result = axios.post("http://localhost:5000/userInfos/create", {
                userId : user.id,
                userName: name,
                userPhone: phone,
                userAdd: address,
                userImage : profileImg,
                userTraning: "",
                userUnvcity: collage,
                userSubject : subject,
                userIntro : intro,
                userTags : tags,
                userSpecialty :"", 
                userWorkDate : "",
                userKeyword : "",
            })

            await Promise.all([userCateUpdat,result]).then(data => {
                userCateUpdat = data[0];
                result = data[1];
            })
            console.log(profileImg);
            console.log(userCateUpdat.data, result.data);
            if(result.data){
                alert("기본입력이 완료되었습니다.");
                window.location.href = "/";
            } else {
                alert("다시 시도해주세요.")
            }
        } catch(err) {
            console.log("user info save err : " + err);
        }
    }

    // 스태이트 변경하게 하는 함수
    onChangeValue(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // 번호의 경우 숫자 외 입력 시 초기화
    onChangeValuePhone(e) {
        if(/\D+/g.test(e.target.value)) {
            this.setState({ [e.target.name] : "" })
            return;
        }
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // 칩 추가를 위해 엔터 클릭 시
    onEnterTags(e) {
        if(e.key === "Enter") {
            if(this.state.tags.length > 9) {
                alert("태크는 최대 10개 까지만 가능합니다.");
                return;
            }
            const { tag } = this.state;
            this.setState({ tags : this.state.tags.concat(tag), tag : "" })
        }
    }

    // 칩 삭제 할 시
    onTagsDelete(e) {
        this.setState({ tags : this.state.tags.filter(data => { return e != data}) })
    }

    render() {
        const { profileImg,name,phone1,phone2,phone3,collage,subject,intro,address1,address2,attending1,attending2,attendTag,tags,keywords,menupopupControl,tag } = this.state;
        let profile_preview = <img src ='/Image/insert_rookie.png'className="userInfo-img" alt="profileIMG"/>
        if(this.state.profileImg !== ''){
          profile_preview = <img src={this.state.previewURL} className="userInfo-img" alt="profileIMG"></img>
        } 
        console.log(profileImg);
        return (
            <div className="userInfo-user">
                {/* 프로필 사진, 이름, 번호, 주소 등의 개인정보 */}
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 개인정보</span>
                </div>
                <div className="userInfo-box">
                    <div className="userInfo-margin">
                        <div className="userInfo-imgDiv">
                            {profile_preview}
                            
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
                            <input value={phone1} onChange={this.onChangeValuePhone.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone1" placeholder="010" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone2} onChange={this.onChangeValuePhone.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone2" placeholder="0000" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone3} onChange={this.onChangeValuePhone.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone3" placeholder="0000" type="text" className="userInfo-inputNum"></input>
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
                        <input type="text" value={tag} name="tag" onKeyPress={this.onEnterTags.bind(this)} onChange={this.onChangeValue.bind(this)} className="userInfo-tagInput"></input>
                        <div className="userInfo-comentDiv">
                            <span className="userInfo-coment">나의 태그</span>
                        </div>
                        <div className="userInfo-tagBox">
                            <div className="userInfo-tagMargin">
                                { tags && tags.map((data,i) => {
                                    return <TagChip key={i} name={data} func={this.onTagsDelete.bind(this)} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="userInfo-saveBtn" onClick={this.saveUserInfoBtn.bind(this)}>저장하기</button>
            </div>
        );
    }
}

export default UserInfoBox;