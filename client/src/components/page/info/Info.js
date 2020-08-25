import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import '../../css/Info.css';
import Rookie from './Rookie';
import Company from './Company';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectUser : 0,
            open : false,
        }
    }

    render() {
        const { selectUser,open } = this.state;
        const { user } = this.props;
        return (
            <div className="Info-main">
                { open && <div className="load-mask" style={{backgroundColor:"rgba(143, 143, 143, 0.6)"}}>
                    <div className="Info-companySelt">
                        <div className="Info-seltText1">기업으로 선택하였습니다.</div>
                        <div className="Info-seltText2">하이루키는 신입 구직자만을 위한 사이트입니다.<br></br> 게시판 혹은 추천 기능을 통해 신입, 실습생을 찾아볼 수 있습니다.</div>
                        <div className="Info-rookie-imgLayout">
                            <Button onClick={() => this.setState({ open : false, selectUser : 0 })} color="primary">
                                구직자로 하겠습니다.
                            </Button>
                            <Button onClick={() => this.setState({ open : false, selectUser : 1 })} color="primary" autoFocus>
                                기업으로 하겠습니다.
                            </Button>
                        </div>
                    </div>
                </div>}
                <h2 className="Info-main-title">구직자 또는 기업으로 선택하여 기본 정보를 등록하세요!</h2>
                <div className="Info-select">
                    <Button onClick={() => this.setState({ selectUser : 0 })} variant={!selectUser ? "contained" : "outlined"} color="primary">구직자</Button>
                    <Button onClick={() => this.setState({ open : true })} variant={!selectUser ? "outlined" : "contained"} color="primary">기업인</Button>
                </div>
                <div className="Info-body">
                    { !selectUser ? <Rookie user={user} {...this.props} /> : <Company user={user} {...this.props} /> }
                </div>
            </div>
        );
    }
}

export default Info;