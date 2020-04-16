import React from 'react';
import { Link } from 'react-router-dom';

class MainIndex extends React.Component {
    render() {
        return (
            <div className="main-main">
                <Link to="/mypage">Mypage</Link>
            </div>
        );
    }
}

export default MainIndex;