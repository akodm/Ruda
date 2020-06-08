import React, { Component } from 'react';
import './Company.css';
import CompanyCard from './CompanyCard';
import CompanySearch from './CompanySearch';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

class Company extends Component {
    render() {
        return (
            <div className="Company">
            <div className="Company-title">
                <span>기업</span>
                <select className="Company-title-select">
                    <option selected value="최신순">최신순</option>
                    <option value="인기순">인기순</option>
                </select>
            </div>
            <CompanySearch/>
            <div className="Company-CardView">
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <Link to ="/mypage"><CompanyCard/></Link>
                <div className="Company-CardView-PagiNation">
                <Pagination count={10} />
                </div>
            </div>
        </div>
        );
    }
}

export default Company;