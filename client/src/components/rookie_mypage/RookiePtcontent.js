import React, { Component } from 'react';
import RookiePtcontentView from './RookiePtcontentView';
import RookiePtcontentFrom from './RookiePtcontentFrom';


class RookiePtcontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePt: true
        }
    }
    change(bool){
        this.setState({
            changePt : bool
        });
    }

    render() {
        const {changePt}= this.state;
        return (
            <div className="rookiept-content">
                <div className="rookiept-content-content">
                        { changePt ? <RookiePtcontentFrom Ptchange={this.change.bind(this)}/> : <RookiePtcontentView Ptchange={this.change.bind(this)}/> }
                </div>
            </div>
        );
    }
}

export default RookiePtcontent;