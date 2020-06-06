import React, { Component } from 'react';
import './Rookie.css';
import RookieSearch from './RookieSearch';
import RookieCard from './RookieCard';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

class Rookie extends Component {
    render() {
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select className="Rookie-title-select">
                        <option selected value="최신순">최신순</option>
                        <option value="인기순">인기순</option>
                    </select>
                </div>
                <RookieSearch/>
                <div className="Rookie-CardView">
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <Link to="/mypage"><RookieCard/></Link>
                    <div className="Rookie-CardView-PagiNation">
                        <Pagination count={10} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Rookie;