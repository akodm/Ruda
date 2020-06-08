import React, { Component } from 'react';
import './RecoRookie.css';
class RecoRookie extends Component {
    constructor(props){
        super(props);
        this.state={
            RecoDisplay:"none",
        }
    }
    closePop(){
        this.setState=({
            RecoDisplay:"none",
        })
    }
    render() {
        const {RecoDisplay}=this.state;
        return (
            <div className="RecoRookie" style={{display:this.props.display}} onClick={this.closePop.bind(this)}>
                <div className="RecoRookie-content">
                    <span>추천인재</span>
                    <Card/>
                    <RookieCount/>
                </div>
            </div>
        );
    }
}

export default RecoRookie;