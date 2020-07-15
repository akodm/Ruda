import React, { Component } from 'react';
import '../css/DevMessage.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

class DevMessage extends Component {
    constructor(props){
        super(props);
        this.state={
            devbtn:false
        }
    }

    DevMessageClick(){
        const {devbtn}=this.state;
        if(devbtn===true){
            this.setState({devbtn:false,})
        }
        if(devbtn===false){
            this.setState({devbtn:true,})
        }
    }
    render() {
        const {devbtn}=this.state;
        return (
            <>
                <div className="DevMessage" onClick={this.DevMessageClick.bind(this)}>
                    <HelpOutlineIcon style={{margin:"5px"}}/><p  style={{margin:"0px"}}>개발자에게 문의</p>
                </div>
                {
                    devbtn &&
                    <div className="DevMessage-pop">
                        
                    </div>
                }
            </>
        );
    }
}

export default DevMessage;