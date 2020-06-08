import React, { Component } from 'react';
import './Main.css';
import MainNotice from './MainNotice';
import MainWith from './MainWith';

class Main extends Component {
    render() {
        return (
            <div className="Main">
                <MainNotice />
                <MainWith />
            </div>
        );
    }
}

export default Main;