import React, { Component, useReducer } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt,faPhoneAlt,faAt,faGlobe,faMapMarkerAlt,faUserGraduate,faCalendarAlt,faBriefcase } from '@fortawesome/free-solid-svg-icons'
class RookieinfoFrom extends Component {
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
                <div className="rookieInfo-title">
                    <span className="rookieInfo-title-text">개인정보</span>
                    <span className="rookieInfo-relayout" onClick={this.infoSave.bind(this)}>[저장]</span>
                </div>
                <div className="rookieInfo-content">
                    <div className="rookieInfo-content-left">
                        <div className="phone">
                            <span className="info-icons"><FontAwesomeIcon icon={faPhoneAlt} size="1x"/></span>
                            <span className="phone-title" >전화번호</span>
                            <input type="text"value={user.userPhone}></input>
                        </div>
                        <div className="email">
                             <span className="info-icons"><FontAwesomeIcon icon={faAt} size="1x"/></span>
                            <span className="email-title" >이메일</span>
                            <input type="text" value={user.user.email}></input>
                        </div>
                        <div className="site">
                            <span className="info-icons"><FontAwesomeIcon icon={faGlobe} size="1x"/></span>
                            <span className="site-title" >사이트</span>
                            <input type="text"></input>
                        </div>
                        <div className="address">
                            <span className="info-icons"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x"/></span>
                            <span className="address-title">거주지</span>
                            <input type="text"value={user.userAdd}/>
                        </div>
                    </div>
                    <div className="rookieInfo-content-right">
                        <div className="wontjob">
                                 <span className="info-icons"><FontAwesomeIcon icon={faBriefcase} size="1x"/></span>
                                <span className="wontjob-title">희망직무</span>
                                <input type ="text" className="" value={user.userField} ></input>
                        </div>
                        <div className="university">
                                 <span className="info-icons"><FontAwesomeIcon icon={faUserGraduate} size="1x"/></span>
                                <span className="university-title">대학교/학과</span>
                                <input type ="text" className="" value={user.userUnvcity+"/"+user.userUnvcity}></input>
                        </div>
                        <div className="workdate">
                                 <span className="info-icons"><FontAwesomeIcon icon={faCalendarAlt} size="1x"/></span>
                                <span className="workdate-title">근무날짜</span>
                                <input type ="text" className="" value={user.userWorkDate} ></input>
                        </div>
                        <div className="trainingdate">
                                <span className="info-icons"><FontAwesomeIcon icon={faCalendarAlt} size="1x"/></span>
                                <span className="trainingdate-title">실습날짜</span>
                                <input type ="text" className="" ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieinfoFrom;