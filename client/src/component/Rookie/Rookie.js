import React, { Component } from 'react';
import './Rookie.css';
class Rookie extends Component {
    render() {
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select className="Rookie-title-select">
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </div>
                <div className="Rookie-search">
                    <div className="Rookie-search-title">
                        <span className="Rookie-search-title-title">인재찾기</span>
                        <div>
                            <span className="Rookie-search-title-state"></span><span>실습생</span>
                            <span className="Rookie-search-title-state"></span><span>구직중</span>
                        </div>
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