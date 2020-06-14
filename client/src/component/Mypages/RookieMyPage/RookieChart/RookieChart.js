import React, { Component } from 'react';
import './RookieChart.css';
import Chart from "react-apexcharts";
import RookieCount from './RookieCount';
class RookieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [{
                name: 'Series 1',
                data: [1,2,3,4,5,6],
                fontSize:"20px"
                }],
                options: {
                xaxis: {
                    categories: ['java', 'php', 'javascript', 'c', 'react.js', 'node.js'],
                    labels: {
                        style:{
                            fontSize: '12px',
                            color: 'gray',
                        }
                    }
                },
            },
        }
    }
    render() {
        return (
            <div className="RookieChart">
                <div className="RookieChart-title">
                    CHART
                </div>
                <div className="RookieChart-chart">
                <Chart options={this.state.options} series={this.state.series} type="radar" height={280} />
                </div>
                <div className="RookieChart-count">
                    <RookieCount/>
                </div>
            </div>
        );
    }
}

export default RookieChart;