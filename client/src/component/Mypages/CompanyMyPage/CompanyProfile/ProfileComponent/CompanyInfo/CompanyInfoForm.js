import React, { Component } from 'react';

class CompanyInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    infoSave(){
        this.props.infochanges(true)
    }
    render() {
        const {user}=this.props;
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
                            <input type="text" value={user.companyPhone}></input>
                        </div>
                        <div className="email">
                                <span className="email-title">이메일</span>
                                <input type="text"  value={user.user.email}></input>
                        </div>
                        <div className="site">
                                <span className="site-title" >사이트</span>
                                <input type="text" ></input>
                        </div>
                        <div className="address">
                                <span className="address-title">주소</span>
                                <input type="text" value={user.companyAdd}></input>
                        </div>
                    </div>
                    <div className="companyInfo-content-right">
                        <div className="wontjob">
                                <span className="wontjob-title">기업설립일</span>
                                <input type ="text" className=""  value={user.companySince}></input>
                        </div>
                        <div className="university">
                                <span className="university-title">사업자번호</span>
                                <input type ="text" className="" value={user.companySince} ></input>
                        </div>
                        <div className="workdate">
                                <span className="workdate-title">기업대표</span>
                                <input type ="text" className="" value={user.companyCEO} ></input>
                        </div>
                        <div className="address">
                                <span className="address-title">사업분야</span>
                                <input type ="text" className="" value={user.companyField} ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CompanyInfoForm;