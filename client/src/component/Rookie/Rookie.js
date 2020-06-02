import React, { Component } from 'react';
import './Rookie.css';
import RookieSearch from './RookieSearch';
import RookieCard from './RookieCard';
class Rookie extends Component {
    render() {
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select className="Rookie-title-select">
                        <option selected value="최신순">최신순</option>
                        <option value="인기순">인기순</option>
                    </select>
                </div>
                <RookieSearch/>
                <div className="Rookie-CardView">
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <RookieCard/>
                    <div className="Rookie-CardView-PagiNation">
                        페이지네이션자리
                    </div>
                </div>
            </div>
        );
    }
}

export default Rookie;