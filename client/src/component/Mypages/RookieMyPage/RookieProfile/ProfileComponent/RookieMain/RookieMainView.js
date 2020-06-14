import React, { Component } from 'react';

class RookieMainView extends Component {

    setMain(){
        this.props.Mainchanges(false)
    }
    render() {
        const {user} = this.props;
        return (
            <div>
                <div className="RookieMain-title">
                    <span className="RookieMain-title-text">저는 이런 사람이에요</span>
                    <span className="RookieMain-relayout" onClick={this.setMain.bind(this)}>[편집]</span>
                </div>
                <div className="RookieMain-user">
                    <img src="/Image/login_img.png" className="RookieMain-user-img" alt="IMG"></img>
                    <span className="RookieMain-user-name">{user.userName}</span>
                    <span>{user.userIntro}</span>
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

export default RookieMainView;