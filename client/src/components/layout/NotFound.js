import React, { Component } from 'react';
import '../css/NotFound.css';

class NotFound extends Component {
    render() {
        return (
            <div className="Not-main">
                <h2>Not Found</h2>
                <h4>존재하지 않는 url이거나, 혹은 잘못된 접근입니다.</h4>
                <a href="/" className="Not-link">메인으로 돌아가기</a>
            </div>
        );
    }
}

export default NotFound;