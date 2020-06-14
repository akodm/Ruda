import React, { Component } from 'react';

class RookieSearch extends Component {
    render() {
        return (
            <div className="Rookie-search">
                <div className="Rookie-search-title">
                    <span className="Rookie-search-title-title">인재찾기</span>
                    <div className="Rookie-search-title-states">
                        <div className="Rookie-search-title-state">
                            <div className="Rookie-search-title-state-training"></div><span>실습생</span>
                        </div>
                        <div className="Rookie-search-title-state">
                            <div className="Rookie-search-title-state-hire"></div><span>구직중</span>
                        </div>
                    </div>
                </div>
                <div className="Rookie-search-content">
                
                </div>
            </div>
        );
    }
}

export default RookieSearch;