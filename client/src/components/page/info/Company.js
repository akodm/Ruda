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

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress : null,
            // 기본 정보
            imgData : null,
            imgUrl : null,
            imgPreview : null,

            name : "",
            ceo : "",
            phone : "",
            address1 : "",
            address2 : "",
            addressState : false,
            companyUrl:"",

            // 기업 분야
            field : "",
            tags : [],
            since : "",
            ageAvg : "",
            rule : [],
            intro : "",
            welfare : [],

            // 채용 조건
            request : [],
            workCate: "",
            workDateState : "상시",
            workDate : "",
            occupation : "",

            // 준비한 질문
            question : [],

            agreeCheck : false,
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
            agreeCheck
        } = this.state;
        if(!agreeCheck) {
            alert("이용수칙에 동의해주세요.");
            return;
        }
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
                        this.saveStartBtn();
                    });
                }
            );
        } else { this.saveStartBtn(); }
    }

    // 저장 함수 -> 데이터베이스에 유저 인포 디비 저장
    async saveStartBtn() {
        const { user } = this.props;
        const { imgUrl,
            name,ceo,phone,address1,address2,companyurl,
            field,tags,since,ageAvg,rule,intro,welfare,
            request,workCate,workDateState,workDate,occupation,
            question 
        } = this.state;
        try {
            let userCateUpdat = axios.put(`${config.app.s_url}/users/updatecate`, {
                userCate : "company",
                id : user.id
            });

            let address = address1 + "-" + address2;
            let result = axios.post(`${config.app.s_url}/companyInfos/create`, {
                userId : user.id,

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

    // 기본 스태이트 변경 함수
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

    render() {
        const { load,
            imgPreview,
            name,ceo,phone,address1,address2,addressState,companyurl,
            field,tags,since,ageAvg,rule,intro,welfare,
            request,workCate,workDateState,workDate,
            question,
            agreeCheck,
        } = this.state;
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
                    <AutoCreateBox blur={true} width={400} text={"희망하는 채용 분야를 입력하세요."} list={dataList.app.fieldList} clear={false} onChange={(e) => this.setState({ occupation : e })} />
                    <div className="Info-rookie-dateLayout">
                    <SelectBox 
                            value={workCate} func={(e) => this.setState({ workCate : e })}
                            label={"채용구분"} option={["채용","실습생채용","실습 후 채용","미정"]} text={"채용구분"} style={{marginRight:"20px"}}
                        />
                        {
                            workCate !== "미정" &&
                            <SelectBox 
                                value={workDateState} func={(e) => this.setState({ workDateState : e })}
                                label={"채용희망 날짜"} option={["상시","졸업 후","직접입력","미정"]} text={"채용희망 날짜"} style={{marginRight:"20px"}}
                        />
                        }
                        {
                            workDateState === "직접입력" &&
                            <TextField helperText={moment(new Date()).format("YYYY/MM/DD")} style={{width:"200px", marginRight:"10px"}} variant="outlined" onChange={this.onChangeValue.bind(this)} name="workDate" value={workDate} label="근무희망 날짜  ~부터" />
                        }
                    </div>
                </div>
                <div className="Info-rookie-agree">
                    <CheckBox check={agreeCheck} func={(e) => this.setState({ agreeCheck : e })} name="agree" color="primary" />
                    <span>하이루키는 신입 채용 서비스입니다. <span style={{color:"red"}}>기업</span>으로서 이용하심에 동의하십니까?</span>
                </div>
                <div style={{margin:"50px"}}>
                    <Button onClick={this.addFile.bind(this)} size="large" variant="outlined" color="primary">하이루키 시작하기</Button>
                </div>
            </div>
        );
    }
}

export default Company;