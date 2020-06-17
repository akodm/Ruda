import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';

export default function TagChip(props) {
    return (
        <div className="chip-margin">
            <Chip label={"#"+props.name} size="small" onDelete={() => props.func(props.name)} color="primary" variant="outlined" />
        </div>
    );
}