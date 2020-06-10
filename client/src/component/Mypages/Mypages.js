import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';

class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            url : new URL(window.location),
            load : false,
        }
    }

    componentDidMount() {
        const { url } = this.state;
        let urls = url.pathname;
        urls = urls.split("/");
        // id가 있을 경우
        if(urls[2]) {

        // url이 없거나 mypage인 경우
        } else {

        }
        this.setState({ load : true });
    }
    
    scrollToTop = () =>{
        window.scrollTo({top:0});
    }

    render() {
        const { load } = this.state;
        let user = this.props.user;
        return load && (
            <div className="Mypages">
                { user.cate !== "user" ? <CompanyMypage/>:<RookieMypage/>}
            </div>
        );
    }
}

export default Mypages;