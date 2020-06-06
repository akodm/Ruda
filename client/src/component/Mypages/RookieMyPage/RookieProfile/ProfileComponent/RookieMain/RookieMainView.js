import React, { Component } from 'react';

class RookieMainView extends Component {

    setMain(){
        this.props.Mainchanges(true)
    }
    render() {
        return (
            <div>
                <div className="rookieInfo-title">
                    <span className="rookieInfo-title-text">기본정보</span>
                    <span className="rookieInfo-relayout" onClick={this.setMain.bind(this)}>[편집]</span>
                </div>
                <div className="rookie-user-mainprofile-left">
                    <img src="/Image/login_img.png" className="userProfile-img" alt="IMG"></img>
                    <span className="user-name">안녕하세요 홍길동 입니다.</span>
                </div>
                <div  className="rookieTag-content-view">
                    <div className="rookieTag-content-view-tags">
                        <span>#Java</span>
                        <span>#IOS</span>
                        <span>#Android</span>
                        <span>#Node.js</span>
                        <span>#React</span>
                        <span>#Jsp</span>
                        <span>#Java</span>
                        <span>#IOS</span>
                        <span>#Android</span>
                        <span>#Node.js</span>
                        <span>#React</span>
                        <span>#Jsp</span>
                        <span>#Java</span>
                        <span>#IOS</span>
                        <span>#Android</span>
                        <span>#Node.js</span>
                        <span>#React</span>
                        <span>#Jsp</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieMainView;