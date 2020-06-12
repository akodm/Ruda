import React, { Component } from 'react';

import RookieMypage from './RookieMyPage/RookieMypage';
import CompanyMypage from './CompanyMyPage/CompanyMyPage';
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Mypages extends Component {
    constructor(props){
        super(props);
        this.scrollToTop();
        this.state = {
            url : new URL(window.location),
            user : {
                cate : "user",
                data : null,
            },
            load : false,
        }
    }
    
    scrollToTop = () =>{ window.scrollTo({top:0}); }

    async componentDidMount() {
        const { url } = this.state;
        let urls = url.pathname;
        urls = urls.split("/");
        try {
            // http://localhost:3000/mypage/3;
            // 3000  / -> [0] , mypage/ -> [1], 3 / -> [2]
            // 아이디가 있을 경우 -> id 로 조회 -> 자기 or 상대 마이페이지
            if(urls[2]) {
                const user = await axios.get(`http://localhost:5000/users/oneid?userId=${urls[2]}`);
                let userData = user.data; // user <- res.send... => user.data...
                // 유저일 경우
                if(userData.userCate === "user") {
                    const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${userData.id}`);
                    // result.data => UserInfo DB
                    this.setState({ user : {
                        cate : userData.userCate,
                        data : result.data,
                    }});
                // 기업일 경우
                } else {
                    const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${userData.id}`);
                    // result.data => CompanyInfo DB
                    this.setState({ user : {
                        cate : userData.userCate,
                        data : result.data,
                    }});
                }
            // 아이디가 없을 경우 -> 자기 마이페이지
            } else {
                // http://localhost:3000/ <- props success
                // http://localhost:3000/mypage <- props fail
                // 상위 컴포넌트로부터 props를 전달받았을 경우
                if(this.props.user.email) {
                    let propsUser = this.props.user;
                    // 유저일 경우
                    if(propsUser.cate === "user") {
                        const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${propsUser.id}`);
                        // result.data => UserInfo DB
                        this.setState({ user : {
                            cate : propsUser.cate,
                            data : result.data,
                        }});
                    // 기업일 경우
                    } else {
                        const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${propsUser.id}`);
                        // result.data => CompanyInfo DB
                        this.setState({ user : {
                            cate : propsUser.cate,
                            data : result.data,
                        }});
                    }
                // 전달받은 props가 없을 경우 -> 로컬 스토리지에 데이터 확인 -> 유 ( 로그인 상태 ) / 무 ( 비로그인 상태 )
                } else {
                    let getUser = JSON.parse(localStorage.getItem("users"));
                    if(getUser) {
                        const verify = await axios.get(`http://localhost:5000/users/verify`, {
                            headers : {
                                "Authorization" : getUser.token, 
                            }
                        })
                        const user = await axios.get(`http://localhost:5000/users/oneemail?userEmail=${verify.data.email}&authCate=${verify.data.tag}`);
                        let userData = user.data;
                        // 유저일 경우
                        if(userData.userCate === "user") {
                            const result = await axios.get(`http://localhost:5000/userInfos/one?userId=${userData.id}`);
                            // result.data => UserInfo DB
                            this.setState({ user : {
                                cate : userData.userCate,
                                data : result.data,
                            }});
                        // 기업일 경우
                        } else {
                            const result = await axios.get(`http://localhost:5000/companyInfos/one?userId=${userData.id}`);
                            // result.data => CompanyInfo DB
                            this.setState({ user : {
                                cate : userData.userCate,
                                data : result.data,
                            }});
                        }
                    }
                }
            }
        } catch(err) {
            console.log("users mypage err : " + err );
            alert("마이페이지 로드에 실패했습니다.");
        }
        this.setState({ load : true });
    }

    render() {
        const { url, user, load } = this.state;
        return load && (
            <div className="Mypages">
                { user.cate !== "user" ? <CompanyMypage user={user.data} /> : <RookieMypage user={user.data} /> }
            </div>
        );
    }
}

export default Mypages;