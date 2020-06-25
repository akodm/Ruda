import React, { Component } from 'react';
import Typical from 'react-typical'

import Button from '@material-ui/core/Button';

import '../../css/Info.css';
import Rookie from './Rookie';
import Company from './Company';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectUser : 0,
        }
    }
    render() {
        const { selectUser } = this.state;
        return (
            <div className="Info-main">
                <Typical
                    steps={['구직자 또는 기업으로 선택하여 기본 정보를 등록하세요!']}
                    wrapper="h2"
                />
                <div className="Info-select">
                    <Button onClick={() => this.setState({ selectUser : 0 })} variant={!selectUser ? "contained" : "outlined"} color="primary">구직자</Button>
                    <Button onClick={() => this.setState({ selectUser : 1 })} variant={!selectUser ? "outlined" : "contained"} color="primary">기업인</Button>
                </div>
                <div className="Info-body">
                    {
                        !selectUser ?
                        <Rookie /> : <Company />
                    }
                </div>
            </div>
        );
    }
}

export default Info;