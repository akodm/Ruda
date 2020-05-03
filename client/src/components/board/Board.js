import React, { Component } from 'react';
import './board.css';

class Board extends Component {
    render() {
        return (
            <div className="board-main">
                <div className="board-menu">
                <span className="board-title">인재</span>
                    <div className="board-menu-title">
                        <span>업무분야</span>
                    </div>
                    <div className="board-search">
                        <img src="/Image/board_search.png" alt="search" className="search-img"></img>
                        <input type="text" className="board-search-input" maxLength="30" placeholder="검색어를 입력해주세요"></input>
                        <button className="board-btn">검색</button>
                    </div>
                    <div className="board-menu-cate">
                       <ul>
                           <li>WEB
                                <input type="checkbox"></input>
                           </li>
                           <li>GAME
                                <input type="checkbox"></input>
                           </li>
                           <li>MOBILE
                                <input type="checkbox"></input>
                           </li>
                           <li>VR/AR
                                <input type="checkbox"></input>
                           </li>
                           <li>S/W
                                <input type="checkbox"></input>    
                           </li>
                           <li>H/W
                                <input type="checkbox"></input>
                           </li>
                           <li>DESIGN
                                <input type="checkbox"></input>   
                            </li>                           
                       </ul>
                    </div>
                </div>
       
                <div className="board-content">
                    <div className="board-new">
                        <div className="board-new-title">
                            <span >이번주 새로운 인재</span>
                        </div>
                        <div className="board-new-content">
                            <div className="board-card">
                                <span>조준명 바보멍청이 똥개</span>
                            </div>
                            <div className="board-card">
                                <span>조준명 바보멍청이 똥개</span>
                            </div>
                        </div>
                    </div>
                    <div className="board-line" ></div>
                    <div className="board-introduce">
                        <div className="board-introduce-title">
                            <span>인재소개</span>
                            <select className="board-select-option">
                                <option>최신순</option>
                                <option>추천순</option>
                            </select>
                        </div>
                        <div className="board-introduce-content">
                            <div className="board-introduce-content-card">
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                                <div className="board-card">
                                    <span>조준명 바보멍청이 똥개</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Board;