import React, { Component } from 'react';
import './Main.css';

class MainNotice extends Component {
    render() {
        return (
            <div className="MainNotice">
                <h2>하이루키 이렇게 이용해보세요</h2>
                <div className="MainNotice-contents">
                    <div className="MainNotice-contents-box">
                        <img src="/Images/pt_icon.png"/>
                        <span className="MainNotice-contents-box-title">나만의 포트폴리오 제작</span>
                        <span className="MainNotice-contents-box-span">종이서류보다 깔끔하게 작성할수 있어요<br/>
                            나의 포트폴리오를 관리해보세요</span>
                    </div>
                    <div className="MainNotice-contents-box">
                        <img src="/Images/easy_icon.png"/>
                        <span className="MainNotice-contents-box-title">간편한 구인구직</span>
                        <span className="MainNotice-contents-box-span">딱딱한 구직시스템은 가라!<br/>
                            채팅을 통해 기업과 부담없이 연락해보세요!</span>
                    </div>
                    <div className="MainNotice-contents-box">
                        <img src="/Images/level_icon.png"/>
                        <span className="MainNotice-contents-box-title">발전의 기회</span>
                        <span className="MainNotice-contents-box-span"> 버튼 하나로 쉽게나를 어필 할 수있어요!<br/>
                        나의 상태를변경해보세요</span>
                    </div>
                    <div className="MainNotice-contents-box">
                        <img src="/Images/new_icon.png"/>
                        <span className="MainNotice-contents-box-title">새로운 인재 발견</span>
                        <span className="MainNotice-contents-box-span">새로운 인재를 발견할 수 있어요<br/>
                        기업과 딱 맞는 인재를 쉽게 찾아보세요!</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainNotice;