import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

import '../../css/board.css';
import Rsearch from './Rsearch';
import RookieCard from '../../component/RookieCard';

import config from '../../../client-configs';

class Rboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userList:[],
            
            selectValue : "new",
        }
    }

    async componentDidMount(){
        try{
            const result = await axios.get(`${config.app.s_url}/userInfos/yall`);
            if(result.data){
                this.setState({ userList : result.data });
            }
        }catch(err){
            console.log("rookie card list err : " + err);
            alert("데이터 로드 중 에러 발생");
        }
    }

    render() {
        const {userList, selectValue} =this.state;
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select onChange={(e) => this.setState({ selectValue : e.target.value })} value={selectValue} className="Rookie-title-select">
                        <option value="new">최신순</option>
                        <option value="hot">인기순</option>
                    </select>
                </div>
                <Rsearch/>
                <div className="Rookie-CardView">
                    { userList && userList.map(function(str,i){
                        return <Link to={`/mypage/${str.userId}`} key={i}><RookieCard userList={userList[i]}/></Link>;
                    }) }
                </div>
                <div className="Rookie-CardView-PagiNation">
                    <Pagination count={10} />
                </div>
            </div>
        );
    }
}

export default Rboard;