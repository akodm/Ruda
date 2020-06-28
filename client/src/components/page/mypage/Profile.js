import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

class Profile extends Component {
    render() {
        return (
            <div className="Mypage-profile">
                <div className="Mypage-profile-Maininfo">
                    <div className="Mypage-profile-title">
                        <p>기본정보</p>
                        <div>
                            <EditIcon fontSize="small" className="Mypage-profile-title-icons" />
                            <SaveIcon fontSize="small" className="Mypage-profile-title-icons"/>
                        </div>
                    </div>
                    <div className="Mypage-profile-text">여기는 기본정보입니당</div>
                </div>
                <div className="Mypage-profile-Userinfo">
                    <div className="Mypage-profile-title">
                        <p>키워드</p>
                        <div>
                            <EditIcon fontSize="small" className="Mypage-profile-title-icons" />
                            <SaveIcon fontSize="small" className="Mypage-profile-title-icons"/>
                        </div>
                    </div>
                    <div className="Mypage-profile-text">여기는 기본정보입니당</div>
                </div>
                <div className="Mypage-profile-Award">
                    <div className="Mypage-profile-title">
                        <p>키워드</p>
                        <div>
                            <EditIcon fontSize="small" className="Mypage-profile-title-icons" />
                            <SaveIcon fontSize="small" className="Mypage-profile-title-icons"/>
                        </div>
                    </div>
                    <div className="Mypage-profile-content">여기는 기본정보입니당</div>
                </div>
                <div className="Mypage-profile-Certificate">
                    <div className="Mypage-profile-title">
                        <p>키워드</p>
                        <div>
                            <EditIcon fontSize="small" className="Mypage-profile-title-icons" />
                            <SaveIcon fontSize="small" className="Mypage-profile-title-icons"/>
                        </div>
                    </div>
                    <div className="Mypage-profile-text">여기는 기본정보입니당</div>
                </div>
            </div>
             
        );
    }
}

export default Profile;