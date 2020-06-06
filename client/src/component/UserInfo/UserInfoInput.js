import React, { Component } from 'react';

class UserInfoInput extends Component {
    onChange(e) {
        this.props.onChange(e);
    }
    render() {
        return (
            <input 
                type={this.props.type} 
                className={this.props.className}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.onChange.bind(this)}
                onPaste={this.onChange.bind(this)}
                name={this.props.name}
                maxLength={this.props.length || 50}
            ></input>
        );
    }
}

export default UserInfoInput;