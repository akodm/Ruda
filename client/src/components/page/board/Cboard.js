import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

import '../../css/board.css';
import config from '../../../client-configs';
import Csearch from './Csearch';
import CompanyCard from '../../component/CompanyCard';

class Cboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userList: this.props.data,
            
            //selectValue : "new",

            // 페이지네이션 구분값
            pagenation : 1, // 첫 페이지
            rowCount : 16,  // 페이지의 로우 갯수
        };
        this.listFilter = this.listFilter.bind(this)
    }
    
    // 검색 필터가 수행될 시 데이터베이스에 필터 값들을 전달 후 반환 값을 다시 뿌려줌
    async listFilter(data) {
        if(data) {
            try {
                const result = await axios.post(`${config.app.s_url}/companyInfos/search`, {
                    data,
                });
                this.setState({ userList : result.data });
            } catch(err) {
                console.log("company board filter err : ", err);
            }
        } else {
            this.setState({ userList : this.props.data });
        }
    }

    render() {
        const { userList, pagenation, rowCount } =this.state;
        let count = pagenation * rowCount;
        let pageCount = userList.length > 0 ? Math.ceil(userList.length / 16) : 1;
        return (
            <div className="company-div">

                <div className="Company">

                    {/* 가장 상단 타이틀 */}
                    <div className="Company-title">
                        <span>기업</span>
                    </div>

                    {/* 검색 부분 */}
                    <Csearch listFilter={this.listFilter.bind(this)} />

                    {/* 카드 뷰 부분 */}
                    <div className="Company-CardView">
                        { userList && userList.map(function(str,i){
                            if(i < count - rowCount|| i >= count) return null;
                            return <Link to={`/mypage/${str.userId}`} key={i}><CompanyCard userList={userList[i]}/></Link>;
                        }) }
                    </div>

                    {/* 페이지네이션 버튼 */}
                    <div className="Company-CardView-PagiNation">
                        <Pagination onChange={(e, c) => this.setState({ pagenation : c })} count={pageCount} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Cboard;