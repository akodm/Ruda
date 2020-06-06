import React, { Component } from 'react';
import CompanyHire from './CompanyHire/CompanyHire';

class CompanyProject extends Component {
    render() {
        return (
            <div className="rookie-profile-content">
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>루다 채용공고</span>
                </div>
                <CompanyHire/>
                
            </div>
        );
    }
}

export default CompanyProject;