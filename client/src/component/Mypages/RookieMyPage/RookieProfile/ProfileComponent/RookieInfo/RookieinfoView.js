import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt,faPhoneAlt,faAt,faGlobe,faMapMarkerAlt,faUserGraduate,faCalendarAlt,faBriefcase } from '@fortawesome/free-solid-svg-icons'

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
        this.props.infochanges(false)
    }
    render() {
        const {user} = this.props;
        return (
               <div>
                    <div className="rookieInfo-title">
                        <span className="rookieInfo-title-text">개인정보</span>
                        <span className="rookieInfo-relayout" onClick={this.setInfo.bind(this)}>[편집]</span>
                    </div>
                    <div className="rookieInfo-content">
                        <div className="rookieInfo-content-left">
                            <div className="phone">
                             <span className="info-icons"><FontAwesomeIcon icon={faPhoneAlt} size="1x"/></span>
                                <span className="phone-title">전화번호</span>
                                <span className="phone-info">{user.userPhone}</span>
                            </div>
                            <div className="email">
                             <span className="info-icons"><FontAwesomeIcon icon={faAt} size="1x"/></span>
                                <span className="email-title">이메일</span>
                                <span className="email-info">{user.user.email}</span>
                            </div>
                            <div className="site">
                              <span className="info-icons"><FontAwesomeIcon icon={faGlobe} size="1x"/></span>
                                <span className="site-title" >사이트</span>
                                <span className="site-info">www.ruda.com</span>
                            </div>
                            <div className="address">
                            <span className="info-icons"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x"/></span>
                                <span className="address-title">거주지</span>
                                <span className="address-info">{user.userAdd}</span>
                            </div>
                        </div>
                        <div className="rookieInfo-content-right">
                            <div className="wontjob">
                                <span className="info-icons"><FontAwesomeIcon icon={faBriefcase} size="1x"/></span>
                                <span className="wontjob-title">희망직무</span>
                                <span className="wontjob-info">프론트엔드개발자</span>
                            </div>
                            <div className="university">
                             <span className="info-icons"><FontAwesomeIcon icon={faUserGraduate} size="1x"/></span>
                                <span className="university-title">대학교/학과</span>
                                <span className="university-info">{user.userUnvcity}/{user.userSubject}</span>
                            </div>
                           
                            <div className="workdate">
                                <span className="info-icons"><FontAwesomeIcon icon={faCalendarAlt} size="1x"/></span>
                                <span className="workdate-title">근무날짜</span>
                                <span className="workdate-info">2020-02-02</span>
                            </div>
                            <div className="trainingdate">
                                <span className="info-icons"><FontAwesomeIcon icon={faCalendarAlt} size="1x"/></span>
                                <span className="trainingdate-title">실습날짜</span>
                                <span className="trainingdate-info">2020-02-02</span>
                            </div>
                            
                        </div>
                    </div>
               </div>

        );
    }
}

export default RookieinfoView;