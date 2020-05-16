import React, { Component } from 'react';
import './RookieAwards.css'
import RookieAwardsForm from './RookieAwardsForm';
import RookieAwardsView from './RookieAwardsView';

class RookieAwards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeAward: true
        }
    }
    awardschange(bool){
        this.setState({
            changeAward : bool
        });
    }
    render() {
        const {changeAward}= this.state;
        return (
            <div className="rookieAwards">
                { changeAward ? <RookieAwardsForm awardschanges={this.awardschange.bind(this)}/> : <RookieAwardsView awardschanges={this.awardschange.bind(this)}/> }
            </div>
        );
    }
}

export default RookieAwards;