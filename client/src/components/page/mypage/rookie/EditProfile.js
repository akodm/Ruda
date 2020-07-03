import React, { Component } from 'react';
import { storage } from "../../../../firebase";
import config from '../../../../client-configs';
import axios from 'axios';

import Load from '../../../component/Load';
import dataList from '../../../../data-list';
import ImageBox from '../../../component/ImageBox';
import PostCode from '../../../component/PostPopup';
import AutoCreateBox from '../../../component/AutoCreatable';
import TagChip from '../../../component/TagChip';
import SelectBox from '../../../component/SelectBox';
import CheckBox from '../../../component/CheckBox';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : null,
            // 개인정보
            imgData : null,
            imgUrl : null,
            imgPreview :this.props.userInfo.userImageUrl,

            name : "",
            phone : "",
            address1 : "",
            address2 : "",
            addressState : false,
            military : "군필",

            // 학력
            univercityCate : "대학", // 고졸인지 대학인지 여부
            univercity  : "",   // 대학 혹은 고등학교 이름
            subject : "",   // 전공 이름 혹은 고등학교 인문 이름
            univercityStart : "",
            startErr : false,
            univercityEnd : "",
            endErr : false,
            univercityState : "재학",   // 대학 상태 여부

            // 어필 항목
            tags : [],  // 태그
            keywords : [],  // 성격 키워드
            specialty : [], // 특기
            specialtyErr : false,
            introduce : "", // 자기 소개 간단
            introduceErr : false,
            privateUrl : "",

            // 구직 관련
            field : "", // 희망 취업 분야
            workDateState : "상시",  // 일할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            workDate : "",  // 일할 수 있는 날짜
            trainingDateState : "실습 강의 시",   // 실습 할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            trainingDate : "",  // 실습 여부 시 실습 가능 날짜
            
            award:"",
            awardDate:"",
            addawd:[],
           
            load : false,
        }
    }

    componentDidMount() { this.setState({ load : true }); }

    // 이미지 업로드 함수 - props
    imgUpload(e) { this.setState({ imgData : e.data, imgPreview : e.pre }) }

    // 기본 스태이트 변경 함수
    onChangeValue(e) {
        if(e.target.name === "phone" || e.target.name === "univercityStart" || e.target.name === "univercityEnd") {
            if(/\D+/g.test(e.target.value)) {
                this.setState({ [e.target.name] : "" })
                return;
            }
        }
        this.setState({ [e.target.name] : e.target.value })
    }

    // 날짜 값 변경 함수
    onChangeValueDate(e) {
        if(/\D+/g.test(e.target.value)) {
            this.setState({ [e.target.name] : "" })
            return;
        }

        let value = e.target.value;
        if(value.length > 4) {
            if(e.target.name === "univercityStart") {
                this.setState({ startErr : true })
            } else {
                this.setState({ endErr : true })
            }
        } else {
            if(e.target.name === "univercityStart") {
                this.setState({ startErr : false })
            } else {
                this.setState({ endErr : false })
            }
        }
        this.setState({ [e.target.name] : e.target.value }) 
    }

    // 제한 있는 문자열 값 변경 함수
    onChangeValueLimit(e) {
        let value = e.target.value;
        if(value.length > 50) {
            this.setState({ introduceErr : true })
        } else {
            this.setState({ introduceErr : false })
        }
        this.setState({ [e.target.name] : e.target.value }) 
    }

    // 태그, 키워드, 취미 및 특기 추가 함수
    addChips(cate, e) {
        switch(cate) {
            case "tag" : 
                if(this.state.tags.length > 5) {
                    alert("태그는 최대 6개까지만 선택가능합니다.");
                    return;
                }
                this.setState({ tags : this.state.tags.concat(e) })
                break;
            case "key" : 
                if(this.state.keywords.length > 2) {
                    alert("키워드는 최대 3개까지만 선택가능합니다.");
                    return;
                }
                this.setState({ keywords : this.state.keywords.concat(e) })
                break;
            case "spc" : 
                if(this.state.specialty.length > 4) {
                    alert("특기,취미는 최대 5개까지만 선택가능합니다.");
                    return;
                }
                this.setState({ specialty : this.state.specialty.concat(e) })
                break;
            default : break;
        }
    }

    // 키워드 삭제 함수
    keyDelete(e) {
        this.setState({ keywords : this.state.keywords.filter(data => { return data !== e })})
    }

    // 태그 삭제 함수
    tagDelete(e) {
        this.setState({ tags : this.state.tags.filter(data => { return data !== e })})
    }

     // 취미 특기 삭제 함수
    specialtyDelete(e) {
        this.setState({ specialty : this.state.specialty.filter(data => { return data !== e })})
    }

    // 저장 함수 -> 데이터베이스에 유저 인포 디비 저장
    async saveStartBtn() {
        const { user } = this.props;
        const { imgUrl,
            name,phone,address1,address2,military,
            univercityCate,univercity,subject,univercityState,univercityStart,univercityEnd,
            tags,keywords,specialty,introduce,privateUrl,
            field,workDateState,trainingDateState,workDate,trainingDate,award,awardDate
        } = this.state;

        try {
            let userCateUpdat = axios.put(`${config.app.s_url}/users/updatecate`, {
                userCate : "user",
                id : user.id
            })

            let address = address1 + "-" + address2;
            let result = axios.post(`${config.app.s_url}/userInfos/create`, {
                userId : user.id,
                userImageUrl : imgUrl, 

                userName : name, userPhone : phone, userAdd : address, userMilitary : military,
                userUnivercityCate : univercityCate,
                userUnvcity : univercity, userSubject : subject,
                userAttendStartDate : univercityStart,
                userAttendEndDate : univercityEnd,
                userAttend : univercityState,

                userTags : tags,
                userKeyword : keywords,
                userSpecialty : specialty,
                userIntro : introduce,
                userUrl : privateUrl,

                userField : field,
                userTraningDateState : trainingDateState,
                userWorkDateState : workDateState,
                userWorkDate : workDate,
                userTraningDate : trainingDate,
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
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("user info save err : " + err);
        }
        this.setState({ load : true });
    }

    // firebase에 이미지 업로드 및 저장 함수 실행
    addFile() {
        const { imgData,
            name,phone,address1,univercity,subject,
            startErr,endErr,specialtyErr,introduceErr,
            agreeCheck } = this.state;
        if(!agreeCheck) {
            alert("이용수칙에 동의해주세요.");
            return;
        }
        if(startErr || endErr || specialtyErr || introduceErr) {
            alert("잘못된 값이 있습니다. 다시 확인해주세요.");
            return;
        }
        if(!name || !phone || !address1 || !univercity || !subject) {
            alert("필수 입력 사항을 입력해주세요.");
            return;
        }
        this.setState({ load : false });

        if(imgData) {
            const uploadTask = storage.ref(`/images/${imgData.name}`).put(imgData);
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
                    .child(imgData.name)
                    .getDownloadURL()
                    .then(async url => {
                        await this.setState({ imgUrl : url });
                        this.saveStartBtn();
                    });
                }
            );
        } else {
            this.saveStartBtn();
        }
    }
    addAward(){
        const awd= this.awdForm();
        this.setState({
            Addawd : this.state.Addawd.concat(awd)},
        )
    }
    awdForm(){
        const {userInfo}=this.props;
        const {award ,awardDate}=this.state;
        return <div className="Info-rookie-dateLayout">
        <SelectBox 
            value={award} 
            label={"수여"} option={["교내","교외"]} text={"수여"} style={{marginRight:"20px"}}
        />
        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="privateUrl" value={award} label="수상명 " />
        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="trainingDate" value={awardDate} label="수상 날짜" />
        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addAward.bind(this)}>+</span>
    </div>
    }
    render() {
        const { imgPreview,
            name,phone,address1,address2,addressState,military,
            univercityCate,univercityState,univercityStart,univercityEnd,startErr,endErr,
            tags,keywords,specialty,introduce,introduceErr,privateUrl,
            workDateState,trainingDateState,workDate,trainingDate,
            agreeCheck,load,award,awardDate,
            Addawd,} = this.state;
  
        const {userInfo}=this.props;
        const Usertags = userInfo.userTags;
        const userkeyword =  userInfo.userKeyword;
        const userspecialty = userInfo.userSpecialty;
        return (
            <div className="Info-rookie-main">
                { !load &&  <Load /> }

                {/* 개인정보 박스 */}
                <div className="Info-rookie-title">*개인정보</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-imgLayout">
                        {/* 이미지 박스 */}
                        <ImageBox
                            text="업로드"
                            preview={imgPreview}
                            func={this.imgUpload.bind(this)}
                        />
                        {/* 신상 정보 */}
                        <div className="Info-rookie-inputLayoutDiv">
                            <TextField helperText="성 이름" required label="이름" variant="outlined" value={userInfo.userName} name="name" onChange={this.onChangeValue.bind(this)} />
                            <div className="Info-company-Layout">
                                <TextField helperText="-빼고 입력해주세요" required label="전화번호" variant="outlined" value={userInfo.userPhone} name="phone" onChange={this.onChangeValue.bind(this)} />
                                <SelectBox 
                                    value={userInfo.userMilitary} func={(e) => this.setState({ military : e })}
                                    label={"병역여부"} option={["군필","미필","면제","해당없음"]} text={"병역여부"} style={{marginLeft:"15px"}}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 클릭시 주소지 검색 창 열기 */}
                    <div className="Info-rookie-imgLayout">
                        <TextField
                            id="outlined-read-only-input" label="주소를 검색하여 주세요. 시/도/구"
                            value={userInfo.userAdd} required
                            onClick={() => this.setState({ addressState : true })}
                            style={{width:"450px",marginRight:"25px"}}
                            InputProps={{ readOnly: true }} variant="outlined"
                        />
                        <TextField helperText="상세주소를 입력해주세요" style={{width:"200px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="address2" value={userInfo.userAdd} id="outlined-required" label="나머지 주소" />
                    </div>
                    {/* 주소지 검색 API */}
                    <PostCode open={addressState} close={() => this.setState({ addressState : false })} func={(data) => this.setState({ address1 : data })} />
                </div>

                {/* 학력 박스 */}
                <div className="Info-rookie-title">*최근학력</div>
                <div className="Info-rookie-body">
                    {/* 첫번째 라인 */}
                    <div className="Info-rookie-imgLayout">
                        <SelectBox 
                            value={userInfo.userUnivercityCate} func={(e) => this.setState({ univercityCate : e })}
                            label={"학력"} option={["대학","고졸"]} text={"학력"} style={{marginRight:"20px"}}
                        />
                        <AutoCreateBox blur={true} width={200} text={univercityCate === "대학" ? "대학교 이름 *" : "고등학교 이름 *"} list={univercityCate === "대학" ? dataList.app.univercityList : dataList.app.highschoolList} clear={false} onChange={(e) => this.setState({ univercity : e })} />
                        <div style={{marginLeft:"25px"}}>
                            <AutoCreateBox blur={true} width={200} text="전공 *" list={univercityCate === "대학" ? dataList.app.subjectList : []} clear={false} onChange={(e) => this.setState({ subject : e })} />
                        </div>
                    </div>
                    <div className="Info-rookie-dateLayout">
                        <TextField error={startErr} helperText={"2014"} style={{width:"150px", marginRight:"25px",marginLeft:"18px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityStart" value={userInfo.userAttendStartDate} label="입학년도" />
                        <TextField error={endErr} helperText={moment(new Date()).format("YYYY")} style={{width:"150px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityEnd" value={userInfo.userAttendEndDate} label="졸업년도" />
                        <SelectBox 
                            value={userInfo.userAttend} func={(e) => this.setState({ univercityState : e })}
                            label={"재학구분"} option={["재학","졸업","휴학","중퇴"]} text={"재학구분"} style={{marginRight:"20px",marginLeft:"15px"}}
                        />
                    </div>
                </div>

                {/* 본인 어필 박스 */}
                <div className="Info-rookie-title">자기소개</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={false} width={700} text={"자신있는 기술에 대한 태그를 검색하여 최대한 골고루, 최대 6개까지 추가하세요!"} list={dataList.app.tagList} clear={true} onChange={this.addChips.bind(this,"tag")} />
                    <div className="Info-tag-box">
                        {
                            Usertags.map((data,i) => {
                                return <div className="chip-margin" key={i}>
                                <TagChip name={data} size="small" color="primary" variant="outlined" func={this.keyDelete.bind(this)}/>
                            </div>;
                            })
                        }
                        {
                            tags.map((data,i) => {
                                return <TagChip func={this.keyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"자신의 성격에 대한 주관적인 키워드를 최대 3개까지 등록하세요!"} list={dataList.app.keywordList} clear={true} onChange={this.addChips.bind(this,"key")} />
                    <div className="Info-tag-box">
                        {
                            userkeyword.map((data,i) => {
                                return <div className="chip-margin" key={i}>
                                <TagChip name={data} size="small" color="primary" variant="outlined" func={this.keyDelete.bind(this)}/>
                            </div>;
                            })
                        }
                        
                        {
                            keywords.map((data,i) => {
                                return <TagChip func={this.keyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"자신의 특기 또는 취미 키워드를 최대 5개까지 등록하세요!"} list={dataList.app.specialtyList} clear={true} onChange={this.addChips.bind(this,"spc")} />
                    <div className="Info-tag-box">
                        {
                            userspecialty.map((data,i) => {
                                return <TagChip func={this.specialtyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                        {
                            specialty.map((data,i) => {
                                return <TagChip func={this.specialtyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <TextField error={introduceErr} helperText="간단한 자기 소개 50자 내외" style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValueLimit.bind(this)} name="introduce" value={userInfo.userUnivercityCate} label="자기 소개" />
                    <TextField helperText="개인 블로그나 웹 사이트 등 주소를 입력해주세요." style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="privateUrl" value={userInfo.userUrl} label="개인 사이트 URL " />
                </div>

                {/* 구직정보 박스 */}
                <div className="Info-rookie-title">구직정보</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={true} width={400} text={"희망하는 분야를 입력하세요."} list={dataList.app.fieldList} clear={false} onChange={(e) => this.setState({ field : e })} />
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={userInfo.userWorkDateState} func={(e) => this.setState({ workDateState : e })}
                            label={"근무가능 날짜"} option={["상시","졸업 후","직접입력","미정"]} text={"근무가능 날짜"} style={{marginRight:"20px"}}
                        />
                        {
                            workDateState === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="workDate" value={userInfo.userWorkDate} label="근무가능 날짜" />
                        }
                        <SelectBox 
                            value={userInfo.userTraningDateState} func={(e) => this.setState({ trainingDateState : e })}
                            label={"실습가능 날짜"} option={["상시","졸업 후","실습 강의 시","직접입력","미정"]} text={"실습가능 날짜"} style={{marginRight:"20px"}}
                        />
                        {
                            trainingDateState === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="trainingDate" value={userInfo.userTraningDate} label="실습가능 날짜" />
                        }
                    </div>
                </div>
                {/*수상경력 박스*/}
                <div className="Info-rookie-title">수상이력</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={userInfo.userWorkDateState} func={(e) => this.setState({ workDateState : e })}
                            label={"수여"} option={["교내","교외"]} text={"수여"} style={{marginRight:"20px"}}
                        />
                        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="privateUrl" value={award} label="수상명 " />
                        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="trainingDate" value={awardDate} label="수상 날짜" />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addAward.bind(this)}>+</span>
                    </div>
                    {Addawd}
                </div>
                {/*저장버튼*/}
                <div style={{margin:"50px"}}>
                    <button className="profile-edit"><SaveIcon style={{fontSize:"large",margin:"5px"}}/>프로필수정</button>
                </div>
            </div>
        );
    }
}

export default EditProfile;