import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

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
    constructor(props) {
        super(props);
        this.state = {
            userToken : "",
        }
    }
    async componentDidMount() {
        try {
            if(localStorage.getItem("users")) {
                const userToken = await this.usersVerify();
                this.setState({ userToken : userToken });
            }
        } catch(err) {
            console.log("main user Token err : " + err)
        }
    }
    async usersVerify(){
        try {
            const result = await axios.get(`http://localhost:5000/verify?token=${localStorage.getItem("users")}`);
            return result.data.userEmail;
        } catch(err) {
            console.log("user token verify err : " + err);
            localStorage.removeItem("users");
        }
    }
    render() {
        const { userToken } = this.state;
        let userauth = userToken || "";
        console.log(userauth);
        return (
            <div className="base-main">
                <Router>
                    <Header />
                    <Route exact path="/">{ userauth ?<RookieMypage/> : <Main user={userauth} />}</Route>
                    <Route exact path="/insert"><Insert /></Route>
                    <Route path="/insert/rookie"><InsertRookie /></Route>
                    <Route path="/insert/company"><InsertCompany /></Route>
                    <Route path="/insert/emailauth"><InsertEmailAuth /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/board"><Board /></Route>
                    <Route path="/usermypage"><RookieMypage /></Route>
                    <Route path="/companymypage"><CompanyMypage /></Route>
                    <Route path="/search"><Search /></Route>
                    { userauth ?<MyPopup /> : ""}
                    <UpandDown/>
                    <Footer />
                </Router>
            </div>
        );
    }
}
export default Base;