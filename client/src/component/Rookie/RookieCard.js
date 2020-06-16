import React, { Component } from 'react';
import './Rookie.css';
import axios from 'axios';

class RookieCard extends Component {
    constructor(props){
        super(props);
        this.state={
            changeState:""
        }
    }

    async componentDidMount(){
        
       
        try{
           
           
        }catch(err){
    
        }
    }
    render() {
        return (
            <div className="Rookie-Card">
                <div className="Rookie-Card-header">
                    <div className="Rookie-Card-like">
                        <img src="/Images/1216649.svg" width="12px"height="12px" alt="img"/>
                        <span>14</span>
                    </div>
                    <div className="Rookie-Card-state">
                        <div className="Rookie-search-title-state-training"></div>
                        <div className="Rookie-search-title-state-hire"></div>
                    </div>
                </div>
                <div className="Rookie-Card-Profile">
                    <div className="Rookie-Card-Profile-img" >
                        <img src="/Images/easy_icon.png" alt="img"/>
                    </div>
                    <div className="Rookie-Card-Profile-info">
                        <span className="Rookie-Card-Profile-info-name"></span>
                        <span className="Rookie-Card-Profile-info-text"></span>
                        <span className="Rookie-Card-Profile-info-position"></span>
                        <span className="Rookie-Card-Profile-info-pt">포트폴리오 14개</span>
                        <div className="Rookie-Card-Profile-info-tags">
                            <span className="Rookie-Card-Profile-info-tags-tag">#JAVA</span>
                            <span className="Rookie-Card-Profile-info-tags-tag">#PHP</span>
                            <span className="Rookie-Card-Profile-info-tags-tag">#Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieCard;