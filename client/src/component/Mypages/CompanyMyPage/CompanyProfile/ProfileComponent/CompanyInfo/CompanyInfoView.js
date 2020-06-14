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
        this.props.infochanges(false)
    }
    render() {
        const {user} =this.props
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
                                <span className="phone-info">{user.companyPhone}</span>
                            </div>
                            <div className="email">
                                <span className="email-title">이메일</span>
                                <span className="email-info">{user.user.email}</span>
                            </div>
                            <div className="site">
                                <span className="site-title" >사이트</span>
                                <span className="site-info"></span>
                            </div>
                            <div className="address">
                                <span className="address-title">주소</span>
                                <span className="address-info">{user.companyAdd}</span>
                            </div>
                        </div>
                        <div className="companyInfo-content-right">
                            <div className="workdate">
                                <span className="workdate-title">기업설립일</span>
                                <span className="workdate-info">{user.companySince}</span>
                            </div>
                            <div className="trainingdate">
                                <span className="trainingdate-title">사업자번호</span>
                                <span className="trainingdate-info">{user.companyPhone}</span>
                            </div>
                            <div className="university">
                                <span className="university-title">기업대표</span>
                                <span className="university-info">{user.companyCEO}</span>
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