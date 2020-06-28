import React, { Component } from 'react';
import '../css/NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="Not-main">
                <h2>Not Found</h2>
                <h4>존재하지 않는 url이거나, 혹은 잘못된 접근입니다.</h4>
                <Link to="/" className="Not-link">메인으로 돌아가기</Link>
            </div>
        );
    }
}

export default NotFound;