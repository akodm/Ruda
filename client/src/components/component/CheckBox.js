import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckBox extends Component {
    render() {
        return (
            <div style={this.props.style || {}} className={this.props.className || ""}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.props.check}
                        onChange={(e) => this.props.func(e.target.checked)}
                        name={this.props.name}
                        color={this.props.color}
                    />
                    }
                    label={this.props.label}
                />
            </div>
        );
    }
}

export default CheckBox;