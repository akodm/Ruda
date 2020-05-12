import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MyPopup.css';
import Alram from './Alram';
import Msg from './Message';
import axios from 'axios';

class MyPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgDisplay : "none",
            alrDisplay : "none",
        }
    }
    async test() {
        try {
            const result = await axios.get("http://localhost:5000/nodemailer");
            console.log(result);
        } catch(err) {
            console.log(err)
        }
    }
    render() {
        const { msgDisplay,alrDisplay } = this.state;
        return (
            <div className="mypopup-main">
                <Msg display={msgDisplay} />
                <Alram display={alrDisplay} />
                <div className="mypopup-div">
                    <Link to="/"><img src="/Image/menu_home.png" alt="MENUIMG"></img></Link>
                    <img onClick={() => this.setState({ alrDisplay : alrDisplay === "none" ? "flex" : "none"})} className="mypopup-menuImg" src="/Image/menualram.png" alt="MENUIMG"></img>
                    <img onClick={this.test.bind(this)} className="mypopup-menuImg" src="/Image/menu_agreement.png" alt="MENUIMG"></img>
                    <img onClick={() => this.setState({ msgDisplay : msgDisplay === "none" ? "flex" : "none"})} className="mypopup-menuImg" src="/Image/menu_mail.png" alt="MENUIMG"></img>
                </div>
            </div>
        );
    }
}

export default MyPopup;