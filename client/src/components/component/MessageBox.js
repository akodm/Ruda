import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            content : "",
        }
    }

    render() {
        const { msgOpenClose, socket, user } = this.props;
        const { title, content } = this.state;
        return (
            <div className="msg-main">
                <div className="msg-box">
                    <div className="msg-title">
                        <div>메시지함</div>
                        <CloseIcon onClick={() => msgOpenClose(false)} style={{cursor:"pointer"}} />
                    </div>

                    
                </div>
            </div>
        );
    }
}

export default MessageBox;