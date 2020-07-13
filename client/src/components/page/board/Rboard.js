import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import '../../css/board.css';
import Rsearch from './Rsearch';
import RookieCard from '../../component/RookieCard';

class Rboard extends Component {
    constructor(props){
        super(props);
        this.state={
            userList : this.props.data,
            
            selectValue : "new",
        }
    }

    render() {
        const { userList, selectValue } =this.state;
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