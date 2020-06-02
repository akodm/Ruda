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
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-companys-company-title">하이루키</span>
                            <span className="MainWith-companys-company-text">안녕하세요 하이루키입니다.</span>
                        </div>
                        <div className="MainWith-companys-company">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-companys-company-title">하이루키</span>
                            <span className="MainWith-companys-company-text">안녕하세요 하이루키입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-companys-company-title">하이루키</span>
                            <span className="MainWith-companys-company-text">안녕하세요 하이루키입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-companys-company-title">하이루키</span>
                            <span className="MainWith-companys-company-text">안녕하세요 하이루키입니다.</span>
                        </div>  
                        <div className="MainWith-companys-company">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-companys-company-title">하이루키</span>
                            <span className="MainWith-companys-company-text">안녕하세요 하이루키입니다.</span>
                        </div>                         
                    </div>
                </div>
                <div className="MainWith-rookies">
                    <span className="MainWith-rookies-title">하이루키와 함께하는 인재</span>
                    <div className="MainWith-rookies-box">
                        <div className="MainWith-rookies-rookie">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-rookies-rookie-title">홍길동</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 홍길동입니다.</span>
                        </div>
                        <div className="MainWith-rookies-rookie">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-rookies-rookie-title">홍길동</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 홍길동입니다.</span>
                        </div>  
                        <div className="MainWith-rookies-rookie">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-rookies-rookie-title">홍길동</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 홍길동입니다.</span>
                        </div> 
                        <div className="MainWith-rookies-rookie">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-rookies-rookie-title">홍길동</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 홍길동입니다.</span>
                        </div>
                        <div className="MainWith-rookies-rookie">
                            <img src="/Images/pt_icon.png"/>
                            <span className="MainWith-rookies-rookie-title">홍길동</span>
                            <span className="MainWith-rookies-rookie-text">안녕하세요 홍길동입니다.</span>
                        </div>                      
                    </div>
                </div>
            </div>
        );
    }
}

export default MainWith;