import React, { Component } from 'react';
import CompanyCard from '../../Company/CompanyCard';

class RecoCompanyContent extends Component {
    render() {
        return (
            <div className="RecoCompany-content-view">
                <CompanyCard/>
                <div className="RecoCompany-content-card">
                    <span>14명의 기업이 좋아합니다.</span>
                    <span>5개의 포트폴리오가 있습니다.</span>
                    <span>5개의 포트폴리오가 있습니다.</span>
                </div>
            </div>
        );
    }
}

export default RecoCompanyContent;