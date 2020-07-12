import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            ChangeProfile:true,
        }
    }
    ChangeProfiles(bool){
        this.setState({
            ChangeProfile:bool,
        })
    }
    render() {
        const {companyInfo}=this.props;
        const {ChangeProfile}=this.state;
        return(
            <div className="Profile">
                {
                    ChangeProfile ?
                    <ViewProfile companyInfo={companyInfo} change={this.ChangeProfiles.bind(this)}/>
                    :
                    <EditProfile companyInfo={companyInfo} change={this.ChangeProfiles.bind(this)}/>
                }
            </div>
      );
    }
}

export default Profile;