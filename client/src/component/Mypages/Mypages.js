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

    componentDidMount() {
        const { url } = this.state;
        const load = this.props.load;
        if(load){
            let urls = url.pathname;
            urls = urls.split("/");
            console.log(urls);
            if(urls[2]) {
                
            } else {
               
            }
        }
    }
    
    scrollToTop = () =>{
        window.scrollTo({top:0});
    }

    render() {
        const load = this.props.load;
        let user =this.props.user;
        return load && (
            <div className="Mypages">
                {user.cate != "user" ? <CompanyMypage />:<RookieMypage/>}
            </div>
        );
    }
}

export default Mypages;