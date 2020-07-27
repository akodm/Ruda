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

import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        const {userInfo, awardData, certificateData,activityData}=this.props;
        this.state = {
            progress : null,
            // 개인정보
            imgData : null,
            imgUrl : userInfo.userImageUrl,
            imgPreview :userInfo.userImageUrl,
            name:userInfo.userName,
            phone : userInfo.userPhone,
            address1 : userInfo.userAdd,
            addressState : false,
            military : userInfo.userMilitary,

            // 학력
            univercityCate : userInfo.userUnivercityCate, // 고졸인지 대학인지 여부
            univercity  : userInfo.userUnvcity,   // 대학 혹은 고등학교 이름
            subject : userInfo.userSubject,   // 전공 이름 혹은 고등학교 인문 이름
            univercityStart : userInfo.userAttendStartDate,
            startErr : false,
            univercityEnd : userInfo.userAttendEndDate,
            endErr : false,
            univercityState : userInfo.userAttend,   // 대학 상태 여부

            // 어필 항목
            tags : userInfo.userTags,  // 태그
            keywords : userInfo.userKeyword,  // 성격 키워드
            specialty : userInfo.userSpecialty, // 특기
            specialtyErr : false,
            introduce : userInfo.userIntro, // 자기 소개 간단
            introduceErr : false,
            privateUrl : userInfo.userUrl,

            // 구직 관련
            field :  userInfo.userField, // 희망 취업 분야
            workDateState : userInfo.userWorkDateState,  // 일할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            workDate :  userInfo.userWorkDate,  // 일할 수 있는 날짜
            trainingDateState : userInfo.userTraningDateState,   // 실습 할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            trainingDate : userInfo.userTraningDate,  // 실습 여부 시 실습 가능 날짜

            // 수상이력 관련
            awardname:"",
            awarddate:"",
            awardcate:"교내",
            awards:awardData || [],

            // 자격증 관련
            certificatename:"",
            certificatecate:"",
            certificatedate:"",
            certificates:certificateData || [],

            //교내활동
            activitycate:"교내",
            activityname:"",
            activitystartdate:"",
            activityenddate:"",
            activitys:activityData || [],

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

    // firebase에 이미지 업로드 및 저장 함수 실행
    addFile() {
        const { imgData,
            name,phone,address1,univercity,subject,military,field,workDateState,introduce,
            } = this.state;
        if(!name || !phone || !address1 || !univercity || !subject || !military || !field || !workDateState || !introduce) {
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
                        this.SaveProfile();
                    });
                }
            );
        } else {
            this.SaveProfile();
        }
    }
    
    async addAward(){
        const { userInfo }=this.props;
        const {awardname,awardcate,awarddate,awards} =this.state;

        try{
            const result= await axios.post(`${config.app.s_url}/awards/create`,{
                userId:userInfo.userId,
                awardName:awardname,
                awardDate :awarddate,
                awardCate:awardcate,
            })
            this.setState({ 
                awards : awards.concat(result.data),
                awardname:"",
                awarddate:"",
                awardcate:"교내",
            });
        }
        catch(err){
            console.log("user award add create err : "+err);
        }
    }
    
    async addCertificate(){
        const {userInfo}=this.props;
        const {certificatename,certificatecate,certificatedate, certificates} =this.state;

        try{
            const result= await axios.post(`${config.app.s_url}/certificates/create`,{
                userId:userInfo.userId,
                certificateName:certificatename,
                certificateCate :certificatecate,
                certificateDate:certificatedate,
            })
            this.setState({ 
                certificates : certificates.concat(result.data),
                certificatename:"",
                certificatecate:"",
                certificatedate:"",
            });
        }
        catch(err){
            console.log("user certificate add create err : "+err);
        }
    }
   
    async addActivity(){
        const {userInfo}=this.props;
        const {activitycate,activityname,activitystartdate, activityenddate,activitys} =this.state;

        try{
            const result= await axios.post(`${config.app.s_url}/activitys/create`,{
                userId:userInfo.userId,
                activityCate:activitycate,
                activityName :activityname,
                activityStartDate:activitystartdate,
                activityEndDate:activityenddate
            })
            this.setState({ 
                activitys:activitys.concat(result.data),
                activitycate :"교내",
                activityname:"",
                activitystartdate:"",
                activityenddate:"",
            });
            console.log(result.data);
        }
        catch(err){
            console.log("user activity add create err : "+err);
        }
    }
    
    async deleteAward(id){
        try{
            await axios.delete(`${config.app.s_url}/awards/delete?id=${id}`);
            this.setState({ awards : this.state.awards.filter(data => { return id !== data.id }) });
        }
        catch(err){
            console.log("user award delete err : "+err);
        }
    }
    async deleteCertificate(id){
        try{
            await axios.delete(`${config.app.s_url}/certificates/delete?id=${id}`);
            this.setState({ certificates : this.state.certificates.filter(data => { return id !== data.id }) });
        }
        catch(err){
            console.log("user certificate delete err : "+err);
        }
    }
   
    async deleteActivity(id){
        try{
            await axios.delete(`${config.app.s_url}/activitys/delete?id=${id}`);
            this.setState({ activitys : this.state.activitys.filter(data => { return id !== data.id }) });
        }
        catch(err){
            console.log("user activity delete err : "+err);
        }
    }

    async SaveProfile() {
        const { userInfo } = this.props;
        const { imgUrl,
            name,phone,address1,military,
            univercityCate,univercity,subject,univercityState,univercityStart,univercityEnd,
            tags,keywords,specialty,introduce,privateUrl,
            field,workDateState,trainingDateState,workDate,trainingDate
        } = this.state;
 
        try {
            const result = await axios.put(`${config.app.s_url}/userInfos/update`,{
                userId :userInfo.id,
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
                userTraningDateState : trainingDateState,
                userWorkDateState : workDateState,
                userWorkDate : workDate,
                userTraningDate : trainingDate,
            });

            console.log( result.data+"프로필수정");
            if(result.data){
                alert("수정이 완료되었습니다.");
                window.location.href = "/";
            } else {
                alert("잘못된 값이 있습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("save profile err");
        }
        this.setState({ load : true });
    }
   
    render() {
        const { imgPreview,
            name,phone,address1,addressState,military,
            univercityCate,univercityState,univercityStart,univercityEnd,startErr,endErr,subject,
            tags,keywords,specialty,introduce,introduceErr,privateUrl,
            workDateState,workDate,trainingDate,
            load,univercity,field,
            awardname,awarddate,awardcate,awards,
            certificatedate,certificatename,certificatecate,certificates,
            activitys,activitycate,activityname,activitystartdate,activityenddate,} = this.state;
        
        return (
            <div className="EditProfile">
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
                            value={address1}
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
                            value={univercityCate} func={(e) => this.setState({ univercityCate : e })}
                            label={"학력"} option={["대학","고졸"]} text={"학력"} style={{marginRight:"20px"}}
                        />
                        <AutoCreateBox blur={true} value={univercity} width={200} text={univercityCate === "대학" ? "대학교 이름 *" : "고등학교 이름 *"} list={univercityCate === "대학" ? dataList.app.univercityList : dataList.app.highschoolList} clear={false} onChange={(e) => this.setState({ univercity : e })} />
                        <div style={{marginLeft:"25px"}}>
                            <AutoCreateBox blur={true} value={subject} width={200} text="전공 *" list={univercityCate === "대학" ? dataList.app.subjectList : []} clear={false} onChange={(e) => this.setState({ subject : e })} />
                        </div>
                    </div>
                    <div className="Info-rookie-dateLayout">
                        <TextField error={startErr} helperText={"2014"} style={{width:"150px", marginRight:"25px",marginLeft:"18px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityStart" value={univercityStart} label="입학년도" />
                        <TextField error={endErr} helperText={moment(new Date()).format("YYYY")} style={{width:"150px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValueDate.bind(this)} name="univercityEnd" value={univercityEnd} label="졸업년도" />
                        <SelectBox 
                            value={univercityState} func={(e) => this.setState({ univercityState : e })}
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
                            tags.map((data,i) => {
                                return <TagChip func={this.tagDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"자신의 성격에 대한 주관적인 키워드를 최대 3개까지 등록하세요!"} list={dataList.app.keywordList} clear={true} onChange={this.addChips.bind(this,"key")} />
                    <div className="Info-tag-box">
                        {
                            keywords.map((data,i) => {
                                return <TagChip func={this.keyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"자신의 특기 또는 취미 키워드를 최대 5개까지 등록하세요!"} list={dataList.app.specialtyList} clear={true} onChange={this.addChips.bind(this,"spc")} />
                    <div className="Info-tag-box">
                        {
                            specialty.map((data,i) => {
                                return <TagChip func={this.specialtyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <TextField error={introduceErr} helperText="간단한 자기 소개 50자 내외" style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValueLimit.bind(this)} name="introduce" value={introduce} label="자기 소개" />
                    <TextField helperText="개인 블로그나 웹 사이트 등 주소를 입력해주세요." style={{marginTop:"15px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="privateUrl" value={privateUrl} label="개인 사이트 URL " />
                </div>

                {/* 구직정보 박스 */}
                <div className="Info-rookie-title">구직정보</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={true} width={400} text={"희망하는 분야를 입력하세요."} list={dataList.app.fieldList} value={field} clear={false} onChange={(e) => this.setState({ field : e })} />
                    <div className="Info-rookie-dateLayout">
                    <SelectBox 
                            value={workDateState} func={(e) => this.setState({ workDateState : e })}
                            label={"취업유무"} option={["취업희망","실습희망","실습후 취업희망","미정"]} text={"취업유무"} style={{marginRight:"20px"}}
                        />
                        {
                            workDateState !== "미정" &&
                        <SelectBox 
                            value={workDate} func={(e) => this.setState({ workDate : e })}
                            label={"근무실습가능 날짜"} option={["상시","졸업 후","실습 강의 시","직접입력","미정"]} text={"근무/실습 날짜"} style={{marginRight:"20px"}}
                        />
                        }
                        {
                            workDate === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="trainingDate" value={trainingDate} label="실습가능 날짜" />
                        }
                    </div>
                </div>

                {/*수상경력 박스*/}
                <div className="Info-rookie-title">수상이력</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={awardcate} func={(e) => this.setState({ awardcate : e })}
                            label={"수여"} option={["교내","교외"]} text={"수여"} style={{marginRight:"20px"}}
                        />
                        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="awardname" value={awardname} label="수상명 " />
                        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="awarddate" value={awarddate} label="수상 날짜" />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addAward.bind(this)}>
                            <AddIcon style={{ color : "#646464",fontSize:"large"}}/> 
                        </span>
                    </div>
                        {
                            awards.map((data,i) => {
                                return  <div className="Info-rookie-dateLayout" key={i}>
                                <SelectBox 
                                    value={data.awardCate} InputProps={{ readOnly: true}}
                                    label={"수여"} option={["교내","교외"]} text={"수여"} style={{marginRight:"20px"}}
                                />
                                <TextField variant="outlined" InputProps={{ readOnly: true}} name="awardname" value={data.awardName} label="수상명 " />
                                <TextField InputProps={{ readOnly: true}} style={{width:"130px", marginLeft:"20px"}} variant="outlined" name="awarddate" value={data.awardDate} label="수상 날짜" />
                                <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.deleteAward.bind(this,data.id)}>
                                    <ClearIcon style={{ color : "rgb(223, 86, 86)",fontSize:"small"}}/>
                                </span>
                            </div>
                            })
                        }
                    </div>

                {/*자격증*/}
                <div className="Info-rookie-title">자격증</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-dateLayout">
                        <TextField variant="outlined" style={{marginRight:"20px"}} onChange={this.onChangeValue.bind(this)} name="certificatecate" value={certificatecate} label="발급기관" />
                        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="certificatename" value={certificatename} label="자격증이름 " />
                        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="certificatedate" value={certificatedate} label="발급 날짜" />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addCertificate.bind(this)}>
                        <AddIcon style={{ color : "#646464",fontSize:"large"}}/> 
                        </span>
                    </div>
                        {
                            certificates.map((data,i) => {
                                return  <div className="Info-rookie-dateLayout" key={i}>
                                <TextField variant="outlined" style={{marginRight:"20px"}} InputProps={{ readOnly: true}} name="certificatecate" value={data.certificateCate} label="발급기관" />
                                <TextField variant="outlined" InputProps={{ readOnly: true}} name="certificatename" value={data.certificateName} label="자격증이름 " />
                                <TextField InputProps={{ readOnly: true}} style={{width:"130px", marginLeft:"20px"}} variant="outlined" name="certificatedate" value={data.certificateDate} label="발급 날짜" />
                                <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.deleteCertificate.bind(this,data.id)}>
                                    <ClearIcon style={{ color : "rgb(223, 86, 86)",fontSize:"small"}}/>
                                </span>
                            </div>
                            })
                        }
                </div>
                <div className="Info-rookie-title">교내/교외 활동</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={activitycate} func={(e) => this.setState({ activitycate : e })}
                            label={"활동"} option={["교내","교외"]} text={"활동"} style={{marginRight:"20px"}}
                        />
                        <TextField variant="outlined" style={{marginRight:"20px"}} onChange={this.onChangeValue.bind(this)} name="activityname" value={activityname} label="활동명" />
                        <TextField helperText={moment(new Date()).format("YYYY/MM/YY")} style={{width:"130px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="activitystartdate" value={activitystartdate} label="활동 시작 날짜" />
                        <TextField helperText={moment(new Date()).format("YYYY/MM/YY")} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="activityenddate" value={activityenddate} label="활동 끝 날짜" />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addActivity.bind(this)}>
                        <AddIcon style={{ color : "#646464",fontSize:"large"}}/> 
                        </span>
                    </div>
                        {
                            activitys.map((data,i) => {
                                return  <div className="Info-rookie-dateLayout" key={i}>
                                    <SelectBox 
                                        value={data.activityCate} func={(e) => this.setState({ activitycate : e })}
                                        label={"활동"} option={["교내","교외"]} text={"활동"} style={{marginRight:"20px"}} InputProps={{ readOnly: true}}
                                    />
                                    <TextField variant="outlined" style={{marginRight:"20px"}} InputProps={{ readOnly: true}} onChange={this.onChangeValue.bind(this)} name="activityname" value={data.activityName} label="활동명" />
                                    <TextField InputProps={{ readOnly: true}} style={{width:"130px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="activitystartdate" value={data.activityStartDate} label="활동 시작 날짜" />
                                    <TextField InputProps={{ readOnly: true}} style={{width:"130px", marginLeft:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="activityenddate" value={data.activityEndDate} label="활동 끝 날짜" />
                                    <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.deleteActivity.bind(this,data.id)}>
                                        <ClearIcon style={{ color : "rgb(223, 86, 86)",fontSize:"small"}}/>
                                    </span>
                            </div>
                            })
                        }
                </div>
                <h5>이름, 자기소개, 이메일, 전화번호, 거주지, 희망분야, 구직형태, 병역여부, 대학, 전공, 은 필수입력사항입니다.</h5>
                {/*저장버튼*/}
                <div style={{margin:"50px"}}>
                    <button className="profile-edit" onClick={this.addFile.bind(this)}><SaveIcon style={{fontSize:"large",margin:"5px"}}/>프로필저장</button>
                </div>
            </div>
        );
    }
}

export default EditProfile;