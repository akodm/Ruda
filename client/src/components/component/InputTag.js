import React, { Component } from 'react';

class InputTag extends Component {
    // 인풋 태그의 값 핸들링 함수
    async handlingInput(e) {
        // 프롭스로 넘어온 밸류값을 변경 -> 함수 프롭스
        await this.props.onChange(e)
        // 비동기 코드로 위의 내용 실행 후 밸리데이션 함수 실행
        this.validationInput();
    }
    // 밸류 값의 밸리데이션 처리 함수
    validationInput() {
    // 밸리데이션을 프롭스로 넘겨받음
        let regExp = this.props.regExp;
        // 넘겨받은 정규표현식이 있을 경우 해당 표현식 처리
        if(regExp) {
            if(this.props.value.length <= 0 || !regExp.test(this.props.value)) {
                this.props.validation(this.props.name+"Valid",false, false)
            } else {
                this.props.validation(this.props.name+"Valid",true, true)
            }
        // 넘겨받은 정규표현식이 없을 경우 입력 라인만 처리
        } else {
            if(this.props.value.length <= 0) {
                this.props.validation(this.props.name+"Valid",false, false)
            } else {
                this.props.validation(this.props.name+"Valid",true, true)
            }
        }
        // 비밀번호 확인 등 두 가지 값의 중복 체크를 위함
        let customIf = this.props.custom;
        if(customIf && customIf.first) {
            if(customIf.first !== customIf.second) {
                this.props.validation(this.props.name+"Valid",false, false)
            } else {
                this.props.validation(this.props.name+"Valid",true, true)
            }
        }
    }
    render() {
        return (
            <div className="login-inputDiv">
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value} 
                    onPaste={this.handlingInput.bind(this)}
                    onChange={this.handlingInput.bind(this)} 
                    className="login-input" 
                    placeholder={this.props.placeholder}>
                </input>
                {/* 밸리데이션 검증 결과에 따른 하단 텍스트 출력 */}
                { !this.props.valid.state && <span>{this.props.regSpan}</span>}
            </div>
        );
    }
}

export default InputTag;