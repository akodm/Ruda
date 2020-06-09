import React, { Component } from 'react';
import './Base.css';
import { Link } from 'react-router-dom';
import Header from './Header';

class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        }
    }
    render() {
        
        return (
            <div className="MainHeader">
                  <Header/>
                <div className="MainHeader-content">
                    <div className="MainHeader-text">
                        <h2>당신의 첫 시작을 하이루키와 함께 하세요</h2>
                        <h3>사회초년생 졸업예정자 대학실습생</h3>
                        <h4>경력없는 신입들간의 구인구직사이트 <br/>
                            하이루키에서 지금 바로  당신의 능력을 어필해보세요! </h4>
                    </div>
                    <div className="MainHeader-btns">
                        <div>
                            <Link to ="/insert"><button className="MainHeader-btns-Insert">회원가입</button></Link>
                            <Link to ="/login"><button className="MainHeader-btns-Login">로그인</button></Link>
                        </div>
                        <div className="MainHeader-btns-line">
                            <Link to ="/easy"><span className="MainHeader-btns-easy">간편하게 회원가입/로그인하기</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainHeader;