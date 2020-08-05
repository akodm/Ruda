import React from 'react';
import './App.css';
import Base from './components/layout/Base';

function App() {
    // 지원되는 브라우저
    let window_case = window.navigator.userAgent.toLowerCase();
    let case_ = true;
    if(window_case.indexOf('chrome') === -1) {
        case_  = false;
        alert("해당 웹 서비스는 크롬에 최적화 되어있습니다. 크롬으로 이용해주세요.");
    }

    // 지원되는 기기 ( 현재 반응형 진행중이기에 모바일은 불가 )
    let filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform ) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            alert("마이페이지의 경우 모바일이 불가합니다. 참고하여주세요.");
        }
    }
    return (
        <div className="app-main">
            {
                case_ && 
                <Base />
            }
        </div>
    );
}

export default App;
