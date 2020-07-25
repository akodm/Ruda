import React, { Component } from 'react';

import MsgLeftItem from './MsgLeftItem';
import MsgRightItem from './MsgRightItem';

import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num : 0,

            viewItem : null,
        }
    }

    componentDidMount() {
        const { receiveData } = this.props;
        if(receiveData[0]) {
            this.setState({ viewItem : receiveData[0] });
        }
    }

    render() {
        const { msgOpenClose, receiveData, sendData, mailReload } = this.props;
        const { num, viewItem } = this.state;
        return (
            <div className="msg-main">
                <div className="msg-box">
                    <div className="msg-title">
                        <div>메일함</div>
                        <CloseIcon onClick={() => msgOpenClose(false)} style={{cursor:"pointer"}} />
                    </div>

                    <div className="msg-mail-cate">
                        <Button onClick={() => this.setState({ num : 0, viewItem : receiveData[0] || null })} style={{marginRight: "10px"}} variant="outlined" color="primary">받은 메일</Button>
                        <Button onClick={() => this.setState({ num : 1, viewItem : sendData[0] || null })} variant="outlined" color="primary">보낸 메일</Button>
                    </div>

                    <div className="msg-content-box">
                        <div className="msg-content-left">
                            {
                                !num ? 
                                (
                                    receiveData[0] ?
                                    receiveData.map(data => {
                                        return <MsgLeftItem mailReload={() => mailReload()} setView={() => this.setState({ viewItem : data })} data={data} _if={true} key={data.id} />
                                    })
                                    :
                                    <div className="msg-content-null">받은 메일이 없습니다.</div> 
                                )
                                :
                                (
                                    sendData[0] ? 
                                    sendData.map(data => {
                                        return <MsgLeftItem mailReload={() => mailReload()} setView={() => this.setState({ viewItem : data })} data={data} key={data.id} />
                                    })
                                    :
                                    <div className="msg-content-null">받은 메일이 없습니다.</div> 
                                )
                            }
                        </div>
                        <div className="msg-content-right">
                            {
                                viewItem ? 
                                <MsgRightItem num={num} viewItem={viewItem} />
                                :
                                <div className="msg-content-null">표시할 메일이 없습니다.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageBox;