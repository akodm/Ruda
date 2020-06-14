import React, { Component } from 'react';
import RookieTagCp from '../RookieTag/RookieTagCp';

class RookieMainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChangeMain: true,
            inputvalue : "",
            tags : [],
        }
    }
    addTags() {
        this.setState({
            tags : this.state.tags.concat(this.state.inputvalue),
        })
    }
    changeValue(e) {
        this.setState({
            inputvalue : e.target.value,
        })
    }
    MainSave(){
        this.props.Mainchanges(true)
    }
    render() {
        const {user} = this.props;
        return (
            <div>
                <div className="RookieMain-title">
                    <span className="RookieMain-title-text">저는 이런 사람이에요</span>
                    <span className="RookieMain-relayout" onClick={this.MainSave.bind(this)}>[저장]</span>
                </div>
                <div className="RookieMain-user">
                    <img src="/Image/login_img.png" className="RookieMain-user-img" alt="IMG"></img>
                    <span className="RookieMain-user-name">홍길동</span>
                    <span>나를 소개해보세요!</span>
                    <div className="RookieMain-user-text">
                        <input type="text"></input><button>등록</button>
                    </div>
                    
                </div>
                <div className="line"></div>
                <div className="RookieMain-user-tag-content">
                {/*태그컴포넌트여기에 넣어주세용*/}
                   태그자리
                </div>
            </div>
        );
    }
}

export default RookieMainForm;