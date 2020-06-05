import React, { Component } from 'react';

class RookieTagView extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        }
    }
    setTag(){
        this.props.tagchanges(true)
    }
    render() {
        return (
            <div>
                <div className="rookieInfo-title">
                    <span className="rookieInfo-title-text">태그</span>
                    <span className="rookieInfo-relayout" onClick={this.setTag.bind(this)}>[편집]</span>
                </div>
                <div  className="rookieTag-content-view">
                    <div className="rookieTag-content-view-tags">
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
        );
    }
}

export default RookieTagView;