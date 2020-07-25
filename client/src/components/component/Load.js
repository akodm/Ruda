import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/Load.css';

export default function Load(props) {
    return (
        <div className="load-mask">
            <CircularProgress />
        </div>
    );
}