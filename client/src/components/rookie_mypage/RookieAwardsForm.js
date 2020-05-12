import React, { Component } from 'react';

class RookieAwardsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adduserAwerds : [],
        }
    }
    awardsSave(){
        this.props.awardschanges(false)
    }
    addAwerds() {  
        const awd = this.addAwerdsform();
        this.setState({
            adduserAwerds : this.state.adduserAwerds.concat(awd)},
        )
    }
    addAwerdsform(){
        return <div className="rookieAwards-content-info-input" > 
            <input type="text" placeholder="수상년도를 입력하세요"></input>
            <input type="text" placeholder="수상내역을 입력하세요"></input>
            <input type="text" placeholder="주최기관을 입력해주세요"></input>
            <input type="text" placeholder="수상결과를 입력해주세요"></input>
        </div>
    }
    render() {
        const {adduserAwerds}=this.state;
        return (
            <div>
                 <div className="rookieAwards-title">
                    <span className="rookieAwards-title-text">수상내역</span>
                    <span className="rookieAwards-relayout" onClick={this.awardsSave.bind(this)}>[저장]</span>
                </div>
                <div className="rookieAwards-content">
                    <div className="rookieAwards-content-title">
                        <span>수상년도</span>
                        <span>수상내역</span>
                        <span>수상주최</span>
                        <span>수상결과</span>  
                    </div>
                    <div className="rookieAwards-content-info-input" > 
                        <input type="text" placeholder="수상년도를 입력하세요"></input>
                        <input type="text" placeholder="수상내역을 입력하세요"></input>
                        <input type="text" placeholder="주최기관을 입력해주세요"></input>
                        <input type="text" placeholder="수상결과를 입력해주세요"></input>
                    </div>
                    <div className="rookieAwards-content-info-input"> 
                        {adduserAwerds}
                    </div>
                    <div className="rookieAwards-content-info-add" onClick={this.addAwerds.bind(this)}>
                        <span>+ 수상내역 추가</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieAwardsForm;