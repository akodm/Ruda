import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import HouseIcon from '@material-ui/icons/House';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import Chart from '../../component/Chart';
import TagChip from '../../component/TagChip';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';
import BookIcon from '@material-ui/icons/Book';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            imgPreview:"",
           
        }
           

    }
    render() {
        const{imgPreview}=this.state;
        return (
            <div className="Mypage-profile">
                <div className="Mypage-profile-Maininfo">
                    <div className="Mypage-profile-content-mainprofile">
                       <div className="Mypage-profile-content-userinfo">
                            <div className="Mypage-profile-content-userinfo-profile">
                               <div className="profile-profile">
                                    <p className="profile-profile-title">프로필</p>
                               </div>
                                <img width="100" className="profileimg"src="/Image/login_img.png" alt="IMG"></img>
                                <p className="profile-username">고유리</p>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >INTRO</p><hr></hr>
                                    <p>안녕하세요 프론트 개발자가 되고싶은 고유리입니다.</p><hr></hr>
                                </div>
                                <div  className="profile-userinfo">
                                    <p className="profile-userinfo-title" >INFO</p><hr></hr>
                                    <div className="profile-text">
                                        <EmailIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>abc@abc.com</p>
                                    </div>
                                    <div className="profile-text">
                                        <LanguageIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>www.highrookie.com</p>
                                    </div>
                                    <div className="profile-text">
                                        <PhoneIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>010-1234-1234</p>
                                    </div>
                                    <div className="profile-text">
                                        <HouseIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>서울특별시 관악구 난곡동 </p>
                                    </div>
                                    <div className="profile-text">
                                        <SchoolIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>대림대학교/재학중 </p>
                                    </div>
                                    <div className="profile-text">
                                        <LocalPlayIcon  style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>군필/공군 </p>
                                    </div>
                                </div>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >POSITION</p><hr></hr>
                                    <div className="profile-text">
                                        <WorkIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>웹 프론트엔드개발 </p>
                                    </div>
                                    <div className="profile-text">
                                        <AssignmentIndIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>현장실습생/구직자 </p>
                                    </div>
                                    <div className="profile-text">
                                        <CalendarTodayIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>2020/12/31이후 </p>
                                    </div>
                                    
                                </div>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >COUNT</p><hr></hr>
                                    <div className="profile-text">
                                        <FavoriteIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>150명이 좋아합니다. </p>
                                    </div>
                                    <div className="profile-text">
                                        <PeopleIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>1234명이 방문하였습니다. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="Mypage-profile-content-userinfo-data">
                                <div className="Mypage-profile-content-userinfo-graph">
                                    <div className="profile-chart-info">
                                       <p className="profile-chart-info-title">차트</p>
                                       <p className="profile-chart-info-text">6개의 자격증을 보유하고 있습니다.</p>
                                       <p className="profile-chart-info-text">5번의 수상이력이 있습니다.</p>
                                       <p className="profile-chart-info-text">4번의 교외활동을 했습니다.</p>
                                       <p className="profile-chart-info-text">3번의 교내활동을 했습니다.</p>
                                       <p className="profile-chart-info-text">2개의 기술스택이 있습니다.</p>
                                       <p className="profile-chart-info-text">1개의 포트폴리오가 있습니다.</p>
                                    </div>
                                    <div className="profile-chart">
                                    <Chart  />
                                    </div>
                                </div>
                                <div className="Mypage-profile-content-userinfo-info">
                                    <div className="Mypage-profile-content-userinfo-info">
                                        <div className="profile-keyword-info">
                                            <p className="profile-keyword-title">기술능력</p>
                                            <div className="stack">
                                                <TagChip/><TagChip/><TagChip/><TagChip/><TagChip/>
                                            </div>
                                            <p className="profile-keyword-title">키워드</p>
                                            <p className="profile-keyword-text">성격</p>
                                            <div className="keyword">
                                                <TagChip/><TagChip/><TagChip/><TagChip/><TagChip/>
                                            </div>
                                            <p className="profile-keyword-text">취미/특기</p>
                                            <div className="keyword">
                                                <TagChip/><TagChip/><TagChip/><TagChip/><TagChip/>
                                            </div>
                                        </div>
                                        <div className="profile-skill-info">
                                            <div>
                                                <p className="profile-skill-title">자격증</p>
                                                <div className="profile-skill-info-certificate">
                                                    <div className="profile-skill-info-certificate-text">
                                                        <p>대한상공회</p>
                                                        <p>정보처리산업기사1급</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-certificate-text">
                                                        <p>대한상공회</p>
                                                        <p>정보처리산업기사1급</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-certificate-text">
                                                        <p>대한상공회</p>
                                                        <p>정보처리산업기사1급</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="profile-skill-title">수상이력</p>
                                                <div className="profile-skill-info-Awards">
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>교내</p>
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>교내</p>
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                    <div className="profile-skill-info-Awards-text">
                                                        <p>교내</p>
                                                        <p>대림대학교</p>
                                                        <p>캡스톤디자인</p>
                                                        <p>2020/02/02</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Mypage-profile-content-storyprofile">
                                                <div className="profile-inschool">
                                                    <p className="profile-inschool-title">교내활동</p>
                                                    <div>
                                                        <p className="profile-inschool-text">대림테크페어 참여</p>
                                                        <p className="profile-inschool-text">동아리회장</p>
                                                        <p className="profile-inschool-text">학생회활동</p>
                                                    </div>
                                                </div>
                                                <div className="profile-outschool">
                                                    <p className="profile-outschool-title">교외활동</p>
                                                    <div>
                                                        <p className="profile-outschool-text">안양시공모전참여</p>
                                                        <p className="profile-outschool-text">동아리회장</p>
                                                        <p className="profile-outschool-text">학생회활동</p>
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
        );
    }
}

export default Profile;