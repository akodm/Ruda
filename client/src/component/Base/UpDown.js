import React, { Component } from 'react';
import './Base.css';

class UpDown extends Component {
    scrollToTop = () =>{
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
    scrollToDown = () =>{
        window.scrollTo({top: 10000,left:0,behavior:"smooth"});
    }
    render() {
        return (
            <div className="updown">
                <div className="updown-up" onClick={this.scrollToTop}></div>
                <div className="updown-down" onClick={this.scrollToDown}></div>
            </div>
        );
    }
}

export default UpDown;