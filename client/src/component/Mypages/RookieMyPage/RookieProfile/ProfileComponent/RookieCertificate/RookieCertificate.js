import React, { Component } from 'react';
import './RookieCertificate.css'
import RookieCertificateForm from './RookieCertificateForm';
import RookieCertificateView from './RookieCertificateView';

class RookieCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeCertificate: true
        }
    }
    certificatechange(bool){
        this.setState({
            changeCertificate : bool
        });
    }
    render() {
        const {changeCertificate}= this.state;
        return (
            <div className="rookieCertificate">
                { changeCertificate ? <RookieCertificateForm certificatechanges={this.certificatechange.bind(this)}/> : <RookieCertificateView certificatechanges={this.certificatechange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieCertificate;