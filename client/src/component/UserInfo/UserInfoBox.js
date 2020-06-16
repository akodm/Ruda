import React, { Component } from 'react';
import axios from 'axios';
import TagChip from './TagChip';
import configs from '../../client-configs';
import { storage } from "../../firebase";

import moment from 'moment';

class UserInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl : null,
            progress : null,
            profileImg : null,
            imagePreview : null,
            
            name : "",
            phone1 : "",
            phone2 : "",
            phone3 : "",
            intro : "",
            address1 : "",
            address2 : "",

            field : "",
            workdate : "",

            collage : "",
            subject : "",
            attending1 : "",
            attending2 : "",
            attendTag : "",
            traning : "",

            // 태그 기능을 위한 스태이트--//
            tag : "",
            tags : [],
            tagListState : false,
            tagList : [],
            // ---------------------------//

            keywords : [],
        }
    }

    // 이미지 업로드 할 시
    onChangeImageValue = async(event)=> {
        if(event.target.files[0]) {
            await this.setState({
                profileImg : event.target.files[0],
                imagePreview : URL.createObjectURL(event.target.files[0]),
            });
        }
    }
    
    // firebase에 이미지 업로드
    addFile() {
        const { profileImg } = this.state;
        const uploadTask = storage.ref(`/images/${profileImg.name}`).put(profileImg);
        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
              this.setState({ progress });
            },
            error => {
              console.log(error);
            }, () => {
              storage
                .ref("images")
                .child(profileImg.name)
                .getDownloadURL()
                .then(url => {
                  this.setState({ imageUrl : url });
                });
            }
        );
    }

    // 시작하기 버튼 누를 시
    async saveUserInfoBtn() {
        await this.addFile();
    }

    async shouldComponentUpdate(nextProps, nextState) {
        if(nextState.progress >= 100 && nextState.imageUrl) {
            await this.setState({ progress : 0 })
            const { user } = nextProps;
            const { name,imageUrl,phone1,phone2,phone3,
                intro,address1,address2,field,workdate,
                collage,subject,attendTag,attending1,attending2,
                tags,keywords,traning } = nextState;
            try {
                // 구직자 시
                let userCateUpdat = axios.put("http://localhost:5000/users/updatecate", {
                    userCate : "user",
                    id : user.id
                })

                let phone = phone1+"-"+phone2+"-"+phone3;
                let address = address1+"-"+address2;
                let attendings = attending1+"-"+ attending2;

                let result = axios.post("http://localhost:5000/userInfos/create", {
                    userId : user.id,
                    userName : name,
                    userPhone : phone , 
                    userAdd : address , 
                    userTraning : traning , 
                    userUnvcity : collage , 
                    userSubject : subject , 
                    userAttendDate : attendings,
                    userAttend : attendTag,
                    userIntro : intro , 
                    userTags : tags , 
                    userSpecialty : "" , 
                    userWorkDate : workdate , 
                    userKeyword : "" , 
                    userField : field , 
                    userImageUrl : imageUrl,
                })

                await Promise.all([userCateUpdat,result]).then(data => {
                    userCateUpdat = data[0];
                    result = data[1];
                })
                console.log(userCateUpdat.data, result.data);
                if(result.data){
                    alert("기본입력이 완료되었습니다.");
                    window.location.href = "/";
                } else {
                    alert("잘못된 값이 있습니다. 다시 시도해주세요.")
                    return true;
                }
            } catch(err) {
                console.log("user info save err : " + err);
            }
        } else {
            return true;
        }
    }

    // 스태이트 변경하게 하는 함수
    onChangeValue(e) { this.setState({ [e.target.name] : e.target.value }) }

    // 번호의 경우 숫자 외 입력 시 초기화
    onChangeValuePhone(e) {
        if(/\D+/g.test(e.target.value)) {
            this.setState({ [e.target.name] : "" })
            return;
        }
        this.setState({ [e.target.name] : e.target.value })
    }
    // -----------------------------태그 기능을 위한 함수 영역-------------------------- //
    // -------------------------------------------------------------------------------- //
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
    //  태그 인풋 스태이트 변경하게 하는 함수
    async onChangeValueTag(e) {
        await this.setState({
            [e.target.name] : e.target.value
        });
        let searchResult = configs.app.tagList.filter(data => {
            return data.toLowerCase().match(this.state.tag.toLowerCase()) && this.state.tag && data;
        })
        // 값이 하나라도 있다면
        if(searchResult[0]) {
            this.handleClick();
            this.setState({ tagList : searchResult, tagListState : true });
        } else {
            this.setState({ tagListState : false });
        }
    }
    // 함수 호출 시 현재 팝업 상태 확인 후 띄워져 있다면, 이벤트 리스너를 지우고 팝업 내리기.
    handleClick = () => {
        if (!this.state.tagListState) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
            this.setState({ tagListState : false });
        }
    }
    // ref 확인 후 클릭 한 곳이 ref 를 포함한 엘리먼트인 경우 리턴, 아닌 경우 함수 호출
    handleOutsideClick = (e) => {
        if (this.tagNode && this.tagNode.contains(e.target)) {
            return;
        }
        this.handleClick();
    }
    // 칩 삭제 할 시
    onTagsDelete(e) {
        this.setState({ tags : this.state.tags.filter(data => { return e !== data}) })
    }
    // -------------------------------------------------------------------------------- //
    // -------------------------------------------------------------------------------- //

    render() {
        const { imagePreview,name,phone1,phone2,phone3,collage,subject,intro,address1,address2,field,workdate,attending1,attending2,attendTag,tags,keywords,tag,traning,tagList,tagListState } = this.state;
        return (
            <div className="userInfo-user">
                {/* 프로필 사진, 이름, 번호, 주소 등의 개인정보 */}
                <div className="userInfo-comentDiv">
                    <span className="userInfo-coment">* 개인정보</span>
                </div>
                <div className="userInfo-box">
                    <div className="userInfo-margin">
                        <div className="userInfo-imgDiv">
                            <div className="userInfo-imgSizeDiv">
                                <img width="100" src={imagePreview || "/Images/footer_logo.png"} className="userInfo-img" alt="profileIMG"/>
                            </div>
                            <div className="userInfo-fileDiv">
                                <label htmlFor="avatafile">사진 업로드</label>
                                <input accept="image/*" name="profileImg" onChange={this.onChangeImageValue.bind(this)} type="file" id="avatafile"></input>
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
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-span">희망 분야</div>
                            <input value={field} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="field" placeholder="희망 분야를 입력하세요." type="text" className="userInfo-input"></input>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-spanDate">근무 가능 날짜</div>
                            <input maxLength={10} value={workdate} onChange={this.onChangeValue.bind(this)} onPaste={this.onChangeValue.bind(this)} name="workdate" placeholder={moment().format("YYYY/MM/DD")} type="text" className="userInfo-inputDate"></input>
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
                            <select className="userinfo-selectTraning" value={attendTag} onChange={(e) => this.setState({ attendTag : e.target.value})}>
                                <option value={"재학"}>재학</option>
                                <option value={"졸업"}>졸업</option>
                                <option value={"휴학"}>휴학</option>
                                <option value={"중퇴"}>중퇴</option>
                            </select>
                        </div>
                        <div className="userInfo-inputDiv">
                            <div className="userInfo-spanCollage1">실습 여부</div>
                            <select className="userinfo-selectTraning" value={traning} onChange={(e) => this.setState({ traning : e.target.value})}>
                                <option value={0}>아니요</option>
                                <option value={1}>예</option>
                            </select>
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
                        <input placeholder="검색 또는 리스트에서 선택하여 주세요. 최대 10개까지 가능합니다." type="text" value={tag} name="tag" onKeyPress={this.onEnterTags.bind(this)} onChange={this.onChangeValueTag.bind(this)} className="userInfo-tagInput"></input>
                        { tagListState && <div className="userInfo-tagList" ref={tagNode => { this.tagNode = tagNode }}>
                            {
                                tagList && tagList.map((data,i) => {
                                    return <div key={i} className="tag-list-div" onClick={() => this.setState({ tags : this.state.tags.concat(data), tagListState : false, tag : "" })}>
                                        {data}
                                    </div>
                                })
                            }
                        </div>}
                        <div className="userInfo-comentDiv">
                            <span className="userInfo-coment">선택한 태그</span>
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