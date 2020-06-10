import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import axios from 'axios';

import UserInfoBox from './UserInfoBox';
import CompanyInfoBox from './CompanyInfoBox';
import './UserInfo.css';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nums : 0,
            user : this.props.user,
            userInfo : {

            },
        }
    }

    async saveUserInfoBtn() {
        const { nums,user,userInfo } = this.state;
        try {
            if(!nums){
                const result = await axios.post(`http://localhost:5000/userInfos/create`,{
                    userId : user.id,
                    userName: userInfo.name,
                    userPhone: userInfo.phone,
                    userAdd: userInfo.add,
                    userImage : userInfo.image,
                    userTraning: userInfo.traning,
                    userUnvcity: userInfo.unvcity, 
                    userSubject : userInfo.subject,
                    userIntro : userInfo.intro,
                    userTags : userInfo.tags,
                    userSpecialty : userInfo.specialty,
                    userWorkDate : userInfo.workDate,
                    userKeyword : userInfo.keyword,
                }) 
                
            }else{
                const result = await axios.post(`http://localhost:5000/userInfos/create`) 
                
            }
        } catch (err) {
            console.log(err);
        }
    }

    userInfoChange(data) {
        this.setState({ userInfo : data });
    }

    render() {
        const { nums } = this.state;
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
                { nums ? <CompanyInfoBox saveDate={this.userInfoChange.bind(this)} /> : <UserInfoBox saveDate={this.userInfoChange.bind(this)} />}
                <Link to="/mypage" className="userInfo-saveBtn" onClick={this.saveUserInfoBtn.bind(this)}>저장하기</Link>
            </div>
        );
    }
}

export default UserInfo;