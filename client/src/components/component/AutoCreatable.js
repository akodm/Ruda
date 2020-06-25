import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function AutoCreatable(props) {
  const [value] = React.useState(null);

  return (
    <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            if(newValue !== null) {
                let values = newValue.toLowerCase();
                if (typeof newValue === 'string') {
                    props.onChange(values);
                } else if (newValue && newValue.inputValue) {
                    props.onChange(values);
                } else {
                    props.onChange(values);
                }
            }
        }}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if(params && params.inputValue !== '') {
                filtered.push(params.inputValue);
            }
            return filtered;
        }}
        selectOnFocus
        clearOnEscape	
        clearOnBlur={props.clear}
        handleHomeEndKeys
        autoHighlight
        id={props.text}
        options={props.list}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
            return option;
            }
            // Add "xxx" option created dynamically
            if (option) {
            return option;
            }
            // Regular option
            return option;
        }}
        renderOption={(option) => option}
        style={{ width: props.width }}
        freeSolo
        blurOnSelect={props.blur}
        renderInput={(params) => (
            <TextField {...params} label={props.text} variant="outlined" />
        )}
    />
  );
}