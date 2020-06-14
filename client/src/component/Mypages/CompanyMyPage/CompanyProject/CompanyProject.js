import React, { Component } from 'react';
import CompanyHire from './CompanyHire/CompanyHire';

class CompanyProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Addhire : [],
            addNotice:""
        }
    }
    addPt() {  
        this.setState({
            Addhire : this.state.Addhire.concat(<CompanyHire/>),
        })
        let count;
        count =+ 1;
        if(count>0){
            this.setState({
                addNotice:"none"
            })
           
        }
    }
    render() {
        const user = this.props;
        const {Addhire,addNotice}=this.state;
        return (
            <div className="rookiept">
                <div className="rookiept-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>ㅇㅇ의 포트폴리오</span>
                </div>
                <div className="rookiept-Explanation"style={{display:addNotice}}>
                    <span>를 정리해보세요</span>
                    <span>1. 포트폴리오 추가 버튼을 누르세요</span>
                    <span>2. 양식에 맞게 작성해주세요</span>
                    <span>3. 나의 능력치를 마음껏 뽐내보세요</span>
                    <span>↓ 지금 바로 포트폴리오 작성하기 ↓</span>
                </div>
                <div className="rookiept-contents">
                    {Addhire}
                </div>
                <div className="addpt" onClick={this.addPt.bind(this)}>
                    <span> + 포트폴리오 추가</span>
                </div>
            </div>
        );
    }
}


export default CompanyProject;