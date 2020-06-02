import React, { Component } from 'react';
import './Easy.css';
import { Link } from 'react-router-dom';

class Easy extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        try {

        } catch(err) {
            console.log("소셜 로그인 에러" + err);
        }
    }

    render() {
        const {  } = this.state;
        return (
            <div className="easy-main">
                <div className="easy-div">
                    <span className="easy-title">간편로그인 / 회원가입</span>
                    <div className="easy-btn">google</div>
                    <div className="easy-btn">facebook</div>
                    <div className="easy-btn">naver</div>
                    <div className="easy-bottom">
                        <div className="easy-line"></div>
                        <span className="easy-text">또는</span>
                        <div className="easy-line"></div>
                    </div>
                    <span className="easy-easy"><Link to="/login">하이루키 계정으로 로그인하기</Link></span>
                    <span className="easy-easyb"><Link to="/insert">하이루키 계정으로 회원가입하기</Link></span>
                </div>
            </div>
        );
    }
}

export default Easy;