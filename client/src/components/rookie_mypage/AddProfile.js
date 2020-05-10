import React, { Component } from 'react';
import './AddProfile.css';

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
        console.log(e.target.value)
        this.setState({
            
        })
    }
 
    render() {
        const { LayerArr } = this.state;
        return (
            <div className ="AddProfile" style={{display:this.props.display}}>
                <div className ="AddProfile-bg">
                     {/*<div className="addprofile" onClick={this.addComponents.bind(this)}>*/}
                    <div className ="AddProfile-title">
                        <span onClick={this.addComponents.bind(this)}>프로필 추가</span>
                    </div>
                    <div className ="AddProfile-content">
                        <ul>
                            <label for="UserMain">
                                <li>
                                    메인페이지
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="Main"></input>
                                </li>
                           </label>
                           <label for="UserInfo">
                                <li>
                                    개인정보
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserInfo"></input>
                                </li>
                            </label>
                            <label for="UserAwards">
                                <li>
                                    수상경력
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserAwards"></input>
                                </li>
                           </label>
                           <label for="UserCertificate">
                               <li>
                                    자격증
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserCertificate"></input>    
                                </li>
                           </label>
                           <label for="UserLanguage">
                                <li>
                                    언어능력
                                    <input type="checkbox" onChange={this.checkboxList.bind(this)} id="UserLanguage"></input>
                                </li>
                           </label>        
                       </ul>
                    </div>
                </div>               
            </div>
        );
    }
}

export default AddProfile;