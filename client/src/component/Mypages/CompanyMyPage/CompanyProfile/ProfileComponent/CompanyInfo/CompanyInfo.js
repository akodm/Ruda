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
        const {user} =this.props;
        return (
            <div className="rookieInfo">
                 { changeInfo ? <CompanyInfoView user={user} infochanges={this.infochange.bind(this)}/> :<CompanyInfoForm user={user} infochanges={this.infochange.bind(this)}/> }
            </div>
        );
    }
}

export default CompanyInfo;