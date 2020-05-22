import React, { Component } from 'react';
import './AddProfile.css';
import RookieAwards from '../RookieAwards/RookieAwards';
import RookieCertificate from '../RookieCertificate/RookieCertificate';
import RookieInfo from '../RookieInfo/RookieInfo';

class AddProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            LayerArr : [],
            checkboxList : [],
        }
    }

    async checkboxList(e) {
        switch(e.target.id) {
            case "U1" : 
            e.target.checked ? 
            await this.setState({ checkboxList : this.state.checkboxList.concat(<RookieAwards />)}) 
            :
            await this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val !== <RookieAwards /> })}) 
                break;
            case "U2" : 
            e.target.checked ? 
            await this.setState({ checkboxList : this.state.checkboxList.concat(<RookieCertificate />)}) 
            :
            await this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val !== <RookieCertificate /> })}) 
                break;
            case "U3" : 
            e.target.checked ? 
            await this.setState({ checkboxList : this.state.checkboxList.concat(<RookieInfo />)}) 
            :
            await this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val !== <RookieInfo /> })}) 
                break;
            default : break;
        }
    }
    
    addComponents() {
        this.props.add(this.state.checkboxList);
    }

    addClose(){
        this.props.close("none");
    }

    render() {
        return (
            <div className ="AddProfile" style={{display:this.props.display}}>
                    <div className ="AddProfile-title">
                        <span>프로필 추가</span>
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
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="U1"></input>
                                </li>
                           </label>
                           <label htmlFor="UserCertificate">
                               <li>
                                    자격증
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="U2"></input>    
                                </li>
                           </label>
                           <label htmlFor="UserLanguage">
                                <li>
                                    언어능력
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="U3"></input>
                                </li>
                           </label>        
                       </ul>
                       <div className="AddProfile-Btns">
                            <button className="AddProfile-saveBtn" onClick={this.addComponents.bind(this)}>저장</button>
                            <button className="AddProfile-closeBtn" onClick={this.addClose.bind(this)}>닫기</button>
                       </div>
                    </div>
                </div>               
        );
    }
}

export default AddProfile;