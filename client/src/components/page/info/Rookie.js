import React, { Component } from 'react';
import { storage } from "../../../firebase";
import config from '../../../client-configs';
import axios from 'axios';

import Load from '../../component/Load';
import dataList from '../../../data-list';
import ImageBox from '../../component/ImageBox';
import PostCode from '../../component/PostPopup';
import AutoCreateBox from '../../component/AutoCreatable';
import TagChip from '../../component/TagChip';
import SelectBox from '../../component/SelectBox';
import CheckBox from '../../component/CheckBox';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

class Rookie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : null,
            // 개인정보
            imgData : null,
            imgUrl : null,
            imgPreview : null,

            name : "",
            phone : "",
            address1 : "",
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
            workDateState : "취업희망",  // 일할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            workDate : "상시",  // 일할 수 있는 날짜
            trainingDate : moment(new Date()).format("YYYY/MM/DD"),  // 실습 여부 시 실습 가능 날짜

            agreeCheck : false,
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
        const { tags, keywords, specialty } = this.state;
        let dup = false;
        switch(cate) {
            case "tag" :
                if(tags.length > 5) { alert("태그는 최대 6개까지만 선택가능합니다."); return; }

                for(let value of tags) { if(e === value) { alert("이미 추가되어있습니다."); dup = true; break; } }

                if(!dup) this.setState({ tags : tags.concat(e) });
                break;
            case "key" : 
                if(keywords.length > 2) { alert("키워드는 최대 3개까지만 선택가능합니다."); return; }
                
                for(let value of keywords) { if(e === value) { alert("이미 추가되어있습니다."); dup = true; break; } }
               
                if(!dup) this.setState({ keywords : keywords.concat(e) });
                break;
            case "spc" : 
                if(specialty.length > 2) { alert("취미는 최대 3개까지만 선택가능합니다."); return; }
                
                for(let value of specialty) { if(e === value) { alert("이미 추가되어있습니다."); dup = true; break; } }
               
                if(!dup) this.setState({ specialty : specialty.concat(e) });
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
            name,phone,address1,military,
            univercityCate,univercity,subject,univercityState,univercityStart,univercityEnd,
            tags,keywords,specialty,introduce,privateUrl,
            field,workDateState,workDate,trainingDate
        } = this.state;

        try {
            let userCateUpdat = axios.put(`${config.app.s_url}/users/updatecate`, {
                userCate : "user",
                id : user.id
            });

            let result = axios.post(`${config.app.s_url}/userInfos/create`, {
                userId : user.id,
                userImageUrl : imgUrl, 

                userName : name, userPhone : phone, userAdd : address1, userMilitary : military,
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
                userWorkDateState : workDateState,
                userWorkDate : workDate,
                userTraningDate : trainingDate,
            })

            await Promise.all([userCateUpdat,result]).then(data => {
                userCateUpdat = data[0];
                result = data[1];
            })
            if(result.data){
                alert("기본입력이 완료되었습니다.");
                window.location.href = "/";
            } else {
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("user info save err : " );
        }
        this.setState({ load : true });
    }

    // firebase에 이미지 업로드 및 저장 함수 실행
    addFile() {
        const { imgData,
            name,phone,address1,univercity,subject,field,workDateState,introduce,
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
        if(!name || !phone || !address1 || !univercity || !subject || !field || !workDateState || !introduce) {
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

    render() {
        const { imgPreview,
            name,phone,address1,addressState,military,
            univercityCate,univercityState,univercityStart,univercityEnd,startErr,endErr,
            tags,keywords,specialty,introduce,introduceErr,privateUrl,
            workDateState,workDate,trainingDate,
            agreeCheck,load
        } = this.state;
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
                            <TextField helperText="성 이름" required label="이름" variant="outlined" value={name} name="name" onChange={this.onChangeValue.bind(this)} />
                            <div className="Info-company-Layout">
                                <TextField helperText="-빼고 입력해주세요" required label="전화번호" variant="outlined" value={phone} name="phone" onChange={this.onChangeValue.bind(this)} />
                                <SelectBox 
                                    value={military} func={(e) => this.setState({ military : e })}
                                    label={"병역여부"} option={["군필","미필","면제","해당없음"]} text={"병역여부"} style={{marginLeft:"15px"}}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 클릭시 주소지 검색 창 열기 */}
                    <div className="Info-rookie-imgLayout">
                        <TextField
                            id="outlined-read-only-input" label="주소를 검색하여 주세요. 시/도/구"
                            value={address1} required
                            onClick={() => this.setState({ addressState : true })}
                            style={{width:"100%",marginRight:"25px"}}
                            InputProps={{ readOnly: true }} variant="outlined"
                        />
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
                            style2={{width:"200px", marginBottom:"10px"}} value={univercityCate} func={(e) => this.setState({ univercityCate : e })}
                            label={"학력"} option={["대학","고졸"]} text={"학력"} style={{marginRight:"20px"}}
                        />
                        <AutoCreateBox marginLeft={25} blur={true} width={200} text={univercityCate === "대학" ? "대학교 이름 *" : "고등학교 이름 *"} list={univercityCate === "대학" ? dataList.app.univercityList : dataList.app.highschoolList} clear={false} onChange={(e) => this.setState({ univercity : e })} />
                        <div className="Info-rookie-class">
                            <AutoCreateBox marginBottom={"10px"} blur={true} width={200} text="전공 *" list={univercityCate === "대학" ? dataList.app.subjectList : []} clear={false} onChange={(e) => this.setState({ subject : e })} />
                        </div>
                    </div>
                    <div className="Info-rookie-dateLayout" style={{marginLeft: "20px"}}>
                        <TextField error={startErr} helperText={"2014"} style={{width:"150px", marginRight:"25px", marginBottom:"10px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityStart" value={univercityStart} label="입학년도" />
                        <TextField error={endErr} helperText={moment(new Date()).format("YYYY")} style={{width:"150px", marginRight:"20px", marginBottom:"10px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityEnd" value={univercityEnd} label="졸업년도" />
                        <SelectBox 
                            style2={{width:"100px"}} value={univercityState} func={(e) => this.setState({ univercityState : e })}
                            label={"재학구분"} option={["재학","졸업","휴학","중퇴"]} text={"재학구분"} style={{marginRight:"20px"}}
                        />
                    </div>
                </div>

                {/* 본인 어필 박스 */}
                <div className="Info-rookie-title">자기소개</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={false} width={"100%"} text={"자신있는 기술에 대한 태그를 검색하여 최대한 골고루, 최대 6개까지 추가하세요!"} list={dataList.app.tagList} clear={true} onChange={this.addChips.bind(this,"tag")} />
                    <div className="Info-tag-box">
                        {
                            tags.map((data,i) => {
                                return <TagChip func={this.tagDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={"100%"} text={"자신의 성격에 대한 주관적인 키워드를 최대 3개까지 등록하세요!"} list={dataList.app.keywordList} clear={true} onChange={this.addChips.bind(this,"key")} />
                    <div className="Info-tag-box">
                        {
                            keywords.map((data,i) => {
                                return <TagChip func={this.keyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={"100%"} text={"자신의 특기 또는 취미 키워드를 최대 3개까지 등록하세요!"} list={dataList.app.specialtyList} clear={true} onChange={this.addChips.bind(this,"spc")} />
                    <div className="Info-tag-box">
                        {
                            specialty.map((data,i) => {
                                return <TagChip func={this.specialtyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <TextField required error={introduceErr} helperText="간단한 자기 소개 50자 내외" style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValueLimit.bind(this)} name="introduce" value={introduce} label="자기 소개" />
                    <TextField helperText="개인 블로그나 웹 사이트 등 주소를 입력해주세요." style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="privateUrl" value={privateUrl} label="개인 사이트 URL " />
                </div>

                {/* 구직정보 박스 */}
                <div className="Info-rookie-title">구직정보</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={true} width={"100%"} text={"희망하는 분야를 입력하세요.*"} list={dataList.app.fieldList} clear={false} onChange={(e) => this.setState({ field : e })} />
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={workDateState} func={(e) => this.setState({ workDateState : e })}
                            label={"취업유무"} option={["취업희망","실습희망","실습후 취업희망","미정"]} text={"취업유무"} style={{marginRight:"20px", marginTop:"15px"}}
                        />
                        {
                            workDateState !== "미정" &&
                        <SelectBox 
                            value={workDate} func={(e) => this.setState({ workDate : e })}
                            label={"근무실습가능 날짜"} option={["상시","졸업 후","실습 강의 시","직접입력","미정"]} text={"근무/실습 날짜"} style={{marginRight:"20px", marginTop:"15px"}}
                        />
                        }
                        {
                            workDate === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"10px", marginTop:"15px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="trainingDate" value={trainingDate} label="가능 날짜" />
                        }
                    </div>
                </div>
                <h5>이름, 자기소개, 전화번호, 거주지, 희망분야, 대학, 전공, 은 필수입력사항입니다.</h5>
                <div className="Info-rookie-agree">
                    <CheckBox check={agreeCheck} func={(e) => this.setState({ agreeCheck : e })} name="agree" color="primary" />
                    <span>하이루키는 신입 채용 서비스입니다. <span style={{color:"red"}}>신입 구직자</span>로서 이용하심에 동의하십니까?</span>
                </div>
                <div style={{margin:"50px"}}>
                    <Button onClick={this.addFile.bind(this)} size="large" variant="outlined" color="primary">하이루키 시작하기</Button>
                </div>
            </div>
        );
    }
}

export default Rookie;