import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            user : this.props.user,
        }
    }

    render() {
        return (
            <div className="Header">
                <nav  className="Header-nav">
                    <div className="Header-nav-menu">
                        <Link to="/"><img src="/Images/RUDALogore.png" alt="IMG" className="Header-logo" /></Link>
                        <Link to="/company"><div className="Header-nav-menu-span">기업</div></Link>
                        <Link to="/rookie"><div className="Header-nav-menu-span">인재</div></Link>
                    </div>
                    <div className="Header-nav-recommendbtn">
                        <div>추천기업</div> 
                        <div>추천인재</div>  
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;