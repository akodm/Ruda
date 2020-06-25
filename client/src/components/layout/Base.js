import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import config from '../../client-configs';  // 컨피그 파일
import '../css/Layout.css';

// layout components
import Header from './Header';
import Footer from './Footer';
import UpDown from '../component/UpDown';

// page components
import Main from '../page/main/Main';   // main
import Login from '../page/login/Login';    // login
import Easy from '../page/login/Easy';  // easy login
import Insert from '../page/insert/Insert'; // insert
import Info from '../page/info/Info';   // info

class Base extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : {
                id : 1,
                tag : "",
                email : "",
                cate : "",
            },
        }
    }

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

    render() {
        const { user } = this.state;
        return (
            <div className="base-main">
                 <Router>
                     <Switch>
                        <React.Fragment>
                            <div style={{height:"75px",width:"100%"}}></div>
                            {/*상단 */}
                            <Header />
                            {/*메인 */}
                            <Route exact path="/" component={user.email ? "" : Main}></Route>
                            <Route path="/easy"><Easy/></Route>
                            <Route path="/login"><Login/></Route>
                            <Route path="/insert"><Insert/></Route>
                            <Route path="/info"><Info user={user} /></Route>
                            {/*화면업다운버튼*/ }
                            <UpDown />
                            {/*하단 */}
                            <Footer />
                        </React.Fragment>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Base;