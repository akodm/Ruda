import React, { Component } from 'react';
import './RecoCompany.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft,faCaretRight} from '@fortawesome/free-solid-svg-icons'
import RecoCompanyContent from './RecoCompanyContent';

class RecoCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            RecoDisplay:"none",
        }
    }
    closePop(){
        this.setState=({
            RecoDisplay:"none",
        })
    }
    render() {
        return (
            <div className="RecoCompany" style={{display:this.props.display}}>
                <div className="RecoCompany-content">
                    <span className="RecoCompany-content-title">추천기업</span>
                   <RecoCompanyContent/>
                    <div className="RecoCompany-content-btns">
                        <span className="RecoCompany-content-btns-arrow"><FontAwesomeIcon icon={faCaretLeft} size="3x"/></span>
                        <span className="RecoCompany-content-btns-text">보러가기</span>
                        <span className="RecoCompany-content-btns-arrow"><FontAwesomeIcon icon={faCaretRight} size="3x"/></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecoCompany;