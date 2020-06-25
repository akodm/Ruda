import React, { Component } from 'react';
import '../css/InputBox.css';

class InfoInput extends Component {
    onChangeValue(e) {
        this.props.onChange(e);
    }
    onClick() {
        if(this.props.onClick) {
            this.props.onClick()
        }
    }
    render() {
        return (
            <div className="Info-rookie-inputDiv">
                <span className="Info-rookie-inputCaption">{this.props.text}</span>
                <div className="Info-rookie-inputDiv-sub">
                    <input 
                        onPaste={this.onChangeValue.bind(this)} 
                        name={this.props.name} 
                        type={this.props.type} 
                        value={this.props.value} 
                        onChange={this.onChangeValue.bind(this)} 
                        placeholder={this.props.placeholder}
                        style={this.props.style}
                        onClick={this.onClick.bind(this)}
                        readOnly={this.props.readOnly}
                        maxLength={this.props.maxLength}
                        className="Info-rookie-input">
                    </input>
                    {
                        this.props.add &&
                        <input 
                            onPaste={this.onChangeValue.bind(this)} 
                            name={this.props.name2} 
                            type={this.props.type2} 
                            value={this.props.value2} 
                            onChange={this.onChangeValue.bind(this)} 
                            placeholder={this.props.placeholder2}
                            style={this.props.style2}
                            readOnly={this.props.readOnly2}
                            className="Info-rookie-input">
                        </input>
                    }
                </div>
            </div>
        );
    }
}

export default InfoInput;