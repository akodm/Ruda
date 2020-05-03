import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Insert.css';

class Insert_main extends Component {
    render() {
        return (
            <div className="insert-main">
                <span className="insert-title">회원가입</span>
                    <div className="insert-imgDiv">
                    <Link to="/insert/company">
                        <div className="insert-img">
                            <img className="insert-imgSrc" src ="Image/insert_company.png" alt="InsertIMG"></img>
                            <span className="insert-imgSpan">기업 회원가입</span>
                        </div>
                    </Link>
                    <Link to="/insert/rookie">
                        <div className="insert-img">
                            <img className="insert-imgSrc" src ="Image/insert_rookie.png" alt="InsertIMG"></img>
                            <span className="insert-imgSpan">신입 회원가입</span>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Insert_main;