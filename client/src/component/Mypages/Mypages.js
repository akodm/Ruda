import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';

class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            url : new URL(window.location),
        }
    }
    
    scrollToTop = () =>{ window.scrollTo({top:0}); }

    render() {
        let user = this.props.user;

        const { url } = this.state;
        let urls = url.pathname;
        urls = urls.split("/");
        let urlProps = urls[2] || "";
        return (
            <div className="Mypages">
                { user.cate !== "user" ? <CompanyMypage user={user} url={urlProps} /> : <RookieMypage user={user} url={urlProps} /> }
            </div>
        );
    }
}

export default Mypages;