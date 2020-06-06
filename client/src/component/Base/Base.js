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
    componentDidMount(){
        let user = localStorage.getItem("users");
        if(user){
            user = JSON.parse(user);
            this.setState({
                user:{
                    tag:user.tag,
                    email:user.email,
                }
            })            
        }
        const{url}=this.state;
        let pathnames = url.pathname;
        pathnames=pathnames.split("/");
        console.log(pathnames);
        let result=pathnames.toString();
        console.log(result);
            if(result==','){
            this.setState({
                pn:"home",
            })
        }else{
            this.setState({
                pn:"",
            })
        }
    }


    render() {
        const{pn, user}=this.state;
        return (
            <div className="base-main">
                 <Router>
                    {pn?<MainHeader/>:<OtherHeader/>}
                    {/*메인 */}
                    <Route exact path="/"><Main/></Route>
                    {/*기업게시판*/ }
                    <Route path ="/company"><Company/></Route>
                    {/*인재게시판*/ }
                    <Route path ="/rookie"><Rookie/></Route>
                    {/*회원가입*/ }
                    <Route path ="/insert"><Insert/></Route>
                    {/*로그인*/ }
                    <Route path ="/login"><Login/></Route>
                    {/*간편로그인*/ }
                    <Route path ="/easy"><Easy/></Route>
                    {/*유저 기본정보 */}
                    <Route path="/userinfo"><UserInfo/></Route>
                    {/*마이페이지*/}
                    <Route path ="/mypage"><Mypages user={user}/></Route>
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