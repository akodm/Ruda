import React, { Component } from 'react';
import CompanyHireForm from './CompanyHireForm';
import CompanyHireView from './CompanyHireView';
class CompanyHire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeHire: true
        }
    }
    change(bool){
        this.setState({
            changeHire : bool
        });
    }

    render() {
        const {changeHire}= this.state;
        return (
            <div className="rookiept-content">
                <div className="rookiept-content-content">
                        { changeHire ? <CompanyHireView Hirechange={this.change.bind(this)}/> : <CompanyHireForm  Hirechange={this.change.bind(this)}/> }
                </div>
            </div>
        );
    }
}

export default CompanyHire;