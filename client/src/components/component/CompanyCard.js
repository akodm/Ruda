import React, { Component } from 'react';

class CompanyCard extends Component {
    render() {
        return (
            <div className="Company-Card">
            <div className="Company-Card-header">
                <div className="Company-Card-like">
                    <img alt="img"  src="/Images/1216649.svg" width="12px"height="12px"/>
                    <span>14</span>
                </div>
                <div className="Company-Card-state">
                    <div className="Company-search-title-state-training"></div>
                    <div className="Company-search-title-state-hire"></div>
                </div>
            </div>
            <div className="Company-Card-Profile">
                <div className="Company-Card-Profile-img">
                    <img alt="img"  src="/Images/company.png"/>
                </div>
                <div className="Company-Card-Profile-info">
                    <span className="Company-Card-Profile-info-name">하이루키</span>
                    <span className="Company-Card-Profile-info-text">안녕하세요 구직 채용 서비스를 제공하는 하이루키입니다.</span>
                    <span className="Company-Card-Profile-info-position">웹서비스개발</span>
                    <span className="Company-Card-Profile-info-pt">여기는 뭐쓰지?</span>
                    <div className="Company-Card-Profile-info-tags">
                        <span className="Company-Card-Profile-info-tags-tag">#JAVA</span>
                        <span className="Company-Card-Profile-info-tags-tag">#PHP</span>
                        <span className="Company-Card-Profile-info-tags-tag">#Node.js</span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default CompanyCard;