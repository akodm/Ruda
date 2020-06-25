import React from 'react';
import Chip from '@material-ui/core/Chip';
import '../css/Chip.css';

export default class TagChip extends React.Component {
    delete = () => {
        this.props.func(this.props.name)
    }

    render() {
        return (
            <div className="chip-margin-div">
                <Chip 
                    label={"# "+this.props.name} 
                    size="small" 
                    onDelete={this.props.func && this.delete.bind(this)} 
                    color="primary" 
                    variant="outlined" 
                />
            </div>
        );
    }
}