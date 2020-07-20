import React, { Component } from 'react';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import config from '../../client-configs';
import Rookie from './RookieCard';
import Company from './CompanyCard';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result : null,
            rookie : null,
            company : null,
            
            load : false,
        }
    }

    async componentDidMount() {
        const { user } = this.props;
        try {
            let rookie = axios.get(`${config.app.s_url}/userInfos/one?userId=${user.id}`);
            let company = axios.get(`${config.app.s_url}/companyInfos/one?userId=${user.id}`);

            await Promise.all([rookie, company]).then(data => {
                rookie = data[0].data;
                company = data[1].data;
            });

            const cate = rookie ? "rookie" : "company";
            await this.setState({ [cate] : cate === "rookie" ? rookie : company });

            let filter = null;
            if(cate === "rookie") {
                filter = await axios.post(`${config.app.s_url}/companyInfos/popup`, {
                    add : this.state.rookie.userAdd,
                    field : this.state.rookie.userField,
                    tag : this.state.rookie.userTags,
                });
            } else {
                filter = await axios.post(`${config.app.s_url}/userInfos/popup`, {
                    add : this.state.company.companyAdd,
                    field : this.state.company.companyField,
                    tag : this.state.company.companyTags,
                    occupation : this.state.company.companyOccupation,
                });
            }
            this.setState({ result : filter.data });
        } catch(err) {
            console.log("popup data load err : ", err);
        }
        this.setState({ load : true });
    }

    render() {
        const { openClose, open, load } = this.props;
        const { result } = this.state;
        return (
            <div className="popup-main">
                <div className="popup-div">

                    {/* 타이틀 라인 */}
                    <div className="popup-title">
                        <div className="popup-title-text">추천 { open.cate === "user" ? "기업" : "인재"}</div>
                        <div className="popup-title-close"><CloseIcon onClick={() => openClose(false, null)} /></div>
                    </div>

                    {/* 콘텐츠 라인 */}
                    <div className="popup-content">
                        <div className="popup-content-title">사용자 정보에 따른 추천 목록입니다.</div>
                        <div className="popup-content-div">
                            { load && <div className="popup-load"><CircularProgress /></div> }
                            {
                                !result || !result[0] ? 
                                <div className="popup-null-div">
                                    <div className="popup-null-text">사용자 정보에 해당하는 추천 목록이 없습니다.</div>
                                </div>
                                :
                                <div className="popup-content-box">
                                    {
                                        open.cate === "company" ? 
                                        result.map((data,i) => {
                                            return <a onClick={() => openClose(false, null)} href={`/mypage/${data.userId}`} key={i}>
                                                <Rookie userList={data} />
                                            </a>
                                        })
                                        :
                                        result.map((data,i) => {
                                            return <a onClick={() => openClose(false, null)} href={`/mypage/${data.userId}`} key={i}>
                                                <Company userList={data} />
                                            </a>
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className="popup-content-bot">
                            {
                                open.cate === "user" ? 
                                <div className="popup-bot-text">사용자의 주소, 태그, 희망 분야 토대로 검색합니다.</div>
                                :
                                <div className="popup-bot-text">사용자의 주소, 태그, 분야, 희망 직종를 토대로 검색합니다.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;