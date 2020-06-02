import React, { Component } from 'react';

class CompanySearch extends Component {
    render() {
        return (
            <div className="Company-search">
                <div className="Company-search-title">
                    <span className="Company-search-title-title">기업찾기</span>
                    <div className="Company-search-title-states">
                        <div className="Company-search-title-state">
                            <div className="Company-search-title-state-training"></div><span>실습생</span>
                        </div>
                        <div className="Company-search-title-state">
                            <div className="Company-search-title-state-hire"></div><span>채용중</span>
                        </div>
                    </div>
                </div>
                <div className="Company-search-content">
                
                </div>
            </div>
        );
    }
}

export default CompanySearch;