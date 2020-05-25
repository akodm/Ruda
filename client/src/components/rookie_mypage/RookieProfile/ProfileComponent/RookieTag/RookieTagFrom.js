import React, { Component } from 'react';
import './RookieTag.css'
import RookieTagCp from './RookieTagCp';

class RookieTagFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeTag: true,
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
    tagSave(){
        this.props.tagchanges(false)
    }
    render() {
        const { tags,inputvalue } = this.state;
        return ( 
            <div>
                <div className="rookieInfo-title">
                    <span className="rookieInfo-title-text">태그</span>
                    <span className="rookieInfo-relayout" onClick={this.tagSave.bind(this)}>[저장]</span>
                </div>
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

export default RookieTagFrom;