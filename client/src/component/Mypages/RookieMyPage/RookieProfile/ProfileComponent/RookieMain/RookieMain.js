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
            ChangeMain : bool
        });
    }
    render() {
        const {ChangeMain}= this.state;
        const {user} = this.props;
        return (
            <div className="RookieMain">
                 { ChangeMain ?  <RookieMainView user={user} Mainchanges={this.Mainchange.bind(this)}/>: <RookieMainForm user={user} Mainchanges={this.Mainchange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieMain;