import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import dataList from '../../data-list';

class AutoComplete extends Component {
  render() {
    return (
      <Autocomplete
        id="고등/대학교"
        freeSolo
        onChange={(e, v) => this.props.onChange(v)}
        loading
        clearOnEscape
        style={{ width : 300}}
        options={dataList.app.tagList.map((option) => option)}
        renderInput={(params) => (
          <TextField {...params} label="고등/대학교" margin="normal" variant="outlined" />
        )}
      />
    );
  }
}

export default AutoComplete;