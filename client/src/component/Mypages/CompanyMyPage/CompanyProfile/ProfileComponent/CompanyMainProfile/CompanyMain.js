import React, { Component } from 'react';
import './CompanyMainProfile.css';
import ComapanyMainForm from './CompanyMainForm';
import CompanyMainView from './CompanyMainView';
class CompanyMainProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChangeMain: true
        }
    }
    Mainchange(bool){
        this.setState({
            ChangeMain : bool
        });
    }
    render() {
        const {ChangeMain}= this.state;
        const {user} = this.props;
       
        return (
            <div className="RookieMain">
                 { ChangeMain ?  <CompanyMainView user={user} Mainchanges={this.Mainchange.bind(this)}/>: <ComapanyMainForm user={user} Mainchanges={this.Mainchange.bind(this)}/> }
            </div>
        );
    }
}

export default CompanyMainProfile;