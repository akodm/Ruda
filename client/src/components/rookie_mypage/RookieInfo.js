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
        return (
            <div className="rookieInfo">
                 { changeInfo ? <RookieinfoFrom infochanges={this.infochange.bind(this)}/> : <RookieinfoView infochanges={this.infochange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieInfo;