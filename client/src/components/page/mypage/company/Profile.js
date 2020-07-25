import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props){
        super(props);
        const {awardData,activityData}=this.props;
        this.state={
            ChangeProfile:true,
            awardData,
            activityData,
        }
    }
    ChangeProfiles(bool){
        this.setState({
            ChangeProfile:bool,
        })
    }
    awardConcat(data) { this.setState(current => ({ awardData : current.awardData.concat(data) })) }
    
    awardDelete(data){this.setState({awardData:data})};

    activityConcat(data) { this.setState(current => ({ activityData : current.activityData.concat(data) })) }

    activityDelete(data){this.setState({activityData:data})};

    render() {
        const {companyInfo,awardData,activityData,like,likeToggle,loginState,user,infoMount,boardMount,mailReload}=this.props;
        const {ChangeProfile}=this.state;
        return(
            <div className="Profile">
                {
                    ChangeProfile ?
                    <ViewProfile 
                    companyInfo={companyInfo} 
                    awardData={awardData}
                    activityData={activityData}
                    user={user}
                    like={like}
                    likeToggle={(data) => likeToggle(data)}
                    loginState={loginState}
                    infoMount={() => infoMount()}
                    boardMount={() => boardMount()}
                    mailReload={() => mailReload()}
                    change={this.ChangeProfiles.bind(this)}/>
                    :
                    <EditProfile 
                    companyInfo={companyInfo}
                    awardData={awardData}
                    activityData={activityData}
                    change={this.ChangeProfiles.bind(this)}/>
                }
            </div>
      );
    }
}

export default Profile;