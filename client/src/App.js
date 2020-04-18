import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 루트 인덱스
import Root from './components/BaseLayout/root';
// 메인 페이지
import MainIndex from './components/MainPage/index/index';
// 로그인 페이지
import Login from './components/MainPage/login/login';
// 회원가입 페이지
import Insert from './components/MainPage/insert/insert';
//기업찾기 게시판페이지
import Company from './components/BoardPage/Company';
//인재찾기 게시판페이지
import Rookies from './components/BoardPage/Rookie';
//실습생찾기 게시판페이지
import Trainee from './components/BoardPage/Trainee';
//성공사례 게시판페이지
import Success from './components/BoardPage/Success'
//가입메인 페이지
import insertmain from './components/MainPage/insert/insertmain';

function App() {
    return (
        <div className="app-main">
            <Router>
                <Root main={
                      <Switch>
                          <Route exact path="/" component={MainIndex} />
                          <Route path="/login" component={Login} />
                          <Route path="/insertmain" component={insertmain}/>
                          <Route path="/insert" component={Insert} />
                          <Route path="/Company" component={Company}/>
                          <Route path="/rookie" component={Rookies}/>
                          <Route path="/trainee" component={Trainee}/>
                          <Route path="/success" component={Success}/>
                      </Switch>
                }/>
            </Router>
        </div>
    );
}

export default App;
