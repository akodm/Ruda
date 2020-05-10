import React, { Component } from 'react';
import RookieMainProfile from './RookieMainProfile';
import RookieInfo from './RookieInfo';
import RookieAwards from './RookieAwards';
import RookieCertificate from './RookieCertificate'
import AddProfile from './AddProfile';

class RookieProflie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addComponents : "none",  
            LayerArr : [],     
        }
    }

    add(args) {  
        this.setState({
            LayerArr : this.state.LayerArr.concat(args),
        })
    }

    render() {
        const { addComponents, LayerArr} = this.state;
        return (
            <div className="rookie-profile-content">
                <AddProfile display= {addComponents} add={this.add.bind(this)}/>
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>홍길동의 프로필</span>
                </div>
                <RookieMainProfile/>
                <RookieInfo/>
                <RookieAwards/>
                <RookieCertificate/>
                {LayerArr}
                <div className="addprofile" onClick={() => this.setState({ addComponents : addComponents === "none" ? "flex" : "none"})}>
                    <span> + 프로필 정보 추가</span>
                </div>
            </div>
        );
    }
}

export default RookieProflie;