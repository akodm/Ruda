import React, { Component } from 'react';

class RookieinfoView extends Component {
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
                    <div className="rookieInfo-title">
                        <span className="rookieInfo-title-text">개인정보</span>
                        <span className="rookieInfo-relayout" onClick={this.setInfo.bind(this)}>[편집]</span>
                    </div>
                    <div className="rookieInfo-content">
                        <div className="rookieInfo-content-left">
                            <div className="phone">
                                <span className="phone-title">전화번호</span>
                                <span className="phone-info">010-1234-1234</span>
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
                                <span className="address-title">거주지</span>
                                <span className="address-info">경기도 안양시</span>
                            </div>
                        </div>
                        <div className="rookieInfo-content-right">
                            <div className="workdate">
                                <span className="workdate-title">근무날짜</span>
                                <span className="workdate-info">2020-02-02</span>
                            </div>
                            <div className="trainingdate">
                                <span className="trainingdate-title">실습날짜</span>
                                <span className="trainingdate-info">2020-02-02</span>
                            </div>
                            <div className="university">
                                <span className="university-title">대학교/학과</span>
                                <span className="university-info">대림대학교/모바일인터넷과</span>
                            </div>
                            <div className="wontjob">
                                <span className="wontjob-title">희망직무</span>
                                <span className="wontjob-info">프론트엔드개발자</span>
                            </div>
                        </div>
                    </div>
               </div>

        );
    }
}

export default RookieinfoView;