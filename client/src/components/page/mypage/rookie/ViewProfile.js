import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../client-configs';

import Chart from '../../../component/Chart';
import TagChip from '../../../component/TagChip';
import ProposalPopup from '../../../component/ProposalPopup';

import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
//import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import HouseIcon from '@material-ui/icons/House';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';


import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class ViewProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            imgPreview:"",
            shareAlert:"none",
            url :new URL(window.location.href),
            success:"none",

            open : false,
        }
    }
    savepdf(){
        const {userInfo}=this.props;
        document.title = userInfo.userName+'님의 이력서';
        window.print();
    }

    copyCodeToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        console.log(dummy);
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.setState({
            success:"flex",
        })
    }

    shareLink(){this.setState({shareAlert:"flex",})}
    
    close(){this.setState({shareAlert:"none",})}

    EditProfile(){this.props.change(false)}

    async likeSet() {
        const { like, likeToggle, userInfo, user, loginState, infoMount, boardMount } = this.props;
        if(loginState) {
            alert("본인을 추천 할 수 없습니다.");
            return;
        }
        if(!user.email) { alert("로그인 후 이용해주세요."); return; }
        try {
            if(like) {
                let result = axios.delete(`${config.app.s_url}/likes/delete?userId=${user.id}&infoUserId=${userInfo.userId}`);
                let count = axios.get(`${config.app.s_url}/userInfos/decrement?userId=${userInfo.userId}`);

                await Promise.all([result, count]).then(data => {
                    result = data[0];
                });

                if(!result.data) {
                    alert("추천 기능이 제대로 동작하지 않았습니다. 잠시 후 시도해 주세요.");
                    return;
                }

                likeToggle(false);
            }  else {
                let result = axios.post(`${config.app.s_url}/likes/create`, {
                    infoUserId : userInfo.userId, userId : user.id,
                });
                let count = axios.get(`${config.app.s_url}/userInfos/increment?userId=${userInfo.userId}`);

                await Promise.all([result, count]).then(data => {
                    result = data[0];
                });

                if(!result.data) {
                    alert("추천 기능이 제대로 동작하지 않았습니다. 잠시 후 시도해 주세요.");
                    return;
                }
                likeToggle(true);
            }

            infoMount();
            boardMount();
        } catch(err) {
            console.log("추천 기능 도중 에러 발생 : ");
        }
    }

    proposalPopupOpenClose(bool) { this.setState({ open : bool }) }
    
    render() {
        const { userInfo,awardData,certificateData,activityData,like,loginState,user,mailReload } = this.props;
        const Tag = userInfo.userTags;
        const Keyword = userInfo.userKeyword;
        const Specialty = userInfo.userSpecialty;
        const {shareAlert,success,open}=this.state;
        return userInfo ? (
            <div className="Mypage-profile">
                {/* 공유하기 팝업 */}
                <div className="shareAlert" style={{display:shareAlert}}>
                    <span className="close-shareAlert" style={{cursor:"pointer"}} onClick={this.close.bind(this)}>X</span>
                    <p>더 많은 사람이 볼 수 있도록 공유해보세요!</p>
                    <div style={{width:"80%"}}>
                        <div className="shareAlert-input">
                            <input className="shareAlert-input-box" readOnly value={window.location.href} ></input>
                            <button className="shareAlert-btns" onClick={() => this.copyCodeToClipboard()}>링크복사</button>    
                        </div>
                        <p style={{display:success,fontSize:"14px",color:"#11addd"}}>복사가 완료되었습니다.</p> 
                    </div>
                </div>

                {/* 제안하기 팝업 */}
                { open && <ProposalPopup mailReload={() => mailReload()} guide={"구직자에게 제안할 내용을 작성해주세요."} text={"채용/실습 제안하기"} user={user} info={userInfo} proposalPopupOpenClose={this.proposalPopupOpenClose.bind(this)} /> }

                <div className="Mypage-profile-Maininfo">
                    <div className="Mypage-profile-content-mainprofile">
                       <div className="Mypage-profile-content-userinfo">
                            <div className="Mypage-profile-content-userinfo-profile">
                                <div className="profile-profile">
                                    <p>프로필</p>
                                    <div className="profile-user-state">
                                        {
                                            (userInfo.userWorkDateState==="미정"&&
                                            <>
                                                <div className="profile-user-state-none"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>구직/실습 미정</p>
                                            </>
                                            )||
                                            (userInfo.userWorkDateState==="실습희망"&&
                                            <>
                                                <div className="profile-user-state-training"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>실습</p>
                                            </>
                                            )||
                                            (userInfo.userWorkDateState==="취업희망"&&
                                            <>
                                                <div className="profile-user-state-hire" style={{marginRight:"5px"}}></div><p style={{fontSize:"small",marginLeft:"10px"}}>구직</p>
                                            </>
                                            )||
                                            (userInfo.userWorkDateState==="실습후 취업희망"&&
                                            <>
                                                <div className="profile-user-state-training"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>실습</p>
                                                <div className="profile-user-state-hire" style={{marginRight:"5px"}}></div><p style={{fontSize:"small",marginLeft:"10px"}}>구직</p>
                                            </>
                                            )
                                        }
                                    </div>  
                                </div>
                                <Avatar alt="img" src={userInfo.userImageUrl || "/Image/login_img.png"} style={{width:"100px", height:"100px"}} />
                                <p className="profile-username">{userInfo.userName}</p>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >INTRO</p>
                                    <p>{userInfo.userIntro}</p>
                                </div>

                                {/* 인포 */}
                                <div  className="profile-userinfo"><hr></hr>
                                    <p className="profile-intro-title" >INFO</p>
                                    <div className="profile-text">
                                        <EmailIcon style={{fontSize:"medium"}}/>
                                        <p>{userInfo.user.email}</p>
                                    </div>
                                    {userInfo.userUrl &&
                                     <div className="profile-text">
                                        <LanguageIcon style={{fontSize:"medium"}}/>
                                        <p><a href={userInfo.userUrl}>{userInfo.userUrl}</a></p>
                                    </div>
                                    }
                                    <div className="profile-text">
                                        <PhoneIcon style={{fontSize:"medium"}}/>
                                        <p>{userInfo.userPhone}</p>
                                    </div>
                                    <div className="profile-text">
                                        <HouseIcon style={{fontSize:"medium"}}/>
                                        <p>{userInfo.userAdd}</p>
                                    </div>
                                    <div className="profile-text">
                                        <SchoolIcon style={{fontSize:"medium"}}/>
                                        <p>{userInfo.userUnvcity}/{userInfo.userAttend}</p>
                                    </div>
                                    {userInfo.userMilitary==="해당없음"?"":
                                    <div className="profile-text">
                                        <LocalPlayIcon  style={{fontSize:"medium"}}/>
                                        <p>{userInfo.userMilitary}</p>
                                    </div>}
                                </div>
                                {/* 포지션 */}
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >POSITION</p>
                                    <div className="profile-text">
                                        <WorkIcon style={{fontSize:"medium"}}/>
                                        <p>{userInfo.userField} </p>
                                    </div>
                                    <div className="profile-text">
                                        <AssignmentIndIcon style={{fontSize:"medium"}}/>
                                        <p>근무형태:{userInfo.userWorkDateState}</p>
                                    </div>
                                    {userInfo.userWorkDateState !=="미정" &&
                                    <div className="profile-text">
                                        <CalendarTodayIcon style={{fontSize:"medium"}}/>
                                        {userInfo.userWorkDate !=="직접입력"?
                                        <p>근무날짜:{userInfo.userWorkDate}</p>:
                                        <p>근무날짜:{userInfo.userTraningDate}</p>
                                        } 
                                    </div>
                                    }
                                </div>
                                <div className="profile-intro count"><hr></hr>
                                    <p className="profile-intro-title" >COUNT</p>
                                    <div className="profile-text">
                                        <FavoriteIcon style={{fontSize:"medium",margin:"10px"}}/>
                                        <p>{userInfo.userLike}명이 좋아합니다. </p>
                                    </div>
                                </div>
                                <button className="profile-edit" onClick={this.EditProfile.bind(this)}> <EditIcon style={{fontSize:"medium",height:"40px"}}/>프로필수정</button>
                                <div className="Mypage-pages-title">
                                    <div className="Mypage-pages-title-icons">    
                                        <div className="Mypage-pages-title-icons-icon">
                                            <PrintIcon onClick={this.savepdf.bind(this)}/>
                                        </div>
                                        <div className="Mypage-pages-title-icons-icon">
                                            <ShareIcon onClick={this.shareLink.bind(this)}/>
                                        </div>
                                        <div className="Mypage-pages-title-icons-icon" onClick={this.likeSet.bind(this)}>
                                            {!like ? <FavoriteBorderIcon /> : <FavoriteIcon style={{ color : "#11addd"}}/>}
                                        </div>
                                        {
                                           !loginState && user.email &&
                                           <div className="Mypage-pages-title-icons-icon-c">
                                                <MailOutlineIcon onClick={() => this.setState({ open : true })}/>
                                            </div>
                                       }
                                    </div>
                                </div>
                            </div>
                            <div className="Mypage-profile-content-userinfo-data">
                                <div className="profile-chart-info-title">
                                    <div className="profile-title-text">그래프</div>
                                    <div className="profile-title-line"></div>
                                </div>
                                <div className="Mypage-profile-content-userinfo-graph">
                                    <Chart  />
                                </div>
                                <div className="Mypage-profile-content-userinfo-info">
                                        <div className="profile-keyword-info">
                                                <div className="profile-chart-info-title"> 
                                                    <div className="profile-title-text">기술스택</div>
                                                    <div className="profile-title-line"></div>
                                                </div>
                                            {Tag[0] ?    
                                                <div className="stack">
                                                    {
                                                        Tag.map(function(str,i){
                                                        return <div className="chip-margin" key={i}>
                                                            <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                        </div>;
                                                        })
                                                    }
                                                </div>
                                            : <p className="addspan">프로필 수정을 통해 기술스택을 추가해주세요</p>}
                                            <div>
                                                <div className="profile-chart-info-title">
                                                    <div className="profile-title-text">키워드</div>
                                                    <div className="profile-title-line"></div>
                                                </div>
                                            </div>
                                            {(Keyword[0] || Specialty[0]) ?
                                            <div>
                                                {Keyword[0] &&
                                                <div>
                                                    <p className="profile-keyword-text">성격</p>
                                                    <div className="keyword">
                                                        {
                                                            Keyword.map(function(str,i){
                                                            return <div className="chip-margin" key={i}>
                                                                <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                            </div>;
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                }
                                                {Specialty[0] &&
                                                <div>
                                                    <p className="profile-keyword-text">취미/특기</p>
                                                    <div className="keyword">
                                                        {
                                                            Specialty.map(function(str,i){
                                                            return <div className="chip-maurgin" key={i}>
                                                                <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                            </div>;
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                             }
                                             </div>
                                        :<p className="addspan">프로필 수정을 통해 키워드를 추가해주세요</p>}       
                                        <div className="profile-skill-info">
                                          
                                            <div>
                                                <div className="profile-chart-info-title">
                                                    <div className="profile-title-text">자격증</div>
                                                    <div className="profile-title-line"></div>
                                                </div>
                                                {certificateData[0] ?
                                                <div className="profile-skill-info-certificate">
                                                    {certificateData.map(function(data,i){
                                                        return <div className="profile-skill-info-certificate-text" key={i}>
                                                        <p>{data.certificateCate}</p>
                                                        <p>{data.certificateName}</p>
                                                        <p>{data.certificateDate}</p>
                                                    </div>
                                                })}
                                                </div>
                                                :<p className="addspan">프로필 수정을 통해 자격증을 추가해주세요</p>}
                                            </div>
                                        
                                   
                                            <div>
                                                <div className="profile-chart-info-title">
                                                    <div className="profile-title-text">수상경력</div>
                                                    <div className="profile-title-line"></div>
                                                </div>
                                                {awardData[0]?
                                                <div className="profile-skill-info-Awards">
                                                        {awardData.map(function(data,i){
                                                            return   <div className="profile-skill-info-Awards-text" key={i}>
                                                            <p>{data.awardCate}</p>
                                                            <p>{data.awardName}</p>
                                                            <p>{data.awardDate}</p>
                                                        </div>
                                                    })}
                                                </div>:
                                                <p className="addspan">프로필 수정을 통해 수상경력을 추가해주세요</p>
                                                }
                                                
                                            </div>
                                          
                                            <div className="Mypage-profile-content-storyprofile">
                                                <div className="profile-inschool">
                                                    <div className="profile-chart-info-title">
                                                        <div className="profile-title-text">교내활동</div>
                                                        <div className="profile-title-line"></div>
                                                    </div>
                                                    {activityData[1]?
                                                        <div>
                                                            {
                                                            activityData.map(function(data,i){
                                                                return data.activityCate === "교내" &&
                                                                <div className="profile-skill-info-Awards-text" key={i}>
                                                                       <p>{data.activityStartDate}{data.activityEndDate && "~"+data.activityEndDate}</p>
                                                                    <p>{data.activityName}</p>
                                                                </div>
                                                            })
                                                        }  
                                                    </div>:<p className="addspan">프로필 수정을 통해 교내활동을 추가해주세요</p>
                                                    }
                                                </div>
                                                <div className="profile-outschool">
                                                    <div className="profile-chart-info-title">
                                                        <div className="profile-title-text">교외활동</div>
                                                        <div className="profile-title-line"></div>
                                                    </div>
                                                    {activityData[1]? 
                                                        <div>
                                                            { 
                                                                activityData.map(function(data,i){
                                                                    return data.activityCate === "교외" &&
                                                                    <div className="profile-skill-info-Awards-text" key={i}>
                                                                        <p>{data.activityStartDate}{data.activityEndDate && "~"+data.activityEndDate}</p>
                                                                        <p>{data.activityName}</p>
                                                                    </div>
                                                                })
                                                            }  
                                                        </div>:<p className="addspan">프로필 수정을 통해 교외활동을 추가해주세요</p>
                                                    }
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


export default ViewProfile;