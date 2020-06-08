import React, { Component } from 'react';
import './Base.css';
import { Link } from 'react-router-dom';
import RecoCompany from '../Recommend/RecoCompany/RecoCompany';
import RecoRookie from '../Recommend/RecoRookie/RecoRookie';

class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            recoComDisplay: "none",
            recoRooDisplay: "none",
        }
    }
    render() {
        const { recoComDisplay, recoRooDisplay}=this.state;
        return (
            <div className="Header">
                <RecoCompany display={recoComDisplay} />
                <RecoRookie  display={recoRooDisplay}/>
                <nav  className="Header-nav">
                    <div className="Header-nav-menu">
                        <Link to="/"><img src="/Images/header_logo.png"/></Link>
                        <Link to="/company"><span className="Header-nav-menu-span">기업</span></Link>
                        <Link to="/rookie"><span className="Header-nav-menu-span">인재</span></Link>
                    </div>
                    <div className="Header-nav-recommendbtn"> 
                      <span  onClick={() => this.setState({ recoComDisplay : recoComDisplay === "none" ? "flex" : "none"})}>추천기업</span>
                        <span  onClick={() => this.setState({ recoRooDisplay : recoRooDisplay === "none" ? "flex" : "none"})}>추천인재</span>
                      
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;