import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (
            <div className="msg-main" style={{display:this.props.display}}>
                <span className="msg-title">메시지함</span>
                <div className="msg-content">
                    <div>
                        <div className="msg-leftTitle"><span className="msg-Span">채팅방</span></div>
                        <div className="msg-leftDiv">
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                            <div className="msg-leftContent">
                                <div className="msg-leftImg"></div>
                                <div className="msg-leftBox">
                                    <span className="msg-leftBoxTitle">RUDA</span>
                                    <span className="msg-leftBoxContent">안녕하세요. RUDA입니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="msg-rightTitle"><span className="msg-Span">RUDA</span></div>
                        <div className="msg-rightContent"></div>
                        <div className="msg-rightInput">
                            <textarea className="msg-textarea"></textarea>
                            <button className="msg-btn">보내기</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;