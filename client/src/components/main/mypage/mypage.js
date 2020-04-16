import React from 'react';
import { Link } from 'react-router-dom';

class MypageIndex extends React.Component {
    render() {
        return (
            <div className="mypage-main">
                Mypage
                <Link to="/">Main</Link>
                <Link to="/login">login</Link>
            </div>
        );
    }
}

export default MypageIndex;