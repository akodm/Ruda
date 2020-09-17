import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Main.css';
import Items from './MainItems';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 설명 카드
            itemCount : [
                <Items src="/Images/pt_icon.png" title="나만의 프로필 제작" span1="종이서류보다 깔끔하게 작성할 수 있어요." span2="나의 프로필/포트폴리오를 관리해보세요." />,
                <Items src="/Images/easy_icon.png" title="간편한 구인구직" span1="부담스럽지 않은 구직!" span2="사이트 내 채팅을 통해 기업과 연락해보세요!" />,
                <Items src="/Images/level_icon.png" title="발전의 기회" span1="버튼 하나로 쉽게 나를 어필할 수 있어요!" span2="나의 상태를 변경해보세요." />,
                <Items src="/Images/new_icon.png" title="새로운 인재 발견" span1="새로운 인재를 발견할 수 있어요." span2="기업과 맞는 실습/신입을 찾아보세요!" />
            ],
            // 스크롤 div 표시 효과를 위한 값
            withDisplay : false,
        }
    }
    start = () =>{
        window.scrollTo({top:0,left:0,behavior:"smooth"});
    }
    
    render() {
        const { itemCount } = this.state;
        return (
            <div className="Main-new">
                {/* 메인 상단 부분 */}
                <div className="Main-new-Div">
                    <div className="Main-new-right">
                        <span className="Main-new-title">당신의 첫 시작을 하이루키와 함께하세요</span>
                        <span className="Main-new-subTitle">사회초년생, 졸업예정자, 학교실습생</span>
                        <span className="Main-new-text">경력없는 신입들간의 구인구직사이트 하이루키에서<br></br> 지금 바로 당신의 능력을 어필해보세요.</span>
                        <div className="Main-new-loginDiv">
                            <Link to ="/insert"><button className="Main-new-insert">회원가입</button></Link>
                            <Link to ="/login"><button className="Main-new-login">로그인</button></Link>
                        </div>
                        <div className="Main-new-line"></div>
                        <Link to ="/easy"><span className="Main-new-es">간편하게 회원가입/로그인하기</span></Link>
                    </div>
                    <div className="Main-new-left">
                        <img src="/Images/mainimg.png" alt="Liu" className="liu"></img>
                    </div>
                </div>
                {/* 메인 중단 부분 */}
                <div className="Main-new-center">
                    <h2 className="Main-new-centerTitle">하이루키를 이렇게 이용하세요!</h2>
                </div>
                <div className="Main-new-centerBody">
                    { itemCount.map((data,i) => { return <div key={i}>{data}</div> }) }
                </div>

                {/* 메인 하단 부분 */}
                <div className="Main-new-bottom mobile">
                    <div className="Main-new-bottom-text">
                        사이트 내 회원가입 혹은 소셜 회원가입/로그인을 통해 <br></br>
                        간편하게 회원가입 및 로그인 할 수 있습니다. <br></br>
                        불필요한 정보 입력없이 시작해보세요!.
                    </div>
                    <div className="Main-new-bottom-img-div">
                        <img src="/Images/oauth.png" alt="img" className="Main-new-bottom-img"></img>
                    </div>
                </div>
                <div className="Main-new-bottom" style={{backgroundColor: "white"}}>
                    <div className="Main-new-bottom-img-div">
                        <img src="/Images/mypage.png" alt="img" className="Main-new-bottom-img"></img>
                    </div>
                    <div className="Main-new-bottom-text" style={{color:"black"}}>
                        구직자, 기업 중 선택하여 기본 정보 등록 후, <br></br>
                        자신만의 마이페이지를 확인할 수 있습니다. <br></br>
                        마이페이지와 포트폴리오 등 내용을 채워보세요!
                    </div>
                </div>
                <div className="Main-new-bottom mobile" style={{backgroundColor:"#ccccff",marginBottom:"100px"}}>
                    <div className="Main-new-bottom-text">
                        <div className="start">
                            게시판에서 인재와 기업의 카드를 확인하고, <br></br>
                            다른 사람의 마이페이지를 볼 수 있습니다. <br></br>
                            구직 또는 채용을 등록해보세요!
                            <button onClick={this.start.bind(this)}>하이루키 시작하기</button>
                        </div>
                    </div>
                    <div className="Main-new-bottom-img-div">
                        <img src="/Images/board.png" alt="img" className="Main-new-bottom-img"></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
