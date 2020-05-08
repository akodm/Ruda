import React, { Component } from 'react';

class UpandDown extends Component {
    scrollToTop = () =>{
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
    scrollToDown = () =>{
        window.scrollTo({top: 10000,left:0,behavior:"smooth"});
    }
    render() {
        return (
            <div className="updown">
                <div className="updown-up" onClick={this.scrollToTop}>
                    <img src="/Image/base_up.png" alt="RUDA-LOGO"></img>
                </div>
                <div className="updown-down" onClick={this.scrollToDown}>
                    <img src="/Image/base_down.png" alt="RUDA-LOGO"></img>
                </div>
            </div>
        );
    }
}

export default UpandDown;