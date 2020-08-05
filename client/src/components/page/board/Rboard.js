import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import '../../css/board.css';
import config from '../../../client-configs';
import Rsearch from './Rsearch';
import RookieCard from '../../component/RookieCard';

class Rboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userList : this.props.data,
            
            //selectValue : "new",

            // 페이지네이션 구분값
            pagenation : 1, // 첫 페이지
            rowCount : 16,  // 페이지의 로우 갯수
        }
    }

    // 검색 필터가 수행될 시 데이터베이스에 필터 값들을 전달 후 반환 값을 다시 뿌려줌
    async listFilter(data) {
        if(data) {
            try {
                const result = await axios.post(`${config.app.s_url}/userInfos/search`, {
                    data,
                });
                this.setState({ userList : result.data });
            } catch(err) {
                console.log("company board filter err : ");
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
                <div  className="Company">
                    
                    <div className="Company-title">
                        <span>인재</span>
                    </div>

                    <Rsearch listFilter={this.listFilter.bind(this)} />

                    <div className="Rookie-CardView">
                        { userList && userList.map(function(str,i){
                            if(str.userWorkDateState === "미정") return null;
                            if(i < count - rowCount|| i >= count) return null;
                            return <Link to={`/mypage/${str.userId}`} key={i}><RookieCard userList={userList[i]}/></Link>;
                        }) }
                    </div>

                    <div className="Rookie-CardView-PagiNation">
                        <Pagination onChange={(e, c) => this.setState({ pagenation : c })} count={pageCount} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Rboard;