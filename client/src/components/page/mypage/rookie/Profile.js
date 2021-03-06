import React, { Component } from 'react';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props){
        super(props);
        const {awardData,certificateData,activityData}=this.props;
        if(activityData){
            const activityOut = [];
            const activityIn = [];
    
            activityData.forEach(activityData => {
                if(activityData.activityCate === "교내") {
                    activityIn.push(activityData.activityCate);
                } else {
                    activityOut.push(activityData.activityCate);
                }
            });

            this.state={
                ChangeProfile:true,
                awardData,
                certificateData,
                activityData,
                activityIn:activityIn,
                activityOut:activityOut,
            }
        }
    }

    ChangeProfiles(bool){
        this.setState({
            ChangeProfile:bool,
        })
    }

    awardConcat(data) { this.setState(current => ({ awardData : current.awardData.concat(data) })) }
    certificateConcat(data) { this.setState(current => ({ certificateData : current.certificateData.concat(data) })) }
    activityConcat(data) { this.setState(current => ({ activityData : current.activityData.concat(data) })) }

    awardDelete(data){this.setState({awardData:data})};
    certificateDelete(data){this.setState({certificateData:data})};
    activityDelete(data){this.setState({activityData:data})};

    render() {
        const { userInfo, user,
             awardData, certificateData, activityData,
             like, likeToggle, loginState, infoMount,
              boardMount, mailReload,portfolioData } = this.props;
        const { ChangeProfile,activityIn,activityOut} = this.state;

        
        return (
            <div className="Profile">
                 {  
                    ChangeProfile ? 
                    <ViewProfile 
                        awardData={awardData} 
                        certificateData={certificateData} 
                        activityData={activityData}
                        portfolioData={portfolioData}
                        userInfo={userInfo} 
                        user={user}
                        loginState={loginState}
                        change={this.ChangeProfiles.bind(this)}
                        like={like}
                        likeToggle={(data) => likeToggle(data)}
                        infoMount={() => infoMount()}
                        boardMount={() => boardMount()}
                        mailReload={() => mailReload()}
                        activityIn={activityIn}
                        activityOut={activityOut}
                    />
                    :
                    <EditProfile 
                        awardData={awardData} 
                        certificateData={certificateData} 
                        activityData={activityData}
                        userInfo={userInfo} 
                        change={this.ChangeProfiles.bind(this)}
                    /> 
                }
            </div>
        );
    }
}

export default Profile;