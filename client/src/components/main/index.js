import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

class MainIndex extends React.Component {
    render() {
        return (
            <div className="main-main">
                <div className="main-intro">
                    <span className="main-title">첫 직장은 RUDA에서</span>
                    <span className="main-h1">진짜 신입만을 위한 사이트 RUDA에서 첫 직장을 만들어요</span>
                </div>
                <div className="main-form">
                    <div className="main-input">
                        <Link to="/login"><div className="main-login">로그인</div></Link>
                        <Link to="/insert"><div className="main-insert">회원가입</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainIndex;