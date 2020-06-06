import React, { Component } from 'react';
import './RookieMain.css';
import RookieMainForm from './RookieMainForm';
import RookieMainView from './RookieMainView';

class RookieMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChangeMain: true
        }
    }
    Mainchange(bool){
        this.setState({
            MainTag : bool
        });
    }
    render() {
        const {ChangeMain}= this.state;
        return (
            <div className="rookieInfo">
                 { ChangeMain ? <RookieMainForm Mainchanges={this. Mainchange.bind(this)}/> : <RookieMainView Mainchanges={this. Mainchange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieMain;