import React, { Component } from 'react';

class UpandDown extends Component {
    scrollToTop = event =>{
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
    scrollToDown = event =>{
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

export default UpandDown;