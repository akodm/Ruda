import React, { Component } from 'react';
import '../css/DevMessage.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import config from '../../client-configs';
import axios from 'axios';

class DevMessage extends Component {
    constructor(props){
        super(props);
        this.state={
            devbtn:false,

            content : "",
        }
    }

    DevMessageClick(){
        const {devbtn}=this.state;
        if(!this.props.user.email) {
            alert("로그인 후 이용해주세요.");
            return;
        }
        if(devbtn===true){
            this.setState({devbtn:false,})
        }
        if(devbtn===false){
            this.setState({devbtn:true,})
        }
    }

    async mailSend() {
        const { content } = this.state;
        try {
            const result = await axios.post(`${config.app.s_url}/developermail`, {
                email : this.props.user.email,
                content
            });
            if(result.data) {
                alert("개발자에게 메일을 정상적으로 전송하였습니다!");
                this.setState({ devbtn : false, content : "" });
            } else {
                alert("메일을 보내는 중 에러가 발생했습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("mail send err : ", err);
            alert("메일을 보내는 중 에러가 발생했습니다. 다시 시도해주세요.");
        }
    }

    render() {
        const { devbtn, content } = this.state;
        return (
            <>
                <div className="DevMessage" onClick={this.DevMessageClick.bind(this)}>
                    <HelpOutlineIcon style={{margin:"5px"}}/><p  style={{margin:"0px"}}>개발자에게 문의</p>
                </div>
                {
                    devbtn &&
                    <div className="DevMessage-pop">
                        <div className="DevMessage-title">불편 혹은 문의사항 등을 보내주세요!</div>
                        <div className="DevMessage-email">a8456452@gmail.com</div>
                        <textarea name="content" onChange={(e) => this.setState({ content : e.target.value })} value={content} className="DevMessage-content"></textarea>
                        <div className="DevMessage-btn" onClick={this.mailSend.bind(this)}>메일 보내기</div>
                    </div>
                }
            </>
        );
    }
}

export default DevMessage;