import React, { Component } from 'react';
import '../css/NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="Not-main">
                <div className="Not-main-notice">
                    <img src="/Images/error.png" width="80px" height="80px"></img>
                    <h2>페이지를 찾을 수 없습니다.</h2>
                    <h4>입력하신 주소는 존재하지 않는 페이지이거나,<br></br> 혹은 잘못된 접근입니다.</h4>
                    <Link to="/" className="Not-link">메인으로 돌아가기</Link>
                </div>
            </div>
        );
    }
}

export default NotFound;