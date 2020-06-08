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

import socketio from 'socket.io-client';
import OtherHeader from './OtherHeader';
import Mypages from '../Mypages/Mypages';
import MyPopup from '../../components/mypopup/MyPopup';
import UserInfo from '../UserInfo/UserInfo';
import RecoCompany from '../Recommend/RecoCompany/RecoCompany';


class Base extends Component {
    constructor(props){
        super(props);
        this.state={
            url :new URL(window.location),
            pn:"",
            user:{
                tag:"",
                email:"",
            }
        }
    }
    async componentDidMount(){
        let user = localStorage.getItem("users");
        if(user){
            user = JSON.parse(user);
            this.setState({
                user:{
                    tag:user.tag,
                    email:user.email,
                }
            });
        }
    }


    render() {
        const{ user }=this.state;
        return (
            <div className="base-main">
                 <Router>
                    {/*메인 */}
                    <Route exact path="/"><MainHeader/><Main/></Route>
                    {/*기업게시판*/ }
                    <Route path ="/company"><OtherHeader /><Company/></Route>
                    {/*인재게시판*/ }
                    <Route path ="/rookie"><OtherHeader /><Rookie/></Route>
                    {/*회원가입*/ }
                    <Route path ="/insert"><OtherHeader /><Insert/></Route>
                    {/*로그인*/ }
                    <Route path ="/login"><OtherHeader /><Login/></Route>
                    {/*간편로그인*/ }
                    <Route path ="/easy"><OtherHeader /><Easy/></Route>
                    {/*유저 기본정보 */}
                    <Route path="/userinfo"><OtherHeader /><UserInfo/></Route>
                    {/*마이페이지*/}
                    <Route path ="/mypage"><OtherHeader /><Mypages user={user}/></Route>
                    {/*마이메뉴*/}
                    <MyPopup/>

                    {/*화면업다운버튼*/ }
                    <UpDown/>
                    {/*하단 */}
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default Base;