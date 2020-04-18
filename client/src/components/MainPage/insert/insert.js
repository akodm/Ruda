import React from 'react';
import './insert.css';
import { Link } from 'react-router-dom';

class Insert extends React.Component {
    render() {
        return (
            <div className="insert-main">
                <div className="insert-title">
                    <span>회원가입</span>
                </div>
                <div className="insert-form">
                    <span className="insert-formSpan">아이디<span className="star">*</span></span>
                    <input type="text" className="insert-formID"></input>
                    <span className="insert-formSpan">비밀번호<span className="star">*</span></span>
                    <input type="password" className="insert-formPass"></input>
                    <span className="insert-formSpan">비밀번호 확인<span className="star">*</span></span>
                    <input type="password" className="insert-formPass"></input>
                    <span className="insert-formSpan">이름<span className="star">*</span></span>
                    <input type="text" className="insert-formName"></input>
                    <span className="insert-formSpan">이메일</span>
                    <input type="text" className="insert-formEmail"></input>
                    <span className="insert-formSpan">전화번호<span className="star">*</span></span>
                    <input type="number" className="insert-formPhone"></input>
                    <span className="insert-formSpan">주소</span>
                    <div className="insert-formAddDiv">
                        <input type="text" className="insert-formAddNo"></input>
                        <button className="insert-formAddBtn">주소 검색</button>
                    </div>
                    <div  className="insert-formAddDiv">
                        <input type="text" className="insert-formAdd"></input>
                        <input type="text" className="insert-formAdd2"></input>
                    </div>
                    <span className="insert-formSpan">사용자 구분<span className="star">*</span></span>
                    <select className="insert-formSelt">
                        <option className="insert-formOpt">신입 구직자</option>
                        <option className="insert-formOpt">기업</option>
                    </select>
                </div>
                <div className="insert-btns">
                    <Link to="/mypage"><button className="insert-insertBtn">가입하기</button></Link>
                    <Link to="/"><button className="insert-insertCancel">취소</button></Link>
                </div>
            </div>
        );
    }
}

export default Insert;