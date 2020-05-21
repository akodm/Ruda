import React, { Component } from 'react';
import RookieMainProfile from './ProfileComponent/RookieMainProfile/RookieMainProfile';
import RookieInfo from './ProfileComponent/RookieInfo/RookieInfo';
import RookieAwards from './ProfileComponent/RookieAwards/RookieAwards';
import RookieCertificate from './ProfileComponent/RookieCertificate/RookieCertificate'
import AddProfile from './ProfileComponent/AddProfile/AddProfile';

class RookieProflie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addComponents : "none",  
            LayerArr : [<RookieMainProfile />, <RookieInfo />],
        }
    }

    add(args) {
        this.setState({ LayerArr : this.state.LayerArr.concat(args)});
    }

    AddProfileDisplay(close){
        this.setState({ addComponents : close });
    }

    render() {
        const { addComponents, LayerArr } = this.state;
        return (
            <div className="rookie-profile-content">
                <AddProfile display={addComponents} add={this.add.bind(this)} close={this.AddProfileDisplay.bind(this)}/>
                <div className="rookie-user-title">
                    <img src= "/Image/usermypage_hochi.png" alt="IMG"></img>
                    <span>홍길동의 프로필</span>
                </div>
                {
                    LayerArr && LayerArr.map((data,i) => {
                        return (
                            <div key={i}>{data}</div>
                        )
                    })
                }
                <div className="addprofile" onClick={() => this.setState({ addComponents : "flex"})}>
                    <span> + 프로필 정보 추가</span>
                </div>
            </div>
        );
    }
}

export default RookieProflie;