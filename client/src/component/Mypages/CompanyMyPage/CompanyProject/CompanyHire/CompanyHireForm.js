import React, { Component } from 'react';

class CompanyHireForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeHire: true
        }
    }
    Save(){
        this.props.Hirechange(true)
    }
    render() {
        const {changeHire}= this.state;
        return (
            <div>
                 <div className="rookiept-content-title">
                    <input type="text" className="rookiept-content-title-input" placeholder="채용 공고 타이틀을 입력해주세요"></input>
                    <span className="rookiept-relayout" onClick={this.Save.bind(this)}>[저장]</span>
                </div>
                <div className="rookiept-content-info">
                    <span className="rookiept-content-info-title" >채용부분</span>
                    <textarea className="rookiept-content-info-input" placeholder="채용부분을 입력해주세요"></textarea>
                </div>
                <div className="rookiept-content-createdate">
                    <span className="rookiept-content-createdate-title">채용기간</span>
                    <div className="rookiept-content-createdate-input-form">
                        <input type ="text" className="rookiept-content-createdate-input" ></input>
                        <span>~</span>
                        <input type ="text"  className="rookiept-content-createdate-input"></input>
                    </div>
                </div>
                <div className="rookiept-content-with">
                    <span className="rookiept-content-with-title">지원자격</span>
                    <input type="text" className="rookiept-content-tag-input" placeholder="해당직무의 지원자격을 입력해주세요"></input>
                </div>
                
            </div>
        );
    }
}

export default CompanyHireForm;