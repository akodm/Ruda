import React, { Component } from 'react';
import CompanyInfoForm from './CompanyInfoForm';
import CompanyInfoView from './CompanyInfoView';
import './CompanyInfo.css';

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeInfo: true
        }
    }
    infochange(bool){
        this.setState({
            changeInfo : bool
        });
    }
    render() {
        const {changeInfo}= this.state;
        return (
            <div className="rookieInfo">
                 { changeInfo ? <CompanyInfoForm infochanges={this.infochange.bind(this)}/> : <CompanyInfoView infochanges={this.infochange.bind(this)}/> }
            </div>
        );
    }
}

export default CompanyInfo;