import React, { Component } from 'react';

class Alram extends Component {
    render() {
        return (
            <div className="alram-main" style={{display:this.props.display}}>
                <span className="alram-title">알림</span>
                <div className="alram-content">
                    <div className="alram-box">
                        <div className="alram-boxTop">
                            <img className="alram-boxImg" src="/Image/facebook.png" alt="IMG"></img>
                            <span className="alram-boxTitle">관심있어요</span>
                        </div>
                        <span className="alram-boxSpan">[기업] 대림에서 관심있어요를 받았습니다.</span>
                        <button className="alram-boxBtn">나도 관심있어요</button>
                    </div>
                    <div className="alram-box">
                        <div className="alram-boxTop">
                            <img className="alram-boxImg" src="/Image/facebook.png" alt="IMG"></img>
                            <span className="alram-boxTitle">관심있어요</span>
                        </div>
                        <span className="alram-boxSpan">[기업] 대림에서 관심있어요를 받았습니다.</span>
                        <button className="alram-boxBtn">나도 관심있어요</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alram;