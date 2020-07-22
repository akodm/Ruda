import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import config from '../../client-configs';
import axios from 'axios';

class ProposalPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            content : "",
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    async sendMessage() {
        try {
            const { user, info, psoposalPopupOpenClose } = this.props;
            const { content, title } = this.state;

            if(!title || !content) {
                alert("비어있는 내용이 있습니다.");
                return;
            }


            psoposalPopupOpenClose(false);
        } catch(err) {
            console.log("message send err : ", err);
        }
    }

    render() {
        const { psoposalPopupOpenClose, text, guide } = this.props;
        const { title, content } = this.state;
        return (
            <div className="proposal-main">
                <div className="proposal-div">
                    
                </div>
            </div>
        );
    }
}

export default ProposalPopup;