import React, { Component } from 'react';

class InputTag extends Component {
    handlingInput(e) {
        this.props.onChange(e);
    }
    render() {
        return (
            <div className="login-inputDiv">
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value} 
                    onChange={this.handlingInput.bind(this)} 
                    className="login-input" 
                    placeholder={this.props.placeholder}>
                </input>
                { this.props.validation && <span>{this.props.regSpan}</span>}
            </div>
        );
    }
}

export default InputTag;