import React, { Component } from 'react';
import Header from './Header';

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
                <div className="updown-up" onClick={this.scrollToTop}>
                    <img src="/Image/base_up.png" alt="RUDA-LOGO" ></img>
                </div>
                <div className="updown-down" onClick={this.scrollToDown}>
                    
                    <img src="/Image/base_down.png" alt="RUDA-LOGO" ></img>
                </div>
            </div>
        );
    }
}

export default UpandDown;