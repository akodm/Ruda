import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class SelectBox extends Component {
    render() {
        return (
            <div style={this.props.style || {}} className={this.props.className || ""}>
                <FormControl variant="outlined" disabled={this.props.disabled || false}>
                    <InputLabel htmlFor="outlined-age-native-simple">{this.props.text}</InputLabel>
                    <Select
                    native
                    value={this.props.value}
                    onChange={(e) => this.props.func(e.target.value)}
                    label={this.props.label}
                    inputProps={{
                        name: this.props.label,
                        id: 'outlined-age-native-simple',
                    }}
                    style={this.props.style2 || {}}
                    >
                    { this.props.option.map((data,i) => {
                        return <option key={i} value={data}>{data}</option>
                    })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default SelectBox;