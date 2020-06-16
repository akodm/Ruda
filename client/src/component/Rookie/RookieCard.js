import React, { Component } from 'react';

class RookieCard extends Component {
    render() {
        const userList = this.props.userList;
        return userList ? (
            <div className="Rookie-Card">
                <div className="Rookie-Card-header">
                    <div className="Rookie-Card-like">
                        <img src="/Images/1216649.svg" width="12px"height="12px" alt="img"/>
                        <span>{userList.userLike}</span>
                    </div>
                    <div className="Rookie-Card-state">
                        <div className="Rookie-search-title-state-training"></div>
                        <div className="Rookie-search-title-state-hire"></div>
                    </div>
                </div>
                <div className="Rookie-Card-Profile">
                    <div className="Rookie-Card-Profile-img" >
                        <img src={userList.userImageUrl || "Images/footer_logo.png"} alt="img"/>
                    </div>
                    <div className="Rookie-Card-Profile-info">
                        <span className="Rookie-Card-Profile-info-name">{userList.userName}</span>
                        <span className="Rookie-Card-Profile-info-text">{userList.userIntro}</span>
                        <span className="Rookie-Card-Profile-info-position">{userList.userField || "미정"}</span>
                        <span className="Rookie-Card-Profile-info-pt">포트폴리오 14개</span>
                        <div className="Rookie-Card-Profile-info-tags">
                            { userList.userTags.map((data,i) => {
                                return <span key={i} className="Rookie-Card-Profile-info-tags-tag">{data}</span>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        ) : <div></div>
    }
}

export default RookieCard;