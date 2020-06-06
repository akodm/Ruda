import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';

class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            user : this.props.user || null,
        }
    }
    scrollToTop = () =>{
        window.scrollTo({top:0});
    }
    render() {
        return (
            <div className="Mypages">
                {""?<CompanyMypage/>:<RookieMypage/>}

            </div>
        );
    }
}

export default Mypages;