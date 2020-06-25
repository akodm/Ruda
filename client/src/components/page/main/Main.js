import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/Main.css';
import Items from './MainItems';
import Partner from './MainPartnerItem';

class Main extends Component {
    constructor(props) {
        super(props);
        this.WITH = React.createRef();
        this.state = {
            // 설명 카드
            itemCount : [
                <Items src="/Images/pt_icon.png" title="나만의 프로필 제작" span1="종이서류보다 깔끔하게 작성할 수 있어요." span2="나의 프로필/포트폴리오를 관리해보세요." />,
                <Items src="/Images/easy_icon.png" title="간편한 구인구직" span1="부담스럽지 않은 구직!" span2="사이트 내 채팅을 통해 기업과 연락해보세요!" />,
                <Items src="/Images/level_icon.png" title="발전의 기회" span1="버튼 하나로 쉽게 나를 어필할 수 있어요!" span2="나의 상태를 변경해보세요." />,
                <Items src="/Images/new_icon.png" title="새로운 인재 발견" span1="새로운 인재를 발견할 수 있어요." span2="기업과 맞는 실습/신입을 찾아보세요!" />
            ],
            // 기업 아이템
            parnterCount : [
                <Partner src="/Images/Kakao.png" title="안녕하세요." span="카카오입니다. 경력없는 신입을 채용하고자 하이루키를 찾았습니다." />,
                <Partner src="/Images/naver.png" title="안녕하세요." span="앞으로의 IT 선두주자가 될 네이버입니다. 신입 채용을 희망합니다." />,
                <Partner src="/Images/nexon.jpg" title="안녕하세요." span="게임계열 넥슨입니다. 앱 및 게임 개발자를 채용합니다." />,
                <Partner src="/Images/opengraph.png" title="안녕하세요." span="쿠키런 게임사의 데브시스터즈입니다. devops 개발자 채용합니다." />,
                <Partner src="Images/samsung.png" title="안녕하세요." span="한국의 1등 기업 삼성입니다. 1년간 연수 교육을 받을 신입을 찾습니다." />,
            ],
            // 유저 아이템
            userCount : [
                <Partner src="/Images/jm.png" title="안녕하세요." span="풀스택 개발자가 되기 위해 노력하고 있는 (진)주니어 개발자입니다." />,
                <Partner src="/Images/hm.jpg" title="안녕하세요." span="프론트엔드 및 퍼블리셔를 희망하는 이헤민입니다." />,
                <Partner src="/Images/tj.jpg" title="안녕하세요." span="안녕하세요. 스마트 소프트웨어 2학년이고, 추후 개발자 예정인 이태정입니다." />,
                <Partner src="/Images/yr.jpg" title="안녕하세요." span="안녕하세요. 프론트엔드 개발자가 되고자 현재 React로 프로젝트를 개발중인 고유리입니다." />,
                <Partner src="Images/minji.jpg" title="안녕하세요." span="앱/AR/VR을 전공으로 하는 황민지입니다. VR/AR의 포트폴리오가 있습니다." />,
            ],
            // 스크롤 div 표시 효과를 위한 값
            withDisplay : false,
        }
    }

    componentDidMount() {
        const arg = parseInt(this.WITH.current.offsetHeight);
        window.addEventListener('scroll', this._calcScroll.bind(this, arg));
    }
    componentWillUnmount() { 
        window.removeEventListener('scroll', this._calcScroll) 
        this.setState = () => { return; }
    }

    // 스크롤 시 div 표시 트랜지션 효과를 위한 함수
    _calcScroll(arg) { 
        let heightDiff = parseInt(arg);
        let scrollPos = window.scrollY;
        if (scrollPos > heightDiff-100) { this.setState({ withDisplay : true });
        } else { this.setState({ withDisplay : false }); }
    }

    render() {
        const { itemCount,parnterCount,userCount,
            withDisplay } = this.state;
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
                        <img src="/images/mainimg.png" alt="Liu" className="liu"></img>
                    </div>
                </div>
                {/* 메인 중단 부분 */}
                <div className="Main-new-center">
                    <h2 className="Main-new-centerTitle">하이루키를 이렇게 이용해보세요!</h2>
                </div>
                <div className="Main-new-centerBody">
                    { itemCount.map((data,i) => { return <div key={i}>{data}</div> }) }
                </div>
                {/* 메인 하단 부분 */}
                <div className={ withDisplay ? "Main-new-bottom" : "Main-new-bottom-none" } ref={this.WITH} >
                    <div className="Main-new-bottomIntroDiv1">
                        <span className="Main-new-bottomIntro">하이루키와 함께하는 기업</span>
                    </div>
                    <div className="Main-new-bottomTop">
                        { parnterCount.map((data,i) => { return <div key={i}>{data}</div> }) }
                    </div>
                    <div className="Main-new-bottomIntroDiv2">
                        <span className="Main-new-bottomIntro">하이루키와 함께하는 인재</span>
                    </div>
                    <div className="Main-new-bottomBot">
                        { userCount.map((data,i) => { return <div key={i}>{data}</div> }) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;