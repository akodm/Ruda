import React, { Component } from 'react';
import './Search.css';
import IdSearch from './IdSearch';
import PassSearch from './PassSearch';

class Search extends Component {
    render() {
        return (
            <div className="search-main">
                <IdSearch />
                <div className="search-center"></div>
                <PassSearch />
            </div>
        );
    }
}

export default Search;