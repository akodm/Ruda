import React, { Component } from 'react';
import axios from 'axios';

import config from '../../../client-configs';

import Rookie from './Mypage';  // rookie mypage

import NotFound from '../../layout/NotFound';

class MypageRoute extends Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id || null;
        this.state = {
            id : id,
            rookie : null,
            company : null,

            load : false,
        }
    }

    async componentDidMount() {
        try {
            if(this.state.id) {
                let rookie = axios.get(`${config.app.s_url}/userInfos/one?userId=${this.state.id}`);
                let company = axios.get(`${config.app.s_url}/companyInfos/one?userId=${this.state.id}`);

                await Promise.all([rookie, company]).then(data => {
                    rookie = data[0].data;
                    company = data[1].data;
                });

                this.setState({
                    rookie : (await rookie),
                    company : (await company),
                })
            } else {
                const { user } = this.props;
                let rookie = axios.get(`${config.app.s_url}/userInfos/one?userId=${user.id}`);
                let company = axios.get(`${config.app.s_url}/companyInfos/one?userId=${user.id}`);

                await Promise.all([rookie, company]).then(data => {
                    rookie = data[0].data;
                    company = data[1].data;
                });

                this.setState({
                    rookie : (await rookie),
                    company : (await company),
                })
            }
        } catch(err) {
            console.log("mypage load err : " + err);
        }
        this.setState({ load : true })
    }

    render() {
        const { rookie, company, load } = this.state;
        let user = rookie || company || null;
        return (
            <div style={{width:"100%"}}>
                {
                    user ? (user.user.userCate === "user" ? <Rookie /> : "" ) : load ? <NotFound /> : ""
                }
            </div>
        );
    }
}

export default MypageRoute;