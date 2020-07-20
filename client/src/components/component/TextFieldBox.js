import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class TextFieldBox extends Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onType = this.onType.bind(this);
    }
    
    // 기본 변경 함수 - 길이 제한 가능 및 텍스트 형식 ( 특수문자 제외 모두 가능 )
    onChangeValue(e) {
        const { component, name, max, value, errName } = this.props;

        if(value.length >= max) { component.setState({ [errName] : true });
        } else { component.setState({ [errName] : false }); }

        if(/[!@#$%^&*(){}.?\/~`'";:,+_=|]/g.test(e.target.value)) {
            component.setState({ [name] : "" });
            return;
        }

        component.setState({ [name] : e.target.value });
    }

    // 날짜나 숫자의 경우 변경 함수 - 길이 제한 가능 및 숫자만 입력 가능
    onChangeDate(e) {
        const { component, max, value, name, errName } = this.props;

        if(value.length >= max) { component.setState({ [errName] : true });
        } else { component.setState({ [errName] : false }); }

        if(/[!@#$%^&*(){}.?\/~`'";:,+_=|]/g.test(e.target.value) || /\D{1,}/g.test(e.target.value)) {
            component.setState({ [name] : "" });
            return;
        }

        component.setState({ [name] : e.target.value });
    }

    // 숫자의 경우 변경 함수 - 숫자만 입력 가능
    onChangeNumber(e) {
        const { component, max, value, name, errName } = this.props;

        if(value.length >= max) { component.setState({ [errName] : true });
        } else { component.setState({ [errName] : false }); }

        if(/[!@#$%^&*(){}.?\/~`'";:,+_=|]/g.test(e.target.value) || /\D{1,}/g.test(e.target.value)) {
            component.setState({ [name] : "" });
            return;
        }

        component.setState({ [name] : e.target.value });
    }

    onType(e) {
        const { type } = this.props;
        if(type === "text") { this.onChangeValue(e); return; }
        if(type === "date") { this.onChangeDate(e); return; }
        if(type === "number") { this.onChangeNumber(e); return; }
    }

    render() {
        const { textStyle, style, clear, className, err, helper, name, value, label, auto } = this.props;
        return (
            <div sytle={style || {}} className={className || ""}>
                <TextField 
                    error={err} 
                    helperText={helper} 
                    variant="outlined" 
                    onPaste={this.onType}
                    onChange={this.onType} 
                    name={name} 
                    value={value} 
                    label={label}
                    autoComplete={auto}
                    style={textStyle || {width:"100%"}}
                    type={clear || "search"}
                />
            </div>
        );
    }
}

export default TextFieldBox;