import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';

class RadioBox extends Component {
    render() {
        return (
            <div style={this.props.style || {}} className={this.props.className || ""}>
                {
                    this.props.option.map((data,i) => {
                        return <Radio
                            checked={this.props.checked === data}
                            onChange={(e) => this.props.func(e.target.value)}
                            value={data}
                            name={this.props.name}
                            inputProps={{ 'aria-label': this.props.data }}
                        />
                    })
                }
            </div>
        );
    }
}

export default RadioBox;