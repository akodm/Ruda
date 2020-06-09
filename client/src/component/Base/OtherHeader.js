import React, { Component } from 'react';
import './Base.css';
import { Link } from 'react-router-dom';
import Header from './Header';

class OtherHeader extends Component {
    render() {
        return (
            <div className="OtherHeader">
               <Header/>
            </div>
        );
    }
}

export default OtherHeader;