import React, { Component } from 'react';
import Apexchart from "react-apexcharts";

// import ChartApi from "./ChartApi";

import '../css/Chart.css';
class Chart extends Component {
    constructor(props) {
        super(props)
        const { userInfo,awardData,certificateData,portfolioData,activityIn,activityOut} = this.props;

        this.state = {
            series: [{
                name: 'UserChart',
                data: [
                    portfolioData.length,
                    userInfo.userTags.length,
                    activityIn.length,
                    activityOut.length,
                    awardData.length,
                    certificateData.length
                ],
                fontSize:"20px"
                }],
                options: {
                xaxis: {
                    categories: ['포트폴리오', '기술스택', '교내활동', '교외활동', '수상이력', '자격증'],
                    labels: {
                        style:{
                            fontSize:'12px',
                            color: 'gray',
                        }
                    }
                },
                yaxis: {
                    show:false,
                }
            },
        }

    }

    render() {
        const { userInfo,awardData,certificateData,portfolioData,activityIn,activityOut} = this.props;
        return (
            <div className="Chart">
                <div className="profile-chart-info">
                    <p className="profile-chart-info-text">{certificateData.length}개의 자격증을 보유하고 있습니다.</p>
                    <p className="profile-chart-info-text">{awardData.length}번의 수상이력이 있습니다.</p>
                    <p className="profile-chart-info-text">{activityOut.length}번의 교외활동을 했습니다.</p>
                    <p className="profile-chart-info-text">{activityIn.length}번의 교내활동을 했습니다.</p>
                    <p className="profile-chart-info-text">{userInfo.userTags.length}개의 기술스택이 있습니다.</p>
                <p className="profile-chart-info-text">{portfolioData.length}개의 포트폴리오가 있습니다.</p>
                </div>
                <div className="profile-chart">
                    <Apexchart options={this.state.options} series={this.state.series} type="radar" height={280} width={280} />
                </div>
                {
                    (!certificateData.length&&!awardData.length&&!activityOut.length&&!activityIn.length&&!userInfo.userTags.length&&!portfolioData.length)
                    && 
                    <div className="ChartSet">
                        <p>그래프에 반영할 데이터가 존재하지 않습니다.</p>  
                        <p>프로필 수정을 통해 데이터를 입력해주세요</p>     
                    </div>
                }
            </div>
        );
    }
}

export default Chart;