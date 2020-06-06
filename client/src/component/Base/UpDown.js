import React, { Component } from 'react';
import './Base.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp,faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
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
                <div className="updown-up" onClick={this.scrollToTop}>
                <span className="updown-icons"><FontAwesomeIcon icon={faChevronCircleUp} size="3x"/></span>
                </div>
                <div className="updown-down" onClick={this.scrollToDown}>
                 <span className="updown-icons"><FontAwesomeIcon icon={faChevronCircleDown} size="3x"/></span>
                </div>
            </div>
        );
    }
}

export default UpDown;