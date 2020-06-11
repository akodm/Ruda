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
import MyPopup from '../MyMenu/MyPopup';
import UserInfo from '../UserInfo/UserInfo';

class Base extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : {
                id : 1,
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
                        "Authorization" : getUser.token, 
                    }
                })
                const userId = await axios.get(`http://localhost:5000/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
                this.setState({
                    user : {
                        id : userId.data.id,
                        tag : verify.data.tag,
                        email : verify.data.email,
                        cate : userId.data.userCate,
                    }
                });
            } catch(err) {
                console.log("verify err : " + err);
            }
        }
    }

    getUser(user) {
        this.setState({
            user : user,
        })
    }

    render() {
        const { user } = this.state;
        return (
            <div className="base-main">
                 <Router>
                    {/*메인 */}
                    <Route exact path="/">
                        { user.email ? <OtherHeader user={user} /> : <MainHeader user={user} /> }
                        { user.email ? (user.cate ? <Mypages user={user} /> : <UserInfo user={user} />) : <Main /> }</Route>
                    {/*기업게시판*/ }
                    <Route path ="/company"><OtherHeader user={user} /><Company /></Route>
                    {/*인재게시판*/ }
                    <Route path ="/rookie"><OtherHeader user={user} /><Rookie /></Route>
                    {/*회원가입*/ }
                    <Route path ="/insert"><OtherHeader user={user} />{ !user.email && <Insert /> }</Route>
                    {/*로그인*/ }
                    <Route path ="/login"><OtherHeader user={user} />{ !user.email && <Login setUser={this.getUser.bind(this)} /> }</Route>
                    {/*간편로그인*/ }
                    <Route path ="/easy"><OtherHeader user={user} />{ !user.email && <Easy setUser={this.getUser.bind(this)} /> }</Route>
                    {/*유저 기본정보 */}
                    <Route path="/userinfo"><OtherHeader user={user} />{ user.email && !user.cate && <UserInfo />}</Route>
                    {/*마이페이지*/}
                    <Route path="/mypage"><OtherHeader user={user} /><Mypages user={user} /></Route>
                    {/*마이메뉴*/}
                    { user.email && <MyPopup user={user} /> }
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