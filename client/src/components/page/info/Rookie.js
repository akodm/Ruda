import React, { Component } from 'react';

import dataList from '../../../data-list';
import ImageBox from '../../component/ImageBox';
import InputBox from '../../component/InfoInput';
import PostCode from '../../component/PostPopup';
import AutoCreateBox from '../../component/AutoCreatable';
import TagChip from '../../component/TagChip';

import moment from 'moment';

class Rookie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 개인정보
            imgData : null,
            imgPreview : null,
            name : "",
            phone : "",
            address1 : "",
            address2 : "",
            addressState : false,

            // 학력
            univercityCate : "대학", // 고졸인지 대학인지 여부
            univercity  : "",   // 대학 혹은 고등학교 이름
            subject : "",   // 전공 이름 혹은 고등학교 인문 이름
            univercityStart : "",
            univercityEnd : "",
            univercityState : "재학",   // 대학 상태 여부
            trainingState : "일반구직",  // 실습 여부

            // 어필 항목
            tags : [],  // 태그
            keywords : [],  // 성격 키워드
            specialty : "", // 특기
            introduce : "", // 자기 소개 간단

            // 구직 관련
            field : "", // 희망 취업 분야
            workDateState : 0,  // 일할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            workDate : new Date(),  // 일할 수 있는 날짜
            trainingDateState : 0,   // 실습 할 수 있는 날짜 선택 박스 -> 비선택 / 상시 / 졸업 후 / 정해진 날짜
            trainingDate : new Date(),  // 실습 여부 시 실습 가능 날짜
        }
    }

    // 이미지 업로드 함수 - props
    imgUpload(e) { this.setState({ imgData : e.data, imgPreview : e.pre }) }

    // 스태이트 변경 함수
    onChangeValue(e) {
        if(e.target.name === "phone" || e.target.name === "univercityStart" || e.target.name === "univercityEnd") {
            if(/\D+/g.test(e.target.value)) {
                this.setState({ [e.target.name] : "" })
                return;
            }
        }
        this.setState({ [e.target.name] : e.target.value })
    }

    // 키워드 추가 함수
    addChipsKey(e) {
        if(this.state.keywords.length > 2) {
            alert("키워드는 최대 3개까지만 선택가능합니다.");
            return;
        }
        this.setState({ keywords : this.state.keywords.concat(e) })
    }

    // 태그 추가 함수
    addChipsTag(e) {
        if(this.state.tags.length > 5) {
            alert("태그는 최대 6개까지만 선택가능합니다.");
            return;
        }
        this.setState({ tags : this.state.tags.concat(e) })
    }

    // 키워드 삭제 함수
    keyDelete(e) {
        this.setState({ keywords : this.state.keywords.filter(data => {
            return data !== e
        })})
    }

    // 태그 삭제 함수
    tagDelete(e) {
        this.setState({ tags : this.state.tags.filter(data => {
            return data !== e
        })})
    }

    render() {
        const { imgPreview,
            name,phone,address1,address2,addressState,
            univercityCate,univercityState,univercityStart,univercityEnd,trainingState,
            tags,keywords,specialty,introduce
        } = this.state;
        return (
            <div className="Info-rookie-main">

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
                            <InputBox 
                                text="이름" value={name} onChange={this.onChangeValue.bind(this)}
                                placeholder="성 이름" type="text" name="name"
                            />
                            <InputBox 
                                text="전화번호" value={phone} onChange={this.onChangeValue.bind(this)}
                                placeholder="-빼고 입력해주세요." type="text" name="phone" maxLength={12}
                            />
                        </div>
                    </div>
                    {/* 클릭시 주소지 검색 창 열기 */}
                    <InputBox 
                        text="주소지" value={address1} readOnly type="text" style={{width:"400px"}}
                        placeholder="주소를 검색하여주세요. 시/도/구" onClick={() => this.setState({ addressState : true })}
                        add name2="address2" type2="text" value2={address2} placeholder2="나머지 주소를 입력해주세요."
                        style2={{width:"200px",marginLeft:"20px"}} onChange={this.onChangeValue.bind(this)}
                    />
                    {/* 주소지 검색 API */}
                    <PostCode open={addressState} close={() => this.setState({ addressState : false })} func={(data) => this.setState({ address1 : data })} />
                </div>

                {/* 학력 박스 */}
                <div className="Info-rookie-title">*최근 학력</div>
                <div className="Info-rookie-body">
                    {/* 첫번째 라인 */}
                    <div className="Info-rookie-imgLayout">
                        <select className="Info-rookie-selectBox" value={univercityCate} onChange={(e) => this.setState({ univercityCate : e.target.value})}>
                            <option value={"고졸"}>고졸</option>
                            <option value={"대학"}>대학</option>
                        </select>
                        <AutoCreateBox blur={true} width={200} text={univercityCate === "대학" ? "대학교 이름" : "고등학교 이름"} list={univercityCate === "대학" ? dataList.app.univercityList : dataList.app.highschoolList} clear={false} onChange={(e) => this.setState({ univercity : e })} />
                        <div style={{marginLeft:"25px"}}>
                            <AutoCreateBox blur={true} width={200} text="전공" list={univercityCate === "대학" ? dataList.app.subjectList : []} clear={false} onChange={(e) => this.setState({ subject : e })} />
                        </div>
                    </div>
                    <div className="Info-rookie-dateLayout">
                        <InputBox 
                            text="입학년도" value={univercityStart} onChange={this.onChangeValue.bind(this)} style={{height:30, width:100}}
                            placeholder={moment(new Date()).format("YYYYMMDD")} type="text" name="univercityStart" maxLength={8}
                        />
                        <InputBox 
                            text="졸업년도" value={univercityEnd} onChange={this.onChangeValue.bind(this)} style={{height:30, width:100}}
                            placeholder={moment(new Date()).format("YYYYMMDD")} type="text" name="univercityEnd" maxLength={8}
                        />
                        <select style={{marginLeft:"10px", marginTop:"42px"}} className="Info-rookie-selectBox" value={univercityState} onChange={(e) => this.setState({ univercityState : e.target.value })}>
                            <option value={"재학"}>재학</option>
                            <option value={"졸업"}>졸업</option>
                            <option value={"휴학"}>휴학</option>
                            <option value={"중퇴"}>중퇴</option>
                        </select>
                        <select style={{marginLeft:"10px", marginTop:"42px", paddingLeft:"15px"}} className="Info-rookie-selectBox" value={trainingState} onChange={(e) => this.setState({ trainingState : e.target.value })}>
                            <option value={"일반구직"}>일반구직</option>
                            <option value={"실습생"}>실습생</option>
                            <option value={"구직/실습"}>구직/실습</option>
                        </select>
                    </div>
                </div>

                {/* 본인 어필 박스 */}
                <div className="Info-rookie-title">본인 어필</div>
                <div className="Info-rookie-body">
                    <AutoCreateBox blur={false} width={700} text={"자신있는 기술에 대한 태그를 검색하여 최대한 골고루, 최대 6개까지 추가하세요!"} list={dataList.app.tagList} clear={true} onChange={this.addChipsTag.bind(this)} />
                    <div className="Info-tag-box">
                        {
                            tags.map((data,i) => {
                                return <TagChip func={this.tagDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <AutoCreateBox blur={false} width={700} text={"자신의 성격에 대한 주관적인 키워드를 최대 3개까지 등록하세요!"} list={dataList.app.keywordList} clear={true} onChange={this.addChipsKey.bind(this)} />
                    <div className="Info-tag-box">
                        {
                            keywords.map((data,i) => {
                                return <TagChip func={this.keyDelete.bind(this)} name={data} key={i} />
                            })
                        }
                    </div>
                    <InputBox 
                        text="관심사나 잘하는 특기 등 자유롭게 적으세요! 50자 내외" value={specialty} onChange={this.onChangeValue.bind(this)} style={{height:30, width:700,margin:"-15px",marginTop:"10px"}}
                        placeholder={"나의 최근 관심사 혹은 잘하는 스포츠 등 특기"} type="text" name="specialty" maxLength={50}
                    />
                    <InputBox 
                        text="간단한 자기 소개 50자 내외" value={introduce} onChange={this.onChangeValue.bind(this)} style={{height:30, width:700,margin:"-15px",marginTop:"10px"}}
                        placeholder={"간단한 자기 소개를 입력해주세요!"} type="text" name="introduce" maxLength={50}
                    />
                </div>

                {/* 구직정보 박스 */}
                <div className="Info-rookie-title">구직정보</div>
                <div className="Info-rookie-body">
                    
                </div>
            </div>
        );
    }
}

export default Rookie;