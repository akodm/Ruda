import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import'./Base.css';

import MainHeader from './MainHeader';
import Footer from './Footer';

import Main from '../Main/Main';
import Easy from '../Easy/Easy';
import Insert from '../Insert/Insert';
import Login from '../Login/Login';
import Company from '../Company/Company';
import Rookie from '../Rookie/Rookie';
import UpDown from './UpDown';

// import socketio from 'socket.io-client';
import OtherHeader from './OtherHeader';
import Mypages from '../Mypages/Mypages';
import MyPopup from '../../components/mypopup/MyPopup';
import UserInfo from '../UserInfo/UserInfo';

class Base extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{
                tag:"",
                email:"",
                cate : "",
            },
        }
    }
    async componentDidMount() {
        let user = localStorage.getItem("users");
        if(user) {
            try {
                let getUser = JSON.parse(localStorage.getItem("users"));
                const verify = await axios.get(`http://localhost:5000/users/verify`, {
                    headers : {
                        "Authorization":getUser.token, 
                    }
                })
                this.setState({
                    user : {
                        tag : verify.data.tag,
                        email : verify.data.email,
                    }
                });
            } catch(err) {
                console.log("verify err : " + err);
                localStorage.removeItem("users");
            }
        }
    }


    render() {
        const { user } = this.state;
        return (
            <div className="base-main">
                 <Router>
                    {/*메인 */}
                    <Route exact path="/"><MainHeader /><Main user={user} /></Route>
                    {/*기업게시판*/ }
                    <Route path ="/company"><OtherHeader /><Company /></Route>
                    {/*인재게시판*/ }
                    <Route path ="/rookie"><OtherHeader /><Rookie /></Route>
                    {/*회원가입*/ }
                    <Route path ="/insert"><OtherHeader /><Insert /></Route>
                    {/*로그인*/ }
                    <Route path ="/login"><OtherHeader /><Login /></Route>
                    {/*간편로그인*/ }
                    <Route path ="/easy"><OtherHeader /><Easy /></Route>
                    {/*유저 기본정보 */}
                    <Route path="/userinfo"><OtherHeader /><UserInfo /></Route>
                    {/*마이페이지*/}
                    <Route path ="/mypage"><OtherHeader /><Mypages user={user} /></Route>
                    {/*마이메뉴*/}
                    { user && user.email && <MyPopup user={user} /> }
                    {/*화면업다운버튼*/ }
                    <UpDown />
                    {/*하단 */}
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default Base;