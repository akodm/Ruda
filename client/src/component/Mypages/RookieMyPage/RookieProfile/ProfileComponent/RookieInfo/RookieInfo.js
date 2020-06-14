import React, { Component } from 'react';
import './RookieInfo.css';
import RookieinfoFrom from './RookieinfoFrom';
import RookieinfoView from './RookieinfoView';

class RookieInfo extends Component {
     constructor(props) {
        super(props);
        this.state = {
            changeInfo: true
        }
    }
    infochange(bool){
        this.setState({
            changeInfo : bool
        });
    }
    render() {
        const {changeInfo}= this.state;
        const user =this. props.user;
        return (
            <div className="rookieInfo">
                 { changeInfo ? <RookieinfoView  user={user} infochanges={this.infochange.bind(this)}/>:<RookieinfoFrom user={user} infochanges={this.infochange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieInfo;