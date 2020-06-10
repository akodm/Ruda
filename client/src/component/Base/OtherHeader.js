import React, { Component } from 'react';
import './Base.css';
import { Link } from 'react-router-dom';
import Header from './Header';

class OtherHeader extends Component {
    render() {
        const user = this.props.user;
        return (
            <div className="OtherHeader">
                <Header user={user} />
            </div>
        );
    }
}

export default OtherHeader;