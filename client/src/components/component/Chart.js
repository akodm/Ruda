import React, { Component } from 'react';
import Apexchart from "react-apexcharts";
class Chart extends Component {
    constructor(props) {
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
                <Apexchart options={this.state.options} series={this.state.series} type="radar" height={280} width={280} />
            </div>
        );
    }
}

export default Chart;