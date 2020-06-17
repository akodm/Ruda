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
        });
    }

    openPop(num) {
        const { user,recoComDisplay, recoRooDisplay } = this.state;
        if(!user||!user.email)
            return alert("로그인 후 이용 가능합니다.");
   
        if(num) {
            this.setState({ recoComDisplay : recoComDisplay === "none" ? "flex" : "none"})
        } else {
            this.setState({ recoRooDisplay : recoRooDisplay === "none" ? "flex" : "none"})
        }
    }

    render() {
        const { user,recoComDisplay, recoRooDisplay}=this.state;
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
                        <span onClick={this.openPop.bind(this,1)}>추천기업</span> 
                        <span onClick={this.openPop.bind(this,0)}>추천인재</span>  
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;