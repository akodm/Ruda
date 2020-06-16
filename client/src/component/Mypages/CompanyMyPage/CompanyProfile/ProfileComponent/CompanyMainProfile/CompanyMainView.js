import React, { Component } from 'react';

class CompanyMainView extends Component {
    setMain(){
        this.props.Mainchanges(false)
    }
    render() {
        const {user} =this.props;
        return (
            <div>
                <div className="RookieMain-title">
                    <span className="RookieMain-title-text">저희 이런 기업이에요</span>
                    <span className="RookieMain-relayout" onClick={this.setMain.bind(this)}>[편집]</span>
                </div>
                <div className="RookieMain-user">
                    <img width="100" className="userInfo-img" src={user.companyImageUrl} alt="IMG"></img>
                    <span className="RookieMain-user-name">{user.companyName}</span>
                    <span>{user.companyIntro}</span>
                </div>
                <div className="line"></div>
                <div className="RookieMain-user-tag-content">
                {/*태그컴포넌트여기에 넣어주세용*/}
                   태그자리
                </div>
            </div>
        );
    }
}

export default CompanyMainView;