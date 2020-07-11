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
        const { userInfo, awardData, certificateData, addAward, addCertifi} = this.props;
        const { ChangeProfile } = this.state;
        return (
            <div className="Profile">
                 {  
                    ChangeProfile ? 
                    <ViewProfile 
                        awardData={awardData} 
                        certificateData={certificateData} 
                        userInfo={userInfo} 
                        change={this.ChangeProfiles.bind(this)}
                    />
                    :
                    <EditProfile 
                        awardData={awardData} 
                        certificateData={certificateData} 
                        userInfo={userInfo} 
                        change={this.ChangeProfiles.bind(this)}
                        addAward={(data) => addAward(data)}
                        addCertifi={(data) => addCertifi(data)}
                    /> 
                }
            </div>
        );
    }
}

export default Profile;