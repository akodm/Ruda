import React, { Component } from 'react';
import './AddProfile.css';
import RookieAwardsForm from '../RookieAwards/RookieAwardsForm';
import RookieCertificateForm from '../RookieCertificate/RookieCertificateForm';
import RookieinfoFrom from '../RookieInfo/RookieinfoFrom';

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
        switch(e.target.id) {
            case "U1" : 
            e.target.checked ? 
            this.setState({ checkboxList : this.state.checkboxList.concat({ data : <RookieAwardsForm />, id : 0})}) 
            :
            this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val.id !== 0 })}) 
                break;
            case "U2" : 
            e.target.checked ? 
            this.setState({ checkboxList : this.state.checkboxList.concat({ data : <RookieCertificateForm />, id : 1})}) 
            :
            this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val.id !== 1 })}) 
                break;
            case "U3" : 
            e.target.checked ? 
            this.setState({ checkboxList : this.state.checkboxList.concat({ data : <RookieinfoFrom />, id : 2})}) 
            :
            this.setState({ checkboxList : this.state.checkboxList.filter( val => { return val.id !== 2 })}) 
                break;
            default : break;
        }
        this.setState({
            LayerArr : this.state.checkboxList.map((data,i)=>{
                return data.data
            })
        })
    }
    
    addClose(){
        this.props.close("none");
    }

    render() {
        const { LayerArr } = this.state;
        console.log(this.state.checkboxList);
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