import React, { Component } from 'react';
import DaumPostcode from 'react-daum-postcode';

import '../css/PostPopup.css';

class PostPopup extends Component {
    handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }
            if(data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.props.func(fullAddress)
        this.props.close()
    }

    render() {
        return (
            <div className="postPopup-main" onClick={() => this.props.close()} style={{display: this.props.open ? "flex" : "none"}}>
                <div className="postPopup-div">
                    <DaumPostcode
                        onComplete={this.handleComplete.bind(this)}
                        height="600"
                        width="700"
                        animation
                        style={{
                            border:"1px solid rgba(120, 120, 120, 0.5)",
                        }}
                        errorMessage={<p>현재 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>}
                    />
                </div>
            </div>
        );
    }
}

export default PostPopup;