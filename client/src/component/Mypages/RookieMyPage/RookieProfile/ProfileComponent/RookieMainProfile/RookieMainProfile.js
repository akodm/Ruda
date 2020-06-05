import React, { Component } from 'react';
import './RookieMainProfile.css';
import Chart from "react-apexcharts";

class RookieMainProfile extends Component {
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
                            fontSize: '14px',
                            colors: '#5a5a5a',
                        }
                    }
                },
            },
        }
    }
    render() {
        return (
            <div className="rookie-user-mainprofile">
                <div className="rookie-user-mainprofile-left">
                    <img src="/Image/login_img.png" className="userProfile-img" alt="IMG"></img>
                    <span className="user-name">안녕하세요 홍길동 입니다.</span>
                    <div className="user-count">
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                        <span>■ 14명의 기업이 관심있어 합니다.</span>
                    </div>
                </div>
                <div className="rookie-user-mainprofile-right">
                    <div className="mainprofile-chart">
                    <Chart options={this.state.options} series={this.state.series} type="radar" height={310} />
                    </div>
                    <div className="mainprofile-chartranking">
                        <span>1.java</span>
                        <span>2.react</span>
                        <span>3.node.js</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RookieMainProfile;