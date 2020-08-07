import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import config from '../../client-configs';  // 컨피그 파일
import '../css/Layout.css';
import '../css/Popup.css';
import '../css/MsgBox.css';

// layout components
import Header from './Header';
import Footer from './Footer';
import DevMessage from '../component/DevMessage';
import UpDown from '../component/UpDown';
import Popup from '../component/Popup';
import Msg from '../component/MessageBox';

import NotFound from './NotFound';

// page components
import Main from '../page/main/Main';   // main
import Login from '../page/login/Login';    // login
import Easy from '../page/login/Easy';  // easy login
import Insert from '../page/insert/Insert'; // insert
import Searchuser from '../page/searchuser/Searchuser'; //searchuser

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
            receiveData : [],
            sendData : [],

            open : { view : false, cate : "user" },
            msg : false,
            unReadMsg : 0,

            load : false,
        }
    }

    // 첫 메인 페이지 접속 시 확인
    async componentDidMount() {
        // 게시판 마운트
        await this.boardMount();

        // 유저 데이터 마운트
        let user = localStorage.getItem("users");
        if(user) { await this.loginMount(user); }

        this.setState({ load : true });
    }

    // 로그인 시의 새롭게 마운트 & 초기 마운트
    async loginMount(user) {
        try {
            if(user) {
                let getUser = JSON.parse(localStorage.getItem("users"));
                const verify = await axios.get(`${config.app.s_url}/users/verify`, {
                    headers : {
                        "Authorization" : getUser.token, 
                    }
                })
                let userId = await axios.get(`${config.app.s_url}/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
                
                let recv = axios.get(`${config.app.s_url}/mails/receive?&target=${userId.data.id}`);
                let send = axios.get(`${config.app.s_url}/mails/send?userId=${userId.data.id}`);
    
                await Promise.all([recv, send]).then(data => {
                    recv = data[0].data;
                    send = data[1].data;
                })
    
                let unReadCount = 0;
                recv.forEach(data => { if(!data.readState) unReadCount++; });
    
                this.setState({
                    user : {
                        id : userId.data.id,
                        tag : verify.data.tag,
                        email : verify.data.email,
                        cate : userId.data.userCate,
                    },
                    receiveData : recv,
                    sendData : send,
                    unReadMsg : unReadCount,
                });
            }
        } catch(err) {
            localStorage.removeItem("users");
            window.location.href = "/";
            alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
        }
    }

    // 메일함 마운트
    async mailReload() {
        const { user }  = this.state;

        if(!user.email) { alert("로그인 정보 확인이 불가능합니다. 로그인 혹은 재로그인 해주세요."); return; }
        try {
            let recv = axios.get(`${config.app.s_url}/mails/receive?&target=${user.id}`);
            let send = axios.get(`${config.app.s_url}/mails/send?userId=${user.id}`);

            await Promise.all([recv, send]).then(data => {
                recv = data[0].data;
                send = data[1].data;
            });

            let unReadCount = 0;
            recv.forEach(data => { if(!data.readState) unReadCount++; });

            if(recv) recv = recv.reverse();
            if(send) send = send.reverse();

            this.setState({
                receiveData : recv,
                sendData : send,
                unReadMsg : unReadCount,
            });
        } catch(err) {
            console.log("메일함 새로고침 중 에러 발생");
            alert("메일을 새로고침 하는 중 에러가 발생했습니다. 다시 시도해주세요.");
        }
    }

    // 게시판 마운트
    async boardMount() {
        try {
            let rookies = axios.get(`${config.app.s_url}/userInfos/yall`);
            let companys = axios.get(`${config.app.s_url}/companyInfos/yall`);

            await Promise.all([rookies, companys]).then(data => {
                rookies = data[0];
                companys = data[1];
            });

            this.setState({
                userBoardData : (await rookies).data,
                companyBoardData : (await companys).data,
            });
        } catch(err) {
            console.log("board mount err : ");
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

    // 추천 팝업 창 열고 닫기
    openClose(bool, cate) { this.setState({ open : { view : bool, cate } }); }

    // 로드 세팅
    loadSet(bool) { this.setState({ load : bool }); }

    // 메시지 팝업 제어
    msgOpenClose(bool) { this.setState({ msg : bool }); }

    render() {
        const { user, userBoardData, companyBoardData, load, open, msg, unReadMsg, receiveData, sendData } = this.state;
        return load ? (
            <div className="base-main">
                 <Router>
                    <div style={{height:"75px",width:"100%"}}></div>
                    {/*상단 */}
                    <Header unReadMsg={unReadMsg} loadSet={this.loadSet.bind(this)} user={user} openClose={this.openClose.bind(this)} msgOpenClose={this.msgOpenClose.bind(this)} />

                    { open.view && <Popup user={user} open={open} openClose={this.openClose.bind(this)} boardData={ open.cate === "company" ? userBoardData : companyBoardData } /> }
                     <Switch>
                        {/*메인 */}
                        <Route exact path="/" render={props => user.email ? (user.cate ? <Mypage mailReload={this.mailReload.bind(this)} boardMount={this.boardMount.bind(this)} user={user} {...props} /> : <Info user={user} {...props} /> )  : ( load ? <Main /> : "" ) } ></Route>
                        
                        <Route path="/easy" render={props => user.email ? <NotFound/> : <Easy loginMount={this.loginMount.bind(this)} set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/login" render={props => user.email ? <NotFound/> :  <Login loginMount={this.loginMount.bind(this)} set={this.setUser.bind(this)} {...props} />} ></Route>
                        <Route path="/insert" render={props => user.email ? <NotFound/> : <Insert {...props} /> }></Route>
                        <Route path="/Searchuser" render={props => user.email ? <NotFound/> : <Searchuser {...props} /> }></Route>

                        <Route path="/company" render={props => <Cboard data={companyBoardData} user={user} {...props} /> }></Route>
                        <Route path="/rookie" render={props => <Rboard data={userBoardData} user={user} {...props}/>}></Route>
                       
                        <Route path="/mypage/:id" render={props => <Mypage mailReload={this.mailReload.bind(this)} boardMount={this.boardMount.bind(this)} user={user} {...props} /> }></Route>
                        {/* Not Found Page 주소에 일치하는 패스가 없을 경우 */}
                        <Route component={NotFound} ></Route>
                    </Switch>
                    { user.email && msg && <Msg mailReload={this.mailReload.bind(this)} receiveData={receiveData} sendData={sendData} user={user} msg={msg} msgOpenClose={this.msgOpenClose.bind(this)} /> }
                    {/*개발자에게 문의버튼 */}
                    <DevMessage user={user} />
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