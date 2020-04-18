import React, { Component } from 'react';
import './insert.css';
import { Link } from 'react-router-dom';

class insertmain extends Component {
    render() {
        return (
            <div className="insert-main">
                <div className="insert-title">
                    <span>회원가입</span>
                </div>
                <div className="insert-choice">
                    <Link to = "/insert"><button>ruda회원가입</button></Link>
                    <Link to = ""><button>네이버회원가입</button></Link>
                    <Link to = ""><button>페이스북회원가입</button></Link>
                    <Link to = ""><button>구글회원가입</button></Link>
                </div>
            </div>
        );
    }
}

export default insertmain;