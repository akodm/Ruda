import React, { Component } from 'react';

import config from '../../client-configs';

import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import axios from 'axios';

class MsgLeftItem extends Component {

    async readSet() {
        try {
            const { data, mailReload, setView, _if } = this.props;
            if(!_if) { 
                setView();
                return; 
            }
            await axios.put(`${config.app.s_url}/mails/update`, {
                id : data.id,
                readState : true,
            });

            setView();
            mailReload();
        } catch(err) {
            console.log("msg read state update err");
        }
    }

    render() {
        const { _if, data } = this.props;
        return (
            <div className={`leftitem-main ${ _if ? !data.readState && "lieftitem-send" : "lieftitem-send"}`} onClick={this.readSet.bind(this)}>
                <div className="leftitem-div">
                    { _if && <Avatar style={{width:"30px", height:"30px"}} src={data.userInfo.companyImageUrl || data.userInfo.userImageUrl || "/"} alt="img" /> }
                    <div className="leftitem-date">{moment(data.createdAt).format("YYYY. MM. DD")}</div>
                </div>
                <div className="leftitem-title">{data.title || "제목이 없습니다."}</div>
            </div>
        );
    }
}

export default MsgLeftItem;