import React, { Component } from 'react';

class RookieCertificateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adduserCertificate : [],
        }
    }
    certificateSave(){
        this.props.certificatechanges(false)
    }
    addCertificate() {  
        const certf = this.addCertificateform();
        this.setState({
            adduserCertificate : this.state.adduserCertificate.concat(certf)},
        )
    }
    addCertificateform(){
        return <div className="rookieCertificate-content-info-input" > 
            <input type="text" placeholder="취득년도를 입력해주세요"></input>
            <input type="text" placeholder="자격증이름을 입력해주세요"></input>
            <input type="text" placeholder="자격증기관을 입력해주세요"></input>
        </div>
    }
    render() {
        const {adduserCertificate}=this.state;
        return (
            <div>
                <div className="rookieCertificate-title">
                    <span className="rookieCertificate-title-text">자격증</span>
                    <span className="rookieCertificate-relayout" onClick={this.certificateSave.bind(this)} >[저장]</span>
                </div>
                <div className="rookieCertificate-content">
                    <div className="rookieCertificate-content-title">
                        <span>취득년도</span>
                        <span>자격증이름</span>
                        <span>자격증주최</span>
                    </div>
                    <div className="rookieCertificate-content-info-input">
                        <input type="text" placeholder="취득년도를 입력해주세요"></input>
                        <input type="text" placeholder="자격증이름을 입력해주세요"></input>
                        <input type="text" placeholder="자격증기관을 입력해주세요"></input>
                    </div>
                        {adduserCertificate}
                    <div className="rookieCertificate-content-info-add" onClick={this.addCertificate.bind(this)}>
                        <span>+취득내역 추가</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieCertificateForm;