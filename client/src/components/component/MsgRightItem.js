import React, { Component } from 'react';
import moment from 'moment';
import config from '../../client-configs';

class MsgRightItem extends Component {
    render() {
        const { viewItem, num } = this.props;
        return (
            <div className="rightItem-main">
                {
                    !num && 
                    <>
                        <div className="rightItem-title">발신인</div>
                        <div className="rightItem-title-text">{ viewItem.userInfo.userName || viewItem.userInfo.companyName || "알수없는 사용자" }</div>
                    </>
                }
                <div className="rightItem-title">제목</div>
                <div className="rightItem-title-text">{ viewItem.title }</div>
                <div className="rightItem-content">내용</div>
                <pre className="rightItem-content-text">
                    { viewItem.content }
                </pre>
                <div className="rightItem-date-text">날짜 : { moment(viewItem.createdAt).format("YYYY. MM. DD") }</div>
                <div className="rightItem-user">
                    { !num &&  
                        <a href={`${config.app.c_url}/mypage/${viewItem.userId}`}>답장하러 가기</a>
                    }
                </div>
            </div>
        );
    }
}

export default MsgRightItem;