import React, { Component } from 'react';
import './UserState.css';
class CompanyState extends Component {
    constructor(props){
        super(props);
        this.state={
            userStates : "",
            changeState:"userState",
            bc:"white",
        }
    }
    async select(e){
        await this.setState({
            userStates : e.target.value
        });
        if(this.state.userStates === "training") {
            this.setState({ bc : "#a5ccf5"})
        } else if(this.state.userStates === "jobser") {
            this.setState({ bc : "#f799f5"})
        } else {
            this.setState({ bc : "#eeeeee"})
        }
    }

    render() {
        const {userStates,bc}=this.state;
        const {user}=this.props;
        return (
               <select style={{backgroundColor:bc}} value={userStates} className="userState" onChange={this.select.bind(this)}>
                   <option select="true">상태를 선택해주세요</option>
                   <option value="training">실습생</option>
                   <option value= "jobser"> 채용중</option>
                   <option value="none">미채용</option>
               </select>
        );
    }
}

export default CompanyState;