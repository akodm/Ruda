import React, { Component } from 'react';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import config from '../../../client-configs';
import InputTag from '../../component/InputTag';

class PassPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password : "",
            passwordconfirm : "",

            passwordValid : { state : true, result : false },
            passwordconfirmValid : { state : true, result : false },
        }
    }

    async savePassword() {
        const { password, passwordconfirm, passwordValid, passwordconfirmValid } = this.state;
        const { id, openClose } = this.props;

        if(!password || !passwordconfirm) {
            alert("값이 비어있습니다.");
            return;
        }
        if(!passwordValid.result || !passwordconfirmValid.result) {
            alert("잘못된 값이 있습니다.");
            return;
        }

        try {
            const result = await axios.put(`${config.app.s_url}/users/updateid`, {
                userId : id,
                userPass : password
            });

            if(result.data) {
                alert("비밀번호가 변경되었습니다.");
            } else {
                alert("비밀번호가 변경되지 않았습니다. 다시 시도해주세요.");
            }
        } catch(err) {
            console.log("password change err");
            alert("비밀번호 변경 도중 에러가 발생했습니다. 다시 시도해주세요.");
        }
        openClose(false);
    }

    validSet(name, boolstate, boolresult) {
        if([name]) this.setState({ [name] : { state : boolstate, result : boolresult } });
    }

    render() {
        const { openClose } = this.props;
        const { password, passwordconfirm, passwordValid, passwordconfirmValid } = this.state;
        return (
            <div className="passpopup-main">
                <div className="passpopup-div">
                    <div className="passpopup-title">
                        <CloseIcon onClick={() => openClose(false)} style={{cursor:"pointer"}} />
                    </div>
                    <div className="passpopup-guide">비밀번호를 변경하여 주세요.</div>

                    <div className="passpopup-input-div">
                        <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={passwordValid} 
                            value={password} 
                            onChange={(e) => this.setState({ password : e.target.value })} 
                            regExp={/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[*!@#$%^&+=/]).*$/} 
                            regSpan="잘못된 비밀번호 형식입니다." 
                            name="password" 
                            type="password" 
                            placeholder="특수문자,문자,숫자 포함 8~15자리 이내"
                        ></InputTag>
                        <InputTag 
                            validation={this.validSet.bind(this)} 
                            valid={passwordconfirmValid} 
                            value={passwordconfirm} 
                            custom={{ first : password, second : passwordconfirm }}
                            onChange={(e) => this.setState({ passwordconfirm : e.target.value })} 
                            regSpan="비밀번호가 다릅니다." 
                            name="passwordconfirm" 
                            type="password" 
                            placeholder="비밀번호를 확인해주세요."
                        ></InputTag>
                    </div>

                    <div className="passpopup-btn">
                        <Button variant="outlined" color="primary" onClick={this.savePassword.bind(this)}>변경하기</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassPopup;