import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import'./Base.css';

import Header from './Header';
import Footer from './Footer';

import Main from '../Main/Main';
import Easy from '../Easy/Easy';
import Insert from '../Insert/Insert';
import Login from '../Login/Login';
import Company from '../Company/Company';
import Rookie from '../Rookie/Rookie';
import UpDown from './UpDown';


import socketio from 'socket.io-client';


class Base extends Component {
    render() {
        return (
            <div className="base-main">
                 <Router>
                    <Header/>
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
                    {/*팝업
                    <MyPopup/> */}
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