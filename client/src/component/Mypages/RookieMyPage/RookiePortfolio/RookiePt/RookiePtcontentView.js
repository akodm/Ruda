import React, { Component } from 'react';

class RookiePtcontentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    setFrom(){
        this.props.Ptchange(true);
    }
    render() {
        return (
            <div>
                <div className="rookiept-content-title">
                    <span className="rookiept-title-text">RUDA프로젝트</span>
                    <span className="rookiept-relayout" onClick={this.setFrom.bind(this)}>[편집]</span>

                </div>
                <div className="rookiept-content-info">
                    <span className="rookiept-content-info-title" >프로젝트설명</span>
                    <span className="rookiept-content-info-Explanation">신입만 뽑는 구직 사이트 ruda를 제작하였습니다.</span>
                </div>
                <div className="rookiept-content-tag">
                    <span className="rookiept-content-tag-title" >프로젝트태그</span>
                    <span className="rookiept-content-tag-tags">#Node.js</span>
                </div>
                <div className="rookiept-content-createdate">
                    <span className="rookiept-content-createdate-title">프로젝트기간</span>
                    <span className="rookiept-content-createdate-date"> 2020-03-02~2020-12-31</span>
                </div>
                <div className="rookiept-content-with">
                    <span className="rookiept-content-with-title">프로젝트 구성원</span>
                    <span className="rookiept-content-with-name">조준명 , 고유리</span>
                </div>
                <div className="rookiept-content-Agency">
                    <span className="rookiept-content-Agency-title">프로젝트구분</span>
                    <span className="rookiept-content-Agency-division">교내프로젝트</span>
                </div>
                <div className="rookiept-content-site">
                    <span className="rookiept-content-site-title">프로젝트주소 or 링크</span>
                    <span className="rookiept-content-site-href">www.ruda.com</span>
                </div>
                <div className="rookiept-content-img">
                    <span className="rookiept-content-img-title">프로젝트 이미지</span>
                    <div className="rookiept-content-img-images">
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                        <div className="rookiept-content-img-imagesView">
                            사진
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default RookiePtcontentView;