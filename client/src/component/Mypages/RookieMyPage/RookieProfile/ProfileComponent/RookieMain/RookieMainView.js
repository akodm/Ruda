import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';

class RookieMainView extends Component {
    constructor(props){
        super(props);
        this.state={
            profileImg:"",
            profile_preview:"",
        }

    }
    
    setMain(){
        this.props.Mainchanges(false)
    }
    
    
    render() {
       
        const {user} = this.props;
        const tags = user.userTags;
        console.log(tags);
        const tag = tags.map(function(str){
            return   <div className="chip-margin">
                        <Chip label={"#"+str} size="small" color="primary" variant="outlined" />
                    </div>;
        });
        return (
            <div>
                <div className="RookieMain-title">
                    <span className="RookieMain-title-text">저는 이런 사람이에요</span>
                    <span className="RookieMain-relayout" onClick={this.setMain.bind(this)}>[편집]</span>
                </div>
                <div className="RookieMain-user">
                    <img src={user.userImage} alt="IMG"></img>
                    <span className="RookieMain-user-name">{user.userName}</span>
                    <span>{user.userIntro}</span>
                </div>
                <div className="line"></div>
                <div className="RookieMain-user-tag-content">
                      {tag}
                </div>
            </div>
        );
  
    }
}

export default RookieMainView;