import React, { Component } from 'react';
import './Main.css';
class MainWith extends Component {
    render() {
        return (
            <div className="MainWith">
                <div className="MainWith-companys">
                    <span className="MainWith-companys-title">하이루키와 함께하는 기업</span>   
                    <div className="MainWith-companys-box">
                        <div className="MainWith-companys-company">
                            <img src="/Images/Kakao.png" alt="img"/>
                            <span className="MainWith-companys-company-title">카카오</span>
                            <span className="MainWith-companys-company-text">안녕하세요 카카오입니다.</span>
                        </div>
                        <div className="MainWith-companys-company">
                            <img src="/Images/naver.png" alt="img"/>
                            <span className="MainWith-companys-company-title">네이버</span>
                            <span className="MainWith-companys-company-text">안녕하세요 네이버입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/nexon.jpg" alt="img"/>
                            <span className="MainWith-companys-company-title">넥슨</span>
                            <span className="MainWith-companys-company-text">안녕하세요 넥슨입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/opengraph.png" alt="img"/>
                            <span className="MainWith-companys-company-title">데브시스터즈</span>
                            <span className="MainWith-companys-company-text">안녕하세요 데브시스터즈입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/samsung.png" alt="img"/>
                            <span className="MainWith-companys-company-title">삼성</span>
                            <span className="MainWith-companys-company-text">안녕하세요 삼성입니다.</span>
                        </div>                         
                    </div>
                </div>
                <div className="MainWith-rookies">
                    <span className="MainWith-rookies-title">하이루키와 함께하는 인재</span>
                    <div className="MainWith-rookies-box">
                        <div className="MainWith-rookies-rookie">
                            <img alt="img"  src="/Images/minji.jpg"/>
                            <span className="MainWith-rookies-rookie-title">황민지</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 황민지입니다.</span>
                        </div>
                        <div className="MainWith-rookies-rookie">
                            <img alt="img"  src="/Images/tj.jpg"/>
                            <span className="MainWith-rookies-rookie-title">이태정</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 이태정 입니다.</span>
                        </div>  
                        <div className="MainWith-rookies-rookie">
                            <img alt="img"  src="/Images/jm.png"/>
                            <span className="MainWith-rookies-rookie-title">조준명</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 조준명입니다.</span>
                        </div> 
                        <div className="MainWith-rookies-rookie">
                            <img alt="img"  src="/Images/hm.jpg"/>
                            <span className="MainWith-rookies-rookie-title">이혜민</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 이혜민입니다.</span>
                        </div>
                        <div className="MainWith-rookies-rookie">
                            <img alt="img"  src="/Images/yr.jpg"/>
                            <span className="MainWith-rookies-rookie-title">고유리</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 고유리입니다.</span>
                        </div>                      
                    </div>
                </div>
            </div>
        );
    }
}

export default MainWith;