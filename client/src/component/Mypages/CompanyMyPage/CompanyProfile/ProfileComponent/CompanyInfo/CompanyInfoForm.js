import React, { Component } from 'react';

class CompanyInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    infoSave(){
        this.props.infochanges(false)
    }
    render() {
        return (
            <div>
                <div className="companyInfo-title">
                    <span className="companyInfo-title-text">기업정보</span>
                    <span className="companyInfo-relayout" onClick={this.infoSave.bind(this)}>[저장]</span>
                </div>
                <div className="companyInfo-content">
                    <div className="companyInfo-content-left">
                        <div className="phone">
                            <span className="phone-title">전화번호</span>
                            <input type="text"></input>
                        </div>
                        <div className="email">
                                <span className="email-title">이메일</span>
                                <input type="text"></input>
                        </div>
                        <div className="site">
                                <span className="site-title" >사이트</span>
                                <input type="text"></input>
                        </div>
                        <div className="address">
                                <span className="address-title">주소</span>
                                <input type="text"></input>
                        </div>
                    </div>
                    <div className="companyInfo-content-right">
                        <div className="wontjob">
                                <span className="wontjob-title">기업설립일</span>
                                <input type ="date" className="" ></input>
                        </div>
                        <div className="university">
                                <span className="university-title">사업자번호</span>
                                <input type ="text" className="" ></input>
                        </div>
                        <div className="workdate">
                                <span className="workdate-title">기업대표</span>
                                <input type ="text" className="" ></input>
                        </div>
                        <div className="address">
                                <span className="address-title">채용여부</span>
                                <select className="address-do">
                                    <option>미채용</option>
                                    <option>채용중</option>
                                </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CompanyInfoForm;