import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import UserInfoBox from './UserInfoBox';
import CompanyInfoBox from './CompanyInfoBox';
import './UserInfo.css';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nums : 0,
        }
    }

    render() {
        const { nums } = this.state;
        let user = this.props.user;
        return (
            <div className="userInfo">
                <span className="userInfo-title">구직자 또는 기업을 선택하여 프로필 작성을 하여주세요!</span>
                <div className="userInfo-div">
                    <BottomNavigation
                        value={nums}
                        onChange={(event, newValue) => {
                            this.setState({ nums : newValue });
                        }}
                        showLabels
                        className="userInfo-tag"
                    >
                    <BottomNavigationAction label="구직자" style={{fontWeight:"bold"}}/>
                    <BottomNavigationAction label="기업" style={{fontWeight:"bold"}} />
                    </BottomNavigation> 
                </div>
                { nums ? <CompanyInfoBox user={user} nums={nums} /> : <UserInfoBox user={user} nums={nums} />}
            </div>
        );
    }
}

export default UserInfo;