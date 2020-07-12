import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import Csearch from './Csearch';
import '../../css/board.css';
import CompanyCard from '../../component/CompanyCard';

class Cboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userList: this.props.data,
            
            selectValue : "new",
        }
    }

    render() {
        const {userList, selectValue} =this.state;
        return (
            <div className="Company">
                <div className="Company-title">
                    <span>기업</span>
                    <select onChange={(e) => this.setState({ selectValue : e.target.value })} value={selectValue} className="Company-title-select">
                        <option value="new">최신순</option>
                        <option value="hot">인기순</option>
                    </select>
                </div>
                <Csearch/>
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


export default Cboard;