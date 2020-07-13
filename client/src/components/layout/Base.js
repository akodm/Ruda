import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import config from '../../client-configs';  // 컨피그 파일
import '../css/Layout.css';
import '../css/Popup.css';

// layout components
import Header from './Header';
import Footer from './Footer';
import UpDown from '../component/UpDown';
import Popup from '../component/Popup';

import NotFound from './NotFound';

// page components
import Main from '../page/main/Main';   // main
import Login from '../page/login/Login';    // login
import Easy from '../page/login/Easy';  // easy login
import Insert from '../page/insert/Insert'; // insert
import Info from '../page/info/Info';   // info
import Cboard from '../page/board/Cboard';  // rookie board
import Rboard from '../page/board/Rboard';  // company board
import Mypage from '../page/mypage/MypageRoute';    // mypage

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

            userBoardData : [],
            companyBoardData : [],

            open : { view : false, cate : "user" },

            load : false,
        }
    }

    // 첫 메인 페이지 접속 시 확인
    async componentDidMount() {
        try {
            let rookies = axios.get(`${config.app.s_url}/userInfos/yall`);
            let companys = axios.get(`${config.app.s_url}/companyInfos/yall`);

            await Promise.all([rookies, companys]).then(data => {
                rookies = data[0];
                companys = data[1];
            });
            
            let user = localStorage.getItem("users");
            if(user) {
                let getUser = JSON.parse(localStorage.getItem("users"));
                const verify = await axios.get(`${config.app.s_url}/users/verify`, {
                    headers : {
                        "Authorization" : getUser.token, 
                    }
                })
                let userId = await axios.get(`${config.app.s_url}/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
                this.setState({
                    user : {
                        id : userId.data.id,
                        tag : verify.data.tag,
                        email : verify.data.email,
                        cate : userId.data.userCate,
                    }
                });
            }

            this.setState({
                userBoardData : (await rookies).data,
                companyBoardData : (await companys).data,
            });
        } catch(err) {
            console.log("verify err : " + err);
            localStorage.removeItem("users");
        }
        this.setState({ load : true });
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

    // 추천 팝업 창 열고 닫기
    openClose(bool, cate) { 
        this.setState({ open : { view : bool, cate } }); 
    }

    // 로드 세팅
    loadSet(bool) { this.setState({ load : bool }); }

    render() {
        const { user, userBoardData, companyBoardData, load, open } = this.state;
        return load ? (
            <div className="base-main">
                 <Router>
                    <div style={{height:"75px",width:"100%"}}></div>
                    {/*상단 */}
                    <Header loadSet={this.loadSet.bind(this)} user={user} openClose={this.openClose.bind(this)} />

                    { open.view && <Popup user={user} open={open} openClose={this.openClose.bind(this)} boardData={ open.cate === "company" ? userBoardData : companyBoardData } /> }
                     <Switch>
                        {/*메인 */}
                        <Route exact path="/" render={props => user.email ? (user.cate ? <Mypage user={user} {...props} /> : <Info user={user} {...props} /> )  : ( load ? <Main /> : "" ) } ></Route>
                        
                        <Route path="/easy" render={props => user.email ? <NotFound/> : <Easy set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/login" render={props => user.email ? <NotFound/> :  <Login set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/insert" render={props => user.email ? <NotFound/> : <Insert {...props} /> }></Route>
                        
                        <Route path="/company" render={props => <Cboard data={companyBoardData} user={user} {...props} /> }></Route>
                        <Route path="/rookie" render={props => <Rboard data={userBoardData} user={user} {...props}/>}></Route>
                        
                        <Route path="/mypage/:id" render={props => <Mypage user={user} {...props} /> }></Route>
                        {/* Not Found Page 주소에 일치하는 패스가 없을 경우 */}
                        <Route component={NotFound} ></Route>
                    </Switch>

                    {/*화면업다운버튼*/ }
                    <UpDown />
                    {/*하단 */}
                    <Footer />
                </Router>
            </div>
        ) : <div></div>
    }
}

export default Base;