import React, { Component } from 'react';
import axios from 'axios';

class Insert_emailAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coment : {
                title : "이메일 인증 메일을 발송하였습니다.",
                span : "가입시 사용한 이메일로 인증을 완료하여주세요.",
            },
            loaded : "",
        }
    }
    
    async componentDidMount() {
        const url = new URL(window.location.href);
        if(url.searchParams.get("emailAuth")) {
            const getParam = url.searchParams.get("emailAuth");
            try {
                const result = await axios.post("http://localhost:5000/emailAuth/emailauth", {
                    token : getParam,
                });
                if(result.data) {
                    this.setState({ coment : {
                        title : "인증에 성공하였습니다.",
                        span : "RUDA에 가입하신것을 환영합니다. 프로필 및 정보를 작성하여 활동하세요!"
                    }})
                } else {
                    this.setState({ coment : {
                        title : "인증에 실패하였습니다.",
                        span : "이메일이 잘못 입력되었거나 사이트내 오류, 혹은 잘못된 인증코드로 인증에 실패하였습니다. 다시 시도해주세요."
                    }})
                }
            } catch(err) {
                console.log("이메일 인증 처리 과정 에러 발생 : " + err);
            }
        } else {
            console.log("이메일 인증 요청 중..");
        }
        this.setState({ loaded : "load" })
    }

    render() {
        const { loaded, coment } = this.state;
        return (
            <div className="insert-emailauth-main">
                {
                    loaded && <div className="insert-emailauth-div">
                        <span className="insert-emailauth-span">{coment.title}</span><p></p>
                        <span className="insert-emailauth-span">{coment.span}</span>
                    </div>
                }
            </div>
        );
    }
}

export default Insert_emailAuth;