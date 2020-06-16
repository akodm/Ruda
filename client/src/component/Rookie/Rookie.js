import React, { Component } from 'react';
import './Rookie.css';
import RookieSearch from './RookieSearch';
import RookieCard from './RookieCard';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
class Rookie extends Component {
    constructor(props){
        super(props);
        this.state={
            userList:[],
        }
    }
    async componentDidMount(){
        const {userList}=this.state;
        try{
            const result = await axios.get(`http://localhost:5000/userInfos/all`)
            if(result.data){
                this.setState({
                   userList:result.data,
                })
            }
            
            
        }catch(err){
            console.log(err);
        }
    }
    render() {
        const {userList} =this.state;
        return (
            <div className="Rookie">
                <div className="Rookie-title">
                    <span>인재</span>
                    <select className="Rookie-title-select">
                        <option selected value="최신순">최신순</option>
                        <option value="인기순">인기순</option>
                    </select>
                </div>
                <RookieSearch/>
                <div className="Rookie-CardView">
                    { userList.map(function(str,i){
                        return <Link to={`/mypage/${str.id}`} key={i}><RookieCard userList={userList[i]}/></Link>;
                    }) }
                </div>
                <div className="Rookie-CardView-PagiNation">
                        <Pagination count={10} />
                </div>
            </div>
        );
    }
}

export default Rookie;