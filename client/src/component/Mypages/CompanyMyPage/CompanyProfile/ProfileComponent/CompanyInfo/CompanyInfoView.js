import React, { Component } from 'react';

class CompanyInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        try {

        } catch(err) {
            console.log(err);
        }
    }

    setInfo(){
        this.props.infochanges(true)
    }
    render() {
        return (
               <div>
                    <div className="companyInfo-title">
                        <span className="companyInfo-title-text">기업정보</span>
                        <span className="companyInfo-relayout" onClick={this.setInfo.bind(this)}>[편집]</span>
                    </div>
                    <div className="companyInfo-content">
                        <div className="companyInfo-content-left">
                            <div className="phone">
                                <span className="phone-title">전화번호</span>
                                <span className="phone-info">02-123-1234</span>
                            </div>
                            <div className="email">
                                <span className="email-title">이메일</span>
                                <span className="email-info">abc@ruda.com</span>
                            </div>
                            <div className="site">
                                <span className="site-title" >사이트</span>
                                <span className="site-info">www.ruda.com</span>
                            </div>
                            <div className="address">
                                <span className="address-title">주소</span>
                                <span className="address-info">경기도 안양시 만안구 비산동</span>
                            </div>
                        </div>
                        <div className="companyInfo-content-right">
                            <div className="workdate">
                                <span className="workdate-title">기업설립일</span>
                                <span className="workdate-info">2020-02-02</span>
                            </div>
                            <div className="trainingdate">
                                <span className="trainingdate-title">사업자번호</span>
                                <span className="trainingdate-info">0123456789</span>
                            </div>
                            <div className="university">
                                <span className="university-title">기업대표</span>
                                <span className="university-info">조준명</span>
                            </div>
                            <div className="wontjob">
                                <span className="wontjob-title">채용여부</span>
                                <span className="wontjob-info">채용중</span>
                            </div>
                        </div>
                    </div>
               </div>

        );
    }
}

export default CompanyInfoView;