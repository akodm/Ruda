import React, { Component } from 'react';
import RookieCard from '../../Rookie/RookieCard';
import Chart from "react-apexcharts";
class RecoRookieContent extends Component {
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
            <div className="RecoRookie-content-view">
                <RookieCard/>
                <div className="RecoRookie-content-card">
                    <Chart options={this.state.options} series={this.state.series} type="radar" height={250} />
                    <span>14명의 기업이 좋아합니다.</span>
                    <span>5개의 포트폴리오가 있습니다.</span>
                    <span>5개의 포트폴리오가 있습니다.</span>
                </div>
        </div>
        );
    }
}

export default RecoRookieContent;