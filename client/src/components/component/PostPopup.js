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
                <DaumPostcode
                    onComplete={this.handleComplete.bind(this)}
                    height="500"
                    width="400"
                    animation
                    style={{
                        border:"1px solid rgba(161, 161, 161, 0.226)",
                        boxShadow:"0px 0px 2px 1px black"
                    }}
                    errorMessage={<p>현재 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>}
                />
            </div>
        );
    }
}

export default PostPopup;