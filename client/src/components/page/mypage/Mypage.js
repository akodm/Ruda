import React, { Component } from 'react';
import '../../css/mypage.css';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Profile from './Profile';
import Portfolio from './Portfolio';
import Setting from './Setting';

class mypage extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnNum:0,
            likeBtn:"none",
        }
    }
    MenuClick(num){
        this.setState({
            btnNum:num,
        })
    }
    likeClick(){
        const {likeBtn} = this.state;
        if(likeBtn==="none"){
            this.setState({
                likeBtn:"click", 
            })
        }
        else{
            this.setState({
                likeBtn:"none", 
            })
        }
    }
    savepdf(){
        document.title = '이름님의 이력서';
        window.print();
        
    }
    render() {
        const {btnNum,likeBtn}=this.state;
        return (
            <div className="Mypage">
                <div className="Mypage-frame">
                    <div className="Mypage-pages">
                        <div className="Mypage-pages-title-frame">
                            <img src = "/Image/hochi.png" className="hochi" alt="img"></img>
                            <div className="Mypage-pages-title">
                                <p>고유리님의 {btnNum === 0 ?"프로필 입니다." : "" || 
                                              btnNum === 1 ?"포트폴리오 입니다." : "" ||
                                              btnNum === 2 ?"마이페이지 입니다." : "" } </p>
                                <div className="Mypage-pages-title-icons">
                                    <div className="Mypage-pages-title-icons-icon">
                                        <PrintIcon onClick={this.savepdf.bind(this)}/>
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon">
                                    <ShareIcon/>
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon" onClick={this.likeClick.bind(this)}>
                                        {likeBtn==="none"?<FavoriteBorderIcon/>:<FavoriteIcon style={{ color : "#11addd"}}/>}
                                    </div>
                                    <div className="Mypage-pages-title-icons-icon">
                                    <MailOutlineIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Mypage-content">
                            {btnNum === 0 ?<Profile/> : "" || btnNum === 1 ?<Portfolio/> : "" ||btnNum === 2 ?<Setting/> : "" } 
                        </div>
                    </div>
                    <div className="Mypage-btns">
                        <button className={btnNum === 0?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,0)}>프로필</button>
                        <button className={btnNum === 1?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,1)}>포트폴리오</button>
                        <button className={btnNum === 2?"Mypage-menu-click":"Mypage-menu-none"} onClick={this.MenuClick.bind(this,2)}>마이페이지</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default mypage;