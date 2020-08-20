import React from 'react';
import './App.css';
import Base from './components/layout/Base';

function App() {
    // 지원되는 브라우저
    let window_case = window.navigator.userAgent.toLowerCase();
    if(window_case.indexOf('chrome') === -1) {
        alert("해당 웹 서비스는 크롬에 최적화 되어있습니다. 크롬으로 이용해주세요.");
    }
    
    return (
        <div className="app-main">
            <Base />
        </div>
    );
}

export default App;