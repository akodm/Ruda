import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="login-main">
                Login
                <Link to="/mypage">mypage</Link>
            </div>
        );
    }
}

export default Login;