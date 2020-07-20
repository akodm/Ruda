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
        const {companyInfo,awardData,activityData}=this.props;
        this.state = {
            progress : null,
            // 기본 정보
            imgData : null,
            imgUrl : companyInfo.companyImageUrl,
            imgPreview : companyInfo.companyImageUrl,

            name : companyInfo.companyName,
            ceo : companyInfo.companyCEO,
            phone : companyInfo.companyPhone,
            address : companyInfo.companyAdd,
            address1 :"",
            address2 : "",
            addressState : "",

            // 기업 분야
            companyurl : companyInfo.companyUrl,
            field : companyInfo.companyField,
            tags : companyInfo.companyTags,
            since : companyInfo.companySince,
            ageAvg : companyInfo.companyAgeAvg,
            rule : companyInfo.companyRule,
            intro : companyInfo.companyIntro,
            welfare : companyInfo.companyWelfare,

            // 채용 조건
            request : companyInfo.companyRequest,
            workCate: companyInfo.companyWorkCate ,
            workDateState : companyInfo.companyWorkDateState,
            workDate :  companyInfo.companyWorkDate,
            occupation : companyInfo.companyOccupation,

            // 수상이력 관련
            awardname:"",
            awarddate:"",
            awards:awardData || [],

            activityname:"",
            activitydate:"",
            activitys:activityData || [],

            // 준비한 질문
            question : companyInfo.companyQuestion,

            load : false,
        }
       
    }

    componentDidMount() { this.setState({ load : true }); }

    // 이미지 업로드 함수 - props
    imgUpload(e) { this.setState({ imgData : e.data, imgPreview : e.pre }) }

    // firebase에 이미지 업로드 및 저장 함수 실행
    addFile() {
        const { imgData,
            name,phone,address1,field,
        } = this.state;
        if(!name || !phone || !address1 || !field) {
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
        } else { this.SaveProfile(); }
    }

    onChangeValue(e) {
        if(e.target.name === "phone" || e.target.name === "ageAvg" || e.target.name === "since") {
            if(/\D+/g.test(e.target.value)) {
                this.setState({ [e.target.name] : "" })
                return;
            }
        }
        this.setState({ [e.target.name] : e.target.value })
    }

    // 태그, 키워드, 취미 및 특기 추가 함수
    addChips(cate, e) {
        switch(cate) {
            case "tag" : 
                if(this.state.tags.length > 5) {
                    alert("태그는 최대 6개까지만 선택 가능합니다.");
                    return;
                }
                this.setState({ tags : this.state.tags.concat(e) })
                break;
            case "rule" :
                if(this.state.rule.length > 4) {
                    alert("규칙은 최대 5개까지만 선택 가능합니다.");
                    return;
                }
                this.setState({ rule : this.state.rule.concat(e) })
                break;
            case "wel" :
                if(this.state.welfare.length > 9) {
                    alert("복지는 최대 10개까지만 선택 가능합니다.");
                    return;
                }
                this.setState({ welfare : this.state.welfare.concat(e) })
                break;
            case "req" :
                if(this.state.request.length > 9) {
                    alert("조건은 최대 10개까지만 선택 가능합니다.");
                    return;
                }
                this.setState({ request : this.state.request.concat(e) })
                break;
            default : break;
        }
    }

    // 태그 삭제 함수
    tagDelete(e) { this.setState({ tags : this.state.tags.filter(data => { return data !== e })}) }

    // 규칙 삭제 함수
    ruleDelete(e) { this.setState({ rule : this.state.rule.filter(data => { return data !== e })}) }

    // 복지 삭제 함수
    welfareDelete(e) { this.setState({ welfare : this.state.welfare.filter(data => { return data !== e })}) }

    // 최소조건 삭제 함수
    requestDelete(e) { this.setState({ request : this.state.request.filter(data => { return data !== e })}) }

    async SaveProfile() {
        const { companyInfo } = this.props;
        const { imgUrl,
            name,ceo,phone,address1,address2,companyurl,
            field,tags,since,ageAvg,rule,intro,welfare,
            request,workCate,workDateState,workDate,occupation,
            question 
        } = this.state;
        
        let address = address1 + "-" + address2;
        const result = await axios.put(`${config.app.s_url}/companyInfos/update`,{
            userId : companyInfo.id,
            companyImageUrl: imgUrl,

            companyName: name,
            companyCEO: ceo,
            companyPhone: phone,
            companyAdd: address,
            
            companyUrl:companyurl,
            companyField: field,
            companyTags: tags,
            companySince : since,
            companyAgeAvg : ageAvg,
            companyRule: rule,
            companyIntro : intro,
            companyWelfare : welfare,
            
            companyRequest : request,
            companyOccupation : occupation,
            companyWorkCate :  workCate,
            companyWorkDate : workDate,
            companyworkDateState : workDateState,
            
            companyQuestion: question,
        });

        if(result.data){
            alert("수정이 완료되었습니다.");
           window.location.href='/';
        } else {
            alert("잘못된 값이 있습니다. 다시 시도해주세요.");
        }
        this.setState({ load : true });
    }

    async addAward(){
        const { companyInfo }=this.props;
        const {awardname,awarddate,awards} =this.state;

        try{
            const result= await axios.post(`${config.app.s_url}/awards/create`,{
                userId:companyInfo.userId,
                awardName:awardname,
                awardDate :awarddate,
            })
            this.setState({ 
                awards : awards.concat(result.data),
                awardname:"",
                awarddate:"",
            });
        }
        catch(err){
            console.log("user award add create err");
        }
    }
    async addActivity(){
        const {companyInfo}=this.props;
        const {activityname,activitydate,activitys} =this.state;

        try{
            const result= await axios.post(`${config.app.s_url}/activitys/create`,{
                userId:companyInfo.userId,
                activityName :activityname,
                activityStartDate:activitydate,
            })
            this.setState({ 
                activitys:activitys.concat(result.data),
                activityname:"",
                activitydate:"",
            });
            console.log(result.data);
        }
        catch(err){
            console.log("user activity add create err");
        }
    }
    
    async deleteAward(id){
        try{
            await axios.delete(`${config.app.s_url}/awards/delete?id=${id}`);
            this.setState({ awards : this.state.awards.filter(data => { return id !== data.id }) });
        }
        catch(err){
            console.log("user award delete err");
        }
    }
    async deleteActivity(id){
        try{
            await axios.delete(`${config.app.s_url}/activitys/delete?id=${id}`);
            this.setState({ activitys : this.state.activitys.filter(data => { return id !== data.id }) });
        }
        catch(err){
            console.log("user activity delete err");
        }
    }

    render() {
        const { load,
            imgPreview,
            name,ceo,phone,addressState,address1,address2,companyurl,
            field,tags,since,ageAvg,rule,intro,welfare,
            request,workCate,workDateState,workDate,occupation,
            awardname,awarddate,awards,
            activityname,activitydate,activitys,
        } = this.state;


        const {companyInfo}=this.props;
        const address = companyInfo.companyAdd; 
        const add = address.split('-');
        const add1 =add[0];
        const add2 =add[1];
        
        return (
            <div className="Info-rookie-main">
                { !load && <Load /> }

                <div className="Info-rookie-title">*기본정보</div>
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
                            <div>
                                <TextField helperText="기업명" required label="기업명" variant="outlined" value={name} name="name" onChange={this.onChangeValue.bind(this)} />
                                <TextField style={{marginLeft:"10px"}} helperText="선택 입력" label="기업 대표 이름" variant="outlined" value={ceo} name="ceo" onChange={this.onChangeValue.bind(this)} />
                            </div>
                            <TextField helperText="-빼고 입력해주세요" required label="기업 전화번호" variant="outlined" value={phone} name="phone" onChange={this.onChangeValue.bind(this)} />
                        </div>
                    </div>
                    {/* 클릭시 주소지 검색 창 열기 */}
                    <div className="Info-rookie-imgLayout">
                        <TextField
                            id="outlined-read-only-input" label="기업 주소를 검색하여 주세요. 시/도/구"
                            value={address1} required
                            onClick={() => this.setState({ addressState : true })}
                            style={{width:"450px",marginRight:"25px"}}
                            InputProps={{ readOnly: true }} variant="outlined"
                        />
                        <TextField helperText="상세주소를 입력해주세요" style={{width:"200px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="address2" value={address2} id="outlined-required" label="나머지 주소" />
                    </div>
                    {/* 주소지 검색 API */}
                    <PostCode open={addressState} close={() => this.setState({ addressState : false })} func={(data) => this.setState({ address1 : data })} />
                </div>
                <div className="Info-rookie-title">기업소개</div>
                <div className="Info-rookie-body">
                    <div style={{display:"flex",flexDirection:"row",marginBottom:"20px"}}>
                        <TextField style={{width:"340px",marginRight:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="companyurl" value={companyurl} id="outlined-required" label="기업사이트 주소" />
                        <AutoCreateBox value={field} width={340} blur={true} text={"기업의 분야를 입력해주세요."} list={dataList.app.comfieldList} clear={false} onChange={(e) => this.setState({ field : e })}  />
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"기업에서 다루는 기술에 대한 태그를 검색하여 최대 6개까지 추가하세요!"} list={dataList.app.tagList} clear={true} onChange={this.addChips.bind(this,"tag")} />
                    <div className="Info-tag-box">
                        {
                            tags.map((data,i) => {
                                return <TagChip func={this.tagDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <div className="Info-company-Layout" style={{marginTop:"10px",marginBottom:"15px"}}>
                        <TextField style={{width:"48%"}} helperText="숫자만 입력해주세요." label={`기업 설립일. ${moment(new Date()).format("YYYY")}`} variant="outlined" value={since} name="since" onChange={this.onChangeValue.bind(this)} />
                        <TextField style={{width:"48%"}} helperText="선택 입력. 숫자만 입력해주세요." label="기업 평균 연령" variant="outlined" value={ageAvg} name="ageAvg" onChange={this.onChangeValue.bind(this)} />
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"기업을 소개할 기업의 사내 규칙을 최대 5개까지 입력해주세요! 선택입력"} list={[]} clear={true} onChange={this.addChips.bind(this,"rule")} />
                    <div className="Info-tag-box" style={{flexDirection:"column"}}>
                        {
                            rule.map((data,i) => {
                                return <div className="Info-company-ruleChip" onClick={this.ruleDelete.bind(this,data)} key={i} >{i+1}. {data}</div>
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"기업에서 제공하는 복리후생 및 제도에 대해 알려주세요! 최대 10개. 예) 내일채움공제"} list={dataList.app.welfareList} clear={true} onChange={this.addChips.bind(this,"wel")} />
                    <div className="Info-tag-box">
                        {
                            welfare.map((data,i) => {
                                return <TagChip func={this.welfareDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <TextField helperText="간단하게 기업에 대해 소개해주세요" label="기업 소개" variant="outlined" value={intro} name="intro" onChange={this.onChangeValue.bind(this)} />
                </div>
                <div className="Info-rookie-title">채용정보</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={false} width={700} text={"구직자에게 바라는 기술스택이나 최소 요건에 대해 등록하세요!"} list={dataList.app.requestList} clear={true} onChange={this.addChips.bind(this,"req")} />
                    <div className="Info-tag-box">
                        {
                            request.map((data,i) => {
                                return <TagChip func={this.requestDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox value={occupation} blur={true} width={400} text={"희망하는 채용 분야를 입력하세요."} list={dataList.app.fieldList} clear={false} onChange={(e) => this.setState({ occupation : e })} />
                    <div className="Info-rookie-dateLayout">
                        <SelectBox 
                            value={workCate} func={(e) => this.setState({ workCate : e })}  name={workCate}
                            label={"채용구분"} option={["채용","실습생채용","실습 후 채용","미정"]} text={"채용구분"} style={{marginRight:"20px"}}
                        />
                        {
                            workCate !== "미정" &&
                            <SelectBox 
                                value={workDateState} func={(e) => this.setState({ workDateState : e })} name={workDateState}
                                label={"채용희망 날짜"} option={["상시","졸업 후","직접입력","미정"]} text={"채용희망 날짜"} style={{marginRight:"20px"}}
                        />
                        }
                        {
                            workDateState === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"200px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="workDate" value={workDate} label="근무희망 날짜  ~부터" />
                        }
                    </div>
                </div>
                {/*수상경력 박스*/}
                <div className="Info-rookie-title">수상이력</div>
                <div className="Info-rookie-body">
                    <div className="Info-rookie-dateLayout">
                        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="awarddate" value={awarddate} label="수상 날짜" />
                        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="awardname" value={awardname} label="수상명 " />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addAward.bind(this)}>
                            <AddIcon style={{ color : "#646464",fontSize:"large"}}/> 
                        </span>
                    </div>
                        {
                            awards.map((data,i) => {
                                return  <div className="Info-rookie-dateLayout" key={i}>
                                <TextField InputProps={{ readOnly: true}} style={{width:"130px", marginRight:"20px"}} variant="outlined" name="awarddate" value={data.awardDate} label="수상 날짜" />
                                <TextField variant="outlined" InputProps={{ readOnly: true}} name="awardname" value={data.awardName} label="수상명 " />
                                <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.deleteAward.bind(this,data.id)}>
                                    <ClearIcon style={{ color : "rgb(223, 86, 86)",fontSize:"small"}}/>
                                </span>
                            </div>
                            })
                        }
                </div>
                {/*수상경력 박스*/}
                <div className="Info-rookie-title">기업연혁</div>
                <div className="Info-rookie-body">
                    <p style={{fontSize:"small"}}>낮은년도 순으로 입력해주시길 바랍니다.</p>
                    <div className="Info-rookie-dateLayout">
                        <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"130px", marginRight:"20px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="activitydate" value={activitydate} label="날짜" />
                        <TextField variant="outlined" onChange={this.onChangeValue.bind(this)} name="activityname" value={activityname} label="내용 " />
                        <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.addActivity.bind(this)}>
                            <AddIcon style={{ color : "#646464",fontSize:"large"}}/> 
                        </span>
                    </div>
                        {
                            activitys.map((data,i) => {
                                return  <div className="Info-rookie-dateLayout" key={i}>
                                <TextField InputProps={{ readOnly: true}} style={{width:"130px", marginRight:"20px"}} variant="outlined" name="awarddate" value={data.activityStartDate} label="날짜" />
                                <TextField variant="outlined" InputProps={{ readOnly: true}} name="activityname" value={data.activityName} label="내용 " />
                                <span style={{fontSize:"30px",marginLeft:"20px"}} onClick={this.deleteActivity.bind(this,data.id)}>
                                    <ClearIcon style={{ color : "rgb(223, 86, 86)",fontSize:"small"}}/>
                                </span>
                            </div>
                            })
                        }
                </div>
                {/*<h5>기업이름,자기소개,이메일,개인사이트주소,핸드폰번호,거주지,대학,희망분야,근무형태,근무날짜는 필수입력사항입니다.</h5>*/}
                {/*저장버튼*/}
                <div style={{margin:"50px"}}>
                    <button className="profile-edit" onClick={this.addFile.bind(this)}><SaveIcon style={{fontSize:"large",margin:"5px"}}/>프로필저장</button>
                </div>
            </div>
        );
    }
}

export default EditProfile;