import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

class CompanyCard extends Component {
    render() {
        const { userList } = this.props;
        let state = null;
        switch(userList.companyWorkCate) {
            case "채용" : state = 1; break;
            case "실습생채용" : state = 2; break;
            case "실습 후 채용" : state = 3; break;
            default : state = 0; break;
        }

        return (
            <div className="Company-Card">
            <div className="Company-Card-header">
                <div className="Company-Card-like">
                    <img alt="img"  src="/Images/1216649.svg" width="12px"height="12px"/>
                    <span>{userList.companyLike || 0}</span>
                </div>
                {
                    state ?
                    <div className="Company-Card-state">
                        { state === 2 || state === 3 ? <div className="Company-search-title-state-training"></div> : <div></div>}
                        { state === 1 || state === 3 ? <div className="Company-search-title-state-hire"></div> : <div></div>}
                    </div>
                    : 
                    <div></div>
                }
            </div>
            <div className="Company-Card-Profile">
                <div className="Company-Card-Profile-img">
                    <Avatar alt="img" style={{border:"1px solid rgba(125, 125, 125, 0.1)",height:"80px", width:"80px"}} src={userList.companyImageUrl || "/Images/company.png"} />
                </div>
                <div className="Company-Card-Profile-info">
                    <span className="Company-Card-Profile-info-name">{userList.companyName || "알수없음"}</span>
                    <span className="Company-Card-Profile-info-text">{userList.companyIntro || "안녕하세요."}</span>
                    <span className="Company-Card-Profile-info-position">{userList.companyField || "알수없음"}</span>
                    <span className="Company-Card-Profile-info-pt">{userList.companyAdd || "주소 미선택"}</span>
                    <div className="Company-Card-Profile-info-tags">
                        {
                            userList.companyTags ? userList.companyTags.map((data,i) => {
                                if(i > 3) return null;
                                return <span key={i} className="Company-Card-Profile-info-tags-tag">{data}</span>
                            })
                            :
                            <span className="Company-Card-Profile-info-tags-tag">선택한 태그가 없습니다.</span>
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default CompanyCard;