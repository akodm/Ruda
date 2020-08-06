import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import config from '../../client-configs';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
            const { user, info, proposalPopupOpenClose, mailReload } = this.props;
            const { content, title } = this.state;

            if(!user.email) { alert("로그인 후 이용해주세요."); return; }

            if(!title || !content) {
                alert("비어있는 내용이 있습니다.");
                return;
            }

            let result = null;
            if(user.cate === "user") {
                result = await axios.get(`${config.app.s_url}/userInfos/one?userId=${user.id}`);
            } else {
                result = await axios.get(`${config.app.s_url}/companyInfos/one?userId=${user.id}`);
            }

            await axios.post(`${config.app.s_url}/mails/create`, {
                title, content,
                target : info.userId,
                userInfo : result.data || null,
                userId : user.id
            });

            mailReload();
            proposalPopupOpenClose(false);
        } catch(err) {
            console.log("message send err : ");
        }
    }

    render() {
        const { proposalPopupOpenClose, text } = this.props;
        const { title, content } = this.state;
        return (
            <div className="proposal-main">
                <div className="proposal-div">
                    <div className="proposal-top">
                        <div>{text}</div>
                        <CloseIcon onClick={() => proposalPopupOpenClose(false)} style={{cursor:"pointer"}} />
                    </div>
                    <div className="proposal-title">
                        <TextField autoComplete="off" style={{width:"100%"}} required label="메일 제목" variant="outlined" name="title" value={title} onChange={(e) => this.setState({ title : e.target.value })} />
                    </div>

                    <textarea placeholder="내용을 입력해주세요." className="proposal-content" value={content} onChange={(e) => this.setState({ content : e.target.value })}></textarea>
                
                    <div className="proposal-btn">
                        <Button onClick={this.sendMessage.bind(this)} variant="outlined" color="primary">메일 보내기</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProposalPopup;