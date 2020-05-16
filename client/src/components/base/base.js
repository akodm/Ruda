import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './base.css';

import Header from './Header';
import Footer from './Footer';

import Main from '../main/Main';
import Insert from '../insert/Insert_main';
import InsertRookie from '../insert/Insert_rookie';
import InsertCompany from '../insert/Insert_company';
import InsertEmailAuth from '../insert/Insert_emailAuth';
import Login from '../login/Login';
import RookieMypage from '../rookie_mypage/RookieMypage';
import CompanyMypage from '../company_mypage/CompanyMypage';
import Board from '../board/Board';
import MyPopup from '../mypopup/MyPopup';
import UpandDown from './UpandDown';
import Search from '../searchIdPass/Search';

import socketio from 'socket.io-client';
const socket = socketio.connect('http://localhost:5000');


class Base extends Component {
    render() {
        return (
            <div className="base-main">
                <Router>
                    <Header />
                    <Route exact path="/"><Main /></Route>
                    <Route exact path="/insert"><Insert /></Route>
                    <Route path="/insert/rookie"><InsertRookie /></Route>
                    <Route path="/insert/company"><InsertCompany /></Route>
                    <Route path="/insert/emailauth"><InsertEmailAuth /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/board"><Board /></Route>
                    <Route path="/usermypage"><RookieMypage /></Route>
                    <Route path="/companymypage"><CompanyMypage /></Route>
                    <Route path="/search"><Search /></Route>
                    <MyPopup />
                    <UpandDown/>
                    <Footer />
                </Router>
            </div>
        );
    }
}
export default Base;