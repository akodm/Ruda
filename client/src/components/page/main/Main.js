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
                <Items src="/Images/pt_icon.png" title="나만의 프로필 제작" span1="나의 프로필,포트폴리오를 손쉽게 관리해보세요" span2="완성된 프로필,포트폴리오를 공유해보세요" />,
                <Items src="/Images/easy_icon.png" title="간편한 구인구직" span1="부담스럽지 않은 구직!" span2="사이트 내 채팅을 통해 기업과 가까이 소통해보세요!" />,
                <Items src="/Images/level_icon.png" title="발전의 기회" span1="다른사람들의 포트폴리오를 보고 참고해보세요" span2="더 나은 포트폴리오로 성장 할 수 있어요." />,
                <Items src="/Images/new_icon.png" title="새로운 인재 발견" span1="새로운 인재를 발견할 수 있어요." span2="우리 기업과 맞는 실습/신입을 찾아보세요!" />
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
                <div className="Main-new-bottom">
                    <div className="bottom-box" style={{backgroundColor:"#cae4ffe1"}}>
                        <div className="bottom-box-content rever" >
                            <h1>간편하게 이용하세요!</h1>
                            <p>사이트 내 회원가입 혹은 소셜 회원가입/로그인을 통해 </p>
                            <p>간편하게 회원가입 및 로그인 할 수 있습니다.</p>
                            <p>불필요한 정보 입력없이 시작해보세요!.</p>
                        </div>
                        <img src="/Images/oauth.png"/>
                    </div>
                    <div className="bottom-box" >
                        <img src="/Images/oauth.png"/>
                        <div className="bottom-box-content " style={{color:"#646464"}}>
                            <h1>나만의 구직페이지를 구성하세요!</h1>
                            <p>구직자, 기업 중 선택하여 기본 정보 등록 후, </p>
                            <p>자신만의 마이페이지를 확인할 수 있습니다. </p>
                            <p>마이페이지와 포트폴리오 등 내용을 채워보세요!</p>
                        </div>
                    </div>
                    <div className="bottom-box" style={{backgroundColor:"#ccccffd5"}}>
                        <div className="bottom-box-content rever">
                            <h1>자유롭게 구직활동을 해보세요!</h1>
                            <p>게시판에서 인재와 기업의 카드를 확인하고.</p>
                            <p>다른 사람의 마이페이지를 볼 수 있습니다.</p>
                            <p> 구직 또는 채용을 등록해보세요!</p>
                        </div>
                        <img src="/Images/oauth.png"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
