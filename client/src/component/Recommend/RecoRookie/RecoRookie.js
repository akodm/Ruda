import React, { Component } from 'react';
import './RecoRookie.css';
import { Card } from '@material-ui/core';
import RecoCompanyContent from '../RecoCompany/RecoCompanyContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft,faCaretRight} from '@fortawesome/free-solid-svg-icons'
class RecoRookie extends Component {
    constructor(props){
        super(props);
        this.state={
            RecoDisplay:"none",
        }
    }
    closePop(){
        this.props.close("none");
    }
    render() {
        const {RecoDisplay}=this.state;
        return (
            <div className="RecoRookie" style={{display:this.props.display}} onClick={this.closePop.bind(this)} >
                <div className="RecoRookie-content">
                    <span>추천인재</span>
                    <Card/>
                    <RecoCompanyContent/>
                </div>
                <div className="RecoCompany-content-btns">
                    <span className="RecoCompany-content-btns-arrow"><FontAwesomeIcon icon={faCaretLeft} size="3x"/></span>
                    <span className="RecoCompany-content-btns-text">보러가기</span>
                    <span className="RecoCompany-content-btns-arrow"><FontAwesomeIcon icon={faCaretRight} size="3x"/></span>
                </div>
            </div>
        );
    }
}

export default RecoRookie;