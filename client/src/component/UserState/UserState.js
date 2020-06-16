import React, { Component } from 'react';
import './UserState.css';
class UserState extends Component {
    constructor(props){
        super(props);
        this.state={
            userStates : "",
            bc:"white",
        }
    }
    async select(e){
        this.setState({
            userStates : e.target.value
        }, () => {
            if(this.state.userStates === "yes") {
                this.setState({ bc : "#a5ccf5"})
            } else {
                this.setState({ bc : "#eeeeee"})
            }
        });
    }

    render() {
        const {userStates,bc}=this.state;
        const {user}=this.props;
        return (
               <select style={{backgroundColor:bc}} value={userStates} className="userState" onChange={this.select.bind(this)}>
                   <option >상태를 선택해주세요</option>
                   <option value= "yes">구직/실습</option>
                   <option value="no">휴식</option>
               </select>
        );
    }
}

export default UserState;