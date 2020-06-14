import React, { Component } from 'react';

class CompanyHireView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    setFrom(){
        this.props.Hirechange(false);
    }
    render() {
        return (
            <div>
                <div className="rookiept-content-title">
                    <span className="rookiept-title-text">프론트엔드개발자채용</span>
                    <span className="rookiept-relayout" onClick={this.setFrom.bind(this)}>[편집]</span>

                </div>
                <div className="rookiept-content-info">
                    <span className="rookiept-content-info-title" >채용부분</span>
                    <span className="rookiept-content-info-Explanation">react 사용이가능한 프론트엔드개발라를 채용합니다.</span>
                </div>
                <div className="rookiept-content-createdate">
                    <span className="rookiept-content-createdate-title">채용기간</span>
                    <span className="rookiept-content-createdate-date"> 2020-03-02~2020-12-31</span>
                </div>
                <div className="rookiept-content-with">
                    <span className="rookiept-content-with-title">지원자격</span>
                    <span className="rookiept-content-with-name">대학교 졸업 또는 대학교 졸업예정자</span>
                </div>
                
            
            </div> 
        );
    }
}

export default CompanyHireView;