import React, { Component } from 'react';
import axios from 'axios';

class CompanyInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg : null,
            companyname : "",
            ceo:"",
            phone1 : "",
            phone2 : "",
            phone3 : "",
            intro : "",
            address1 : "",
            address2 : "",

            since:"",
            field:"",
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
    async saveUserInfoBtn() {
        const { user } = this.props;
        console.log(user);
        const { profileImg,companyname,ceo,phone1,phone2,phone3,intro,address1,address2,field,since} = this.state;
        try {
            // 기업 시
            let userCateUpdat = axios.put("http://localhost:5000/users/updatecate", {
                    userCate : "company",
                    id : user.id
                })

            let phone = phone1+phone2+phone3;
            let address = address1 + address2;
            let result = axios.post("http://localhost:5000/companyInfos/create", {
                userId : user.id,
                companyName: companyname,
                comPhone: phone,
                companyAdd: address,
                companyImage : "",
                companyCEO: ceo,
                companyField: field,
                companySince : since,
                companyIntro : intro,
                companyTags : "",
                companySpecialty :"", 
                companyWorkDate : "",
                companyKeyword : "",
            })

            await Promise.all([userCateUpdat,result]).then(data => {
                userCateUpdat = data[0];
                result = data[1];
            })

            console.log(userCateUpdat.data, result.data);
            if(result.data){
                alert("기본입력이 완료되었습니다.");
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

    render() {
        const { profileImg,ceo,companyname,phone1,phone2,phone3,address1,address2,intro,field,since,attendTag,tags,keywords,menupopupControl } = this.state;
        return (
            <div className="userInfo-user">
                {/* 프로필 사진, 이름, 번호, 주소 등의 기업정보 */}
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 기업정보</span>
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
                            <div className="userInfo-spanCollage1">기업명</div>
                            <input value={companyname} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="companyname" placeholder="기업명을 입력하세요." type="text" className="userInfo-input"></input>
                            <div className="userInfo-spanCollage2">기업대표</div>
                            <input value={ceo} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="ceo" placeholder="전공을 선택하세요." type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">전화번호</div>
                            <input value={phone1} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone1" placeholder="02" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone2} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone2" placeholder="000" type="text" className="userInfo-inputNum"></input>-
                            <input value={phone3} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="phone3" placeholder="0000" type="text" className="userInfo-inputNum"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">주소</div>
                            <input value={address1} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="address1" placeholder="거주지를 입력하세요." type="text" className="userInfo-input"></input>-
                            <input value={address2} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="address2" placeholder="상세주소" type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">기업소개</div>
                            <input value={intro} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="intro" maxLength={30} placeholder="간단한 자기 소개를 30자 내로 해주세요." type="text" className="userInfo-inputIntro"></input>
                        </div>

                        <div className="userInfo-inputDiv">
                            <div className="userInfo-spanCollage1">사업분야</div>
                            <input value={field} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="field" placeholder="사업분야를 입력하세요." type="text" className="userInfo-input"></input>
                            <div className="userInfo-spanCollage2">설립일</div>
                            <input value={since} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="since" placeholder="설립일을 입력하세요" type="text" className="userInfo-input"></input>
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
                <button className="userInfo-saveBtn" onClick={this.saveUserInfoBtn.bind(this)}>저장하기</button>
            </div>
            
        );
    }
}
export default CompanyInfoBox;