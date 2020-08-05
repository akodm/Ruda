import React, { Component } from 'react';
import axios from 'axios';
import config from '../../client-configs';
import Chart from './Chart';

class ChartApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
           portfolioCount:"",
           stackCount:"",
           inSchoolCount:"",
           outSchoolCount:"",
           awardCount:"",
           certificateCount:""
        }
    }
    /*
    async componentDidMount(){
        const {user} = this.props;
        const {portfolioCount,stackCount,inSchoolCount,outSchoolCount,awardCount,certificateCount}=this.state;

        try{
            if(user){
                const portfolio = await axios.get(`${config.app.s_url}/portfolios/count`);
                const stack = await axios.get(`${config.app.s_url}/userInfos/all`);
                const inSchool = await axios.get(`${config.app.s_url}/userInfos/all`);
                const outSchool = await axios.get(`${config.app.s_url}/userInfos/all`);
                const award = await axios.get(`${config.app.s_url}/awards/all`);
                const certificate = await axios.get(`${config.app.s_url}/certificates/all`);

            }
        }catch(err){
            console.log("ChartApi"+err);
        }
    */
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ChartApi;