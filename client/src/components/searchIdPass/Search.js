import React, { Component } from 'react';
import './Search.css';
import EmailSearch from './EmailSearch';
import PassSearch from './PassSearch';

class Search extends Component {
    render() {
        return (
            <div className="search-main">
                <img src="/Image/login_search.png" alt="IMG" className="search-img"></img>
                <div className="search-div">
                    <EmailSearch />
                    <div className="search-centerLine"></div>
                    <PassSearch />
                </div>
            </div>
        );
    }
}

export default Search;