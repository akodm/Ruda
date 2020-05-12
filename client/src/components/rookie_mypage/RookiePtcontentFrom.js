import React, { Component } from 'react';
import './RookiePt.css';
class RookiePtcontentFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    Save(){
        this.props.Ptchange(false)
    }
    render() {
        const {changePt}= this.state;
        return (
            <div>
                 <div className="rookiept-content-title">
                    <input type="text" className="rookiept-content-title-input" placeholder="프로젝트이름을 입력해주세요"></input>
                    <span className="rookiept-relayout" onClick={this.Save.bind(this)}>[저장]</span>
                </div>
                <div className="rookiept-content-info">
                    <span className="rookiept-content-info-title" >프로젝트설명</span>
                    <textarea className="rookiept-content-info-input" placeholder="프로젝트설명을 입력해주세요"></textarea>
                </div>
                <div className="rookiept-content-tag">
                    <span className="rookiept-content-tag-title" >프로젝트태그</span>
                    <div className="rookiept-content-tag-input-form">
                        <input type="text" className="rookiept-content-tag-input" placeholder="관련 태그를 입력해주세요"></input>
                        <button className="rookiept-content-tag-input-btn">추가</button>
                    </div>
                    <span className="rookiept-content-tag-tags">#감자</span>
                </div>
                <div className="rookiept-content-createdate">
                    <span className="rookiept-content-createdate-title">프로젝트기간</span>
                    <div className="rookiept-content-createdate-input-form">
                        <input type ="date" className="rookiept-content-createdate-input" ></input>
                        <span>~</span>
                        <input type ="date"  className="rookiept-content-createdate-input"></input>
                    </div>
                </div>
                <div className="rookiept-content-with">
                    <span className="rookiept-content-with-title">프로젝트 구성원</span>
                    <input type="text" className="rookiept-content-tag-input" placeholder="함께한사람을 입력해주세요"></input>
                </div>
                <div className="rookiept-content-Agency">
                    <span className="rookiept-content-Agency-title">프로젝트구분</span>
                    <select className="rookiept-select">
                        <option>교내프로젝트</option>
                        <option>교외프로젝트</option>
                        <option>개인프로젝트</option>
                    </select>
                </div>
                <div className="rookiept-content-site">
                    <span className="rookiept-content-site-title">프로젝트주소</span>
                    <input type="text" className="rookiept-content-tag-input" placeholder="관련 사이트를 입력해주세요"></input>
                </div>
                <div className="rookiept-content-img">
                    <span className="rookiept-content-img-title">프로젝트 이미지</span>
                    <div className="rookiept-content-img-images">
                        <div className="rookiept-content-img-imagesBtn">
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookiePtcontentFrom;