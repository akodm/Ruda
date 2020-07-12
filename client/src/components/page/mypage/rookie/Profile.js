import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props){
        super(props);
        const {awardData,certificateData}=this.props;
        this.state={
            ChangeProfile:true,
            awardData,
            certificateData,
        }
    }

    ChangeProfiles(bool){
        this.setState({
            ChangeProfile:bool,
        })
    }

    awardConcat(data) { this.setState(current => ({ awardData : current.awardData.concat(data) })) }
    certificateConcat(data) { this.setState(current => ({ certificateData : current.certificateData.concat(data) })) }

    awardDelete(data){this.setState({awardData:data})};
    certificateDelete(data){this.setState({certificateData:data})};

    

    render() {
        const { userInfo} = this.props;
        const { ChangeProfile,awardData,certificateData } = this.state;
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
                        awardConcat={this.awardConcat.bind(this)}
                        awardDelete={this.awardDelete.bind(this)}
                        certificateConcat={this.certificateConcat.bind(this)}
                        certificateDelete={this.certificateDelete.bind(this)}
                    /> 
                }
            </div>
        );
    }
}

export default Profile;