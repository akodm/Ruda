import React, { Component } from 'react';
import RookieInfo from './ProfileComponent/RookieInfo/RookieInfo';
import RookieAwards from './ProfileComponent/RookieAwards/RookieAwards';
import RookieCertificate from './ProfileComponent/RookieCertificate/RookieCertificate';
import RookieMain from './ProfileComponent/RookieMain/RookieMain';
import Axios from 'axios';
class RookieProflie extends Component {
    constructor(props){
        super(props);
        this.state={
          
        }
    }
    async componentDidMount(){
        
    }
    render() {
        const {user} = this.props;
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>{user.userName}의 프로필</span>
                </div>
                <div className="rookie-user-content">
                <RookieMain user={user}/>
                <RookieInfo user={user}/>
                <RookieAwards user={user}/>
                <RookieCertificate user={user}/>
                </div>
            </div>
        );
    }
}

export default RookieProflie;