import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownInput(props) {
  const {
    label,
    data,
    value,
    valueExtractor,
    labelExtractor,
    handleChange,
    required,
    error,
    helperText,
  } = props;

  const onChange = (event) => {
    return typeof handleChange === 'function' ? handleChange(event) : null;
  };

  return (
    <FormControl
      variant='filled'
      sx={{ minWidth: 120 }}
      className='w-full'
      required={required}
      error={error}
    >
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={`${label}_labelId`}
        id={`${label}_id`}
        value={value}
        onChange={onChange}
      >
        {data.map((datum) => (
          <MenuItem value={valueExtractor(datum)} key={datum?.id}>
            {labelExtractor(datum)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
