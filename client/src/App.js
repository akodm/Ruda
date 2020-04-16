import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 루트 인덱스
import Root from './components/root';
// 메인 페이지
import MainIndex from './components/main/index';
// 마이페이지
import MypageIndex from './components/main/mypage/mypage';
// 로그인 페이지
import Login from './components/main/login/login';

function App() {
    return (
        <div className="app-main">
            <Router>
                <Root main={
                      <Switch>
                          <Route exact path="/" component={MainIndex} />
                          <Route path="/mypage" component={MypageIndex} />
                          <Route path="/login" component={Login} />
                      </Switch>
                }/>
            </Router>
        </div>
    );
}

export default App;
