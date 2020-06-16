import React, { Component } from 'react';
import './UserState.css';
import axios from 'axios';
class UserState extends Component {
    constructor(props){
        super(props);
        this.state={
            userStates : "",
            bc:"white",
        }
    }
    async componentDidMount(){
        try{
            const{userStates}=this.state;
            const result = await axios.get(`http://localhost:5000/userInfos/update`);
            //result.data-> userInfo DB
            this.setState({
                user:{
                    userState:userStates,                 
                }
            });
            console.log(userStates);

        }catch(err){
            console.log(err);
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
                   <option value="training">실습구함</option>
                   <option value= "jobser"> 구직중</option>
                   <option value="none">미구직</option>
               </select>
        );
    }
}

export default UserState;