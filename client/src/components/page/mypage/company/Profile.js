import React, { Component } from 'react';
import Chart from '../../../component/Chart';
import TagChip from '../../../component/TagChip';

import EditIcon from '@material-ui/icons/Edit';
//import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import HouseIcon from '@material-ui/icons/House';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            imgPreview:"",
        }
    }

    render() {
        //const{imgPreview}=this.state;
        const { companyInfo } = this.props;
        const tag = companyInfo.companyTags;
        const Request = companyInfo.companyRequest;
        const Welfare = companyInfo.companyWelfare;
        const Rule = companyInfo.companyRule;

        return companyInfo ? (
            <div className="Mypage-profile">
                <div className="Mypage-profile-Maininfo">
                    <div className="Mypage-profile-content-mainprofile">
                       <div className="Mypage-profile-content-userinfo">
                            <div className="Mypage-profile-content-userinfo-profile">
                               <div className="profile-profile">
                                    <p className="profile-profile-title">프로필</p>
                               </div>
                                <img width="100" className="profileimg"src={companyInfo.companyImageUrl || "/Image/login_img.png"} alt="IMG"></img>
                                <p className="profile-username">{companyInfo.companyName}</p>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >INTRO</p><hr></hr>
                                    <p>{companyInfo.companyIntro}</p><hr></hr>
                                </div>

                                {/* 인포 */}
                                <div  className="profile-userinfo">
                                    <p className="profile-userinfo-title" >INFO</p><hr></hr>
                                    <div className="profile-text">
                                        <EmailIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.user.email}</p>
                                    </div>
                                    <div className="profile-text">
                                        <LanguageIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p><a href="/">www.highrookie.com</a></p>
                                    </div>
                                    <div className="profile-text">
                                        <PhoneIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyPhone}</p>
                                    </div>
                                    <div className="profile-text">
                                        <HouseIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyAdd}</p>
                                    </div>
                                    <div className="profile-text">
                                        <SchoolIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>/</p>
                                    </div>
                                    <div className="profile-text">
                                        <LocalPlayIcon  style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>군대체복무가능</p>
                                    </div>
                                </div>
                                {/* 포지션 */}
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >POSITION</p><hr></hr>
                                    <div className="profile-text">
                                        <WorkIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyField} </p>
                                    </div>
                                    <div className="profile-text">
                                        <AssignmentIndIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyWorkDateState}</p>
                                    </div>
                                    <div className="profile-text">
                                        <CalendarTodayIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyWorkDate}</p>
                                    </div>
                                    
                                </div>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >COUNT</p><hr></hr>
                                    <div className="profile-text">
                                        <FavoriteIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyLike}명이 좋아합니다. </p>
                                    </div>
                                    <div className="profile-text">
                                        <PeopleIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{companyInfo.companyClick}명이 방문하였습니다. </p>
                                    </div>
                                </div>
                                <button className="profile-edit" ><EditIcon style={{fontSize:"medium",margin:"5px"}}/>프로필수정</button>
                            </div>
                            <div className="Mypage-profile-content-userinfo-data">
                                <div className="Mypage-profile-content-userinfo-info">
                                    <div className="Mypage-profile-content-userinfo-info">
                                        <div className="profile-keyword-info">
                                            <p className="profile-keyword-title">기술스택</p>
                                            <div className="stack">
                                            {
                                                    tag.map(function(str,i){
                                                    return <div className="chip-margin" key={i}>
                                                        <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                    </div>;
                                                    })
                                                }
                                            </div>
                                            <p className="profile-keyword-title">채용조건</p>
                                            <div className="stack">
                                            {
                                                    Request.map(function(str,i){
                                                    return <div className="chip-margin" key={i}>
                                                        <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                    </div>;
                                                    })
                                                }
                                            </div>
                                            <p className="profile-keyword-title">사내복지</p>
                                            <div className="stack">
                                            {
                                                    Welfare.map(function(str,i){
                                                    return <div className="chip-margin" key={i}>
                                                        <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                    </div>;
                                                    })
                                                }
                                            </div>
                                            <p className="profile-keyword-title">사내규칙</p>
                                            <div className="stack">
                                            {
                                                    Rule.map(function(str,i){
                                                    return <div className="chip-margin" key={i}>
                                                        <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                    </div>;
                                                    })
                                                }
                                            </div>
                                            <div>
                                                <p className="profile-skill-title">수상이력</p>
                                                <div className="profile-skill-info-Awards">
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        ) : <div></div>
    }
}

export default Profile;