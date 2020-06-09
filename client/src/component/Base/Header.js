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
            user : this.props.user,
        }
    }
    closePop(e){
        this.setState({
            recoComDisplay : e,
            recoRooDisplay : e,
        })
    }
    render() {
        const {  user,recoComDisplay, recoRooDisplay}=this.state;
      
        return (
            <div className="Header">
                <RecoCompany display={recoComDisplay} close={this.closePop.bind(this)} />
                <RecoRookie  display={recoRooDisplay} close={this.closePop.bind(this)}/>
                <nav  className="Header-nav">
                    <div className="Header-nav-menu">
                        <Link to="/"><img src="/Images/header_logo.png" alt="IMG" /></Link>
                        <Link to="/company"><span className="Header-nav-menu-span">기업</span></Link>
                        <Link to="/rookie"><span className="Header-nav-menu-span">인재</span></Link>
                    </div>
                    <div className="Header-nav-recommendbtn">
                        {/* user && user.cate ? ( user.cate === "user" ?
                        <span>추천기업</span> : 
                        <span>추천인재</span> ) : ""*/}    
                        
                        <span onClick={() => this.setState({ recoComDisplay : recoComDisplay === "none" ? "flex" : "none"})}>추천기업</span> 
                        <span onClick={() => this.setState({ recoRooDisplay : recoRooDisplay === "none" ? "flex" : "none"})}>추천인재</span>  
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;