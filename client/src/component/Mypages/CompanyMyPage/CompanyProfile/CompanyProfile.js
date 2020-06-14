import React, { Component } from 'react';
import CompanyMainProfile from './ProfileComponent/CompanyMainProfile/CompanyMain';
import CompanyInfo from './ProfileComponent/CompanyInfo/CompanyInfo';


class CompanyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addComponents : "none",  
            LayerArr : [],     
        }
    }
    render() {
        const {user} = this.props;
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>{user.companyName}의 프로필</span>
                </div>
                <CompanyMainProfile user={user}/>
                <CompanyInfo user={user}/>
            </div>
        );
    }
}

export default CompanyProfile;