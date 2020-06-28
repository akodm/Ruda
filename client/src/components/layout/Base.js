import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import config from '../../client-configs';  // 컨피그 파일
import '../css/Layout.css';

// layout components
import Header from './Header';
import Footer from './Footer';
import UpDown from '../component/UpDown';

import NotFound from './NotFound';

// page components
import Main from '../page/main/Main';   // main
import Login from '../page/login/Login';    // login
import Easy from '../page/login/Easy';  // easy login
import Insert from '../page/insert/Insert'; // insert
import Info from '../page/info/Info';   // info
import Cboard from '../page/board/Cboard';  // rookie board
import Rboard from '../page/board/Rboard';  // company board

class Base extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : {
                id : 0,
                tag : "",
                email : "",
                cate : "",
            },
        }
    }

    // 첫 메인 페이지 접속 시 확인
    async componentDidMount() {
        let user = localStorage.getItem("users");
        if(user) {
            try {
                let getUser = JSON.parse(localStorage.getItem("users"));
                const verify = await axios.get(`${config.app.s_url}/users/verify`, {
                    headers : {
                        "Authorization" : getUser.token, 
                    }
                })
                const userId = await axios.get(`${config.app.s_url}/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
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
                localStorage.removeItem("users");
            }
        }
    }

    // 로그인 시의 스태이트 변경
    setUser(data) {
        this.setState({
            user : {
                id : data.id,
                tag : data.tag,
                email : data.email,
                cate : data.cate,
            }
        })
    }

    render() {
        const { user } = this.state;
        console.log(user);
        return (
            <div className="base-main">
                 <Router>
                    <div style={{height:"75px",width:"100%"}}></div>
                    {/*상단 */}
                    <Header />
                     <Switch>
                        {/*메인 */}
                        <Route exact path="/" render={props => user.email ? (user.cate ? "" : <Info user={user} {...props} /> )  : <Main /> } ></Route>
                        <Route path="/easy" render={props => user.email ? <Main/> : <Easy set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/login" render={props => user.email ? <Main/> :  <Login set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/insert" render={props => user.email ? <Main/> : <Insert {...props} /> }></Route>
                        <Route path="/company" component={Cboard} ></Route>
                        <Route path="/rookie" component={Rboard} ></Route>
                        {/* Not Found Page 주소에 일치하는 패스가 없을 경우 */}
                        <Route component={NotFound} ></Route>
                    </Switch>
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