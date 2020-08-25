import React, { Component } from 'react';

import axios from 'axios';
import config from '../../../../client-configs';
import TagChip from '../../../component/TagChip';
import ProposalPopup from '../../../component/ProposalPopup';

import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import HouseIcon from '@material-ui/icons/House';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FaceIcon from '@material-ui/icons/Face';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PeopleIcon from '@material-ui/icons/People';
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
        document.title = '이름님의 이력서';
        window.print();
    }

    copyCodeToClipboard = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
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
        const { like, likeToggle, user, loginState, companyInfo, infoMount, boardMount } = this.props;
        if(loginState) {
            alert("본인을 추천 할 수 없습니다.");
            return;
        }
        if(!user.email) { alert("로그인 후 이용해주세요."); return; }
        try {
            if(like) {
                let result = axios.delete(`${config.app.s_url}/likes/delete?userId=${user.id}&infoUserId=${companyInfo.userId}`);
                let count = axios.get(`${config.app.s_url}/companyInfos/decrement?userId=${companyInfo.userId}`);

                await Promise.all([result, count]).then(data => {
                    result = data[0];
                });

                if(!result.data) {
                    alert("추천 기능이 제대로 동작하지 않았습니다. 잠시 후 시도해 주세요.");
                    return;
                } else {
                    alert("추천을 취소합니다.");
                }

                likeToggle(false);
            }  else {
                let result = axios.post(`${config.app.s_url}/likes/create`, {
                    infoUserId : companyInfo.userId, userId : user.id,
                });
                let count = axios.get(`${config.app.s_url}/companyInfos/increment?userId=${companyInfo.userId}`);

                await Promise.all([result, count]).then(data => {
                    result = data[0];
                });

                if(!result.data) {
                    alert("추천 기능이 제대로 동작하지 않았습니다. 잠시 후 시도해 주세요.");
                    return;
                } else {
                    alert("추천하였습니다.");
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
        const { companyInfo,awardData,activityData,like,loginState,user,mailReload } = this.props;
        const tag = companyInfo.companyTags;
        const Request = companyInfo.companyRequest;
        const Welfare = companyInfo.companyWelfare;
        const Rule = companyInfo.companyRule;
        const {shareAlert,success,open}=this.state;
        return companyInfo ? (
            <div className="Mypage-profile">
                {/* 공유하기 팝업 */}
                <div className="shareAlert" style={{display:shareAlert}}>
                    <span className="close-shareAlert" onClick={this.close.bind(this)}>X</span>
                    <p>더 많은 사람이 볼 수 있도록 공유해보세요!</p>
                    <div style={{width:"80%"}}>
                        <div className="shareAlert-input">
                            <input className="shareAlert-input-box" readOnly value={window.location.href} ></input>
                            <button className="shareAlert-btn" onClick={() => this.copyCodeToClipboard()}>링크복사</button>    
                        </div>
                        <p style={{display:success,fontSize:"14px",color:"#11addd"}}>복사가 완료되었습니다.</p> 
                    </div>
                </div>

                {/* 제안하기 팝업 */}
                { open && <ProposalPopup mailReload={() => mailReload()} guide={"기업에게 전달할 내용을 작성해주세요."} text={"기업에게 메시지 보내기"} user={user} info={companyInfo} proposalPopupOpenClose={this.proposalPopupOpenClose.bind(this)} /> }

                <div className="Mypage-profile-Maininfo">
                    <div className="Mypage-profile-content-mainprofile">
                        <div className="Mypage-profile-content-userinfo">
                            <div className="Mypage-profile-content-userinfo-profile-c">
                                <div className="profile-profile">
                                    <p>프로필</p>
                                    <div className="profile-user-state">
                                        {
                                            (companyInfo.companyWorkCate==="미정"&&
                                            <>
                                                <div className="profile-user-state-none"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>채용/실습 미정</p>
                                            </>
                                            )||
                                            (companyInfo.companyWorkCate==="실습생채용"&&
                                            <>
                                                <div className="profile-user-state-training"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>실습채용</p>
                                            </>
                                            )||
                                            (companyInfo.companyWorkCate==="채용"&&
                                            <>
                                                <div className="profile-user-state-hire" style={{marginRight:"5px"}}></div><p style={{fontSize:"small",marginLeft:"10px"}}>채용</p>
                                            </>
                                            )||
                                            (companyInfo.companyWorkCate==="실습 후 채용"&&
                                            <>
                                                <div className="profile-user-state-training"style={{marginRight:"5px"}}></div><p style={{fontSize:"small", marginRight:"10px"}}>실습채용</p>
                                                <div className="profile-user-state-hire" style={{marginRight:"5px"}}></div><p style={{fontSize:"small",marginLeft:"10px"}}>채용</p>
                                            </>
                                            )
                                        }
                                    </div>
                                </div>
                                <Avatar alt="img" src={companyInfo.companyImageUrl || "/Image/login_img.png"} style={{width:"100px", height:"100px"}} />
                                <p className="profile-username">{companyInfo.companyName}</p>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >INTRO</p>
                                    <p>{companyInfo.companyIntro}</p>
                                </div>
                                {/* 인포 */}
                                <div  className="profile-userinfo"><hr></hr>
                                    <p className="profile-intro-title" >INFO</p>
                                    <div className="profile-text">
                                        <FaceIcon style={{fontSize:"medium"}}/>
                                        <p>대표: {companyInfo.companyCEO}</p>
                                    </div>
                                    <div className="profile-text">
                                        <LanguageIcon style={{fontSize:"medium"}}/>
                                        <p>{companyInfo.companyUrl}</p>
                                    </div>
                                    <div className="profile-text">
                                        <PhoneIcon style={{fontSize:"medium"}}/>
                                        <p>{companyInfo.companyPhone}</p>
                                    </div>
                                    <div className="profile-text">
                                        <HouseIcon style={{fontSize:"medium"}}/>
                                        <p>{companyInfo.companyAdd}</p>
                                    </div>
                                    {companyInfo.companyAgeAvg &&
                                        <div className="profile-text">
                                            <PeopleIcon style={{fontSize:"medium"}}/>
                                            <p>평균연령: {companyInfo.companyAgeAvg}세</p>
                                        </div>
                                    }
                                    <div className="profile-text">
                                        <ApartmentIcon style={{fontSize:"medium"}}/>
                                        <p>설립일: {companyInfo.companySince}</p>
                                    </div>
                                </div>
                                {/* 포지션 */}
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >POSITION</p>
                                    <div className="profile-text">
                                        <WorkIcon style={{fontSize:"medium"}}/>
                                        <p>{companyInfo.companyField} </p>
                                    </div>
                                    <div className="profile-text">
                                        <AssignmentIndIcon style={{fontSize:"medium"}}/>
                                        <p>채용형태:{companyInfo.companyWorkCate}</p>
                                    </div>
                                    {companyInfo.companyWorkCate !== "미정" &&
                                    <div className="profile-text">
                                        <CalendarTodayIcon style={{fontSize:"medium"}}/>
                                        {companyInfo.companyWorkDateState ==="직접입력"?
                                        <p>채용날짜:{companyInfo.companyWorkDate}</p>:
                                        <p>채용날짜:{companyInfo.companyWorkDateState}</p>
                                        } 
                                    </div>
                                    }
                                </div>
                                <div className="profile-intro"><hr></hr>
                                    <p className="profile-intro-title" >COUNT</p>
                                    <div className="profile-text">
                                        <FavoriteIcon style={{fontSize:"medium"}}/>
                                        <p>{companyInfo.companyLike}명이 좋아합니다. </p>
                                    </div>
                                </div>
                                {
                                    loginState ? <button className="profile-edit" onClick={this.EditProfile.bind(this)}><EditIcon style={{fontSize:"medium",height:"40px"}}/>프로필수정</button>
                                    :
                                    <div className="profile-edit-null"></div>
                                }
                                <div className="Mypage-pages-title">
                                    <div className="Mypage-pages-title-icons">    
                                        <div className="Mypage-pages-title-icons-icon-c">
                                            <PrintIcon onClick={this.savepdf.bind(this)}/>
                                        </div>
                                        <div className="Mypage-pages-title-icons-icon-c">
                                            <ShareIcon onClick={this.shareLink.bind(this)}/>
                                        </div>
                                        <div className="Mypage-pages-title-icons-icon-c" onClick={this.likeSet.bind(this)}>
                                            {!like ? <FavoriteBorderIcon />:<FavoriteIcon style={{ color : "#11addd"}}/>}
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
                                <div className="profile-keyword-info">
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">기술스택</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {tag[0]?
                                        <div className="stack">
                                            {
                                                tag.map(function(str,i){
                                                return <div className="chip-margin" key={i}>
                                                    <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                </div>;
                                                })
                                            }
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 기술스택을 추가해주세요" : "작성된 기술스택이 없습니다."}</p>
                                    }
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">채용조건</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {Request[0] ?
                                        <div className="stack">
                                            {
                                                Request.map(function(str,i){
                                                return <div className="chip-margin" key={i}>
                                                    <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                </div>;
                                                })
                                            }
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 채용조건을 추가해주세요" : "작성된 채용조건이 없습니다."}</p>
                                    }
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">사내복지</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {Welfare[0] ?
                                        <div className="stack">
                                        {
                                            Welfare.map(function(str,i){
                                            return <div className="chip-margin" key={i}>
                                                <TagChip name={str} size="small" color="primary" variant="outlined" />
                                            </div>;
                                            })
                                        }
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 사내복지을 추가해주세요" : "작성된 사내복지가 없습니다."}</p>
                                    }
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">사내규칙</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {Rule[0] ?
                                        <div className="stack">
                                            {
                                                Rule.map(function(str,i){
                                                return <div className="chip-margin" key={i}>
                                                    <TagChip name={str} size="small" color="primary" variant="outlined" />
                                                </div>;
                                                })
                                            }
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 사내규칙을 추가해주세요" : "작성된 사내규칙이 없습니다."}</p>
                                    }
                                 
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">수상경력</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {
                                    awardData[0] ?
                                        <div className="profile-skill-info-Awards">
                                            {awardData.map(function(data,i){
                                                return   <div className="profile-skill-info-Awards-text" key={i}>
                                                <p>{data.awardDate}</p>
                                                <p>{data.awardName}</p>
                                            </div>
                                            })
                                            }
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 수상경력을 추가해주세요" : "작성된 수상경력이 없습니다."}</p>
                                    }
                                    <div className="profile-chart-info-title">
                                        <div className="profile-title-text">기업연혁</div>
                                        <div className="profile-title-line"></div>
                                    </div>
                                    {
                                    activityData[0] ?
                                        <div className="profile-skill-info-Awards">
                                                {activityData.map(function(data,i){
                                                    return   <div className="profile-skill-info-Awards-text" key={i}>
                                                    <p>{data.activityStartDate}</p>
                                                    <p>{data.activityName}</p>
                                                </div>
                                            })}
                                        </div>
                                        :<p className="addspan">{ loginState ? "프로필 수정을 통해 기업연혁을 추가해주세요" : "작성된 기업연혁이 없습니다."}</p>
                                    }
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