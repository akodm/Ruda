import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

class RookieCard extends Component {
    render() {
        const userList = this.props.userList;
        let state = null;
        switch(userList.userWorkDateState) {
            case "취업희망" : state = 1; break;
            case "실습희망" : state = 2; break;
            case "실습후 취업희망" : state = 3; break;
            default : state = 0; break;
        }

        return (
            <div className="Rookie-Card">
                <div className="Rookie-Card-header">
                    <div className="Rookie-Card-like">
                        <img src="/Images/1216649.svg" width="12px"height="12px" alt="img"/>
                        <span>{userList.userLike || "0"}</span>
                    </div>
                    {
                        state ?
                        <div className="Rookie-Card-state">
                            { state === 1 || state === 3 ? <div className="Rookie-search-title-state-hire"></div> : <div></div> }
                            { state === 2 || state === 3 ? <div className="Rookie-search-title-state-training"></div> : <div></div> }
                        </div> 
                        :
                        <div></div>
                    }
                </div>
                <div className="Rookie-Card-Profile">
                    <div className="Rookie-Card-Profile-img" >
                        <Avatar alt="img" style={{border:"1px solid rgba(125, 125, 125, 0.1)",height:"80px", width:"80px"}} src={userList.userImageUrl || "Images/new_icon.png"} />
                    </div>
                    <div className="Rookie-Card-Profile-info">
                        <span className="Rookie-Card-Profile-info-name">{userList.userName || "알수없음"}</span>
                        <span className="Rookie-Card-Profile-info-text">{userList.userIntro || "안녕하세요."}</span>
                        <span className="Rookie-Card-Profile-info-position">{userList.userField || "미정"}</span>
                        <div className="Rookie-Card-Profile-info-tags">
                            {
                                userList.userKeyword[0] ? userList.userKeyword.map((data,i) => {
                                    return <span key={i} className="Rookie-Card-Profile-info-pt">{data}</span>
                                })
                                :
                                <span className="Rookie-Card-Profile-info-pt">키워드가 없습니다.</span>
                            }
                        </div>
                        <div className="Rookie-Card-Profile-info-tags">
                            { 
                                userList.userTags[0] ? userList.userTags.map((data,i) => {
                                    if(i > 3) return null;
                                    return <span key={i} className="Rookie-Card-Profile-info-tags-tag">{data}</span>
                                })
                                :
                                "태그가 없습니다."
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RookieCard;