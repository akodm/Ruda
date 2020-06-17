import React, { Component } from 'react';
import './UserState.css';
import axios from 'axios';
class UserState extends Component {
    constructor(props){
        super(props);
        this.state={
            userStates : "no",
            bc:"white",
        }
    }

    select(e){
        this.setState({
            userStates : e.target.value
        }, async() => {
            if(this.state.userStates === "yes") {
                this.setState({ bc : "#a5ccf5"})
                await this.stateChanged();
            } else {
                this.setState({ bc : "#eeeeee"})
                await this.stateChanged();
            }
        });
    }

    async stateChanged() {
        try{
            const { user } = this.props.user;
            console.log(user);
            const{ userStates } = this.state;
            const result = await axios.put(`http://localhost:5000/userInfos/update`, {
                userId : user.id,
                userState : userStates,
            });
            if(!result.data) {
                alert("등록에 실패했습니다. 다시 시도해 주세요.");
            }
        }catch(err){
            console.log(err);
        }
    }

    render() {
        const {userStates,bc}=this.state;
        const {user}=this.props;
        return (
               <select style={{backgroundColor:bc}} value={userStates} className="userState" onChange={this.select.bind(this)}>
                   <option>상태를 선택해주세요</option>
                   <option value= "yes">구직/실습</option>
                   <option value="no">휴식</option>
               </select>
        );
    }
}

export default UserState;