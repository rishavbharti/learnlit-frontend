import * as React from 'react';
import classnames from 'classnames';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import LinearProgress from '@mui/material/LinearProgress';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    // marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '25px 26px 2px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

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
    containerClass,
    loading,
  } = props;

  const onChange = (event) => {
    return typeof handleChange === 'function' ? handleChange(event) : null;
  };

  return (
    <FormControl
      variant='filled'
      sx={{ minWidth: 120 }}
      className={classnames('w-full', containerClass)}
      required={required}
      error={error}
    >
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={`${label}_labelId`}
        id={`${label}_id`}
        value={value}
        onChange={onChange}
        input={<BootstrapInput />}
      >
        {loading ? (
          <div className='p-3'>
            <LinearProgress />
          </div>
        ) : (
          data?.map((datum, index) => (
            <MenuItem value={valueExtractor(datum)} key={datum?.id || index}>
              {labelExtractor(datum)}
            </MenuItem>
          ))
        )}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
