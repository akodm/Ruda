import React, { Component } from 'react';
import Apexchart from "react-apexcharts";
class Chart extends Component {
    constructor(props) {
        const {user}= this.props;
        console.log(user);
        super(props)
        this.state = {
            series: [{
                name: 'UserChart',
                data: [1,2,3,4,5,6],
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
            },
        }
    }
    render() {
        return (
            <div className="chart-main">
                <div className="profile-chart-info">
                    <p className="profile-chart-info-text">6개의 자격증을 보유하고 있습니다.</p>
                    <p className="profile-chart-info-text">5번의 수상이력이 있습니다.</p>
                    <p className="profile-chart-info-text">4번의 교외활동을 했습니다.</p>
                    <p className="profile-chart-info-text">3번의 교내활동을 했습니다.</p>
                    <p className="profile-chart-info-text">2개의 기술스택이 있습니다.</p>
                <p className="profile-chart-info-text">1개의 포트폴리오가 있습니다.</p>
                </div>
                <div className="profile-chart">
                    <Apexchart options={this.state.options} series={this.state.series} type="radar" height={280} width={280} />
                </div>
            </div>
        );
    }
}

export default Chart;