import React, { Component } from 'react';

class RookiePtcontent extends Component {
    render() {
        return (
            <div className="rookiept-content">
                <div className="rookiept-content-title">
                    <span className="rookiept-title-text">RUDA프로젝트</span>
                    <span className="rookiept-relayout">[편집]</span>
                </div>
                <div className="rookiept-content-info">
                    <span>프로젝트설명</span>
                </div>
                <div className="rookiept-content-tag">
                    <span>프로젝트태그</span>
                </div>
                <div className="rookiept-content-createdate">
                    <span>프로젝트태그</span>
                </div>
                <div className="rookiept-content-with">
                    <span>프로젝트참여자,구성원</span>
                </div>
                <div className="rookiept-content-Agency">
                    <span>프로젝트관련기관</span>
                </div>
                <div className="rookiept-content-site">
                    <span>프로젝트주소 or 링크</span>
                </div>
                <div className="rookiept-content-img">
                    <span>프로젝트 이미지</span>
                </div>
            </div>
        );
    }
}

export default RookiePtcontent;