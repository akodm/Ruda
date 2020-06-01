import React, { Component } from 'react';
import './Rookie.css';
class Rookie extends Component {
    render() {
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select className="address-si">
                        <option>안양시</option>
                    </select>
                </div>
                <div className="Rookie-search">
                    <div className="Rookie-search-title">
                        <span>인재찾기</span>
                        <span></span><span>실습생</span>
                        <span></span><span>구직중</span>
                    </div>
                    <div className="Rookie-search-content">
                        <span></span>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Rookie;