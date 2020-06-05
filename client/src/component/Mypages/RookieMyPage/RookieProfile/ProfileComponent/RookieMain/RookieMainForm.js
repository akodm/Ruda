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
        this.props.Mainchanges(false)
    }
    render() {
        const { tags,inputvalue } = this.state;
        return (
            <div>
                <div className="rookieInfo-title">
                    <span className="rookieInfo-title-text">저는 이런 사람이에요</span>
                    <span className="rookieInfo-relayout" onClick={this.MainSave.bind(this)}>[저장]</span>
                </div>
                <div className="rookie-user-mainprofile-left">
                    <img src="/Image/login_img.png" className="userProfile-img" alt="IMG"></img>
                    <span>나를 소개해보세요!</span>
                    <input type="text"></input>
                </div>
                <div className="line"></div>
                <div className="rookieTag-content">
                    <span>태그를 이용하여 나를 간략히 나타내보세요!(최대 15개)</span>
                    <div className="rookieTag-content-input">
                        <input value={inputvalue} onChange={this.changeValue.bind(this)} name="tag" type="text" placeholder="태그를 입력해주세요"></input><button onClick={this.addTags.bind(this)}>추가</button>
                    </div>
                    <RookieTagCp addTags={tags}/>
                    <div className="rookieTag-content-tagView-tags" >
                        <span>추천태그를 활용해 보세요!</span> 
                        <div className="RookieTagSample-tags">
                               <span>#Java</span>
                               <span>#IOS</span>
                               <span>#Android</span>
                               <span>#Node.js</span>
                               <span>#React</span>
                               <span>#Jsp</span>
                               <span>#Java</span>
                               <span>#IOS</span>
                               <span>#Android</span>
                               <span>#Node.js</span>
                               <span>#React</span>
                               <span>#Jsp</span>
                               <span>#Java</span>
                               <span>#IOS</span>
                               <span>#Android</span>
                               <span>#Node.js</span>
                               <span>#React</span>
                               <span>#Jsp</span>
                           </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieMainForm;