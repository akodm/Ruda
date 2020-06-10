import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';

class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            url : new URL(window.location),
            user : this.props.user || null,
            load : "",
        }
    }

    componentDidMount() {
        const { url } = this.state;
        let urls = url.pathname;
        urls = urls.split("/");
        if(urls[2]) {

        } else {
            if(!this.state.user.cate) {
                alert("기본 정보 등록을 먼저 입력하여 주시기 바랍니다.");
                window.location.href = "/userinfo";
            }
        }
        this.setState({ load : "load" });
    }
    
    scrollToTop = () =>{
        window.scrollTo({top:0});
    }

    render() {
        const { user,load } = this.state;
        return load && (
            <div className="Mypages">
                {user.cate !== "user" ? <CompanyMypage/>:<RookieMypage/>}
            </div>
        );
    }
}

export default Mypages;