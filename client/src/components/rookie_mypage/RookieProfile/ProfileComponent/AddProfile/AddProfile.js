import React, { Component } from 'react';
import './AddProfile.css';
import RookieAwardsForm from '../RookieAwards/RookieAwardsForm';

class AddProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            LayerArr : [],
            checkboxList : [],
        }
    }

    addComponents() {
        this.props.add(this.state.LayerArr);
    }

    checkboxList(e) {
        console.log(e.target.checked)
        this.setState({    
            
        })
    }
    
    addClose(){
        this.props.close("none");
    }

    render() {
        const { LayerArr } = this.state;

        return (
            <div className ="AddProfile" style={{display:this.props.display}}>
                    <div className ="AddProfile-title">
                        <span onClick={this.addComponents.bind(this)}>프로필 추가</span>
                    </div>
                    <div className ="AddProfile-content">
                        <ul>
                            <label htmlFor="UserMain" className="Main">
                                <li >
                                    메인페이지
                                    <input type="checkbox" id="UserMain" checked={true} readOnly></input>
                                </li>
                           </label>
                           <label htmlFor="UserInfo" className="Info">
                                <li >
                                    개인정보
                                    <input type="checkbox" id="UserInfo" checked={true} readOnly></input>
                                </li>
                            </label>
                            <label htmlFor="UserAwards">
                                <li>
                                    수상경력
                                    <input type="checkbox" onChange={(e) => this.setState({
                                        checkboxList: e.target.checked ? this.state.checkboxList.concat(<RookieAwardsForm/>): this.state.checkboxList.filter((value) => {
                                            console.log(value);
                                        })
                                    })} id="UserAwards"></input>
                                </li>
                           </label>
                           <label htmlFor="UserCertificate">
                               <li>
                                    자격증
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserCertificate"></input>    
                                </li>
                           </label>
                           <label htmlFor="UserLanguage">
                                <li>
                                    언어능력
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserLanguage"></input>
                                </li>
                           </label>        
                       </ul>
                       <div className="AddProfile-Btns">
                            <button className="AddProfile-saveBtn">저장</button>
                            <button className="AddProfile-closeBtn" onClick={this.addClose.bind(this)}>닫기</button>
                       </div>
                    </div>
                </div>               
        );
    }
}

export default AddProfile;