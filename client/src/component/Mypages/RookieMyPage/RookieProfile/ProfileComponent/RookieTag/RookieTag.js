import React, { Component } from 'react';
import RookieTagFrom from './RookieTagFrom';
import RookieTagView from './RookieTagView';

class RookieTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeTag: true
        }
    }
    tagchange(bool){
        this.setState({
            changeTag : bool
        });
    }
    render() {
        const {changeTag}= this.state;
        return (
            <div className="rookieInfo">
                 { changeTag ? <RookieTagFrom tagchanges={this. tagchange.bind(this)}/> : <RookieTagView tagchanges={this. tagchange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieTag;