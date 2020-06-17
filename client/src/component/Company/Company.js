import React, { Component } from 'react';
import './Company.css';
import CompanyCard from './CompanyCard';
import CompanySearch from './CompanySearch';

import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

class Company extends Component {
    constructor(props){
        super(props);
        this.state={
            userList:[],
            
            selectValue : "new",
        }
    }

    selectChange(e) { this.setState({ selectValue : e.target.value }) };

    async componentDidMount(){
        const {userList}=this.state;
        try{
            const result = await axios.get(`http://localhost:5000/userInfos/yall`);
            if(result.data){
                this.setState({ userList : result.data });
            } else {
                this.setState({ userList : null });
            }
        }catch(err){
            console.log("rookie card list err : " + err);
            alert("데이터 로드 중 에러 발생");
        }
    }

    render() {
        const {userList, selectValue} =this.state;
        return (
            <div className="Company">
            <div className="Company-title">
                <span>기업</span>
                <select className="Company-title-select">
                    <option value="최신순">최신순</option>
                    <option value="인기순">인기순</option>
                </select>
            </div>
            <CompanySearch/>
            <div className="Company-CardView">
                { userList && userList.map(function(str,i){
                        return <Link to={`/mypage/${str.id}`} key={i}><CompanyCard userList={userList[i]}/></Link>;
                    }) }
                
            </div>
            <div className="Company-CardView-PagiNation">
                <Pagination count={10} />
            </div>
        </div>
        );
    }
}

export default Company;