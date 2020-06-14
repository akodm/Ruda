import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';
import axios from 'axios';
class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            url : new URL(window.location),
            user : {
                cate:"user",
                data:null,
            },
            load:false,
        }
    }
    
    scrollToTop = () =>{ window.scrollTo({top:0}); }

    async componentDidMount(){
        const { url } = this.state;
        let urls = url.pathname;
        urls = urls.split("/");
        try{
            if(urls[2]){
                const user = await axios.get(`http://localhost:5000/users/oneid?userId=${urls[2]}`);
                let userData = user.data;
                
                //유저일경우
                if(userData.userCate === "user"){
                    const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${userData.id}`);
                    //result.data-> userInfo DB
                    this.setState({
                        user:{
                            cate:userData.userCate,
                            data:result.data,                   
                        }
                    });
                }
                //기업일경우
                else{
                    const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${userData.id}`);
                    //result.data-> companyInfo DB
                    this.setState({
                        user:{
                            cate:userData.userCate,
                            data:result.data,
                        }
                    });
                }
            //아이디가 없을경우===마이페이지
            }else{
                //http://locahost:3000/ => props success
                //http://locahost:3000/mypage => props fail
                //상위 컴포넌트로부터 props를 전달받았을 경우
                if(this.props.user.email){
                    let propsUser = this.props.user;
                    //유저일경우
                    if(propsUser.cate === "user"){
                        const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${propsUser.id}`);
                        //result.data-> userInfo DB
                        this.setState({
                            user:{
                                cate:propsUser.cate,
                                data:result.data,
                            }
                        });
                    //기업일경우  
                    }else{
                        const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${propsUser.id}`);
                        //result.data-> companyInfo DB
                        this.setState({
                            user:{
                                cate:propsUser.cate,
                                data:result.data,
                            }
                        });
                    }
                //전달 받은 props가 없을 경우 -> 로컬스토리지에 데이터 확인 -> 유(로그인상태) /무 (비로그인상태)
                }else{
                    let getUser = JSON.parse(localStorage.getItem("users"));
                    if(getUser){
                        const verify = await axios.get(`http://localhost:5000/users/verify`, {
                            headers : {
                                "Authorization" : getUser.token, 
                            }
                        })
                        const user = await axios.get(`http://localhost:5000/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
                        let userData = user.data;
             
                        //유저일경우
                        if(userData.userCate === "user"){
                            const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${userData.id}`);
                            //result.data-> userInfo DB
                            this.setState({
                                user:{
                                    cate:userData.userCate,
                                    data:result.data,     
                                }
                            });
                        } //기업일경우
                        else{
                          const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${userData.id}`);
                          //result.data-> companyInfo DB
                          this.setState({
                              user:{
                                  cate:userData.userCate,
                                  data:result.data,
                              }
                          });
                        }
                    }
                }
            }
        }catch(err){
            console.log("user mypage err:"+err);
            alert("마이페이지 로드에 실패하였습니다.");
        }
        if(!this.state.user.cate) {
            alert("기본 정보를 먼저 등록해주세요.");
            window.location.href = "/";
        } else {
            this.setState({
                load:true,
            });
        }
    }

    render() {
        const {url,user,load}=this.state;
        console.log(user);
        return load && (
            <div className="Mypages">
                { user.cate !== "user" ? <CompanyMypage user={user.data} /> : <RookieMypage user={user.data}/> }
            </div>
        );
    }
}

export default Mypages;