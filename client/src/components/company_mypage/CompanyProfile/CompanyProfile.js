import React, { Component } from 'react';
import CompanyMainProfile from './ProfileComponent/CompanyMainProfile/CompanyMainProfile';
import CompanyInfo from './ProfileComponent/CompanyInfo/CompanyInfo';


class CompanyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addComponents : "none",  
            LayerArr : [],     
        }
    }

    add(args) {  
        this.setState({
            LayerArr : this.state.LayerArr.concat(args),
        })
    }

    AddProfileDisplay(close){
        this.setState({
            addComponents : close
        });
    }
    render() {
        const {LayerArr} = this.state;
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>루다의 프로필</span>
                </div>
                <CompanyMainProfile/>
                <CompanyInfo/>
            </div>
        );
    }
}

export default CompanyProfile;