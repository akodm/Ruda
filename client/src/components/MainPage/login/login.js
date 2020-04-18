import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

class Login extends React.Component {
    render() {
        return (
            <div className="login-main">
                <div className="login-title">
                    <span>로그인</span>
                </div>
                <div className="login_box">
                    <div className="login-form">
                        <input type="text" className="login-formID" placeholder="아이디"></input>
                        <input type="password" className="login-formPass" placeholder="비밀번호"></input>
                        <button>로그인</button>
                    </div>
                    <div className="login-line"></div>
                    <div className="login-choice">
                        <Link to = ""><button>네이버로그인</button></Link>
                        <Link to = ""><button>페이스북로그인</button></Link>
                        <Link to = ""><button>구글로그인</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;